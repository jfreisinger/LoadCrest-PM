---
id: ADR-101
title: "Three-Horizon Product Evolution: COTS Foundation to Vertically Integrated Platform"
status: proposed
date: 2026-03-24
constrains: []
supersedes: null
---

# ADR-101: Three-Horizon Product Evolution: COTS Foundation to Vertically Integrated Platform

## Context

LoadCrest's primary competitive advantage is its **control algorithm** — the sub-second power decision engine that manages 800VDC distribution for AI workload densities. The hardware that runs that algorithm is, initially, a means to an end. However, hardware and software are not independent: algorithm performance is ultimately bounded by the platform it executes on, and the intelligence layer is bounded by the data and connectivity it has access to.

LoadCrest's long-term product vision is to evolve from a modular stabilization solution into **the standardized control and hardware platform enabling global AI infrastructure deployment**. Achieving that vision requires a deliberate, sequenced approach — not a single leap from COTS hardware to custom silicon.

Three competing forces shape the evolution strategy:

**Force 1 — Speed and capital efficiency (now)**: Getting to market with a working, deployable product requires avoiding the multi-year timelines and capital intensity of custom hardware. Proven commercial power platforms can deliver a functional 800VDC product faster and at lower initial cost. The **EaaS (Energy-as-a-Service) business model** ($20k/MW/year) means the H1 containerized platform generates recurring revenue while H2 and H3 capabilities are developed — hardware is the entry point, not the endpoint.

**Force 2 — Intelligence expansion (near-term)**: Hardware alone is not a defensible moat. The algorithm must grow from real-time stabilization into a broader energy orchestration and optimization capability — virtual power plant participation, digital twin, fleet-level intelligence — before custom hardware investment is warranted.

**Force 3 — Hardware integration (long-term)**: COTS hardware permanently caps the algorithm's performance ceiling. A purpose-built platform, co-designed with the algorithm, is required to achieve the dynamic controllability, footprint reduction, and supply chain control that positions LoadCrest as a vertically integrated infrastructure provider.

A COTS-only strategy cedes long-term differentiation. A custom-hardware-first strategy burns capital before product-market fit. Skipping the intelligence layer means entering the custom hardware phase without the data and orchestration capability that justifies the platform premium.

## Decision

LoadCrest adopts a **three-horizon product evolution strategy**, progressing from grid-compatible stabilization infrastructure through intelligent energy orchestration to a fully integrated, purpose-built AI energy hardware platform.

---

### Horizon 1 — Grid-Compatible AI Infrastructure *(Today → Near Term)*

**Core capability:** Turnkey, pre-manufactured hardware platform enabling stable 800VDC microgrids for AI data centers, delivering integrated stability control and protection coordination at the grid–compute interface.

Current generation hardware uses **proven commercial power platforms** — power electronics, bus components, connectors, and embedded compute — sourced from the EV and industrial power electronics supply chains. Hardware selection criteria:
- Availability at 800VDC ratings
- Compatibility with algorithm I/O and timing requirements
- Safety certification pedigree (UL, IEC)
- Supplier stability and supply chain resilience

Deployments are **containerized** (20ft container, up to 4MW per unit, ~$500k/MW CapEx). The **Sentinel** algorithm runs on COTS embedded compute targeting a **sub-250ms control loop** — the validated performance specification for H1. Hardware is a validated, deployable platform — not yet a source of differentiation.

**H1 Key Milestones:**
- Q2 2026: HIL (Hardware-in-Loop) testing on COTS platform
- Q3 2026: Sub-250ms Sentinel control logic integration validated
- Q4 2026: Commercial pilot with neocloud provider (1.2MW PoC)
- Seed raise: $4.8M to complete PoC and deliver MVP hardware module

**Delivered outcomes:**
- Accelerated interconnection timelines and reduced deployment risk
- Lower stabilization infrastructure requirements (CapEx reduction)
- Reduced equipment count and higher electrical efficiency (OpEx savings)
- Improved power quality and resilience for AI workloads
- Modular, rapidly deployable system using proven commercial power platforms

---

### Horizon 2 — Intelligent Energy Orchestration Layer *(Near Term → Mid Term)*

**Expanded capability:** Supervisory energy optimization and intelligent operational management across distributed energy assets — transitioning LoadCrest from stabilization infrastructure to an **energy orchestration and intelligence platform**.

This horizon is primarily a **software expansion** layered on top of the H1 hardware base. Key additions:
- Economic dispatch optimization across generation, storage, and grid resources
- Virtual Power Plant (VPP) participation and grid service integration
- Operational digital twin for predictive performance management
- AI agents integrated into the digital twin, continuously comparing modeled vs. real-time performance
- Automated baseline creation, anomaly detection, and operator alerting
- Cross-site operational intelligence and fleet-level coordination

H2 does not require new hardware — it runs on the H1 platform. However, the data, characterization, and operational intelligence generated in H2 directly informs the custom hardware specifications required for H3.

---

### Horizon 3 — Integrated AI Energy Hardware Platform *(Mid Term → Long Term)*

**Next-generation architecture:** Purpose-built hardware platform embedding advanced LoadCrest control intelligence — the full vertical integration of orchestration, stabilization, and predictive control into a single, co-designed system. The H3 platform replaces the Low-Frequency Transformer (LFT) with a **Solid-State Transformer (SST)**, providing native MVAC→800VDC conversion with Sentinel embedded as the SST's active control intelligence layer. See [ADR-102](ADR-102-horizon-3-sst-integration-strategy.md) for the full SST architecture decision.

Migration to custom hardware is initiated when one or more of the following triggers is met:

