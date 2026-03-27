# LoadCrest NDA Evaluation Criteria

> Derived from: `Loadcrest NDA_NonCircumvent_Template for PandaDoc.pdf` (LoadCrest standard template)
> Purpose: Evaluate incoming 3rd-party NDAs against LoadCrest's baseline requirements.
> Last updated: 2026-03-26

---

## How to Use

When evaluating an incoming NDA, assess each criterion below and assign one of three statuses:

| Status | Meaning |
|---|---|
| **PASS** | Meets or exceeds LoadCrest's standard |
| **FLAG** | Deviates from standard — requires human review before signing |
| **REJECT** | Unacceptable — do not sign without material revision |

Produce output using `NDA-REVIEW-TEMPLATE.md`.

---

## Criteria

### 1. Mutuality
- **Standard:** Agreement is **mutual** — obligations bind both parties equally.
- **PASS:** Mutual NDA.
- **FLAG:** One-way NDA favoring the other party; or asymmetric obligations in confidentiality, return/destruction, or indemnification.
- **REJECT:** One-way NDA where LoadCrest bears all obligations with no reciprocal protection.

---

### 2. Non-Circumvention
- **Standard:** LoadCrest's template includes an explicit non-circumvention clause (Clause 4): neither party may use confidential information to circumvent the other's business affairs, nor urge third parties to pursue transactions contemplated by the other, without prior written consent.
- **PASS:** Equivalent non-circumvention language present.
- **FLAG:** Non-circumvention absent or materially weaker (e.g., no prohibition on urging third parties).
- **REJECT:** Agreement explicitly excludes or overrides non-circumvention protections.

> **Why this matters:** LoadCrest is actively developing partnership transactions (Dyna Power, IONATE, VEIR, neocloud pilots). Non-circumvention protects introduced deal flow and relationships.

---

### 3. Scope of Confidential Information
- **Standard:** Broad definition covering: business plans, methods, practices; personnel, customers, suppliers; inventions, processes, methods, products, patent applications, proprietary rights; specifications, drawings, sketches, models, samples, tools, computer programs, technical information.
- **PASS:** Definition is comparably broad or broader.
- **FLAG:** Narrow definition that might exclude Sentinel algorithm code, 800VDC architecture specs, or customer/pipeline information.
- **REJECT:** Definition limited to a specific narrow category that would exclude LoadCrest's core IP.

---

### 4. Marking / Identification Requirement
- **Standard:** Confidential information must be identified — either by marking (written materials) OR by oral/written notification at the time of disclosure (oral or unmarked materials).
- **PASS:** Same or similar requirement; oral notification is sufficient.
- **FLAG:** Requires written follow-up confirmation within a time period (e.g., 30 days) for orally disclosed information — note the deadline and operational burden.
- **REJECT:** Requires all confidential information to be marked in writing at time of disclosure with no provision for oral/verbal designation.

---

### 5. Standard of Care
- **Standard:** "Same care and diligence as own proprietary information, but in no case less than reasonable care."
- **PASS:** Equivalent or higher standard.
- **FLAG:** "Reasonable care" only, without the "same as own" baseline.
- **REJECT:** Standard lower than reasonable care; or no affirmative duty to protect.

---

### 6. Third-Party / Contractor Disclosure
- **Standard:** No disclosure to contractors or third parties without prior **written** approval from the disclosing party.
- **PASS:** Written approval required.
- **FLAG:** Approval required but not specified as written; or blanket carve-out for affiliates/subsidiaries without restrictions.
- **REJECT:** No restriction on third-party disclosure; or broad affiliate disclosure rights with no confidentiality obligations on affiliates.

---

### 7. Employee / Agent Access Control
- **Standard:** Recipient must inform all employees, officers, directors, and agents with access of the confidential nature of the information and require them to abide by the agreement.
- **PASS:** Equivalent requirement present.
- **FLAG:** Requirement present but limited to employees only (excluding officers, directors, or agents/contractors).
- **REJECT:** No requirement to bind internal personnel.

---

### 8. Breach Notification
- **Standard:** Recipient must **promptly notify** the disclosing party of any unauthorized disclosure or any subpoena/legal process requiring disclosure.
- **PASS:** Prompt notification required for both breach and legal process.
- **FLAG:** Notification required but only for one scenario (breach or legal process, not both); or "reasonable time" instead of "prompt."
- **REJECT:** No notification obligation.

---

### 9. IP Ownership — No Rights Granted
- **Standard:** All confidential information remains property of the disclosing party. Nothing in the agreement grants or confers any rights (including IP rights or licenses) on the recipient.
- **PASS:** Explicit "no rights granted" language present.
- **FLAG:** Silence on IP rights — no explicit grant, but also no explicit exclusion. Note for counsel.
- **REJECT:** Any implied or explicit license grant; any assignment of IP; any "feedback ownership" clause where recipient acquires rights to improvements or derivatives.

> **Why this matters:** Sentinel algorithm and 800VDC architecture must never be subject to a compelled license.

---

### 10. Return / Destruction of Materials
- **Standard:** Recipient shall promptly return or destroy all copies and related notes upon request from the disclosing party.
- **PASS:** Return or destruction on request; covers copies and notes.
- **FLAG:** Return/destruction only upon termination (not on-demand); or excludes notes/derivatives.
- **REJECT:** No return or destruction obligation; or recipient retains right to keep copies.

