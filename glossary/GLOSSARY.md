# Glossary — Ubiquitous Language

Authoritative definitions for all terms used across LoadCrest PM artifacts. When a term appears in a persona, feature, ADR, or any other artifact, its meaning is governed by this document.

Terms are alphabetical within categories. Add new terms here before using them in artifacts.

---

## Technical — Power & Electrical

**800VDC**
The LoadCrest power distribution standard: 800-volt direct current throughout all products and facilities. Governed by [ADR-100]. Chosen over 400VDC (insufficient headroom for AI loads) and 1500VDC (requires aircraft-grade safety equipment).

**BESS (Battery Energy Storage System)**
Electrochemical energy storage used in microgrids and data center power architectures for buffering and backup. Present in LoadCrest's FOAK Air Force/Sandia deployment.

**COTS (Commercial Off-The-Shelf)**
A procurement and engineering term for products available on the open market rather than custom-designed for a specific application. COTS components benefit from existing safety certifications, established supply chains, and competitive pricing — at the cost of some performance flexibility. Widely used in defense, aerospace, industrial, and power electronics procurement.

At LoadCrest: Horizon 1 hardware uses proven COTS power platforms to reach market faster and avoid NRE before Sentinel's computational requirements are fully characterized from field data. Governed by [ADR-101].

**DC/DC Converter**
Power electronics device that converts one DC voltage level to another. Dyna Power supplies LoadCrest's DC/DC converter (partnership complete).

**LFT (Low-Frequency Transformer)**
Traditional 50/60Hz transformer used in H1 for MVAC-to-DC conversion. High efficiency (~98.2% ηΣ) and low complexity. Targeted for replacement by SST in Horizon 3.

**LVAC (Low Voltage AC)**
AC power at low voltage levels (typically <1kV). The LoadCrest containerized unit supports LVAC, MVAC, and DC outputs simultaneously.

**LVDC (Low Voltage DC)**
DC power at low voltage levels. Used in academic literature to describe the DC output of MVAC-LVDC conversion chains.

**MFT (Medium-Frequency Transformer)**
A transformer operating at >1kHz (vs. 50/60Hz for LFTs). Core component of the H3 MMC-based SST architecture. Higher frequency enables dramatically reduced size and weight versus LFTs.

**MMC (Modular Multilevel Converter)**
A power converter topology that uses a series of cascaded sub-modules (cells) to synthesize high-quality AC or DC waveforms at high voltage levels. Widely used in HVDC transmission, grid-scale storage, and high-power motor drives because it scales voltage without requiring exotic high-voltage switches. Each cell operates at a fraction of the system voltage, allowing the use of commercially available, lower-voltage power devices.

At LoadCrest: the MMC topology is selected for the H3 SST architecture because it enables 10kV SiC devices to achieve the target grid voltage with only ~6 cells vs. 438 in current fully modular LV-SiC designs — dramatically reducing complexity and improving power density. Governed by [ADR-102].

**MVAC (Medium Voltage AC)**
AC power at medium voltage levels (typically 1kV–69kV, commonly 13.2kV for data center grid interconnects). The input side of LoadCrest's H1 power chain and the primary interface for H3 SST.

**SiC (Silicon Carbide)**
Wide-bandgap semiconductor material used in high-performance power electronics. Enables higher switching frequencies, temperatures, and voltages than silicon. Current industrial SSTs use 1.2kV SiC; H3 is gated on **10kV SiC** devices becoming commercially available.

**10kV SiC**
High-voltage silicon carbide power devices that are the primary enabling technology for H3 SST viability. Reduces MMC cell count from ~27 to ~6 per converter, cutting switch count from 438 to ~60 and improving power density from 0.047 to ~1.6–1.8 kW/dm³.

**SST (Solid-State Transformer)**
A power conversion device that replaces a Low-Frequency Transformer with fully controllable power electronics. Enables direct MVAC→800VDC conversion, bidirectional power flow, active power quality management, and native Sentinel integration. H3 target architecture. Governed by [ADR-102]. IONATE is the primary SST development partner.

