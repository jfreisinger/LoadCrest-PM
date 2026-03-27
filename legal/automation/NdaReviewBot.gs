/**
 * NDA Review Bot — LoadCrest, Inc.
 *
 * Watches Gmail for incoming NDAs, extracts PDF text, evaluates against
 * LoadCrest's 21-criterion rubric via Claude API, and delivers results as:
 *   1. A Gmail draft reply to the sender
 *   2. A saved review in a designated Google Drive folder
 *   3. (Optional) A note on the matching Copper CRM contact
 *
 * Trigger keywords: NDA, Non-Disclosure, MNDA (in subject or body)
 *
 * Setup: See SETUP.md in this directory.
 * Criteria source: ../NDA-CRITERIA.md
 */

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// All secrets are read from Script Properties — never hardcode keys here.
// See SETUP.md for how to set these.

function getConfig() {
  var props = PropertiesService.getScriptProperties();
  return {
    CLAUDE_API_KEY:      props.getProperty('CLAUDE_API_KEY'),
    COPPER_API_KEY:      props.getProperty('COPPER_API_KEY'),      // optional
    COPPER_USER_EMAIL:   props.getProperty('COPPER_USER_EMAIL'),   // optional
    CLAUDE_MODEL:        'claude-sonnet-4-6',
    DRIVE_FOLDER_NAME:   'NDA Reviews',
    PROCESSED_LABEL:     'NDA-Reviewed',
    SEARCH_KEYWORDS:     ['NDA', 'Non-Disclosure', 'MNDA'],
    MAX_EMAILS_PER_RUN:  10,
  };
}

// ─── ENTRY POINT ──────────────────────────────────────────────────────────────

/**
 * Main function. Attach this to a time-based trigger (every 10–15 minutes).
 * Script Properties > Add trigger > checkForNewNdas > Time-driven > Minutes timer.
 */
function checkForNewNdas() {
  var config = getConfig();

  if (!config.CLAUDE_API_KEY) {
    Logger.log('ERROR: CLAUDE_API_KEY not set in Script Properties.');
    return;
  }

  // Build Gmail search query
  var keywordQuery = config.SEARCH_KEYWORDS
    .map(function(kw) { return '"' + kw + '"'; })
    .join(' OR ');
  var query = '(' + keywordQuery + ') has:attachment -label:' + config.PROCESSED_LABEL + ' is:unread';

  var threads = GmailApp.search(query, 0, config.MAX_EMAILS_PER_RUN);
  Logger.log('Found ' + threads.length + ' thread(s) matching NDA keywords.');

  // Ensure the processed label exists
  var label = getOrCreateLabel(config.PROCESSED_LABEL);
  // Ensure the Drive output folder exists
  var driveFolder = getOrCreateDriveFolder(config.DRIVE_FOLDER_NAME);

  for (var i = 0; i < threads.length; i++) {
    try {
      processThread(threads[i], label, driveFolder, config);
    } catch (e) {
      Logger.log('ERROR processing thread ' + threads[i].getId() + ': ' + e.message);
    }
  }
}

// ─── THREAD PROCESSING ────────────────────────────────────────────────────────

