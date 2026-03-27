# NDA Review Bot — Setup Guide

Deploys `NdaReviewBot.gs` to Google Apps Script and connects it to Gmail,
Google Drive, the Claude API, and optionally Copper CRM.

**Time to deploy: ~15 minutes**

---

## Prerequisites

- Google Workspace account (the Gmail/Drive account where NDAs are received)
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))
- Copper API key (optional — only needed for Copper note posting)

---

## Step 1 — Create the Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click **New project**
3. Rename it: `LoadCrest NDA Review Bot`
4. Delete the default `myFunction()` code
5. Paste the entire contents of `NdaReviewBot.gs` into the editor
6. Click **Save** (Ctrl+S)

---

## Step 2 — Enable the Drive Advanced Service

The PDF-to-text extractor requires Google's Drive API v2 Advanced Service.

1. In the Apps Script editor, click **Services** (+ icon in the left sidebar)
2. Find **Drive API** in the list
3. Click **Add**
4. Verify it appears in the Services list as `Drive`

> If you skip this step, PDF extraction will fail with a `Drive is not defined` error.

---

## Step 3 — Set Script Properties (API Keys)

Script Properties store secrets securely — they are never visible in the code.

1. In the Apps Script editor, click **Project Settings** (gear icon, left sidebar)
2. Scroll down to **Script Properties**
3. Click **Add script property** for each of the following:

| Property name | Value | Required? |
|---|---|---|
| `CLAUDE_API_KEY` | Your Anthropic API key (`sk-ant-...`) | **Required** |
| `COPPER_API_KEY` | Your Copper API key | Optional |
| `COPPER_USER_EMAIL` | Your Copper login email | Optional (needed if using Copper) |
| `COPPER_NOTE_ACTIVITY_TYPE_ID` | See note below | Optional |

**Finding your Copper `activity_type_id` for notes:**

Run this in a browser or REST client (with your Copper credentials):
```
GET https://api.copper.com/developer_api/v1/activity_types
Headers:
  X-PW-AccessToken: <your-copper-api-key>
  X-PW-Application: developer_api
  X-PW-UserEmail: <your-copper-email>
```
Find the entry with `"category": "user"` and `"name": "Note"` — use its `id` value.
If unsure, leave this property unset; it defaults to `0` which works for most Copper accounts.

---

## Step 4 — Verify Setup

1. In the Apps Script editor, select function `verifySetup` from the dropdown (top toolbar)
2. Click **Run**
3. Authorize the script when prompted (Google will ask for Gmail, Drive permissions)
4. Click **Execution log** to see results

Expected output:
```
CLAUDE_API_KEY:    ✓ set
COPPER_API_KEY:    ✓ set  (or — not set if skipped)
COPPER_USER_EMAIL: ✓ set  (or — not set if skipped)
Drive folder:      ✓ "NDA Reviews" (https://drive.google.com/...)
Gmail label:       ✓ "NDA-Reviewed"
```

Fix any `✗ MISSING` items before proceeding.

---

## Step 5 — Create the Time Trigger

1. In the Apps Script editor, click **Triggers** (clock icon, left sidebar)
2. Click **+ Add Trigger** (bottom right)
3. Configure:

| Setting | Value |
|---|---|
| Function to run | `checkForNewNdas` |
| Deployment | Head |
| Event source | Time-driven |
| Type of time trigger | Minutes timer |
| Interval | Every 10 minutes |

4. Click **Save**
5. Authorize any additional permissions if prompted

The bot is now live. It will check Gmail every 10 minutes for unread emails
containing "NDA", "Non-Disclosure", or "MNDA" with PDF attachments.

---

## How It Works (End to End)

```
Counterparty sends email with NDA attachment
        ↓
Gmail receives it (unread, matches keyword, has PDF)
        ↓
Apps Script wakes up (every 10 min), finds the thread
        ↓
Extracts PDF text via Google Drive OCR conversion
        ↓
Calls Claude API (claude-sonnet-4-6) with full 21-criterion rubric
        ↓
Saves structured review to Google Drive > "NDA Reviews" folder
        ↓
Creates a Gmail draft reply addressed to the sender
        ↓
(If configured) Posts review as note on Copper contact
        ↓
Applies "NDA-Reviewed" label so the thread is not re-processed
```

---

## Output Locations

| Output | Where |
|---|---|
| Full review (Markdown) | Google Drive > **NDA Reviews** folder |
| Draft reply | Gmail > **Drafts** (addressed to sender — you send it) |
| CRM note | Copper contact matching the sender's email (if configured) |
| Run logs | Apps Script > **Executions** log |

Review files are named: `YYYY-MM-DD-counterparty-name-nda-review.md`

---

## What Triggers a Review

The script searches Gmail for threads that are:
- **Unread**
- Contain **NDA**, **Non-Disclosure**, or **MNDA** (in subject or body)
- Have a **PDF attachment**
- Are **not** already labelled `NDA-Reviewed`

Emails matching keywords but with no PDF attachment are labelled and skipped
(logged as a warning).

---

## Scanned / Image PDFs

If the NDA is a scanned image (not a text PDF), Google Drive's OCR will attempt
to extract text. Quality depends on scan quality. If OCR returns minimal content,
the review will note this and flag for manual processing.

---

## Cost Estimate

Each NDA review calls Claude claude-sonnet-4-6 with ~3,000–6,000 input tokens
(criteria + NDA text) and produces ~1,500–2,500 output tokens.

Approximate cost per review: **$0.02–$0.05** at current Anthropic pricing.

---

## Adjusting Keywords

To add or remove trigger keywords, update the `SEARCH_KEYWORDS` array in
`getConfig()` inside `NdaReviewBot.gs` and redeploy (save the file — no
trigger changes needed).

---

## Disabling the Bot

To pause: go to Apps Script > **Triggers** > delete the `checkForNewNdas` trigger.
To resume: re-add the trigger following Step 5.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Drive is not defined` | Enable Drive Advanced Service (Step 2) |
| `CLAUDE_API_KEY not set` | Add to Script Properties (Step 3) |
| Claude API 401 error | Check API key is correct and has credits |
| No emails found | Check keyword spelling; verify emails are unread; check the `NDA-Reviewed` label isn't pre-applied |
| Copper note not posting | Verify `COPPER_API_KEY`, `COPPER_USER_EMAIL` are set; check Execution log for error detail |
| PDF extraction returns blank | PDF may be image-only; OCR quality depends on scan resolution |

For detailed diagnostics, check **Apps Script > Executions** for the full log
of each run.