**Step-Load**
A general power engineering term for a sudden, large change in electrical load demand — as opposed to a gradual ramp. Step-loads stress power distribution systems by demanding near-instantaneous changes in current delivery, which can cause voltage sags, bus instability, and protection trips if the control system cannot respond fast enough.

At LoadCrest: AI/GPU workloads produce extreme step-loads — swinging 30–100% of full load in milliseconds as compute jobs start, stop, or throttle. This is the primary challenge Sentinel is designed to handle. Retrofitted EV-based DC systems, designed for smooth, predictable loads, cannot respond at this speed.

**VPP (Virtual Power Plant)**
A grid service capability where distributed energy assets are aggregated and dispatched as a coordinated unit. The H3 SST platform's bidirectional grid interface enables LoadCrest-managed data centers to participate in VPP programs — a future revenue stream.

---

## Technical — Software & Controls

**Digital Twin**
A virtual replica of a physical system — updated continuously with real-world data — used for simulation, performance prediction, anomaly detection, and control logic validation. Originated in aerospace and manufacturing; now widely used across energy, infrastructure, and industrial IoT. A digital twin differs from a static simulation in that it evolves alongside the real system using live telemetry.

At LoadCrest: the digital twin replicates the power delivery system to validate Sentinel's control logic before hardware deployment and to inform H3 hardware specifications from H1/H2 field data. Completed Q4 2025 with promising results. Expanded capability is a core Horizon 2 deliverable.

**Sentinel**
LoadCrest's proprietary embedded software implementing the sub-250ms power control algorithm. The primary competitive differentiator. Makes real-time energy distribution decisions to handle millisecond-scale AI/GPU step-loads. Runs on COTS hardware in H1/H2; embedded natively in the SST control layer in H3.

**Sub-250ms**
The maximum control loop latency target for Sentinel's real-time energy distribution decisions. With microsecond/millisecond telemetry resolution. Defines the hard real-time boundary that competitor EV-based retrofit systems cannot meet.

---

## Business & Financial

**BOM (Bill of Materials)**
Itemized list of components and costs for a hardware unit. Used in H3 cost modeling to validate SST-based platform cost-competitiveness with LFT-based H1.

**CapEx (Capital Expenditure)**
Upfront infrastructure investment. LoadCrest targets up to 80% reduction in buffering/filtering CapEx vs. legacy approaches, delivering up to $40M Day 1 CapEx savings per 100MW deployment.

**COGS (Cost of Goods Sold)**
Direct cost to manufacture one unit. LoadCrest containerized unit: ~$350k/MW COGS vs. ~$500k/MW CapEx (customer price).

**EaaS (Energy-as-a-Service)**
An emerging industry commercial model in which energy infrastructure, management, and optimization are delivered as a subscription service rather than sold as capital equipment. Customers pay a recurring fee tied to performance outcomes (uptime, efficiency, power quality) rather than owning and maintaining the underlying hardware. Analogous to SaaS in software — shifting infrastructure from a CapEx to an OpEx model. Adopted across microgrids, building energy management, EV charging, and AI data center power.

At LoadCrest: the EaaS model charges per MW per year for power control services, structured in tiers:
- **Base / Primary Controls** — $20,000/MW/year: Stabilization & Protection
- **Tier 1** — Secondary Controls: Coordination
- **Tier 2** — Integrated real-time digital controls, high-throughput monitoring, fault detection, automated recovery

**GTM (Go-to-Market)**
The strategy for bringing a product to market. LoadCrest's primary GTM path: neocloud providers and AI factory developers, particularly off-grid and pre-grid deployments.

**NRE (Non-Recurring Engineering)**
One-time engineering costs to design or develop something custom. LoadCrest's COTS-first strategy in H1 defers NRE until Sentinel requirements are characterized from field data.

**OpEx (Operating Expenditure)**
Ongoing operational costs. LoadCrest targets $7M/year OpEx reduction (15%) per 100MW deployment.

**Pay for Performance**
A general contracting model in which payment is tied to measurable outcomes rather than effort, time, or asset ownership. Used across healthcare (value-based care), government procurement, SaaS, and infrastructure services. Aligns vendor incentives with customer results — the vendor only captures full value when the customer does.