function processThread(thread, label, driveFolder, config) {
  var messages = thread.getMessages();

  // Find the most recent message in the thread that has a PDF attachment
  var targetMessage = null;
  var pdfAttachment = null;

  for (var i = messages.length - 1; i >= 0; i--) {
    var attachments = messages[i].getAttachments();
    for (var j = 0; j < attachments.length; j++) {
      if (attachments[j].getContentType() === 'application/pdf') {
        targetMessage = messages[i];
        pdfAttachment = attachments[j];
        break;
      }
    }
    if (pdfAttachment) break;
  }

  if (!pdfAttachment) {
    // Keyword match but no PDF — label and skip
    Logger.log('Thread ' + thread.getId() + ': keywords matched but no PDF attachment found. Labelling and skipping.');
    thread.addLabel(label);
    return;
  }

  var senderEmail = extractEmail(targetMessage.getFrom());
  var senderName  = extractName(targetMessage.getFrom());
  var subject     = targetMessage.getSubject();
  var dateStr     = Utilities.formatDate(targetMessage.getDate(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

  Logger.log('Processing NDA from: ' + senderEmail + ' | Subject: ' + subject);

  // Extract text from PDF
  var ndaText = extractTextFromPdf(pdfAttachment.copyBlob());
  if (!ndaText || ndaText.trim().length < 100) {
    Logger.log('WARNING: PDF text extraction returned very little content. Possible scanned image PDF.');
    ndaText = '[PDF text extraction returned minimal content — this may be a scanned image. ' +
              'Manual review required. Attachment: ' + pdfAttachment.getName() + ']';
  }

  // Call Claude API for review
  var review = callClaudeForReview(ndaText, senderName || senderEmail, config);

  // Save review to Drive
  var fileName = dateStr + '-' + slugify(senderName || senderEmail) + '-nda-review.md';
  driveFolder.createFile(fileName, review, MimeType.PLAIN_TEXT);
  Logger.log('Review saved to Drive: ' + fileName);

  // Create Gmail draft reply
  createDraftReply(targetMessage, review, senderName || senderEmail, config);

  // Optional: post to Copper CRM
  if (config.COPPER_API_KEY && config.COPPER_USER_EMAIL) {
    try {
      postToCopperContact(senderEmail, review, subject, config);
    } catch (e) {
      Logger.log('WARNING: Copper post failed for ' + senderEmail + ': ' + e.message);
    }
  }

  // Mark processed
  thread.addLabel(label);
  Logger.log('Done processing thread from: ' + senderEmail);
}

// ─── PDF TEXT EXTRACTION ──────────────────────────────────────────────────────

/**
 * Converts a PDF blob to text via Google Drive's built-in OCR conversion.
 * Requires the Drive advanced service to be enabled (see SETUP.md).
 */
function extractTextFromPdf(pdfBlob) {
  var tempFileId = null;
  var docFileId  = null;

  try {
    // Upload PDF to Drive temporarily
    var tempFile = DriveApp.createFile(pdfBlob.setName('temp_nda_' + Date.now() + '.pdf'));
    tempFileId = tempFile.getId();

    // Convert to Google Docs format (triggers OCR on image-based PDFs)
    var resource = {
      title:    'temp_nda_converted_' + Date.now(),
      mimeType: MimeType.GOOGLE_DOCS,
    };
    var converted = Drive.Files.copy(resource, tempFileId, { ocr: true, ocrLanguage: 'en' });
    docFileId = converted.id;

    // Extract text
    var doc  = DocumentApp.openById(docFileId);
    var text = doc.getBody().getText();
    return text;

  } finally {
    // Always clean up temp files
    if (tempFileId) {
      try { DriveApp.getFileById(tempFileId).setTrashed(true); } catch(e) {}
    }
    if (docFileId) {
      try { DriveApp.getFileById(docFileId).setTrashed(true); } catch(e) {}
    }
  }
}

// ─── CLAUDE API CALL ──────────────────────────────────────────────────────────

function callClaudeForReview(ndaText, counterpartyName, config) {
  var systemPrompt = buildSystemPrompt();
  var userMessage  = buildUserMessage(ndaText, counterpartyName);

  var payload = {
    model: config.CLAUDE_MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userMessage }
    ]
  };

  var options = {
    method:      'post',
    contentType: 'application/json',
    headers: {
      'x-api-key':         config.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    payload:          JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  var response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  var code     = response.getResponseCode();
  var body     = JSON.parse(response.getContentText());

  if (code !== 200) {
    throw new Error('Claude API error ' + code + ': ' + JSON.stringify(body));
  }

  return body.content[0].text;
}

function buildSystemPrompt() {
  return [
    'You are an NDA review assistant for LoadCrest, Inc., an AI data center power infrastructure company.',
    'LoadCrest\'s core IP is the Sentinel algorithm (sub-250ms power control) and 800VDC architecture.',
    'You evaluate incoming third-party NDAs against LoadCrest\'s 21-criterion rubric.',
    '',
    'EVALUATION CRITERIA AND THRESHOLDS:',
    '',
    '1. MUTUALITY: PASS=mutual; FLAG=one-way favoring counterparty; REJECT=only LoadCrest bears obligations.',
    '2. NON-CIRCUMVENTION: PASS=equivalent clause; FLAG=absent or weaker; REJECT=explicitly excluded.',
    '   (Critical: protects deal flow with Dyna Power, IONATE, VEIR, neocloud pilots.)',
    '3. SCOPE OF CI: PASS=broad (business plans, IP, technical info, personnel, customers);',
    '   FLAG=may exclude Sentinel or 800VDC specs; REJECT=narrow/excludes core IP.',
    '4. MARKING REQUIREMENT: PASS=oral notification sufficient; FLAG=written follow-up deadline required;',
    '   REJECT=written marking only at time of disclosure.',
    '5. STANDARD OF CARE: PASS=same as own + no less than reasonable; FLAG=reasonable care only;',
    '   REJECT=below reasonable care or absent.',
    '6. THIRD-PARTY DISCLOSURE: PASS=prior written approval required; FLAG=not specified as written;',
    '   REJECT=no restriction or broad affiliate carve-out.',
    '7. EMPLOYEE ACCESS CONTROL: PASS=all personnel bound; FLAG=employees only; REJECT=no binding.',
    '8. BREACH NOTIFICATION: PASS=prompt notification for breach AND legal process; FLAG=one scenario only;',
    '   REJECT=no notification obligation.',
    '9. IP OWNERSHIP: PASS=explicit no-rights-granted language; FLAG=silent on IP rights;',
    '   REJECT=any license, assignment, or feedback ownership clause. (Critical: Sentinel must not be licensed.)',
    '10. RETURN/DESTRUCTION: PASS=on-demand, covers copies and notes; FLAG=termination-only or excludes notes;',
    '    REJECT=no obligation or right to retain copies.',
    '11. INJUNCTIVE RELIEF: PASS=explicit + irreparable harm acknowledged; FLAG=bond required;',
    '    REJECT=arbitration-only or monetary damages only.',
    '12. RESIDUALS CLAUSE: PASS=absent; FLAG=present (surface for human decision);',
    '    REJECT=broad residuals with no trade secret carve-out. (Critical: existential IP risk for Sentinel.)',
    '13. TERM: PASS=2+ years; FLAG=less than 2 years; REJECT=no term or less than 1 year.',
    '14. SURVIVAL: PASS=explicit survival; FLAG=not addressed; REJECT=obligations expire at termination.',
    '15. GOVERNING LAW: PASS=Delaware; FLAG=other U.S. state; REJECT=foreign jurisdiction.',
    '16. JURISDICTION/VENUE: PASS=New Mexico; FLAG=other U.S. venue; REJECT=foreign or arbitration-only.',
    '17. CONFIDENTIALITY OF AGREEMENT: PASS=no announcement without approval; FLAG=absent;',
    '    REJECT=requires LoadCrest to permit public announcement.',
    '18. INDEMNIFICATION: PASS=breach indemnity including attorneys fees; FLAG=no attorneys fees;',
    '    REJECT=no indemnification or nominal cap.',
    '19. STANDARD EXCLUSIONS: PASS=all five present (already known, public domain, independent development,',
    '    approved release, legal compulsion); FLAG=one or more absent; REJECT=broader than standard.',
    '20. NO PARTNERSHIP/AGENCY: PASS=explicit disclaimer; FLAG=absent; REJECT=JV/agency language.',
    '21. ARBITRATION: PASS=court-based; FLAG=arbitration with injunctive relief carve-out;',
    '    REJECT=mandatory arbitration precluding injunctive relief.',
    '',
    'QUICK AUTO-REJECT DISQUALIFIERS (check these first):',
    '- Residuals clause with no trade secret carve-out',
    '- Any IP license or assignment triggered by disclosure',
    '- Foreign jurisdiction (outside U.S.)',
    '- No survival of confidentiality post-termination',
    '- No injunctive relief (arbitration-only remedies)',
    '- One-way obligations where only LoadCrest bears confidentiality duties',
    '',
    'OUTPUT FORMAT: Produce a structured markdown review using the template below.',
    'Be specific: quote the exact clause text for every FLAG and REJECT item.',
    'For every FLAG/REJECT, propose a specific redline based on LoadCrest\'s standard language.',
    'Never recommend signing — only surface findings. Always include the human sign-off block.',
  ].join('\n');
}

function buildUserMessage(ndaText, counterpartyName) {
  return [
    'Please review the following NDA received from: ' + counterpartyName,
    '',
    'Evaluate it against all 21 criteria. Check Quick Disqualifiers first.',
    'Quote specific clause language for every FLAG and REJECT item.',
    'Propose redlines for every issue found.',
    '',
    'Use this exact output structure:',
    '',
    '# NDA Review: ' + counterpartyName,
    '**Review date:** [today]',
    '**Counterparty:** ' + counterpartyName,
    '**Overall recommendation:** [PROCEED / PROCEED WITH NEGOTIATION / DO NOT SIGN]',
    '',
    '## Executive Summary',
    '[3-4 sentences: NDA type, key risks, overall posture]',
    '',
    '## Quick Disqualifiers',
    '[NONE FOUND — or list any that triggered]',
    '',
    '## Scorecard',
    '| # | Criterion | Status | Notes |',
    '|---|---|---|---|',
    '[one row per criterion, 1–21]',
    '',
    '## Issues Requiring Attention',
    '### REJECT Items',
    '[clause reference + quoted text + why it fails + redline]',
    '',
    '### FLAG Items',
    '[clause reference + quoted text + why it flags + redline]',
    '',
    '## Non-Standard Clauses',
    '[any clauses not covered by the 21 criteria]',
    '',
    '## Recommended Redlines Summary',
    '| Issue | Current Language | Suggested Redline |',
    '|---|---|---|',
    '',
    '---',
    '> AI-assisted review — not legal advice. Human sign-off required before execution.',
    '> [ ] Reviewed by: _______________ [ ] Approved: _______________ [ ] Date: _______________',
    '',
    '═══════════════════════════════════════════════',
    'NDA TEXT BEGINS BELOW',
    '═══════════════════════════════════════════════',
    '',
    ndaText,
  ].join('\n');
}

// ─── GMAIL DRAFT ──────────────────────────────────────────────────────────────

function createDraftReply(message, reviewMarkdown, counterpartyName, config) {
  var subject = 'Re: ' + message.getSubject();

  // Create a plain-text email summary (first ~50 lines of the review)
  var lines       = reviewMarkdown.split('\n');
  var summaryLines = lines.slice(0, 60).join('\n');
  var body = [
    'This is an automated AI-assisted NDA review for your reference.',
    'Full review is attached and saved to the NDA Reviews folder.',
    '',
    '─'.repeat(60),
    '',
    summaryLines,
    '',
    '[... full review continues — see attached or NDA Reviews folder ...]',
    '',
    '─'.repeat(60),
    'This review was generated automatically by LoadCrest\'s NDA Review Bot.',
    'It does not constitute legal advice. Human review and sign-off required before execution.',
  ].join('\n');

  GmailApp.createDraft(
    message.getFrom(),
    subject,
    body,
    { replyTo: message.getFrom() }
  );

  Logger.log('Draft reply created for: ' + message.getFrom());
}

// ─── COPPER CRM INTEGRATION ───────────────────────────────────────────────────

/**
 * Posts the NDA review as a note on the matching Copper contact.
 * Requires COPPER_API_KEY and COPPER_USER_EMAIL in Script Properties.
 *
 * To find your Copper activity_type_id for "Note":
 *   GET https://api.copper.com/developer_api/v1/activity_types
 * Set the result as COPPER_NOTE_ACTIVITY_TYPE_ID in Script Properties.
 * Default is 0 (Copper interprets 0 as a plain note in most instances).
 */
function postToCopperContact(email, reviewText, subject, config) {
  var baseUrl = 'https://api.copper.com/developer_api/v1';
  var headers = {
    'X-PW-AccessToken': config.COPPER_API_KEY,
    'X-PW-Application':  'developer_api',
    'X-PW-UserEmail':    config.COPPER_USER_EMAIL,
    'Content-Type':      'application/json',
  };

  // Step 1: Find person by email
  var searchResponse = UrlFetchApp.fetch(baseUrl + '/people/search', {
    method:      'post',
    headers:     headers,
    payload:     JSON.stringify({ emails: [email] }),
    muteHttpExceptions: true,
  });

  if (searchResponse.getResponseCode() !== 200) {
    Logger.log('Copper person search failed for ' + email + ': ' + searchResponse.getContentText());
    return;
  }

  var people = JSON.parse(searchResponse.getContentText());
  if (!people || people.length === 0) {
    Logger.log('No Copper contact found for email: ' + email + '. Skipping Copper note.');
    return;
  }

  var personId = people[0].id;

  // Truncate review to 10k chars for Copper note (Copper has a field size limit)
  var noteBody = '📋 NDA REVIEW — Auto-generated\nSubject: ' + subject + '\n\n' +
                 reviewText.substring(0, 10000) +
                 (reviewText.length > 10000 ? '\n\n[Truncated — full review in NDA Reviews Drive folder]' : '');

  // Step 2: Post activity/note
  var props          = PropertiesService.getScriptProperties();
  var activityTypeId = parseInt(props.getProperty('COPPER_NOTE_ACTIVITY_TYPE_ID') || '0');

  var notePayload = {
    type:    { category: 'user', id: activityTypeId },
    details: noteBody,
    parent:  { type: 'person', id: personId },
  };

  var noteResponse = UrlFetchApp.fetch(baseUrl + '/activities', {
    method:      'post',
    headers:     headers,
    payload:     JSON.stringify(notePayload),
    muteHttpExceptions: true,
  });

  if (noteResponse.getResponseCode() === 200 || noteResponse.getResponseCode() === 201) {
    Logger.log('Copper note posted for contact: ' + email + ' (person ID: ' + personId + ')');
  } else {
    Logger.log('Copper note post failed: ' + noteResponse.getContentText());
  }
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function getOrCreateLabel(labelName) {
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
    Logger.log('Created Gmail label: ' + labelName);
  }
  return label;
}

function getOrCreateDriveFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  var folder = DriveApp.createFolder(folderName);
  Logger.log('Created Drive folder: ' + folderName);
  return folder;
}

function extractEmail(fromHeader) {
  var match = fromHeader.match(/<([^>]+)>/);
  return match ? match[1] : fromHeader.trim();
}

function extractName(fromHeader) {
  var match = fromHeader.match(/^([^<]+)</);
  return match ? match[1].trim().replace(/^"|"$/g, '') : null;
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40);
}

