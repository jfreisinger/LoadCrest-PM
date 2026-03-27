# NDA Review: Tritium Power Solutions, Inc.

> **Reviewer:** Claude (AI-assisted review — human sign-off required before execution)
> **Review date:** 2026-03-26
> **Counterparty:** Tritium Power Solutions, Inc. — 1420 Toshiba Drive, Suite D, Lebanon, Tennessee, USA (EIN: 99-4177415)
> **NDA type:** Mutual (Two-Way)
> **Source file:** Confidentiality NDA Two Way (Mutual) - LoadCrest_Tritium supply (US) - 0125.pdf
> **Overall recommendation:** PROCEED WITH NEGOTIATION

---

## Executive Summary

This is a mutual NDA drafted by Tritium Power Solutions for EV charger supply discussions. The document has strong bones — good CI scope, solid IP ownership language, injunctive relief without bond, and a 5-year confidentiality period — but was clearly written for Tritium's standard sales/supply engagements, not for a technology partnership. The most critical issue is the **Project definition**, which is scoped exclusively to Tritium's EV charger business; if LoadCrest intends to share Sentinel or 800VDC information under this agreement, the Project definition must be rewritten before execution. Additionally, **non-circumvention is absent entirely**, **indemnification is missing**, and **governing law defaults to Tennessee**. No auto-REJECT disqualifiers were triggered. The agreement is workable with targeted redlines.

---

## Quick Disqualifiers

**NONE TRIGGERED.**

- No residuals clause ✓
- No IP license or assignment ✓
- U.S. jurisdiction only ✓
- Confidentiality survives termination ✓
- Injunctive relief available ✓
- Mutual obligations ✓

---

## Scorecard