At LoadCrest: the commercial framing for EaaS — customers pay for measurable power outcomes (stabilized bus, grid compliance, uptime, efficiency) rather than for hardware ownership. LoadCrest's revenue is directly tied to system performance.

**TCO (Total Cost of Ownership)**
Total cost over the asset lifetime including CapEx, OpEx, and efficiency losses. LoadCrest TCO: ~$129M vs. ~$350M legacy per 100MW building block.

---

## Product & Deployment

**20ft Containerized Power Delivery Unit**
LoadCrest's primary product form factor. Pre-manufactured, turnkey unit that sits physically just outside the data hall. Up to 4MW per container. Supports MVAC, LVAC, and DC outputs simultaneously. Priced at ~$500k/MW CapEx.

**4MVA**
Standard utility transformer interface capacity. LoadCrest's 4MW container is sized to mirror this standard — enabling modular deployment that aligns with utility interconnect sizing.

**AI Factory**
A large-scale data center purpose-built for AI/GPU compute workloads. The primary deployment environment for LoadCrest's power delivery system. Characterized by violent, millisecond-scale step-loads that standard power infrastructure cannot handle.

**FOAK (First of a Kind)**
An industry term for a novel, first-ever implementation of a technology or system — typically carrying higher engineering risk and higher proof-of-concept value than subsequent deployments. FOAK projects are often pursued with government, research, or anchor partners to validate the technology before commercial scale.

LoadCrest's FOAK: the first 800VDC deployment, executed jointly with the U.S. Air Force and Sandia National Labs — an integrated grid including solar, gas gen, BESS, and military loads. Provides field validation of the 800VDC standard and Sentinel's control approach.

**Horizon 1 (H1)**
First product phase. COTS-based hardware running Sentinel. LFT-based MVAC→DC conversion. Commercially deployed via the Q4 2026 neocloud PoC. Governed by [ADR-101].

**Horizon 2 (H2)**
Second product phase. Algorithm optimization and Sentinel characterization using H1 field data. May include purpose-built compute (FPGA/custom SoC) if H1 COTS compute ceiling is reached. Governed by [ADR-101].

**Horizon 3 (H3)**
Third product phase. Purpose-built, algorithm-optimized hardware. MMC-based SST replaces LFT. Sentinel embedded natively in SST control layer. Gated on 10kV SiC availability and H2 characterization completion. Governed by [ADR-101], [ADR-102].

**HIL (Hardware-in-Loop)**
A testing methodology where physical hardware components are integrated with simulated systems to validate control algorithms under realistic conditions. LoadCrest Q2 2026 milestone.

**MVP (Minimum Viable Product)**
A product development concept from Lean Startup methodology: the smallest version of a product that delivers enough value to real customers to generate validated learning. An MVP is not a prototype — it is a deployable product, intentionally scoped to test core assumptions with minimum investment before scaling.

At LoadCrest: the MVP hardware module is the minimum deliverable required to complete the Q4 2026 neocloud PoC, demonstrate commercial viability at 1.2MW, and close the $4.8M seed round.

**Off-Grid Deployment**
A data center operating without connection to a utility grid, relying on on-site generation (solar, gas gen, BESS). LoadCrest's fastest GTM path — these customers have no legacy power infrastructure to retrofit.

**PoC (Proof of Concept)**
A time-limited, scoped implementation used to validate that a technology or approach works in practice under real-world conditions. A PoC tests feasibility and de-risks core assumptions before full commercial deployment. Distinct from an MVP in that a PoC is primarily an internal validation exercise; an MVP is a customer-facing product.

At LoadCrest: the Q4 2026 commercial pilot with a neocloud provider at 1.2MW scale. The primary technical and commercial milestone for the current $4.8M seed raise.

**Pre-Grid Deployment**
A data center under construction or in early operation before utility grid interconnection is completed. High urgency for power infrastructure that works independently of the grid — a strong GTM fit.

---

## Market

