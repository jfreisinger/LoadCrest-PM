# PM Conventions

Conventions for creating, keying, and managing all PM artifacts in this repository.

---

## Key Format

```
PREFIX-NNN
```

- **PREFIX**: dimension abbreviation (see table below)
- **NNN**: zero-padded integer, 001–999
- Keys are permanent and never reused — gaps are acceptable if an artifact is deprecated

| Prefix | Dimension              |
|--------|------------------------|
| P      | Persona                |
| VP     | Value Proposition      |
| F      | Feature                |
| US     | User Story             |
| IF     | Interface              |
| NFR    | Non-Functional Req     |
| ADR    | Architectural Decision |
| SK     | Skill (Playbook)       |

---

## Filename Convention

```
PREFIX-NNN-slug.md
```

- Slug is kebab-case, descriptive
- Key is always embedded in the filename
- Examples: `P-001-athlete-hs.md`, `ADR-002-claude-api.md`

---

## Frontmatter Template

Every artifact file begins with YAML frontmatter:

```yaml
---
id: PREFIX-NNN
title: "Human-readable title"
status: draft | proposed | approved | implemented | deprecated
serves: [P-001, P-002]           # WHO benefits (upward)
delivers: [VP-001]               # WHY this matters (upward)
implemented-by: [US-001]         # HOW it is done (downward)
surfaced-in: [IF-001]            # VIA which interface (downward)
constrained-by: [ADR-001, NFR-001]  # lateral constraints
---
```

Not all fields apply to every artifact type — use only the relevant ones.

---

## Status Lifecycle

### Regular Artifacts (P, VP, F, US, IF, NFR)

```
draft → proposed → approved → implemented → deprecated
```

| Status      | Meaning                                      |
|-------------|----------------------------------------------|
| draft       | Work in progress, not ready for review       |
| proposed    | Ready for team review and approval           |
| approved    | Team has agreed this is correct              |
| implemented | Shipped in the product                       |
| deprecated  | No longer active                             |

### ADRs

```
proposed → accepted → superseded | deprecated
```

---

## Cross-Reference Notation

Always use bracket notation for references: `[F-001]`, `[P-002]`, etc.

This makes references grep-able:
```bash
grep -r "\[F-001\]" .    # find all references to F-001
grep -r "status: proposed" .   # find all artifacts ready for review
```

---

## INDEX.md Pattern

Every dimension directory has an `INDEX.md` registry:

```markdown
| Key | Title | Status | Primary References |
|-----|-------|--------|-------------------|
| [P-001](P-001-athlete-hs.md) | High School Athlete | approved | IF-001, IF-002 |
```

Update the INDEX whenever an artifact is added or its status changes.

---

## _TEMPLATE.md

Each dimension directory has a `_TEMPLATE.md` showing the required structure. Copy it when creating a new artifact — never skip required sections.

---

## Numbering Rules

- Sequential within prefix
- Zero-padded to 3 digits
- Never reuse a key
- Gaps are fine (e.g., if F-003 is deprecated, skip it)
- New ADRs for a new phase may continue from the last used number

---

## Contribution Workflow

1. Copy `_TEMPLATE.md` and name it `PREFIX-NNN-slug.md`
2. Fill in all frontmatter fields
3. Write the artifact body
4. Add a row to `INDEX.md` with status `draft`
5. Change status to `proposed` when ready for team review
6. Use the review process in `REVIEW-PROCESS.md` to move to `approved`
