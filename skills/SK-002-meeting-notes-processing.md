---
id: SK-002
title: "Meeting Notes Processing"
status: draft
applies-to: [personas, value-props, features, user-stories, interfaces, nfr, adrs]
---

# SK-002: Meeting Notes Processing

## Purpose

Processes a team meeting transcript to extract artifact status decisions (approvals, rejections, deferrals) and update the PM repo accordingly. Ensures that decisions made verbally in meetings are captured as artifact status changes within the same session — not lost in notes.

## When to Use

- After any team meeting where PM artifacts (P-NNN, VP-NNN, F-NNN, IF-NNN, ADR-NNN, etc.) were discussed, reviewed, or decided upon
- When a meeting transcript or exported notes file is available

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| Meeting transcript or notes | `.txt` file path, or pasted text | Exported from Google Docs, Notion, or similar |
| Current artifact files | All `*/` dimension directories | Read to verify current status before updating |
| INDEX.md files | All `*/INDEX.md` | Updated to reflect status changes |

## Steps

1. **Read the transcript** — Load the full text. Note the meeting date.
2. **Extract all artifact references** — Find every P-NNN, VP-NNN, F-NNN, IF-NNN, NFR-NNN, ADR-NNN mentioned.
3. **Classify each decision** using the table below.
4. **Present a summary for confirmation** — List every artifact, its current status, its proposed new status, and the signal from the transcript. Do not make changes yet.
5. **Wait for explicit human confirmation** before applying any changes.
6. **Apply approved changes** — Update each artifact's `status` frontmatter field and its corresponding `INDEX.md` entry.
7. **Flag rejections and ambiguous items** — Do not delete rejected artifacts. Surface them for human decision.

## Decision Classification

| Signal in transcript | Classification | Action |
|---|---|---|
| "approved", "accepted", "signed off", "good to go" | Approved | Promote status to `approved` / `accepted` |
| "rejected", "not doing this", "cut it" | Rejected | Flag for human — do not delete |
| "tabled", "next meeting", "not yet", "defer" | Deferred | Leave status unchanged |
| Ambiguous consensus or implicit agreement | Ambiguous | Flag for human confirmation before changing |

## Outputs

| Output | Destination | Notes |
|--------|-------------|-------|
| Updated artifact frontmatter | Relevant artifact files | `status` field only |
| Updated INDEX.md entries | Same dimension directories | Status column updated |
| Flagged items summary | Response to human | Rejections and ambiguous items for human decision |

## Related Artifacts

- [CONVENTIONS.md](../CONVENTIONS.md) — Approval lifecycle and status values per artifact type
- [CLAUDE.md](../CLAUDE.md) — Post-meeting approval workflow reference

## Notes & Tips

- Never promote an artifact to `approved` or `accepted` without explicit confirmation of the summary list.
- If the same artifact is mentioned multiple times in a transcript with conflicting signals, flag as ambiguous.
- ADRs use `accepted` (not `approved`) as the terminal positive status.
- New artifacts mentioned in a meeting but not yet in the repo should be flagged for creation via [SK-001](SK-001-discovery-and-feature-definition.md).
