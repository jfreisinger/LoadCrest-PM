---
id: VP-001
title: "Dramatic CapEx Reduction on Power Buffering Infrastructure"
status: draft
serves: [P-001]
enables: [F-001]
constrained-by: [ADR-100, ADR-101]
---

# VP-001: Dramatic CapEx Reduction on Power Buffering Infrastructure

## Statement

LoadCrest eliminates up to 80% of the CapEx AI factory developers currently spend on power buffering and filtering infrastructure — saving a 100MW deployment up to **$40M on day one** and reducing total power infrastructure TCO from ~$350M to ~$129M per 100MW building block.

## Description

A 100MW AI data center built on traditional architecture requires approximately **$50M in filtering and stabilizing power electronics** just to deliver clean, stable power to the racks. This cost exists entirely because today's approach — retrofitting EV-grade DC components or layering AC conversion stages — cannot natively handle the violent, millisecond-scale transient loads of AI/GPU workloads. The gap is filled with expensive, custom-engineered buffering infrastructure.

LoadCrest eliminates this gap at the source. The SentinelT control algorithm manages power quality and transient response in real time at the sub-250ms level, absorbing the step-loads that would otherwise require passive buffering hardware. The EPC can downsize or eliminate capacitor banks, oversized transformers, and custom filtering equipment that would normally be specified as a safety margin against power instability.

The financial impact is immediate and measurable. In year one alone, LoadCrest saves a 100MW deployment:
- Up to **$40M in CapEx** from eliminated buffering and filtering equipment
- Up to **$7M/year in OpEx** (15% reduction) through higher electrical efficiency and reduced equipment maintenance
- Up to **$3M/year** in efficiency gains (5% improvement in power delivery efficiency)

Over the life of the facility, the TCO differential is approximately **$220M per 100MW** versus legacy approaches — a direct consequence of fewer conversion stages, less passive hardware, and a software-defined control layer that optimizes continuously rather than over-engineering once.

For neoclouds and AI factory developers operating under investor pressure to deploy capital efficiently, this is not a marginal improvement — it's a fundamental change in the economics of power infrastructure.

## Target Personas

| Persona | Relevance |
|---------|-----------|
| [P-001](../1-personas/P-001-neocloud-ai-factory-developer.md) | Primary beneficiary — day-one CapEx savings directly reduce capital deployment required per MW of AI compute |

## Enabled Features

| Feature | Contribution |
|---------|-------------|
| [F-001](../3-features/F-001-sentinelt-control-algorithm.md) | SentinelT's sub-250ms transient response is the mechanism that eliminates the need for passive buffering hardware |

## Metrics

| Metric | Baseline (Legacy) | LoadCrest Target | Measurement |
|--------|-------------------|-----------------|-------------|
| Power buffering CapEx per 100MW | ~$50M | ~$10M (80% reduction) | Customer deployment cost comparison |
| Day-1 CapEx savings | $0 | Up to $40M per 100MW | Pre/post deployment cost audit |
| Total power infrastructure TCO per 100MW | ~$350M | ~$129M | Full lifecycle cost model |
| OpEx reduction (annual) | Baseline | 15% / ~$7M/year per 100MW | Energy and maintenance cost tracking |
| Power delivery efficiency gain | Baseline | +5% / ~$3M/year per 100MW | PUE and metered efficiency data |

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [ADR-100](../adrs/ADR-100-800vdc-distribution-standard.md) | 800VDC Distribution Standard | 800VDC architecture is prerequisite for the efficiency gains that enable this value prop |
| [ADR-101](../adrs/ADR-101-cots-first-hardware-strategy.md) | Three-Horizon Product Evolution | COTS platform delivers VP-001 in H1; custom hardware deepens the advantage in H3 |

## Source References

- *LoadCrest Teaser Deck* — Business Model, Competition, Solution slides
- *LoadCrest NM EDD Submission* — Competition slide