| # | Criterion | Status | Notes |
|---|---|---|---|
| 1 | Mutuality | **PASS** | Fully mutual; both parties are Discloser and Recipient |
| 2 | Non-Circumvention | **FLAG** | Absent entirely |
| 3 | Scope of Confidential Information | **FLAG** | CI definition broad, but use restricted to "Project" (EV charger supply) — see critical note |
| 4 | Marking / Identification Requirement | **PASS** | "Reasonable person" standard; no formal marking required |
| 5 | Standard of Care | **PASS** | "Demonstrably secure manner" — at least equivalent to reasonable care |
| 6 | Third-Party / Contractor Disclosure | **FLAG** | "Representative" excludes contractors/agents; affiliate disclosure without discloser written consent |
| 7 | Employee / Agent Access Control | **FLAG** | "Representative" defined as director/officer/employee only — contractors excluded |
| 8 | Breach Notification | **PASS** | Immediate notice for unauthorized access (§7.1); prompt notice before legal compulsion (§5.2) |
| 9 | IP Ownership — No Rights Granted | **PASS** | Explicit; additionally bars patent applications without consent (§6.2) |
| 10 | Return / Destruction of Materials | **PASS** | On-demand return within 7 days; covers copies; reasonable backup carve-out with perpetual CI obligation (§9.4) |
| 11 | Injunctive Relief | **PASS** | Explicitly available without bond and without showing irreparable harm (§10.1) — exceeds LoadCrest standard |
| 12 | Residuals Clause | **PASS** | No residuals clause present |
| 13 | Agreement Term | **PASS** | 2 years from last execution (§8.2) |
| 14 | Survival of Confidentiality Obligations | **PASS** | Survives termination; 5-year period from disclosure (§8.1) — exceeds LoadCrest standard |
| 15 | Governing Law | **FLAG** | Tennessee (Tritium's address per §14.1) — not Delaware |
| 16 | Jurisdiction and Venue | **FLAG** | Non-exclusive jurisdiction, Tennessee courts — not New Mexico; non-exclusive means LoadCrest could be pulled into Tennessee litigation |
| 17 | Confidentiality of Agreement Existence | **FLAG** | No clause restricting announcement of relationship or agreement terms |
| 18 | Indemnification | **FLAG** | No indemnification clause; no attorneys' fees provision |
| 19 | Standard Exclusions (Carve-Outs) | **PASS** | All five present (§5.1a–e); minor note: (a) requires 21-day notification window |
| 20 | No Partnership / Agency | **FLAG** | No relationship disclaimer clause |
| 21 | Arbitration / Dispute Resolution | **PASS** | Court-based; no arbitration clause |

---

## Issues Requiring Attention

### REJECT Items

*None.*

---

### FLAG Items

#### FLAG 1 — Non-Circumvention (Criterion 2) ⚠️
**Clause:** Absent — no equivalent clause exists in this agreement.

**Why it flags:** LoadCrest's standard NDA includes explicit non-circumvention language preventing either party from using CI to circumvent the other's business affairs or from urging third parties to pursue transactions contemplated by the other. This protects LoadCrest's introduced deal flow and relationships (Dyna Power, IONATE, VEIR, neocloud pipeline). Its absence is a meaningful gap if Tritium is introduced to LoadCrest's partners or customers.

**Redline — add as new clause:**
> *"Non-Circumvention. Each Party agrees not to use Confidential Information to circumvent the business affairs of the other, nor urge affiliates or other third parties to pursue any transactions currently being contemplated by, or in process through, companies owned, operated, managed, or directly controlled by the other. Both Parties agree not to independently pursue recommendations or transactions proposed by the other without prior written consent, nor engage or urge affiliates or other third parties to pursue such transactions without prior written consent."*

---

#### FLAG 2 — Project Scope (Criterion 3) ⚠️ CRITICAL
**Clause §1 (definitions):**
> *"Project means the marketing, sales, distribution, capabilities and pricing of Tritium products, including electric vehicle chargers and their implementation into an electric vehicle infrastructure network."*

**Clause §2.1:**
> *"The Recipient must use the Confidential Information only in connection with the Project."*

**Why it flags:** This NDA was drafted for Tritium's EV charger supply engagements. If LoadCrest intends to share Sentinel algorithm details, 800VDC architecture, or other core IP under this agreement, that information would technically be CI under the broad definition — but its use would be restricted to "marketing, sales, distribution, capabilities and pricing of Tritium products." This creates ambiguity and possible unenforceability for LoadCrest's disclosures. **This must be redefined before execution.**

**Redline — replace Project definition:**
> *"Project means the mutual evaluation, discussion, and exploration of potential commercial and technical collaboration between the parties, including LoadCrest's power delivery and energy management solutions for AI data center infrastructure and Tritium's power electronics and conversion products."*

*(Adjust to reflect actual business purpose of the engagement.)*

---

#### FLAG 3 — Third-Party / Contractor Disclosure & Employee Access Control (Criteria 6 & 7)
**Clause §1 (definitions):**
> *"Representative means a director, officer, or employee."*

**Clause §3.1:**
> *"The Recipient may only disclose Confidential Information to a Representative of the Recipient or a Representative of an Affiliate..."*

**Why it flags:** "Representative" expressly excludes contractors, consultants, and agents. LoadCrest works with external engineering partners and advisors (e.g., Sandia National Labs collaborators, hardware integration contractors). Disclosure to these parties would technically be prohibited or require separate written consent. Also, Affiliate Representatives can receive CI without the disclosing party's written approval — only need-to-know and bound-by-confidentiality are required.

**Redline — expand Representative definition:**
> *"Representative means a director, officer, employee, contractor, consultant, or agent of the relevant party who is bound by confidentiality obligations at least equivalent to those in this Agreement."*

---

#### FLAG 4 — Governing Law (Criterion 15)
**Clause §14.1:**
> *"This Agreement shall be subject to the laws in force at the address of Tritium as set out in this Agreement."*

**Why it flags:** Tritium's address is Lebanon, Tennessee — so governing law is Tennessee, not Delaware (LoadCrest's incorporation state). Tennessee law is U.S. law and broadly favorable for IP enforcement, but this deviates from LoadCrest's standard and means Delaware corporate law doesn't govern.

**Redline:**
> *"This Agreement shall be governed by and construed in accordance with the internal laws of the State of Delaware, without giving effect to any choice or conflict of law provision."*

---

#### FLAG 5 — Jurisdiction and Venue (Criterion 16)
**Clause §14.1:**
> *"The parties agree to submit themselves to the non-exclusive jurisdiction of the courts in that place."*

**Why it flags:** Non-exclusive jurisdiction in Tennessee. "Non-exclusive" cuts both ways — LoadCrest is not locked into Tennessee courts and could sue elsewhere, but could also be forced to defend in Tennessee. LoadCrest's standard is exclusive jurisdiction in Bernalillo County, New Mexico.

**Redline:**
> *"The parties hereby agree that any suit, action, or proceeding arising out of or relating to this Agreement shall be instituted exclusively in the federal or state courts of Bernalillo County, State of New Mexico, and each party irrevocably submits to the exclusive jurisdiction of such courts."*

*(Note: If Tritium resists New Mexico, Delaware or neutral federal jurisdiction are acceptable fallbacks.)*

---

#### FLAG 6 — Confidentiality of Agreement Existence (Criterion 17)
**Clause:** Absent.

**Why it flags:** No restriction on either party publicly announcing or disclosing the existence or terms of the agreement. Given LoadCrest's competitive positioning and stealth around the Sentinel algorithm and neocloud partnerships, public disclosure of a supply relationship with Tritium could expose strategic direction.

**Redline — add as new clause:**
> *"Neither Party will, without prior written approval of the other Party, make any public announcement of or otherwise disclose the existence or the terms of this Agreement."*

