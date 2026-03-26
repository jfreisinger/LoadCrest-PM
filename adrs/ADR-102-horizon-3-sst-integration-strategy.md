---
id: ADR-102
title: "Horizon 3 SST Integration Strategy: MMC-Based Solid-State Transformer as Native MVAC-800VDC Interface"
status: proposed
date: 2026-03-24
constrains: [F-001]
supersedes: null
---

# ADR-102: Horizon 3 SST Integration Strategy: MMC-Based Solid-State Transformer as Native MVAC-800VDC Interface

## Context

LoadCrest's Horizon 3 product targets the elimination of the Low-Frequency Transformer (LFT) from the MVAC→800VDC conversion chain, replacing it with a Solid-State Transformer (SST) — a fully software-controllable, intelligent power conversion interface co-designed with Sentinel. This represents the final integration step of LoadCrest's three-horizon strategy (per [ADR-101](ADR-101-cots-first-hardware-strategy.md)): collapsing the MVAC grid interface, the 800VDC bus stabilization layer, and active power quality management into a single, purpose-built platform.

The strategic case for SST is compelling: direct MVAC→800VDC conversion at the facility entrance, full controllability of the grid interface, and the ability to embed Sentinel's active control intelligence natively into the conversion hardware rather than overlaying it on a passive LFT. However, SST technology is not mature enough to displace LFT-based approaches today.

### What the Academic Literature Shows (As of 2022)

A comparative analysis by Huber, Kolar, Wallmeier, and Pieper (ETH Zürich / Delta Energy Systems, IPEC 2022) provides the definitive engineering baseline for MVAC-LVDC conversion architectures for data centers. Its findings directly inform LoadCrest's H3 timing and architecture decisions:

**Current SST performance vs. alternatives (MVAC to rack PSU input, 1MW over 100m):**

| Approach | Conversion Efficiency | System Efficiency (ηΣ) | Power Density | Complexity |
|---|---|---|---|---|
| LFT + centralized SiC PFC rectifier | 98.2% | ~97.9% | ~0.25 kW/dm³ | Low |
| 12-pulse rectifier + Active Filter (hybrid) | 98.5% | **~98.2%** | ~0.22 kW/dm³ | Medium |
| **SST — current modular industrial prototype** | **98.0%** | **~97.7%** | **0.047 kW/dm³** | **Very High** |
| SST — future 10kV SiC (ETH/NC State research) | ~98.1% | ~97.8% | **~1.6–1.8 kW/dm³** | Medium-High |

**Critical finding:** Current industrial MVAC-LVDC SSTs do *not* outperform LFT-based solutions in efficiency and are significantly worse in system power density. The state-of-the-art 400kW industrial SST demonstrator (Zhu 2019–2021, referenced in the paper) comprises:
- 27 converter cells, 438 individual switches and gate drive units
- System weight: 3,000 kg
- System power density: 0.047 kW/dm³ (vs. ~0.25 for LFT-based approaches)
- Cell-only efficiency: 98% — but system ηΣ ≈ 97.7%, below LFT-based alternatives

This confirms that H3 SST integration must wait for the enabling technology to mature — specifically **high-voltage SiC (10kV) devices** — before LoadCrest should commit to an SST-based H3 platform.

### Why H1 LFT-Based Approach Is the Right Call Today

The same paper validates LoadCrest's H1 strategy: the LFT + centralized SiC PFC rectifier approach is the rational, high-efficiency path for today's deployments — achieving ηΣ ≈ 97.9% with low complexity and proven MV-side compatibility. The hybrid 12-pulse + active filter approach achieves the highest system efficiency (ηΣ ≈ 98.2%) and serves as an intermediate benchmark for H3 performance targets.

LoadCrest is not leaving performance on the table with H1 — it is following the same logic that ETH Zürich explicitly endorses.

### The Enabling Technology: High-Voltage SiC (10kV)

High-voltage SiC (10kV) devices change the SST equation fundamentally:

| System | Power | Grid Connection | Efficiency | Power Density | Switch Count |
|---|---|---|---|---|---|
| Current modular industrial SST (1.2kV SiC) | 400kW | 13.2kV | 98.0% | 0.047 kW/dm³ | 438 |
| NC State 10kV SiC (2019, research) | 350kW | 12.47kV | ~98.1% | ~1.6 kW/dm³ | ~60 |
| ETH Zürich 10kV SiC (demonstrator) | 25kW → 150kW | 13.2kV | ~98.1% | ~1.8 kW/dm³ | ~60 |

10kV SiC reduces the number of cascaded cells from 9 per phase (27 total) to ~2 per phase (6 total) for the same grid voltage — dramatically reducing complexity, switch count, and system volume.

### The IONATE Partnership

