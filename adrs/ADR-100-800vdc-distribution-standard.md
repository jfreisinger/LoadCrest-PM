---
id: ADR-100
title: "800VDC as Primary Power Distribution Standard"
status: proposed
date: 2026-03-24
constrains: []
supersedes: null
---

# ADR-100: 800VDC as Primary Power Distribution Standard

## Context

AI/GPU compute infrastructure has fundamentally changed data center power density requirements. Modern AI accelerator racks routinely draw 50–200kW per rack today, with roadmap trajectories approaching **1MW per rack** under the OCP Diablo/Mount Diablo specification. GPU workloads are uniquely volatile — loads swing from **30% to 100% in milliseconds** — creating transient power demands that legacy power architectures cannot absorb without oversizing or brownout risk.

Traditional AC data center architecture exacerbates this problem: **>30% power loss** occurs through transmission, conversion, and heat loss in a conventional AC-to-rack power chain. A 100MW AI data center currently requires **~$50M in filtering and stabilizing power electronics** just to deliver clean power to the racks — because retrofitted EV-grade DC components cannot handle the violent, microsecond step-loads of AI workloads, forcing developers to build expensive, customized "Frankenstein" systems. This is not sustainable or scalable.

The **OCP Diablo specification** (Open Compute Project) formalizes 800VDC as the industry standard for next-generation AI data center power distribution. It introduces a Disaggregated Power Architecture — moving rectifiers and UPS functions out of the IT rack into dedicated "Sidecar" or "Power Rack" configurations — and drives direct AC-to-800VDC conversion at the facility entrance via Solid State Transformers (SSTs). This is not an emerging experiment; it is an active, hyperscaler-backed open standard that is reshaping procurement, construction, and O&M workflows across the industry.

Traditional 480VAC distribution was designed for a world of 5–20kW racks. It cannot efficiently serve AI-density deployments, nor can it absorb millisecond-scale load transients without significant infrastructure oversizing.

LoadCrest must choose a primary distribution voltage standard that:
- Efficiently delivers high-density power to AI compute racks at 1MW-trajectory densities
- Minimizes conduction losses at scale
- Aligns with the sub-second performance envelope of the LoadCrest control algorithm
- Supports the COTS→custom hardware evolution roadmap
- Positions LoadCrest competitively against legacy AC-centric incumbents
- Presents a stable, predictable load profile to the utility grid

The power distribution landscape offers three viable architectures: legacy 480VAC, 380VDC (the first-generation DC data center standard), and 800VDC (now formalized by the OCP Diablo spec).

## Decision

LoadCrest adopts **800VDC as the primary power distribution standard** for all current and future products.

All hardware designs, algorithm tuning parameters, interface specifications, and customer deployment architectures shall target 800VDC distribution. Where backward compatibility with 480VAC or 380VDC is required (e.g., legacy site integration), it shall be handled via dedicated conversion modules — not by relaxing the 800VDC-first design principle.

## Consequences

### Positive
- Reduced conduction losses vs. 480VAC — at equivalent power, higher voltage means lower current, yielding I²R losses roughly 70–75% lower than 480VAC
- **45% reduction in copper cabling** weight and volume vs. lower-voltage DC at equivalent power ratings — significant material cost reduction at hyperscale
- Fewer conversion stages between utility input and GPU load — eliminating AC-to-DC conversion stages projects up to **70% reduction in O&M costs** vs. multi-stage AC architectures
- Natural alignment with battery/storage systems (CESS — Capacitive Energy Storage Systems) operating in the 700–900V range — enables direct DC coupling without intermediate conversion
- Voltage headroom supports 1MW-trajectory rack densities without architecture changes — future-proof against the OCP Diablo density roadmap
- Competitive differentiation: 800VDC expertise is rare; most incumbents (Eaton, Schneider, Vertiv) are defending large AC install bases
- Leverages the **EV supply chain** (800VDC is standard for high-end EV charging) — economies of scale for connectors, bus components, and switching hardware
- The LoadCrest control algorithm, operating at sub-second intervals, can present a **smooth, predictable load profile to the utility grid** — buffering GPU-induced voltage sags and harmonic distortion that would otherwise trigger utility interconnection denial or extended System Impact Studies

### Negative
- Smaller installer and integrator ecosystem vs. 480VAC — customer education and partner certification required
- Regulatory landscape still maturing (NEC Article 480/490, IEC 60364-8-1, UL 857) — compliance burden is higher than for established AC standards
- Higher insulation and safety requirements for 800VDC vs. 380VDC — component costs are elevated for COTS generation
- Customer facilities may require Solid State Transformer (SST) upgrades and switchgear replacement to accept 800VDC distribution — increases deal complexity and sales cycle length
- **Arc-flash hazard is significantly elevated**: unlike AC, DC has no zero-crossing, meaning DC arcs do not self-extinguish and are substantially harder to interrupt — requires specialized arc-flash protection design, qualified HVDC personnel, and commissioning protocols beyond standard AC practice
- **Grid interconnection risk**: utilities may deny interconnection or require 2-year System Impact Studies when faced with large, volatile DC loads (e.g., 500MW GPU clusters) due to harmonic distortion and load flicker concerns — customer sites must address this during grid strategy phase
- Safety training requirements for on-site personnel (construction, commissioning, O&M) are more demanding than AC equivalents; HVDC certification is not yet widely available

## Alternatives Considered

| Alternative | Reason Not Chosen |
|---|---|
| **480VAC** | Inadequate for AI rack densities; high conduction losses; dominant incumbent position with no cost-of-switch advantage for LoadCrest; not aligned with OCP Diablo trajectory |
| **380VDC** | Insufficient voltage headroom for 1MW-trajectory racks; less efficient than 800VDC at target densities; early-mover advantage has already been captured by others; not the OCP Diablo target voltage |
| **Dual-voltage (380VDC + 800VDC)** | Doubles hardware SKU complexity and algorithm tuning surface area; undermines the HW/SW co-design advantage |

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [ADR-101](ADR-101-cots-first-hardware-strategy.md) | COTS-First Hardware Strategy | Sister decision — hardware selection constrained by 800VDC requirement |

## Source References

- OCP Diablo / Mount Diablo Specification — Open Compute Project
- *OCP Diablo 800VDC Impact on Data Centers* — LoadCrest Sales Tools
- *800VDC Microgrid Stabilization Value Proposition* — LoadCrest Sales Tools