| Trigger | Description |
|---|---|
| **Performance ceiling** | COTS compute cannot execute Sentinel within the target sub-250ms decision loop under full-load conditions |
| **Volume threshold** | Annual unit volume makes custom NRE (Non-Recurring Engineering) cost-effective vs. COTS BOM |
| **Algorithm-hardware co-optimization** | A specific Sentinel enhancement is only achievable with purpose-built silicon, FPGA, or custom board layout |
| **Supply chain risk** | A critical COTS component becomes single-sourced, end-of-life, or geopolitically at risk |
| **Competitive parity** | A competitor achieves a hardware-level performance advantage that cannot be matched on COTS |
| **10kV SiC maturity** | High-voltage SiC (10kV) devices reach commercial availability from ≥2 qualified suppliers — the enabling technology for viable SST architecture (per ADR-102) |

**H3 hardware targets:**
- **~⅓ footprint** relative to current containerized H1 deployments
- SST power density target: **> 0.5 kW/dm³** (vs. ~0.047 kW/dm³ for current modular SSTs; ~0.25 for H1 LFT-based)
- MVAC-LVDC conversion efficiency: **≥ 98.0%** — matching H1 LFT-based baseline
- Significantly improved dynamic controllability — fully regulated 800VDC output via SST active control
- Direct DC coupling of renewable sources (PV, fuel cells, storage) — eliminates AC-DC-AC conversion stages
- Meaningful reductions in manufacturing cost and total installed system cost
- More predictable and strategically controlled supply chain
- Native integration of orchestration, stabilization, and predictive control layers into SST platform

**Key H3 partnership:** IONATE (Solid-State Transformers) — specialized SST engineering co-development; Sentinel integration surface defined jointly.

**Strategic impact:** Positions LoadCrest as a **vertically integrated infrastructure provider for AI-scale energy systems** — the only platform combining purpose-built SST hardware with an embedded sub-250ms AI factory power control algorithm.

---

### What Does Not Change Across All Horizons
- The 800VDC distribution standard (governed by [ADR-100](ADR-100-800vdc-distribution-standard.md))
- The control algorithm as the primary IP and competitive differentiator
- Safety and regulatory certification requirements
- Customer-facing interfaces and APIs

## Consequences

### Positive
- Faster time-to-market — H1 COTS avoids 18–36 month custom hardware development cycles
- Lower initial capital requirement — no NRE investment required until H3 triggers are met
- Proven safety certifications on COTS components reduce regulatory risk in early deployments
- EV supply chain for 800VDC components is mature, competitively priced, and globally available
- H2 software expansion builds a defensible intelligence moat before hardware competition intensifies
- H1 and H2 customer deployments generate real-world operational data that de-risks H3 custom hardware specifications
- H3's ~⅓ footprint reduction vs. containerized H1 creates a significant competitive advantage at the point of custom migration
- The three-horizon framework provides a clear, board-level narrative for capital allocation decisions

### Negative
- COTS hardware imposes a performance ceiling that cannot be overcome without H3 migration — risk of competitive disadvantage if ceiling is reached before migration is resourced
- H1 containerized form factor is larger and less integrated than the H3 target — early customers accept a transitional product
- COTS BOM costs at low volume are higher per unit than custom hardware at scale — margin compression in H1
- H2 software layer requires significant engineering investment before H3 hardware work begins — elongates the path to full vertical integration
- Three distinct product generations create field support complexity (spare parts, firmware compatibility, upgrade paths for H1 customers)
- Supply chain dependency on third-party vendors throughout H1 and H2 — limited leverage on availability, pricing, or component roadmap

## Alternatives Considered

| Alternative | Reason Not Chosen |
|---|---|
| **Custom hardware from day one** | 18–36 month development cycle delays market entry; high NRE risk before product-market fit; algorithm requirements not sufficiently characterized without H1 field data |
| **Permanent COTS strategy (skip H3)** | Permanently caps algorithm performance; cedes vertical integration narrative; vulnerable to a competitor who does invest in purpose-built hardware |
| **Skip H2 software layer (H1 → H3 directly)** | Enters custom hardware phase without the operational intelligence, digital twin, and fleet data that justify the platform premium and inform H3 specifications |
| **Partnership / white-label hardware** | Introduces IP and roadmap dependency on a partner; reduces control over the hardware-algorithm integration surface; potential channel conflict in H3 |
| **FPGA-first bridge (between H1 and H3)** | Not ruled out as an H3 entry point — FPGA may be the right first step into custom compute before full SoC investment |

## H3 Migration Readiness Requirements

For the H3 custom migration to succeed when triggered, the following must be true:
1. Algorithm is fully characterized in terms of compute, memory, and I/O requirements from H1/H2 field data
2. H2 digital twin provides validated performance models to inform H3 hardware targets
3. Hardware engineering capability (embedded systems, power electronics board design) is staffed or contracted
4. A target custom platform architecture is pre-selected (FPGA bridge vs. custom SoC vs. custom board)
5. H1/H2 customer contracts include hardware upgrade/swap provisions for H3 transition

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [ADR-100](ADR-100-800vdc-distribution-standard.md) | 800VDC as Primary Power Distribution Standard | Sister decision — 800VDC standard holds across all three horizons |
| [ADR-102](ADR-102-horizon-3-sst-integration-strategy.md) | Horizon 3 SST Integration Strategy | Governs the specific H3 SST architecture, enabling conditions, and IONATE partnership |
| [F-001](../3-features/F-001-sentinel-control-algorithm.md) | Sentinel — Sub-250ms Control Algorithm | Runs on COTS in H1; co-optimized with SST hardware in H3 |

## Source References

- *Technical Roadmap Horizons* — LoadCrest internal product roadmap
- *Huber, Kolar, Wallmeier, Pieper — IPEC 2022* — Engineering baseline confirming H1 LFT-based approach and H3 SST enabling conditions
