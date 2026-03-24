# Meeting Notes

Processed meeting notes from Poiz weekly syncs and decision meetings.

## How to use

1. Export the Gemini `.txt` transcript to `~/Downloads/` (or any path)
2. Run `/meeting-review` in Claude Code and provide the file path
3. Review the summary → confirm → Claude updates artifact files + INDEX.md entries

## File naming

```
YYYY-MM-DD-slug.md
```

Example: `2026-03-17-weekly-connect.md`

## What gets saved

- Process decisions and workflow agreements
- Artifact status changes (after human confirmation)
- Deferred items and follow-up tasks

## Notes

- Raw Gemini `.txt` exports → drop in `~/Downloads/` before processing
- When no path is given, the skill looks for the latest `Weekly Poiz Connect*.txt` in `~/Downloads/`
- Claude will never promote an artifact to `approved`/`accepted` without explicit confirmation
