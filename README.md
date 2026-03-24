# PM Repository Template

A structured product management repository for AI-assisted artifact authoring, review, and approval workflows.

Use this template to manage your product's requirements, decisions, and design artifacts — from personas through architecture decisions — with a consistent keying system and Claude Code integration.

---

## Dimension Hierarchy

```
WHO    → Personas (P)         Who are we building for?
WHY    → Value Props (VP)     Why does this matter to them?
WHAT   → Features (F)         What capabilities deliver that value?
HOW    → User Stories (US)    How does a user accomplish this?
VIA    → Interfaces (IF)      Via which surface does this happen?
WHILE  → NFRs (NFR)           While meeting what constraints?

Cross-cutting: ADRs govern all layers
```

---

## Repository Structure

```
pm/
├── README.md              ← You are here
├── CONVENTIONS.md         ← Keying, frontmatter, status lifecycle
├── REVIEW-PROCESS.md      ← Artifact approval workflow with Claude
├── CLAUDE.md              ← AI assistant instructions for this repo
│
├── 1-personas/            ← WHO  (P-NNN)
├── 2-value-props/         ← WHY  (VP-NNN)
├── 3-features/            ← WHAT (F-NNN)
├── 4-user-stories/        ← HOW  (US-NNN)
├── 5-interfaces/          ← VIA  (IF-NNN)
├── 6-nfr/                 ← WHILE (NFR-NNN)
├── adrs/                  ← Cross-cutting decisions (ADR-NNN)
│
├── gtm/                   ← Go-to-market strategy
└── roadmap/               ← Releases and phased planning
```

---

## Keying System

Every artifact has a unique key: `PREFIX-NNN`

| Prefix | Dimension      | Example              |
|--------|----------------|----------------------|
| P      | Persona        | P-001-power-user.md  |
| VP     | Value Prop     | VP-001-core-value.md |
| F      | Feature        | F-001-feature-name.md |
| US     | User Story     | US-001-user-flow.md  |
| IF     | Interface      | IF-001-mobile-app.md |
| NFR    | Non-Functional | NFR-001-performance.md |
| ADR    | Decision Record| ADR-001-database.md  |

Use `grep -r "[F-001]" .` to find all references to any artifact.

---

## Quick Navigation

| I need to…                         | Go to            |
|------------------------------------|------------------|
| Understand our users               | `1-personas/`    |
| Know why we're building something  | `2-value-props/` |
| See what we're building            | `3-features/`    |
| Review specific user flows         | `4-user-stories/`|
| Understand app surfaces            | `5-interfaces/`  |
| Check quality requirements         | `6-nfr/`         |
| Review architecture decisions      | `adrs/`          |
| Check go-to-market plans           | `gtm/`           |
| See release plan                   | `roadmap/`       |

---

## Getting Started

1. Connect Claude Code to this repo as its working directory
2. Copy `_TEMPLATE.md` from any dimension folder to create a new artifact
3. Fill in frontmatter fields and body
4. Add an entry to that dimension's `INDEX.md`
5. Follow `REVIEW-PROCESS.md` for your weekly approval workflow