LoadCrest's partnership with **IONATE** (Solid-State Transformers) is the primary development path for the H3 SST platform. IONATE provides specialized SST engineering expertise that LoadCrest does not need to build internally before H3 triggers are met (per [ADR-101](ADR-101-cots-first-hardware-strategy.md)). The IONATE relationship should be managed such that H3 SST architecture decisions are co-developed — not inherited wholesale from IONATE's standard roadmap.

## Decision

LoadCrest targets a **Modular Multilevel Converter (MMC)-based SST with a single medium-frequency transformer (MFT)** as the H3 architecture, developed in partnership with IONATE, with Sentinel embedded natively in the SST control layer. This architecture is selected over fully modular SSTs because:

1. A single MFT reduces the isolation overhead that dominates the power density loss in fully modular designs
2. The MMC topology enables high-voltage operation without requiring the full cell count of fully modular systems
3. A single main isolation barrier simplifies protection coordination vs. distributed per-cell isolation
4. The architecture is compatible with embedding Sentinel as the native control intelligence layer

### H3 SST Performance Targets

| Parameter | H1 Baseline (LFT-based) | H3 SST Target |
|---|---|---|
| MVAC-LVDC conversion efficiency | 98.2% | ≥ 98.0% |
| System efficiency (ηΣ, MVAC to rack) | ~97.9% | ≥ 97.9% |
| System power density | ~0.25 kW/dm³ | > 0.5 kW/dm³ |
| Container footprint vs. H1 | Baseline | ~⅓ reduction |
| DC output voltage regulation | Via Sentinel on LFT platform | Fully regulated via SST control |
| Renewable integration capability | AC-coupled (conversion losses) | Direct DC-coupled (elimination of AC-DC-AC stages) |
| MV grid compatibility | LFT provides isolation and decoupling | SST provides direct MVAC interface with active control |

### Enabling Conditions for H3 Trigger

H3 SST development is initiated only when **all** of the following conditions are met:

1. **10kV SiC device availability** — High-voltage SiC MOSFETs (10kV class) are commercially available from at least two qualified suppliers at volume pricing consistent with H3 cost targets
2. **H1 performance ceiling reached** — COTS platform cannot execute Sentinel within target decision loop latency at full-load (per ADR-101 H3 triggers)
3. **H2 algorithm characterization complete** — Sentinel computational requirements are fully characterized from H1/H2 field data; digital twin provides validated H3 hardware targets
4. **IONATE co-development agreement** — Formal H3 co-development agreement with IONATE defining IP ownership, architecture control, and LoadCrest's Sentinel integration surface
5. **MV protection design validated** — A viable MV-side protection architecture is engineering-validated for the target grid voltage (13.2kV or equivalent); protection equipment cost is within H3 CapEx model

### What Does Not Change

- Sentinel remains the primary IP and control intelligence layer — the SST is hardware executing Sentinel, not a replacement for it
- 800VDC is the output distribution standard (per [ADR-100](ADR-100-800vdc-distribution-standard.md))
- The EaaS business model applies — H3 hardware enables deeper Tier 2 service capabilities, not a different commercial model
- Safety and regulatory certification requirements (MV-level adds NEMA, IEC 61850, arc-flash coordination requirements)

## Consequences

### Positive

- **Footprint reduction:** SST with 10kV SiC targets >0.5 kW/dm³ vs. ~0.25 for LFT-based H1 — ~⅓ container footprint reduction consistent with ADR-101 H3 target
- **Full controllability:** SST provides a software-controlled MVAC interface — Sentinel can manage active power, reactive power, harmonic compensation, and voltage regulation from a single intelligent layer, from grid to rack
- **Renewable integration advantage:** 800VDC architecture with SST enables direct DC coupling of PV, fuel cells, and storage — eliminates AC-DC-AC conversion stages that a 690VAC architecture cannot avoid (per Huber et al. Fig. 4)
- **Grid service capability:** Fully controllable grid interface enables bidirectional power flow, virtual inertia, and VPP participation that passive LFT-based systems cannot provide
- **IONATE partnership leverage:** LoadCrest accesses SST engineering expertise without building it internally; IONATE gains Sentinel integration as a differentiator for their SST platform
- **Data moat extension:** Sentinel running natively on the SST platform generates microsecond-level data from the MVAC interface to the 800VDC bus — the richest dataset in the power delivery chain

### Negative