---

### 11. Injunctive Relief
- **Standard:** Disclosing party may obtain injunctive relief against threatened or continuing breach; irreparable harm is acknowledged; actual and exemplary damages available.
- **PASS:** Injunctive relief explicitly available; irreparable harm acknowledged.
- **FLAG:** Injunctive relief available but requires posting bond; or no acknowledgment of irreparable harm.
- **REJECT:** Agreement requires all disputes through arbitration only, precluding injunctive relief; or explicitly limits remedies to monetary damages.

---

### 12. Residuals Clause
- **Standard:** LoadCrest's template contains **no residuals clause**. A residuals clause allows the recipient to use, in unaided memory, any information retained after reviewing confidential materials — effectively gutting the NDA for any technically sophisticated recipient.
- **PASS:** No residuals clause present.
- **FLAG:** Residuals clause present — surface for human decision; may be acceptable depending on counterparty (e.g., large tech companies often insist on residuals).
- **REJECT:** Broad residuals clause with no carve-out for trade secrets or specific technical IP.

> **Why this matters:** A residuals clause would allow a counterparty's engineers to "remember" and use Sentinel algorithm details after reviewing materials — this is existential IP risk.

---

### 13. Agreement Term
- **Standard:** 2 years from Effective Date.
- **PASS:** 2 years or longer.
- **FLAG:** Less than 2 years (e.g., 1 year).
- **REJECT:** No term stated; or term less than 1 year.

---

### 14. Survival of Confidentiality Obligations
- **Standard:** Obligation to protect confidential information **survives termination** of the agreement.
- **PASS:** Explicit survival clause; or "obligations survive for [N] years after termination."
- **FLAG:** Survival not explicitly addressed — ambiguous whether obligations persist post-termination.
- **REJECT:** Obligations explicitly expire at termination with no survival.

---

### 15. Governing Law
- **Standard:** Delaware (consistent with LoadCrest's incorporation state).
- **PASS:** Delaware.
- **FLAG:** Another U.S. state — note which state; assess implications.
- **REJECT:** Foreign jurisdiction (outside U.S.); or jurisdiction known to be unfavorable for IP enforcement.

---

### 16. Jurisdiction and Venue
- **Standard:** Bernalillo County, New Mexico (federal or state courts).
- **PASS:** New Mexico courts.
- **FLAG:** Other U.S. venue — note location and practical burden.
- **REJECT:** Foreign venue; or mandatory arbitration that displaces court access entirely.

---

### 17. Confidentiality of Agreement Existence
- **Standard:** Neither party may publicly announce or disclose the existence or terms of the agreement without prior approval from the other party (Clause 8).
- **PASS:** Equivalent non-disclosure of agreement terms.
- **FLAG:** Absent — no restriction on announcing the relationship.
- **REJECT:** Agreement requires LoadCrest to permit the counterparty to announce the relationship publicly.

---

### 18. Indemnification
- **Standard:** Recipient indemnifies disclosing party for breach, including attorneys' fees, liabilities, losses, damages, costs, and expenses.
- **PASS:** Equivalent indemnification including attorneys' fees.
- **FLAG:** Indemnification present but excludes attorneys' fees; or mutual indemnification only.
- **REJECT:** No indemnification for breach; or indemnification capped at a nominal amount.

---

### 19. Standard Exclusions (Carve-Outs)
- **Standard (all five must be present):**
  - (a) Already known to recipient from a third party without confidentiality obligation
  - (b) Publicly known through no wrongful act of recipient
  - (c) Independently developed without reference to confidential information
  - (d) Approved for release by disclosing party
  - (e) Legally required disclosure (subpoena / court order)
- **PASS:** All five exclusions present in substantially equivalent form.
- **FLAG:** One or more exclusions absent or narrowed; or exclusion (e) lacks a notification requirement before disclosure.
- **REJECT:** Exclusions substantially broader than standard (e.g., "recipient's awareness of similar information" used as a carve-out).

---

### 20. No Partnership / Agency
- **Standard:** Agreement does not create agency, partnership, joint venture, or similar relationship (Clause 7).
- **PASS:** Explicit disclaimer present.
- **FLAG:** Absent — no relationship disclaimer.
- **REJECT:** Language that could be construed as creating a joint venture or agency relationship.

---

### 21. Arbitration / Dispute Resolution
- **Standard:** LoadCrest's template uses court jurisdiction (Bernalillo County, NM), **not arbitration**.
- **PASS:** Court-based dispute resolution consistent with NM jurisdiction.
- **FLAG:** Arbitration clause present — note whether it allows emergency injunctive relief before arbitration.
- **REJECT:** Mandatory binding arbitration that precludes court access for injunctive relief.

---

## Quick Disqualifiers (Auto-REJECT)

Flag any NDA for immediate rejection without full review if it contains:

- A **residuals clause** with no trade secret carve-out
- Any **IP license or assignment** triggered by disclosure
- **Foreign jurisdiction** (outside U.S.)
- **No survival** of confidentiality obligations post-termination
- **No injunctive relief** (arbitration-only remedies)
- One-way obligations where **only LoadCrest** bears confidentiality duties
