---
id: F-001
title: "SentinelT — Sub-250ms Power Control Algorithm"
status: draft
serves: [P-001]
delivers: [VP-001, VP-002]
implemented-by: []
surfaced-in: []
constrained-by: [ADR-100, ADR-101]
---

# F-001: SentinelT — Sub-250ms Power Control Algorithm

## Description

SentinelT is LoadCrest's proprietary embedded software — the core IP and primary competitive differentiator. It implements a sub-250ms real-time power control algorithm that manages energy distribution decisions across the 800VDC bus, with microsecond and millisecond-level telemetry feeding continuous decision loops. SentinelT is what transforms a COTS hardware platform into a purpose-built AI factory power system — no equivalent exists in commercially available power electronics.

## Capabilities

- **Sub-250ms control loop** — energy distribution decisions execute in under 250 milliseconds, absorbing the violent step-loads of AI/GPU workloads that swing 30–100% in milliseconds
- **Microsecond/millisecond telemetry** — continuous monitoring of the 800VDC bus at sub-millisecond resolution, providing the data fidelity required for real-time control and downstream ML applications
- **Active bus stabilization** — maintains 800VDC bus voltage within tight tolerance (±1% target) under dynamic AI workload conditions, eliminating the need for passive buffering hardware
- **Grid-buffer function** — smooths and shapes the load profile presented to the utility grid, absorbing GPU-induced voltage sags and harmonic distortion before they reach the point of common coupling
- **Protection coordination** — manages fault current limiting (FCL) and arc-flash risk at the 800VDC bus; active arc mitigation for the no-zero-crossing DC fault environment
- **Stability control at grid–compute interface** — coordinates power flow between grid, generation (solar, gas), storage (BESS), and compute loads in grid-tied and islanded modes
- **Operational data collection** — microsecond/millisecond telemetry stream is the foundation for the Horizon 2 digital twin, ML-based optimization, and the long-term data moat

## Technical Notes

SentinelT runs on COTS embedded compute in Horizon 1, constrained by the performance envelope of the commercial platform. The sub-250ms decision loop is the validated target for the Q3 2026 milestone. As LoadCrest transitions to the Horizon 3 custom hardware platform, SentinelT will be co-optimized with purpose-built silicon to achieve significantly improved dynamic controllability and response speed with a dramatically reduced footprint.

The algorithm has been validated in real-world deployments prior to LoadCrest's founding:
- **FOAK 800VDC deployment** with U.S. Air Force + Sandia National Labs — integrated grid, solar, gas generation, BESS, military and C&I loads, cybersecurity testing
- **Regulated utility deployment** — investor-owned utility, integrated grid, gas gen, battery storage, solar; survived Hurricane Ian

SentinelT is a **trade secret** — the core algorithmic IP is not patented (to avoid disclosure) and is protected as a trade secret. The Q4 roadmap item "firmware design lock-in with key vendors" further strengthens the defensibility moat.

Per [ADR-100](../adrs/ADR-100-800vdc-distribution-standard.md), all SentinelT tuning and validation targets 800VDC distribution. Per [ADR-101](../adrs/ADR-101-cots-first-hardware-strategy.md), the algorithm must be fully characterized from H1 field data before H3 custom hardware development begins.

## Development Milestones

| Milestone | Date | Status |
|---|---|---|
| Digital twin validation | Q4 2025 | Complete |
| HIL (Hardware-in-Loop) testing | Q2 2026 | In progress |
| Sub-250ms control logic integration | Q3 2026 | Planned |
| Commercial pilot deployment (1.2MW) | Q4 2026 | Planned |

## Defensibility

SentinelT sits at the center of LoadCrest's technology moat:
- **Trade secret** — algorithmic IP protected by trade secret, not patent
- **Data moat** — microsecond/millisecond telemetry from field deployments creates a proprietary dataset for ML-based optimization unavailable to competitors
- **Firmware lock-in** — Q4 2026 roadmap item: firmware design lock-in with key hardware vendors
- **Validation heritage** — Sandia/USAF deployment history provides proof that no paper-product competitor can match

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [P-001](../1-personas/P-001-neocloud-ai-factory-developer.md) | Neocloud / AI Factory Developer | Primary beneficiary — SentinelT solves their microsecond step-load problem |
| [VP-001](../2-value-props/VP-001-capex-reduction-on-buffering-infrastructure.md) | CapEx Reduction on Buffering Infrastructure | SentinelT's active stabilization eliminates the passive buffering hardware |
| [VP-002](../2-value-props/VP-002-accelerated-grid-interconnection.md) | Accelerated Grid Interconnection | SentinelT's load-smoothing produces a clean, utility-compliant grid interface |
| [ADR-100](../adrs/ADR-100-800vdc-distribution-standard.md) | 800VDC Distribution Standard | SentinelT is tuned and validated for 800VDC |
| [ADR-101](../adrs/ADR-101-cots-first-hardware-strategy.md) | Three-Horizon Product Evolution | SentinelT runs on COTS in H1; co-optimized with custom hardware in H3 |

## Source References

- *LoadCrest Teaser Deck* — Executive Summary, Solution, Defensibility slides
- *LoadCrest NM EDD Submission* — Solution slide
- *Technical Roadmap Horizons* — Horizon 1 core capability