- **MV protection complexity:** MV-connected power electronics requires specialized filter chokes, disconnectors, and grounding switches — this equipment is costly and technically challenging; protection failures at MV are catastrophic (per Guillod, Krismer & Kolar, IEEE Trans. 2017, referenced in source paper)
- **Cost constraint is extremely tight:** Budget for MV-side power electronics (excluding LV-side and MFT) is <$15/kVA — comparable to the entire cost of a 1 MVA LFT. Achieving cost-parity with LFT-based systems requires volume production economics not available at H3 launch
- **10kV SiC supply chain dependency:** H3 is gated on semiconductor device availability — a supplier dependency LoadCrest cannot control
- **Switch count remains non-trivial:** MMC-based SST with 10kV SiC still requires ~60 switches for a 150kW three-phase system — control complexity and gate drive reliability at MV levels is non-trivial
- **No full-scale industrial reference:** As of 2022, no full-scale industrial MMC-based SST with single MFT has been publicly documented. H3 carries first-mover engineering risk
- **Component lifetime differential:** Power electronic assemblies have ~10-year typical lifetimes vs. ~40 years for LFTs — H3 SST platform requires designed-in serviceability and modular replacement paths to match LFT-based O&M economics
- **IP boundary with IONATE:** SST hardware developed in partnership with IONATE requires explicit IP boundary agreements — the Sentinel control layer must remain LoadCrest IP, with clear licensing terms for IONATE's SST hardware

## Alternatives Considered

| Alternative | Reason Not Chosen |
|---|---|
| **Fully modular SST (current state-of-art, LV SiC)** | 438 switches, 3,000 kg, 0.047 kW/dm³ system density — not a credible H3 target. Complexity without the power density or efficiency advantage over H1 LFT-based |
| **Hybrid transformer (12-pulse + active filter) as permanent H3 target** | Achieves highest ηΣ today (98.2%) but provides unregulated DC output voltage and limited controllability — incompatible with Sentinel's full control surface requirements; also provides no footprint reduction vs. LFT-based |
| **Retain LFT permanently (no SST in H3)** | Valid fallback if 10kV SiC fails to mature on schedule; leaves footprint reduction and direct grid controllability on the table; limits VPP and grid service ambitions |
| **FPGA/custom SoC as H3 (no SST hardware change)** | ADR-101 notes FPGA as a possible H3 entry point for compute — this is not mutually exclusive with SST. Both can be pursued; FPGA may precede SST if compute ceiling is hit first |
| **MVDC interface (skip MVAC entirely)** | Future option if MVDC grid infrastructure matures; not in LoadCrest's near-term scope; MVDC distribution networks are not yet commercially deployed at data center scale |
| **In-house SST development (no IONATE)** | Requires specialized MV power electronics engineering capability that LoadCrest does not have and would take years to build; IONATE partnership accelerates H3 without the NRE burden |

## H3 SST Readiness Requirements

In addition to the ADR-101 H3 Migration Readiness Requirements, the following SST-specific conditions must be met:

1. **Sentinel-SST integration surface defined** — Formal specification of the API/hardware interface between Sentinel firmware and the SST control layer, developed jointly with IONATE
2. **MV protection architecture validated** — Engineering-validated protection scheme for 13.2kV (or target MV level) interface meeting IEC 61850 and applicable arc-flash standards
3. **10kV SiC device qualification** — At least one 10kV SiC MOSFET family from a qualified supplier with datasheet-confirmed blocking voltage, RDS(on), and gate drive requirements compatible with MMC cell design
4. **Thermal management design** — MMC cell thermal management validated for continuous operation at rated current; cooling system (liquid or forced-air) specified
5. **MFT design specification** — Medium-frequency transformer (target: >1 kHz) specified for the selected MMC topology; core material, winding technology (Litz wire), and insulation coordination confirmed
6. **Cost model validated** — Full H3 BOM and NRE cost model confirms SST-based platform is cost-competitive with LFT-based H1 at target production volumes

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [ADR-100](ADR-100-800vdc-distribution-standard.md) | 800VDC as Primary Power Distribution Standard | H3 SST delivers MVAC→800VDC conversion natively; 800VDC standard unchanged |
| [ADR-101](ADR-101-cots-first-hardware-strategy.md) | Three-Horizon Product Evolution | H3 is the horizon this ADR governs; SST integration is the specific H3 architecture decision |
| [F-001](../3-features/F-001-sentinel-control-algorithm.md) | Sentinel — Sub-250ms Control Algorithm | Sentinel is embedded natively in H3 SST platform; this ADR governs the hardware it runs on |

## Source References

- *Huber, Kolar, Wallmeier, Pieper — "Comparative Evaluation of MVAC-LVDC SST and Hybrid Transformer Concepts for Future Datacenters," IPEC 2022 (ETH Zürich / Delta Energy Systems)* — Primary engineering baseline for SST vs. LFT-based comparison; efficiency, density, and cost data
- *Technical Roadmap Horizons* — LoadCrest internal product roadmap; H3 footprint and integration targets
- *LoadCrest Teaser Deck* — IONATE partnership and SST roadmap reference