---

#### FLAG 7 — Indemnification (Criterion 18)
**Clause:** Absent. Clause 13.3 contains a no-liability disclaimer for the Discloser's CI quality, but no indemnification for breach by the Recipient.

**Why it flags:** No obligation for the breaching party to cover the disclosing party's legal costs, losses, or damages from a breach. Injunctive relief is available (§10.1), but recovery of attorneys' fees and damages relies on general remedies "at law or in equity" without an explicit indemnification clause.

**Redline — add as new clause:**
> *"The Recipient agrees to indemnify, defend, and hold harmless the Disclosing Party, its affiliates, directors, officers, employees, and agents from and against any liabilities, losses, damages, costs, or expenses (including reasonable attorneys' fees) incurred by the Disclosing Party arising out of or in connection with the Recipient's breach of any term or condition of this Agreement."*

---

#### FLAG 8 — No Partnership / Agency Disclaimer (Criterion 20)
**Clause:** Absent.

**Why it flags:** Minor but standard omission. Without a relationship disclaimer, a court could theoretically infer an agency or joint venture relationship from the conduct of the parties during the engagement.

**Redline — add as new clause:**
> *"Nothing in this Agreement shall be construed to constitute an agency, partnership, joint venture, or other similar relationship between the Parties."*

---

## Non-Standard Clauses

**§2.2(b) — No Reverse Engineering:**
> *"The Recipient must not... perform or allow any analysing, reverse engineering, or decompiling of the Confidential Information provided to, or obtained by, the Recipient, other than as permitted by the Discloser in writing."*
This is stronger than LoadCrest's standard template and **favorable to LoadCrest** — explicitly prohibits reverse engineering of CI, directly protecting Sentinel algorithm details if shared.

**§3.2 — Joint and Several Liability for Representatives/Affiliates:**
> *"Any act or omission of any Representative of the Recipient or their Affiliates... shall be considered an act or omission of the Recipient and the Recipient shall be jointly and severally liable..."*
Favorable to LoadCrest as the disclosing party. Tritium is directly on the hook for any breach by its people or affiliates.

**§8.1 — 5-Year Confidentiality Period:**
Confidentiality obligations run 5 years from date of disclosure (vs. LoadCrest's standard of survival without a defined post-termination period). This is better than LoadCrest's standard. Backup CI under §9.4 carries perpetual obligations.

**§9.4 — Backup System Carve-Out:**
> *"Any part of the Confidential Information that has been retained in the Recipient's automatic backup systems may remain there so long as that Confidential Information is not accessed by the Recipient and the obligations of confidentiality in respect of those parts of the Confidential Information apply indefinitely."*
Practical and reasonable; perpetual confidentiality on backup copies is favorable.

**§11 — No Waiver:**
Explicit no-waiver clause; waivers must be in writing and signed by the Discloser. Favorable boilerplate.

**§12 — No Assignment:**
Agreement cannot be assigned by either party. This protects LoadCrest from Tritium's obligations being transferred to a third party through a sale or restructuring.

**§13.3 — No-Liability Disclaimer:**
> *"In no event shall the Discloser be liable to the Recipient for damages... arising out of the Recipient's use of the Confidential Information."*
Standard no-warranty clause on CI quality. Does not limit Recipient's liability for breach.

**Counterparty Name Blank:**
The agreement's header identifies Tritium but leaves the counterparty name and address blank. LoadCrest's details must be filled in before execution.

---

## Recommended Redlines Summary

| # | Issue | Current Language | Suggested Redline |
|---|---|---|---|
| 1 | Non-circumvention absent | No clause | Add non-circumvention clause (see FLAG 1) |
| 2 | Project scope too narrow | "marketing, sales, distribution... of Tritium EV charger products" | Redefine to reflect actual engagement purpose (see FLAG 2) |
| 3 | Representative excludes contractors | "director, officer, or employee" | Add "contractor, consultant, or agent" bound by equivalent confidentiality |
| 4 | Governing law — Tennessee | "laws in force at the address of Tritium" | Delaware internal laws |
| 5 | Non-exclusive Tennessee venue | "non-exclusive jurisdiction of the courts in that place" | Exclusive jurisdiction, Bernalillo County, New Mexico |
| 6 | No agreement confidentiality | Absent | Add no-announcement clause |
| 7 | No indemnification | Absent | Add breach indemnification with attorneys' fees |
| 8 | No partnership disclaimer | Absent | Add no-agency/partnership/JV disclaimer |

---

> **AI-assisted review — not legal advice. Human sign-off required before execution.**
>
> - [ ] Reviewed by: _______________
> - [ ] Approved to sign as-is / with redlines noted above
> - [ ] Date: _______________
