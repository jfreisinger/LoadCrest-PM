---
id: SK-001
title: "Discovery & Feature Definition"
status: draft
applies-to: [personas, value-props, features]
---

# SK-001: Discovery & Feature Definition

## Purpose

Converts a customer insight, pain point, or capability idea into a properly structured PM artifact (Feature, Value Prop, or both). Ensures new artifacts are grounded in a specific persona, traceable to a value prop, and cross-referenced correctly before entering the artifact system.

## When to Use

- After a customer conversation, demo, or field observation surfaces a new capability need
- When a technical capability exists but hasn't been formalized as a PM artifact
- When a value prop is being claimed in GTM materials without a backing Feature artifact

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| Customer insight or pain point | Customer conversation, demo notes, meeting transcript | Should be tied to a specific persona |
| Existing Persona file | `1-personas/` | The persona experiencing the pain |
| Existing Value Prop files | `2-value-props/` | Check if a VP already covers this before creating a new one |
| Glossary | `glossary/GLOSSARY.md` | Ensure any new terms are defined before writing the artifact |

## Steps

1. **Identify the persona** — Which persona (P-NNN) experiences this pain or gains this capability? If no persona covers it, create one first (or flag it).
2. **Check for existing coverage** — Search `2-value-props/` and `3-features/` for related artifacts. Avoid duplicates; prefer extending an existing artifact if the fit is close.
3. **Define the value prop** — If a new VP is warranted, draft it first (`2-value-props/`). The VP answers *why this matters* in business/financial terms. Assign next VP-NNN key from `2-value-props/INDEX.md`.
4. **Define the feature** — Draft the Feature artifact (`3-features/`). The Feature answers *what the system does*. Assign next F-NNN key from `3-features/INDEX.md`.
5. **Verify glossary coverage** — Every domain term in the new artifact must exist in `glossary/GLOSSARY.md`. Add missing terms before finalizing.
6. **Set bidirectional references** — If F-NNN references VP-NNN and P-NNN, those artifacts must also reference F-NNN in their related artifacts tables.
7. **Update INDEX.md** — Add the new artifact entry to the relevant `INDEX.md` with `status: draft`.
8. **Set status to `draft`** — Never set to `approved` — only humans approve after review.

## Outputs

| Output | Destination | Notes |
|--------|-------------|-------|
| Draft Feature file (F-NNN) | `3-features/` | Follows `_TEMPLATE.md` |
| Draft Value Prop file (VP-NNN) | `2-value-props/` | If new VP warranted |
| Updated INDEX.md entries | Same dimension directories | One entry per new artifact |
| Glossary additions | `glossary/GLOSSARY.md` | Any net-new terms |

## Related Artifacts

- [CONVENTIONS.md](../CONVENTIONS.md) — Frontmatter fields, key format, status lifecycle
- `3-features/_TEMPLATE.md` — Feature artifact template
- `2-value-props/_TEMPLATE.md` — Value prop artifact template

## Notes & Tips

- If the insight comes from a customer meeting, process the meeting notes first (see [SK-002](SK-002-meeting-notes-processing.md)) to capture approvals before creating new artifacts.
- A Feature must always trace upward to at least one VP and one Persona. An orphaned Feature is a gap — flag it before committing.
- Avoid naming features after internal codenames or engineering labels. Name them from the customer's perspective.
