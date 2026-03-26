---
id: SK-003
title: "Knowledge Graph Audit"
status: draft
applies-to: [personas, value-props, features, user-stories, interfaces, nfr, adrs]
---

# SK-003: Knowledge Graph Audit

## Purpose

Validates the integrity of the PM artifact graph — checking for orphaned artifacts, broken cross-references, missing upward traceability, and INDEX.md inconsistencies. Run periodically or before major milestones to ensure the knowledge graph remains coherent.

## When to Use

- Before a fundraise, demo, or investor review where artifact completeness matters
- After a batch of new artifacts are added
- When a team member flags that something "seems missing" from the repo
- As a periodic health check (recommended: monthly or before each sprint)

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| All artifact files | All `*/` dimension directories | Read all `.md` files except `_TEMPLATE.md` |
| INDEX.md files | All `*/INDEX.md` | Cross-reference against actual files |

## Steps

1. **Enumerate all artifacts** — List every artifact key (P-NNN, VP-NNN, F-NNN, etc.) from INDEX.md files.
2. **Check upward traceability** — Every Feature must reference at least one VP and one Persona. Every User Story must reference at least one Feature. Flag any that don't.
3. **Check inbound references** — Every Persona should be referenced by at least one Feature. Every VP should be referenced by at least one Feature. Flag orphans (artifacts with no inbound references).
4. **Validate cross-references** — For every `[X-NNN]` reference in any artifact, confirm the target file exists and the reciprocal reference exists in the target.
5. **Check INDEX.md accuracy** — Confirm that every artifact file has a corresponding INDEX.md entry with the correct status.
6. **Check for status drift** — Confirm that artifact frontmatter `status` matches the INDEX.md `status` column.
7. **Report findings** — Produce a structured report: orphans, broken references, missing traceability, INDEX.md mismatches.

## Outputs

| Output | Destination | Notes |
|--------|-------------|-------|
| Audit report | Response / meeting notes | Lists issues by category with artifact keys |
| Proposed fixes | Flagged for human confirmation | Do not auto-fix without review |

## Checks Summary

| Check | Description |
|---|---|
| Upward traceability | Feature → VP → Persona chain intact |
| Inbound references | No orphaned Personas or VPs |
| Broken references | No `[X-NNN]` pointing to a non-existent file |
| Reciprocal references | If A references B, B references A |
| INDEX.md completeness | Every file has an INDEX entry |
| Status consistency | Frontmatter status matches INDEX.md |

## Related Artifacts

- [CONVENTIONS.md](../CONVENTIONS.md) — Cross-reference notation and key format
- `glossary/GLOSSARY.md` — If new terms appear in artifacts without glossary entries, flag them

## Notes & Tips

- Use `grep -r "\[F-001\]" .` to trace all references to a specific artifact from any direction.
- Orphaned artifacts are not always a problem — some Personas may be intentionally broad. Flag, don't auto-delete.
- A Feature with no User Stories yet is expected at draft stage; it becomes a gap only after the feature is approved.
