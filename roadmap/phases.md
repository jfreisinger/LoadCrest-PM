# Roadmap Phases

> **Framework:** LoadCrest uses a three-horizon model. Horizons are not strictly time-boxed — they are capability stages with defined entry criteria. See [ADR-101](../adrs/ADR-101-cots-first-hardware-strategy.md) for the full strategic rationale.
>
> **Long-term vision:** LoadCrest evolves from a modular stabilization solution into the standardized control and hardware platform enabling global AI infrastructure deployment.
>
> `Grid compatibility → Intelligent orchestration → Fully integrated infrastructure systems`

---

## Horizon 1 — Grid-Compatible AI Infrastructure
**Timeframe:** Today → Near Term
**Status:** Active

**Goal:** Deliver a turnkey, pre-manufactured hardware platform enabling stable 800VDC microgrids for AI data centers — providing integrated stability control and protection coordination at the grid–compute interface.

**Form factor:** Containerized / skid-mounted Power Pod deployments using proven commercial power platforms.

### Delivered Outcomes
- [ ] Accelerated interconnection timelines and reduced deployment risk
- [ ] Lower stabilization infrastructure requirements (CapEx reduction for customers)
- [ ] Reduced equipment count and higher electrical efficiency (OpEx savings)
- [ ] Improved power quality and resilience for AI workloads
- [ ] Modular, rapidly deployable system

### Key Milestones
| Date | Milestone | Status |
|------|-----------|--------|
| Q2 2025 | LoadCrest founded — grounded in Sandia National Labs 800VDC research | ✅ Complete |
| Q4 2025 | Digital twin completed with promising results | ✅ Complete |
| Q2 2026 | HIL (Hardware-in-Loop) testing | 🔄 In Progress |
| Q3 2026 | Sub-250ms Sentinel control logic integration | ⏳ Planned |
| Q4 2026 | Commercial pilot — 1.2MW neocloud provider PoC | ⏳ Planned |
| Q4 2026 | $4.8M seed round close | ⏳ Planned |

### Key Artifacts
- ADR-100: 800VDC as Primary Power Distribution Standard
- ADR-101: Three-Horizon Product Evolution Strategy
- F-001: Sentinel — Sub-250ms Control Algorithm
- P-001: Neocloud / AI Factory Developer

---

## Horizon 2 — Intelligent Energy Orchestration Layer
**Timeframe:** Near Term → Mid Term
**Status:** Planned

**Goal:** Expand from stabilization infrastructure to an energy orchestration and intelligence platform — adding supervisory optimization and intelligent operational management across distributed energy assets.

**Entry criteria:** H1 hardware deployed at sufficient customer sites to generate meaningful operational data; H2 software team staffed.

### Key Additions
- [ ] Economic dispatch optimization across generation, storage, and grid resources
- [ ] Virtual Power Plant (VPP) participation and grid service integration
- [ ] Operational digital twin for predictive performance management
- [ ] AI agents integrated into the digital twin (modeled vs. real-time performance)
- [ ] Automated baseline creation, anomaly detection, and operator alerting
- [ ] Cross-site operational intelligence and fleet-level coordination

**Strategic impact:** Transitions LoadCrest from stabilization infrastructure to an energy orchestration and intelligence platform.

---

## Horizon 3 — Integrated AI Energy Hardware Platform
**Timeframe:** Mid Term → Long Term
**Status:** Roadmap

**Goal:** Deliver a purpose-built hardware platform embedding advanced LoadCrest control intelligence — achieving full vertical integration of orchestration, stabilization, and predictive control with dramatically reduced footprint and cost.

**Entry criteria:** One or more H3 migration triggers met per ADR-101; algorithm fully characterized from H1/H2 field data; H2 digital twin operational.

### Key Characteristics
- [ ] ~⅓ footprint relative to current H1 containerized deployments
- [ ] Significantly improved dynamic controllability and response speed
- [ ] Meaningful reductions in manufacturing cost and total installed system cost
- [ ] More predictable and strategically controlled supply chain
- [ ] Native integration of orchestration, stabilization, and predictive control layers

**Strategic impact:** Positions LoadCrest as a vertically integrated infrastructure provider for AI-scale energy systems.

---

## Source References
- *Technical Roadmap Horizons* — LoadCrest internal product roadmap