// ─── ONE-TIME SETUP HELPER ────────────────────────────────────────────────────

/**
 * Run this once manually to verify your configuration is correct.
 * Check the Execution Log for output.
 */
function verifySetup() {
  var config = getConfig();
  Logger.log('=== NDA Review Bot — Setup Verification ===');
  Logger.log('CLAUDE_API_KEY:    ' + (config.CLAUDE_API_KEY    ? '✓ set' : '✗ MISSING'));
  Logger.log('COPPER_API_KEY:    ' + (config.COPPER_API_KEY    ? '✓ set' : '— not set (optional)'));
  Logger.log('COPPER_USER_EMAIL: ' + (config.COPPER_USER_EMAIL ? '✓ set' : '— not set (optional)'));
  Logger.log('CLAUDE_MODEL:      ' + config.CLAUDE_MODEL);
  Logger.log('DRIVE_FOLDER_NAME: ' + config.DRIVE_FOLDER_NAME);
  Logger.log('PROCESSED_LABEL:   ' + config.PROCESSED_LABEL);
  Logger.log('SEARCH_KEYWORDS:   ' + config.SEARCH_KEYWORDS.join(', '));

  // Test Drive folder creation
  var folder = getOrCreateDriveFolder(config.DRIVE_FOLDER_NAME);
  Logger.log('Drive folder:      ✓ "' + folder.getName() + '" (' + folder.getUrl() + ')');

  // Test Gmail label
  var label = getOrCreateLabel(config.PROCESSED_LABEL);
  Logger.log('Gmail label:       ✓ "' + label.getName() + '"');

  Logger.log('=== Verification complete. Check above for any MISSING items. ===');
}
