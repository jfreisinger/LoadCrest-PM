---
id: P-001
title: "Neocloud / AI Factory Developer"
status: draft
primary-interface: "[IF-001], [IF-002]"
value-props: [VP-001, VP-002]
---

# P-001: Neocloud / AI Factory Developer

## Description

The Neocloud / AI Factory Developer is the primary LoadCrest buyer and initial design partner. This persona builds and operates large-scale AI compute infrastructure — 100MW+ GPU clusters running Nvidia Kyber/Rubin-Vera racks on 800VDC architecture — and is acutely blocked by the complexity, cost, and risk of delivering clean, stable power to those racks. They are moving fast under investor pressure and cannot afford the 12–18 month delays that custom "Frankenstein" power solutions require.

This persona is especially common in **off-grid and pre-grid deployments**, where the urgency to reach compute power without waiting for utility infrastructure makes LoadCrest's turnkey containerized solution the fastest viable path.

## Goals

- Get power to racks as fast as possible — minimize time from site selection to first compute
- Dramatically reduce CapEx on power buffering and filtering infrastructure
- Pass grid interconnection System Impact Studies without triggering 2-year utility reviews
- Deploy a production-grade, certifiable power system without in-house power engineering expertise
- Establish a scalable, modular power architecture that grows with rack density
- Achieve grid compliance and power quality standards required by hyperscaler tenants or regulators

## Pain Points

- Current DC power systems are **retrofitted EV components** that cannot handle the violent, microsecond step-loads of AI/GPU workloads — resulting in dirty power and compute instability
- Forced to build expensive, customized **"Frankenstein" power systems** by stitching together incompatible components — costly, slow, and uncertified
- A 100MW deployment currently requires **~$50M in filtering and stabilizing power electronics** just to deliver clean power
- GPU loads swing **30–100% in milliseconds** — no standard power system handles this without massive over-engineering
- Traditional AC architecture introduces **>30% power loss** through transmission and conversion stages
- Grid interconnection denials or 2-year studies triggered by harmonic distortion and load volatility
- No turnkey, certifiable 800VDC power delivery product exists — until LoadCrest

## Context

This persona is operating in a high-velocity, high-stakes environment. AI compute demand is growing faster than power infrastructure can support. They are typically well-funded but time-constrained, with investors expecting rapid deployment milestones. The "build vs. buy" decision on power infrastructure almost always defaults to "build" because no purpose-built product has existed — LoadCrest changes that calculus entirely.

The OCP Diablo specification (800VDC + Sidecar/Power Rack architecture) is becoming the de facto standard for their rack deployments. They need their power delivery infrastructure to align with Diablo — which means 800VDC-native, not AC-adapted.

## Key Workflows

1. **Site evaluation** — assessing whether a site can support 800VDC distribution and grid interconnection; LoadCrest's grid-buffer capability directly accelerates this
2. **Power system procurement** — evaluating, specifying, and procuring the power delivery system for a 100MW+ facility; LoadCrest replaces a complex multi-vendor stack with a single containerized unit
3. **Grid interconnection** — submitting System Impact Studies to the utility; SentinelT's load-smoothing ensures a clean, predictable load profile
4. **Commissioning and go-live** — deploying and validating the power system; LoadCrest's pre-manufactured, pre-certified container reduces commissioning time significantly
5. **Ongoing operations** — monitoring power quality, uptime, and efficiency; covered by EaaS Tier 1/2 service levels

## Business Model Interaction

This persona typically engages LoadCrest under the **EaaS (Energy-as-a-Service)** model:
- **$20,000/MW/year** for Primary Controls (Stabilization & Protection)
- Tier 1 and Tier 2 upgrades for coordination, monitoring, and automated recovery

The EaaS model converts a large capital outlay into a predictable operational cost — highly attractive to neoclouds managing cash deployment against investor milestones.

## Interfaces

| Interface | Usage |
|-----------|-------|
| [IF-001] | Physical container / local HMI — on-site commissioning and monitoring |
| [IF-002] | Web management dashboard — remote monitoring, telemetry, alerting |

## Related Artifacts

| Key | Title | Relationship |
|-----|-------|-------------|
| [VP-001](../2-value-props/VP-001-capex-reduction-on-buffering-infrastructure.md) | CapEx Reduction on Power Buffering Infrastructure | Primary financial value delivered to this persona |
| [VP-002](../2-value-props/VP-002-accelerated-grid-interconnection.md) | Accelerated Grid Interconnection | Removes the #1 deployment blocker for this persona |
| [F-001](../3-features/F-001-sentinelt-control-algorithm.md) | SentinelT — Sub-250ms Control Algorithm | Core capability that solves the microsecond step-load problem |
| [ADR-100](../adrs/ADR-100-800vdc-distribution-standard.md) | 800VDC Distribution Standard | Defines the architecture this persona is deploying |

## Source References

- *LoadCrest Teaser Deck* — Executive Summary, Solution, Market slides
- *LoadCrest NM EDD Submission* — Solution, Competition slides
- *800VDC Microgrid Stabilization Value Proposition* — Value-prop matrix