**Neocloud**
Cloud infrastructure providers focused on GPU/AI compute, distinct from hyperscalers (AWS, Azure, GCP). Examples include CoreWeave, Lambda Labs, and similar. LoadCrest's primary initial customer segment — they build AI factories at speed and face the most acute power infrastructure challenges.

---

## Partners

**Dyna Power**
DC/DC converter partner. Integration complete.

**IONATE**
Solid-State Transformer partner. Primary co-development path for H3 SST platform. LoadCrest must retain Sentinel as its own IP within the IONATE partnership; architecture decisions should be co-developed, not inherited wholesale from IONATE's roadmap. See [ADR-102].

**Sandia National Labs**
U.S. national laboratory. Source of the 800VDC microgrid research that founded LoadCrest. Partner in the FOAK Air Force deployment.

**VEIR**
Superconducting technology partner. Relevant to future high-density power transmission capabilities.

---

## Culture & Collaboration

**Character Strengths**
A framework from Positive Psychology (VIA Institute on Character) identifying 24 universal human strengths (e.g., curiosity, perseverance, fairness, creativity) that can be measured and deliberately applied. Teams that know each other's top strengths and design work to engage them consistently outperform those that don't. Used at LoadCrest to inform how individuals contribute in collaborative sessions.

**Collaborative Emergence**
The phenomenon where a group produces ideas, solutions, or insights that no individual member could have reached alone. First rigorously studied by Keith Sawyer (*Group Genius*, 2007) in jazz, improv theater, sports teams, and engineering teams. Collaborative emergence is the primary output of Group Flow — and the reason LoadCrest treats in-person sessions as a strategic capability. See [SK-004](../skills/SK-004-group-flow-facilitation.md).

**Group Flow**
A collective state of deep engagement and creative momentum in which a group performs at a level beyond any individual's capacity. First described by Keith Sawyer, building on Csikszentmihalyi's individual flow. Requires specific conditions (clear shared goal, equal participation, close listening, psychological safety, productive challenge) and is significantly more likely in in-person settings than remote ones. The organizing principle behind LoadCrest's approach to collaborative sessions. See [culture/GROUP-FLOW.md](../culture/GROUP-FLOW.md) and [SK-004](../skills/SK-004-group-flow-facilitation.md).

**PERMA**
The five pillars of well-being from Martin Seligman's Positive Psychology framework: **P**ositive Emotions, **E**ngagement, **R**elationships, **M**eaning, **A**chievement. Used at LoadCrest to evaluate whether collaborative sessions are designed to leave participants energized and productive, not depleted.

**Positive Psychology**
A branch of psychology concerned with the conditions that allow individuals, groups, and institutions to flourish — as opposed to traditional clinical psychology's focus on pathology. Founded by Martin Seligman and Mihaly Csikszentmihalyi in the late 1990s. Informs LoadCrest's approach to team culture, collaborative session design, and partner engagement.

**Psychological Safety**
The shared belief within a team that it is safe to speak up, take risks, and voice incomplete ideas without fear of humiliation or retaliation. Coined by Amy Edmondson (Harvard Business School). A prerequisite for Group Flow — without it, people self-censor and collaborative emergence cannot occur.

---

## PM Methodology

**ADR (Architectural Decision Record)**
A cross-cutting constraint document capturing a significant technical or product decision, its context, alternatives considered, and consequences. Status lifecycle: `proposed` → `accepted` → `superseded | deprecated`. See `adrs/`.

**NFR (Non-Functional Requirement)**
A requirement defining system quality attributes (performance, reliability, security, etc.) rather than specific behaviors. See `6-nfr/`.

**RFC (Request for Comment)**
A proposed idea or change submitted for team review before a decision is made. Precursor to an ADR in the GSD workflow. *(Directory not yet created — see roadmap.)*

**Skill (Playbook)**
A standardized "how-to" method for a recurring PM task (Discovery, Prioritization, Launch, etc.). Cross-cutting — applies across all dimensions. See `skills/`.

**Ubiquitous Language**
The shared vocabulary used consistently across all PM artifacts, team conversations, and external communications. This glossary is the authoritative source. When terms are ambiguous or missing, add them here first.
