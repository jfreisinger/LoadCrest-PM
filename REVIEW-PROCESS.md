# Artifact Review Process

How PM artifacts move from `proposed` to `approved` .

---

## Overview

Artifact approval happens through team discussion (sync or async). Claude can assist in processing meeting notes and applying decisions to the repo.

---

## Workflow

### 1. Before the Meeting

- Set artifact status to `proposed` in the file's YAML frontmatter and in the dimension's `INDEX.md`
- Share the artifact link with the team

### 2. During the Meeting

- Discuss the artifact — do not edit files during the meeting
- Capture the discussion and decision in meeting notes

### 3. After the Meeting

- Export meeting notes as plain `.txt` (from Google Docs, Notion, etc.)
- Run the review process: tell Claude **"Process the meeting notes from [date]"**

### 4. Claude Review Workflow

Claude will:
1. Read the transcript
2. Find every artifact mentioned by key (`P-001`, `F-003`, etc.) or recognizable title
3. Classify the team's decision for each:
   - **Approve** — explicit or clear consensus ("let's go", "approved", "ship it")
   - **Reject** — artifact dropped or not moving forward
   - **Defer** — tabled for a future meeting
   - **Ambiguous** — discussed but no clear decision
4. Show a summary **before touching any files** — user must confirm

### 5. Confirm and Apply

After user confirmation, Claude will:
- Update `status` in each artifact's YAML frontmatter
- Update the corresponding `INDEX.md` row

### 6. Commit

Review `git diff` and commit with a descriptive message, e.g.:
```
pm: approve F-001, F-002; defer VP-003
```

---

## Manual Process

Prefer to edit files directly? Just:
1. Change `status: proposed` → `status: approved` in the artifact file
2. Update the same row in `INDEX.md`
3. Commit

---

## Signal Words for Approval

| Signal                             | Classification |
|------------------------------------|----------------|
| "approved", "let's go", "ship it" | Approve        |
| "not ready", "kill it", "no"       | Reject         |
| "next meeting", "later", "defer"   | Defer          |
| Discussion without resolution      | Ambiguous      |
