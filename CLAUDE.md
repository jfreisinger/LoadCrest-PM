# PM Repository — AI Instructions

## Purpose

This is a product management repository using a structured artifact system. It contains requirements, specifications, and architectural decisions for a software product.

## Structure

Dimensions are numbered by dependency order:
1. `1-personas/` — WHO (P-NNN keys)
2. `2-value-props/` — WHY (VP-NNN keys)
3. `3-features/` — WHAT (F-NNN keys)
4. `4-user-stories/` — HOW (US-NNN keys)
5. `5-interfaces/` — VIA (IF-NNN keys)
6. `6-nfr/` — WHILE (NFR-NNN keys)
7. `adrs/` — Cross-cutting constraints (ADR-NNN keys)
8. `gtm/` — Go-to-market (no keys)
9. `roadmap/` — Temporal planning (no keys)

## Conventions (MUST follow)

- **Read [CONVENTIONS.md](CONVENTIONS.md) before making any changes**
- Every artifact file has YAML frontmatter with `id`, `title`, `status`, and relationship fields
- Cross-references use bracket notation: `[P-001]`, `[F-003]`, `[ADR-002]`
- Filenames embed the key: `PREFIX-NNN-slug.md`
- Keys are never reused, even after deprecation
- Each directory has an `INDEX.md` registry and a `_TEMPLATE.md`

## Approval Lifecycle

All artifacts start as **draft** (or **proposed** for ADRs) and must be manually promoted by the team after review. Claude must never create or set an artifact to `approved` or `accepted` status — only humans may do that.

| Artifact type | Initial status | Approved status |
|---|---|---|
| Personas (P-NNN) | `draft` | `approved` |
| Value Props (VP-NNN) | `draft` | `approved` |
| Features (F-NNN) | `draft` | `approved` |
| User Stories (US-NNN) | `draft` | `approved` |
| Interfaces (IF-NNN) | `draft` | `approved` |
| NFRs (NFR-NNN) | `draft` | `approved` |
| ADRs (ADR-NNN) | `proposed` | `accepted` |

## When Adding New Artifacts

1. Copy `_TEMPLATE.md` from the target dimension
2. Assign the next sequential key number (check INDEX.md for the last used number)
3. Fill in ALL frontmatter fields — especially relationship references
4. **Always set `status: draft`** (or `status: proposed` for ADRs) — never `approved` or `accepted`
5. Ensure bidirectional references (if F-001 references VP-001, VP-001 should reference F-001)
6. Add the new entry to `INDEX.md` with `draft` status

## Post-Meeting Approval Workflow

After each team meeting, Claude can read the transcript and update artifact statuses automatically.

### Meeting notes location

Meeting notes may be provided as:
- A `.txt` file path exported from Google Docs or Notion
- Text pasted directly into the conversation

### Running the workflow

Tell Claude: _"Process the meeting notes from [date or filename]"_ and provide the `.txt` path or paste the content.

Claude will:
1. Read the transcript
2. Identify every PM artifact mentioned (P-NNN, VP-NNN, F-NNN, IF-NNN, ADR-NNN, etc.)
3. Classify each as: **approved**, **rejected**, **deferred**, or **ambiguous**
4. Present a summary for confirmation before making any changes
5. After confirmation, update all frontmatter `status` fields and corresponding `INDEX.md` entries

### Approval signal interpretation

| Signal in transcript | Action |
|---|---|
| "approved", "accepted", "signed off", "good to go" | Promote to `approved` / `accepted` |
| "rejected", "not doing this", "cut it" | Flag for human — Claude will not delete, just surface |
| "tabled", "next meeting", "not yet" | Leave as `draft` / `proposed` |
| Ambiguous consensus or implicit agreement | Flag for human confirmation before changing |

Claude will never promote an artifact without explicit human confirmation of the summary list.

## When Modifying Artifacts

1. Update frontmatter if relationships change
2. If changing an ADR status, grep for `[ADR-NNN]` to find all affected documents
3. Never change a key — deprecate the old artifact and create a new one instead
4. Update INDEX.md to reflect status changes

## When Reviewing

- Use `grep -r "\[KEY\]" .` to trace the knowledge graph from any node
- Validate that the hierarchy is satisfied: every feature should trace upward to a value prop and a persona
- Check for orphans: artifacts with no inbound references may indicate gaps
