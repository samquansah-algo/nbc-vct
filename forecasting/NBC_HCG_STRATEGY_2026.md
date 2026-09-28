# NBC and the Human Capability Graph: foresight, benchmark and venture choices (September 2026)

*Prepared 25 September 2026 for Sam Quansah (founder, Algo Peers / NBC). Written as a foresight researcher, technology strategist, learning scientist and venture economist. Companion to `NBC_STRATEGIC_FORESIGHT_2026.md` and `NBC_FOUR_METHODS_2026.md`, and superseding them wherever they treated NBC as a school product.*

> **v5 input (25 Sep 2026; DEV-021).** The founder shared a ChatGPT-drafted v5 thesis and tactical playbook ([`strategy-v5/`](../strategy/)). The recommendation is to adopt v5 as the eight-week operating plan with six amendments, while four points (headline thesis, age band, TVET alternative, industry-cluster timing) await the founder. See [`strategy-v5/RECONCILIATION.md`](../strategy/RECONCILIATION.md).

**The founder's correction this document is built on (25 Sep 2026):**
> "NBC should not be limited to schools. Schools emerged as a possible first market because Algo Peers already has access and experience there. The Human Capability Graph is the broader thesis: representing what people can demonstrably do, how capabilities develop, and whether they transfer across tasks and environments. A school pilot could test one part of that thesis. Its findings would need further testing before extending to other populations and settings."

**How to read the labels**

| Label | Meaning |
|---|---|
| **[SOURCE]** | Stated in NBC's own documents (a claim or plan, not evidence) |
| **[MEASURED]** | A measured result reported by a study |
| **[ENACTED]** | Law or policy in force |
| **[ADOPTION]** | Demonstrated use at a stated scale |
| **[FORECAST: who]** | Someone else's prediction |
| **[ASPIRATION: who]** | An institution's goal or commitment |
| **[COMMERCIAL CLAIM]** | A company's claim about its own product |
| **[INFERENCE]** | My own reasoning from the evidence |
| **[MODEL]** | Output of `foresight/hcg_economics.py` or earlier models; assumptions are listed in the code |
| **[SYNTHETIC]** | From the synthetic studies. **Never evidence** |
| *(snippet)* | The page could not be opened (egress policy); the claim rests on search-result text |

Institutional prominence is not treated as evidence that a forecast is right. No numerical probabilities are given for scenarios.

---

## Contents

1. Strategic verdict
2. Thesis map (Steps 1–2): sources, working definitions, four levels, what earns its place, what stays scarce
3. Benchmark matrix: 14 vectors and their interactions
4. Human Capability Graph assessment
5. Market comparison and recommended entry point
6. Intelligence-utility economics
7. Scenario matrix and narratives
8. Experiments, milestones and decision triggers
9. Revised venture thesis
10. Source register
11. Industry clusters and the council function (added after the founder's follow-up question)

---

## 1. Strategic verdict

**Where NBC fits.** As machine intelligence gets cheaper, content, explanation, tutoring and even polished work products stop being scarce. What stays scarce is **credible evidence of what a person can do on their own, in a situation they haven't rehearsed, that someone else will act on** [INFERENCE from vectors 1, 5, 7 below]. NBC's most defensible opportunity is to make that evidence **valid, affordable and owned by the person**, starting with young people whose capabilities are currently invisible to the institutions that could invest in them. The Human Capability Graph is the long-term form of that idea. Computational matter and the NBC Node are one way to *generate* the evidence, not the thesis itself.

**What is distinctive** [INFERENCE]:
1. **Transfer as the unit of evidence.** Most assessment asks "can they do this task?". NBC's thesis asks "does this still hold when the world changes?" (thesis §IX). Almost no deployed system measures transfer across environments in low-resource settings.
2. **Evidence from consequential action, not from answers.** Physical and simulated worlds where actions change a state are harder to fake with AI than essays or code submissions.
3. **A privacy stance that is an architecture, not a policy.** "Observe the state of the learning environment, not the totality of the child" (§X). This differentiates NBC sharply from proctoring and algorithmic hiring tools, which are under legal and research attack (vector 9).
4. **Access.** Algo Peers has years of operations, relationships with schools and an after-school channel in Ghana [SOURCE], so it can run validity studies with real learners quickly.

**What is weak** [INFERENCE, grounded in sources]:
1. **No evidence yet on the central claim.** Nothing shows that NBC's worlds produce valid evidence of transfer. Research on far transfer is mostly negative ([Sala & Gobet 2017](https://doi.org/10.1177/0963721417712760)), and performance assessments need many tasks for a dependable score ([Shavelson, Baxter & Gao 1993](https://doi.org/10.1111/j.1745-3984.1993.tb00424.x)).
2. **Credibility is expensive, and the cost rises with the stakes.** In the model, a formative reading needs about 3 tasks per capability and a high-stakes one about 9. Free AI and better devices cut the cost per credible demonstration by only ~1–20% [MODEL; economics §6], because people, calibration and trust dominate the cost.
3. **The architecture is ahead of the evidence.** Tokens, Village AI, NBC OS, a settlement layer and a graph are all proposed at once. Each is a hypothesis (the thesis says so itself, §XIX). Building them before validity is known repeats the Osmo pattern: hardware plus vendor dependence, stranded when the owner failed ([Wikipedia summary](https://en.wikipedia.org/wiki/Osmo_(game_system)); [Lowpass](https://www.lowpass.cc/p/osmo-is-back-ar-edutainment-ipad-apps)).
4. **Payer uncertainty.** Two synthetic studies found buyers negotiating on proof and terms, not accepting per-child prices [SYNTHETIC; not evidence]. There is no real willingness-to-pay evidence yet.
5. **Recognisers are the bottleneck.** Evidence is only worth what someone will decide on it. Skills-based hiring is mostly rhetoric: at firms that dropped degree requirements, only about 0.14% of hires were people without degrees ([HBS & Burning Glass Institute 2024](https://www.hbs.edu/managing-the-future-of-work/Documents/research/Skills-Based%20Hiring.pdf)) [MEASURED].

**Bottom line.** Keep the ambition and narrow the first bet:
- **Long-term architecture:** the Human Capability Graph, which is shared, open infrastructure for evidence of what people can demonstrably do and whether it transfers.
- **First application:** credible evidence of *near-to-mid transfer* of practical reasoning capabilities in young people aged about 9–15.
- **First payer:** operators and funders of structured out-of-school programmes (after-school, clubs, community learning).
- **Smallest useful experiment:** a paper-based, pre-registered cross-context validity study, with **no graph, no custom hardware and no proprietary model**.

The school remains a strong research *venue* because of Algo Peers' access. It doesn't have to be the first *payer*.

**Industry clusters (added, §11).** The HCG must be built *with* the industries whose work defines what capability means in practice. In NBC's countries, sector skills bodies set occupational standards and validate assessments. NBC should engage two clusters first, as co-designers of transfer contexts and future recognisers, not as buyers of children's evidence. A role for the WEF's former Global Agenda Councils (now Global Future Councils) is **rejected as a thesis component** and **accepted as a benchmark and knowledge channel**.

---

## 2. Thesis map

### 2.1 Which version is authoritative

| Version | Status | Use here |
|---|---|---|
| v1 *The Human Capability Utility* | Record (superseded) | Only where v3 quotes it |
| v2 *NBC: Infrastructure for the Next Billion Children* | Record (superseded; DEV-006 → DEV-009) | Only where v3 quotes it |
| **v3 *NBC: The Human Capability Utility* (unified)** | **Authoritative** (founder decision DEV-009) | Primary source |
| Founder correction, 25 Sep 2026 | **Latest direction, overrides v3 on scope** | Reframes NBC around the Human Capability Graph, not schools |

**Conflicts between versions and documents** [SOURCE, verified]:
1. **What the thesis is.** v3 names the thesis "the Human Capability Utility", a network of NBC Nodes (§ Thesis). The founder now names **the Human Capability Graph** as the broader thesis. v3 treats the Capability Graph as *one* implementation hypothesis ("The token, Village AI and even the Capability Graph are implementation hypotheses", §XIX). **Resolution used here:** the founder's statement governs. The graph *purpose* (representing demonstrated capability, development and transfer) is the thesis. The graph *data structure* stays a hypothesis that has to earn its place (§2.5).
2. **Terminology.** v3 says "Capability Graph" (§VII) and "Proof of Human Capability" (§IX). The founder says "Human Capability Graph". Treated as the same object.
3. **Market.** v3 §XVIII and the business model are built around schools and after-school centres paying per term. The founder's correction says schools are one possible entry. This document compares six markets (§5).
4. **COCA bases.** LTV:COCA is quoted as 2.9 (blended COCA $866) in the business model and 1.8 (direct COCA $1,393) in thesis §XIV. Both are correct on their own bases (flagged in study 02).

### 2.2 What the sources establish (extraction)

| Element | What the sources say | Status |
|---|---|---|
| **Algo Peers operations and assets** | Years of computing, physical-computing and AI learning in Ghana. Relationships with 31 Cape Coast public schools (11,214 students; 620 educators profiled). Designs for connections under 70 kbps. 45+ open activities (labs.algopeers.com). An AI pilot with 33 learners and ~8,580 interactions. A paid after-school channel (afterschool.algopeers.com). A Top-4 hardware project at Coolest Projects 2024 | [SOURCE]: operational claims, **not learning evidence**. DEV-007 flags some claims (e.g. "620 trained", "1.4M students") for correction before external use. Revenue figures are not in the sources |
| **Partnerships** | Delivery through Algo Peers Ltd (commercial) and Algo Peers Impacts LBG (sponsored) (business model) | [SOURCE]; written partnerships to verify (open item) |
| **Evidence to date** | No real-world test of NBC's evidence, price or transfer claims. Two synthetic studies. A power check: incremental validity is detectable with ~80 learners (DEV-003) | Synthetic and model outputs only |
| **Long-term ambition** | "Make the intelligence of a great school portable, deliver it as a utility"; community-owned nodes; staged economics up to a contribution economy (§XVIII stages 1–5) | [SOURCE] aspiration, staged by evidence |
| **Human Capability Graph** | *Purpose:* "separate capability from experience"; standards common, pathways adaptive (§VII). *Unit:* capability, evidenced across "substantially different environments", reported as "Proof of Human Capability … under stated conditions" (§IX). *Users:* "the learner, teacher, family and institutions responsible for supporting them" (§IX). Evidence "contextual, contestable, developmental, learner-controlled" | [SOURCE]. **Nodes, edges, evidence schema, uncertainty model and governance are not defined** |
| **Computational matter** | "Parts of the world itself computational": objects with identity, materials holding state, surfaces recognising arrangements, rooms executing rules (§IV). Token = identity + a little memory + proximity/touch + communication + state indication + low power (§V). "The first tokens can be printed paper read by the node's camera" (§V correction) | [SOURCE] hypothesis. **Mechanisms needed now:** machine-readable markers on paper, a camera, a local model to read arrangements, rules that turn state changes into evidence events. RFID/NFC, electronic tokens and programmable materials are later options |
| **Intelligence as a utility** | Expensive intelligence concentrated in shared local nodes (Village AI, §XI), with frontier compute optional; the metric is "the total cost of reliably producing a unit of human capability" (§XVIII) | [SOURCE]. The projections show intelligence at <$1.50 per learner-year by 2027 [MODEL], so compute is not the binding cost |
| **Products and first markets** | P1–P12 with stage gates; Stage 1 Node-as-a-Service at $4 (school) / $6 (centre) / $2.50 (sponsored) per child per term | [SOURCE] assumption; prices untested |
| **Unvalidated assumptions** | *Scientific:* transfer across worlds; state transitions as valid evidence; equal validity across wealth and language; foundations not displaced (§XIX). *Technical:* paper capture reliability; local models good enough; the protocol can express different worlds. *Institutional:* recognisers act on the evidence; public systems adopt without dependence; communities govern data. *Commercial:* B1–B9 (willingness to pay, utilisation ≥160 learners per node, churn, COCA) | [SOURCE]; none tested |

### 2.3 Working definitions (the sources are incomplete; these are mine, labelled)

| Term | Working definition [INFERENCE] | Decision it leaves open |
|---|---|---|
| **Capability** | A person's ability to reach a specified kind of outcome under stated conditions. It is defined by a *family of tasks* and a rubric, not by a label | The grain: "proportional reasoning" or "allocating a resource under a fixed ratio"? |
| **Evidence event** | One record: person × task × context × assistance state × date × who scored it × score × uncertainty | Which fields are mandatory; retention period |
| **Observed performance** | What the person did on a specific task on a specific day | — |
| **Inferred capability** | An estimate, with uncertainty, of how the person would perform across the task family, from several observed performances and a measurement model | Which measurement model; the minimum number of tasks |
| **Predicted performance** | An estimate of performance in a *different* context, using an empirically validated transfer relationship | What counts as "validated": sample size and population |
| **Causal evidence of learning** | Evidence that an experience *caused* a change in capability, from a comparison group or a randomised design | Whether NBC ever makes causal claims to customers |
| **Transfer (as used here)** | Performance in an unpractised context that shares structure but not surface features with the practised one. The *distance* is stated: near, mid or far | How distance is scored |
| **Credibly demonstrated transferable capability (CDTC)** | Optional AI removed; necessary assistive technology retained and recorded (v5 amendment); unpractised context; ≥2 weeks after instruction; blind-scored by someone other than the facilitator against a published rubric; enough tasks to reach a stated reliability | The reliability target by use (0.7 formative-plus, 0.8 high-stakes in the model) |
| **Human Capability Graph (HCG)** | A shared, public map of capabilities (nodes), with typed relationships among them and to contexts (edges), each relationship carrying its evidence. Individual evidence records are held separately, under the person's control, and *reference* the map | Whether a graph is needed at all before transfer relationships exist (see §4) |

### 2.4 Four levels that must not be merged

| Level | Recommendation | Why |
|---|---|---|
| **Long-term architecture** | The HCG as open evidence infrastructure: a public capability map plus person-controlled evidence records, fed by many environments (NBC worlds, apprenticeships, workplaces, schools). Computational matter and shared local intelligence are *generators* of evidence, not the core | It keeps the founder's thesis and avoids tying it to one hardware bet |
| **First application** | Evidence of near-to-mid transfer for 3–5 practical reasoning capabilities (e.g. proportional reasoning, systematic debugging, planning under constraints) in learners aged about 9–15 | Matches Algo Peers' strength, the thesis §XX system and the children-first mission |
| **First payer** | Operators and funders of structured out-of-school programmes, who buy an **evidence report on what their learners can do**, with the learning environment bundled in. Alternative: youth TVET / RPL bodies and youth-employment programmes (§5) | They need evidence for their own funders, decide quickly, and aren't locked into public procurement |
| **Smallest useful experiment** | A cross-context validity study: ~80 learners, 2 worlds, paper instruments, a pretest, a ≥2-week delay, blind scoring, pre-registered. If possible, run a second site in another country to replicate | It tests the claim everything else depends on, for the cost of printing and facilitator time |

### 2.5 Does each component earn its place now?

| Component | Earns its place now? | Why [INFERENCE] | What would change the answer |
|---|---|---|---|
| **A graph (data structure)** | **Not yet** | Without validated transfer relationships, the edges are guesses. A table of evidence records plus an anchor-task bank does everything needed in year one | At least 3 transfer edges measured with adequate samples that predict beyond a pretest. Then the edges carry information a table cannot |
| **Custom hardware** | **No** | Paper plus a phone camera can capture state changes. Osmo shows how vendor-bound tangible hardware is stranded when the owner fails. Maintenance, not chips, sets the cost floor (P2) | Paper capture fails validity or durability tests, *and* a device measurably improves evidence per dollar |
| **A proprietary AI model** | **No** | Open models run on edge devices ([Gemma on Raspberry Pi](https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/)) and inference prices keep falling. The model is not where credibility comes from | A specific scoring task where open models fail and a fine-tune fixes it. Even then, fine-tune an open model |
| **A universal capability taxonomy** | **No** | ESCO, O*NET, Lightcast Open Skills (35k+ skills) and national curricula already exist. A universal taxonomy imposes one culture's categories (vector 13) | Never as universal. Use a small NBC capability set, crosswalked to existing frameworks |

### 2.6 The strategic question: what stays scarce?

> *In a world where machine intelligence becomes increasingly abundant, what remains scarce in the development, demonstration, recognition, and economic use of human capability, and which of those scarcities could NBC address credibly?*

| Stage | Becoming abundant [INFERENCE from vectors 1, 5, 14] | Staying scarce | Could NBC address it credibly? |
|---|---|---|---|
| **Development** | Explanations, practice items, feedback, tutoring, simulations | Structured practice in consequential, physical, social settings. Facilitator attention. Time. Safe space | **Partly.** Designed worlds are a real asset, but many providers can build activities. Not defensible alone |
| **Demonstration** | Polished outputs (essays, code, designs), because AI produces them | **Evidence that the person, unassisted, can do it again somewhere else** | **Yes. The strongest fit.** It needs instruments + transfer measurement |
| **Recognition** | Badges and certificates (1.02M badge types in the US alone, [Credential Engine 2025](https://credentialengine.org/all-resources/2025-counting-credentials/)) | Recognisers' trust, and their willingness to change a decision | **Later, through partners.** NBC can't manufacture trust. It can supply evidence to existing recognisers (RPL bodies, programmes, employers) |
| **Economic use** | Matching algorithms, job boards, AI platforms (e.g. [OpenAI Jobs Platform](https://openai.com/index/expanding-economic-opportunity-with-ai/)) | Jobs themselves; fair selection; contestability | **No, not as a matching business.** Evidence helps only where openings exist, and matching invites bias risk (vector 9) |

**Layer assessment**

| Candidate layer | Scarcity addressed | NBC's credibility | Verdict |
|---|---|---|---|
| Physical environments that develop capability | Development | Medium (Algo Peers operations) | Necessary as the *source* of evidence; not the moat |
| Instruments that capture evidence from consequential action | Demonstration | Medium, rising if the paper-capture tests pass | **Core** |
| Measurement of transfer across environments | Demonstration | Low today, **highest upside**; no evidence yet | **Core**, and the thesis-defining bet |
| Infrastructure for organising and interpreting evidence (HCG) | Demonstration → recognition | Low; nothing to organise yet | **Stage 2**, once transfer edges exist |
| Recognition, credentialing or matching | Recognition, use | Low; needs trust NBC doesn't have | **Partner, don't build** |
| Tools for institutions to invest in capability development | Development, investment | Low to medium; this is what funders buy | **Stage 2 revenue**: evidence reports for programmes and funders |

**Combining layers** [INFERENCE]. The combination of **environments + instruments + transfer measurement** is stronger than any one alone. Transfer can only be measured if you control at least two environments that share structure, and designed worlds are exactly that. Adding the graph, credentialing and matching at the same time adds complexity without adding evidence. Each extra layer has its own validity, governance and sales problem. **Combine vertically only as far as the evidence reaches.**

---

## 3. Benchmark matrix: 14 strategic vectors

*Confidence refers to the observed change, not to NBC's opportunity. Snippet-based sources are marked in the source register (§10).*

| # | Vector | Observed change | Evidence and date | Confidence | NBC opportunity | Threat or contradiction | Strategic implication | Testable assumption |
|---|---|---|---|---|---|---|---|---|
| 1 | **AI capability and cost** | Prices for constant capability are falling steeply. Multimodal models read images and handwriting. Agents are emerging. Use is concentrated in high-income settings | Epoch AI: declines of 9×–900× per year depending on task (2025–26) *(snippet)*. Anthropic Economic Index, Mar 2026 [MEASURED usage]. Anthropic–Gates partnership, May 2026 | High on price trend; medium on reliability in low-resource languages | Intelligence costs <$1.50 per learner-year by 2027 [MODEL P1]. AI can pre-score low-stakes evidence, draft task variants and translate | Cheap AI makes content and tutoring free for everyone, so content isn't a moat. It also makes assisted work indistinguishable from unassisted work | Don't compete on intelligence. Use it to lower evidence costs and compete on validity | Free AI changes cost per credible demonstration by <20% (economics §6). Check against real time logs |
| 2 | **Embodied and physical intelligence** | Low-cost open robot arms. Edge AI on single-board computers. Screenless paper-and-camera computing still lab-stage. A camera-plus-tangibles product failed with its owner | LeRobot SO-101 (~$100–500, 2025) *(snippet)*. Gemma on Raspberry Pi (2025). Dynamicland Realtalk (lab, 2024–25). Osmo: Byju's collapse, IP sold for $825k, Dec 2025 | Medium | Paper plus camera can capture state changes now. Physical tasks are harder to fake with AI | Hardware plus single-vendor dependence is fragile (Osmo). Programmable materials are still research. Tangible programming helps young learners engage, with weaker evidence on loops and conditionals *(snippet)* | Paper first. Add hardware only when it measurably improves evidence per dollar | Paper-token capture agrees with human coding on ≥95% of state changes |
| 3 | **Learning and transfer** | Far transfer is rarely found. AI tutoring shows gains on taught content in low-resource RCTs | Sala & Gobet 2017 (meta-analyses: no far transfer from chess, music or working-memory training) [MEASURED]. World Bank Nigeria AI tutor, ~0.3 SD, 2025 *(snippet)*. Rori in Ghana, effect size 0.37, 2024 *(snippet)* | Medium-high that far transfer is rare | Credible measurement of *near-to-mid* transfer is a real gap, and designed "worlds" suit it | Thesis §IX "transfer becomes a property of the architecture" overclaims. Promising far transfer would fail | Limit claims to stated, structurally similar transfer between designed worlds, and pre-register | Performance in World A predicts World B beyond a pretest (partial r ≥ 0.3) |
| 4 | **Measurement validity** | Evidence-centred design (ECD) is the standard framework. Performance assessments need many tasks because task sampling dominates error. LLM scoring is promising for formative use. OECD is building an open-ended digital learning assessment | Mislevy, Steinberg & Almond 2003 (ECD). Shavelson et al. 1993 [MEASURED]. PISA 2025 *Learning in the Digital World*, results due 2027 [ADOPTION of approach] | High | A task bank with **known reliability** is scarce and defensible | Credibility is costly: 5–9 tasks per capability [MODEL]. OECD may set the reference method | Build the ECD argument (claim → evidence → task) before any graph. Publish the reliability study | Task-error ratio r ≤ 2 for NBC tasks (so 5 tasks reach G ≈ 0.7) |
| 5 | **Human–AI collaboration** | Assisted performance is not learning. Learners with unguarded AI did worse once it was removed. Outsourcing tasks to AI raises performance "with no real learning gains" | Bastani et al., PNAS 2025 [MEASURED]. OECD Digital Education Outlook 2026 *(snippet)* | Medium-high | Evidence that separates *unassisted* from *assisted* performance becomes valuable | Institutions may decide assisted performance is what matters (a "low premium" world, §7) | Make assistance state a mandatory field. Measure both | The assisted–unassisted gap is large and changes a real decision |
| 6 | **Labour and economic demand** | Employers expect 39% of core skills to change by 2030 and name skill gaps as the top barrier (63%). Informality dominates in Africa and South Asia. Entry-level tasks are exposed to automation | WEF Future of Jobs 2025 [FORECAST: employers, Jan 2025]. ILO WESO 2024: ~58% informal globally *(snippet)*. ILO GenAI & jobs 2025 | Medium (forecast); high (informality) | Informal and entry-level labour markets lack signals of practical competence | Youth outcomes are limited by the number of jobs, not only by signals. Evidence doesn't create jobs | Target transitions where real openings exist (apprenticeships, programmes) | A recogniser changes a named decision using NBC evidence |
| 7 | **Credentials and recognition** | Badges are proliferating. Skills-based hiring is mostly rhetoric. RPL systems exist but have limited capacity. Frontier labs are entering certification | Credential Engine, Dec 2025: 1.85M US credentials, 1.02M badges [ADOPTION]. HBS/BGI 2024: 0.14% of hires [MEASURED]. KNQA 600+ RPL awards (ILO) *(snippet)*. OpenAI: certify 10M Americans by 2030 [ASPIRATION: OpenAI]; employer pilots as of May 2026 *(snippet, secondary)* | High | Recognisers need *credible* evidence, not more badges. RPL bodies need assessment capacity | Credential inflation: another badge adds noise. Platform certifications may set norms | Supply evidence to existing recognisers. Don't issue proprietary credentials first | An RPL assessor accepts an NBC evidence record as part of a portfolio |
| 8 | **Data architecture** | Verifiable credentials standardised. Open Badges 3.0 / CLR 2.0 built on them. Credential description language (CTDL). National digital public infrastructure for learner IDs. Open skills taxonomies | W3C VC Data Model 2.0 (Recommendation, May 2025) [ENACTED standard]. 1EdTech OB 3.0 / CLR 2.0. India APAAR IDs, 263.5M *(snippet, PIB Jul 2026)* [ADOPTION]. ESCO, O*NET, Lightcast Open Skills | High | Interoperability is solved well enough: NBC can *export*, not invent | A graph that doesn't map to standards is a dead end. National infrastructure may own identity | Evidence records exportable as OB 3.0 / VC. Crosswalk to taxonomies, don't build one | A recogniser can read an NBC export without custom integration |
| 9 | **Governance and rights** | Child-rights guidance for AI. EU AI Act classes education and employment AI as high-risk and bans emotion recognition in education. Bias audits mandated in NYC hiring. Large study finds racial disparities in algorithmic screening. Proctoring disparities | UNICEF Guidance on AI and Children v3, Dec 2025. EU AI Act (in force, phased 2025–27) [ENACTED]. NYC Local Law 144 [ENACTED]. Stanford-led study of 4M+ Pymetrics-screened applications (Fortune, 26 May 2026) [MEASURED]. Yoder-Himes et al. 2022 (proctoring) [MEASURED] | High | "State of the environment, not the child" is a real differentiator. Contestability and learner control can be designed in | High-stakes use of children's evidence invites harm and regulation. Datafication critiques (Williamson) apply to any graph of people | Prohibit high-stakes selection use of under-18 records. Audit for bias. Learners inspect, contest, export and delete | No differential item functioning by language or school wealth beyond a preset threshold |
| 10 | **Public policy and procurement** | Curricula adding AI, coding and robotics. Continental AI strategy. New data-protection bills. RPL and apprenticeship policies | Ghana basic-school curriculum adds AI and robotics (2026) *(snippet)*. AU Continental AI Strategy, Jul 2024 [ASPIRATION]. Ghana Data Protection Bill announced Mar 2026 *(snippet)*. Ghana CTVET RPL; Kenya KNQA RPL [ENACTED policy] | Medium | New curriculum needs practical-computing assessment. RPL bodies need tools | Procurement takes 1–3 years and demands validated tools. Fear of vendor lock-in | Start with non-procurement buyers. Build public-good evidence to become procurable later | A public agency agrees to co-run a validation study |
| 11 | **Infrastructure economics** | Compute is a small share of cost. Facilitation, distribution and evidence dominate. Connectivity and power are unreliable | NBC models: compute ≈ 11–13% of school-site cost [MODEL]. ISOC 2024 West Africa cable-outage report *(snippet)*. Ghana power reports 2025–26 *(snippet)* | Medium (models); high (outages) | Offline, paper-first designs are robust to outages | Total cost is dominated by people and trust, which don't fall with AI | Optimise facilitator minutes and share validity costs across the network | Facilitator time ≤ 2.5 minutes per learner-task |
| 12 | **Capital and funding** | Large philanthropic AI commitments. Coefficient Giving (formerly Open Philanthropy) has no education fund. Its growth funds target policy | Gates $1B for AI in African languages (Sep 2026) *(snippet)*. Anthropic–Gates $200M (May 2026). Coefficient Giving Abundance & Growth $120M/3 yrs (innovation, energy, clinical trials, housing, state capacity); Global Growth ≥$40M/3 yrs *(snippet)* | Medium | Funders need outcome verification. Measurement public goods are fundable | Funders favour AI tutoring at scale. **Coefficient Giving's direct fit is low** (see note) | Fund the validity research as a public good. Sell evidence services to programme funders | A funder commissions an evidence report on its own programme |
| 13 | **Culture and participation** | Low-resource languages are underserved. Taxonomies originate in high-income labour markets. Disability access is uneven | Gates local-language AI (2026). ESCO/O*NET origins. UNESCO AI competency frameworks (2024) | Medium | Worlds designed with local contexts and multilingual tasks | A universal taxonomy imposes whose capabilities count | Keep capabilities contextual. Co-design worlds locally. Test fairness by language | Tasks work equivalently across two languages |
| 14 | **Competition and substitution** | Portfolios, teacher judgement, exams, employer work trials, AI tutors with built-in assessment, platform certifications, UNICEF Learning Passport | UNICEF Learning Passport: 11.03M registered users in 48 countries (Aug 2025), against a goal of 30M by 2025 [ADOPTION]. OpenAI certifications [COMMERCIAL CLAIM]. PISA LDW | High | Nobody owns credible *cross-context practical* evidence in low-resource settings | A simpler alternative (portfolio + badge + work trial) may be good enough | NBC evidence must beat a portfolio on predictive validity per dollar | NBC evidence predicts World B better than a facilitator's portfolio rating |

**Note on Coefficient Giving (establishing actual fit).** The organisation was renamed from Open Philanthropy in November 2025. Its current fund list includes Abundance & Growth (≥$120M over 3 years; 2026 priorities: innovation, energy, clinical trials, housing, state capacity), Global Growth (≥$40M over 3 years, with partners including the Livelihood Impact Fund, for economic growth in low- and middle-income countries) and global health and wellbeing funds *(snippets; the site is blocked here, so fund pages weren't read directly)*. There is **no education or workforce-skills fund**. **Fit: low for NBC's product.** The only plausible angle is a narrow research proposal on measurement for state capacity or growth, which would need a program officer's interest. Don't plan around it.

### 3.1 How the vectors interact [INFERENCE]

1. **Cheaper AI (1) × human–AI collaboration (5) → measurement (4) and cost (11).** As AI makes outputs free, output-based evidence loses value and the premium moves to evidence of unassisted performance. That evidence needs supervised tasks, more tasks and human raters, so **the same force that makes content cheap makes credible evidence relatively more expensive.**
2. **Data architecture (8) × competition (14).** Open standards commoditise storage, issuing and graph software. Value moves to what standards can't supply: validated tasks and trusted raters (4). A proprietary graph platform would be competing where the value is disappearing.
3. **Governance (9) × recognition (7).** The higher the stakes, the stricter the rights obligations (audits, contestability, fairness testing), so costs rise. Children's evidence used for selection is the highest-risk combination.
4. **Labour (6) × policy (10) × recognition (7).** Large informal economies plus existing RPL policy create a place where evidence of practical competence *already* has an institutional use. That makes youth TVET/RPL a natural second market.
5. **Funding (12) × competition (14).** Philanthropy is funding AI tutors at scale. Tutors create a need for independent verification of what learners can do without the tutor. NBC can be the verifier rather than another tutor.
6. **Culture (13) × measurement (4).** Tasks that function differently by language or context would make the evidence unfair *and* invalid. Fairness testing is part of validity, not an add-on.
7. **Embodied computing (2) × infrastructure economics (11).** Every hardware step adds maintenance, which doesn't fall with chip prices. Paper plus phone keeps the cost structure people-dominated, which is where NBC can use its local operating experience.

---

## 4. Human Capability Graph assessment

**Four things kept separate throughout:**

| Concept | What it is | What it needs | Example |
|---|---|---|---|
| **Observed performance** | What happened: task t, context c, date d, assistance a, scorer s | A reliable capture method and rubric | "Allocated water correctly in 4 of 5 rounds, unassisted, 12 Mar, blind-scored" |
| **Inferred capability** | An estimate, with uncertainty, across a task family | Several tasks plus a measurement model and a reliability study | "Proportional reasoning (resource allocation): secure; ±; 5 tasks, G ≈ 0.7" |
| **Predicted performance** | An estimate for a *new* context | A transfer relationship validated on a comparable population | "Likely to succeed on market-inventory tasks (validated edge, n = 80, Ghana, ages 10–13)" |
| **Causal evidence of learning** | That an experience *caused* the change | A comparison group or randomisation | "Learners in World A gained 0.2 SD more than a waitlist group" |

NBC's evidence records can hold the first today. The second needs the reliability study. The third needs the validity study. The fourth needs a separate trial, and **customers should never be told they are getting it unless that trial exists.**

### Direct answers

**1. Who needs this graph, for what decision, and how often?**
- **Learners and families:** "What can I do, and what should I try next?" Weekly to termly. A low-stakes, formative decision.
- **Facilitators and teachers:** "Which experience next? Who needs help?" Weekly.
- **Programme operators and funders:** "Is our programme building capability that holds up elsewhere? Should we continue or change it?" Once or twice a year. This is the first decision anyone is likely to *pay* for.
- **Recognisers (RPL bodies, apprenticeship providers, employers):** "Can this person be credited or trusted with this task?" At transitions. The high-stakes decision.
- **Researchers and curriculum bodies:** "Which capabilities transfer to which contexts?" The graph's *edges* matter most here, and they're what makes it a graph. Yearly.

[INFERENCE] The only user who needs the *graph* (as opposed to a record) is the one asking about relationships between capabilities and contexts: researchers, curriculum designers and, eventually, the adaptive system choosing the next experience. Learners, operators and recognisers need a clear record.

**2. Who benefits, contributes evidence, pays, and bears the risk of a wrong inference?**

| Role | Who |
|---|---|
| Benefits | Learners (visible capability); programmes (proof of value); recognisers (cheaper, better screening) |
| Contributes evidence | Learners (their actions); facilitators and blind raters (scores); environments (state logs) |
| Pays | First: programme operators and funders. Later: recognisers. **Never learners for high-stakes use** |
| Bears the risk of a wrong inference | **Learners**, above all when a false "not yet" blocks an opportunity, and learners in groups for whom the tasks work less well. This asymmetry is why children's records must not drive selection |

**3. What is a node? What is an edge?**
- **Node** = a capability, defined operationally by a task family and rubric at a stated grain (e.g. "allocate a quantity under a fixed ratio in a resource world"), with a crosswalk to curriculum or ESCO/O*NET codes. **Contexts** (worlds, workplaces, trades) are a second node type.
- **Edges**, which must be typed and carry their evidence:
  - (a) **prerequisite**: hypothesised developmental order. Labelled *hypothesis* until supported by data.
  - (b) **transfer**: performance on capability X in context A predicts performance in context B beyond a pretest. Stored with coefficient, sample, population and date.
  - (c) **crosswalk**: equivalence to an external framework item. Labelled with who asserted it.
- **People are not nodes.** A person's evidence records *reference* the graph; they are not *in* it. That design choice limits surveillance and lets the public map be shared openly.

**4. What makes evidence credible across tasks, facilitators, tools and environments?**
- Enough tasks per claim: task sampling dominates error (Shavelson et al. 1993), so 5 or more for a formative-plus claim and about 9 for a high-stakes one [MODEL].
- Blind scoring against a published rubric, with a measured rater agreement.
- Tasks in at least two contexts that share structure but not surface features.
- A delay after instruction, with assistance removed and recorded.
- Fairness checks (differential item functioning) across language, gender and school wealth.
- An ECD-style argument from claim to evidence to task, published in advance.

**5. How are uncertainty, provenance, recency, assistance and context represented?** As mandatory fields on every evidence event: scorer role (facilitator, blind rater, AI pre-score confirmed by a human), capture method, date and an expiry/decay policy, assistance state (none / AI available / AI used / peer help), and context ID. Inferred capability carries an interval and the number of tasks. Predicted performance carries the edge's sample and population. **No field, no claim.**

**6. What is comparable, and what should stay contextual?**
- *Comparable*, with caution: well-specified reasoning capabilities with shared task families (proportional reasoning, systematic debugging, measurement), within populations where fairness has been checked.
- *Contextual*: collaboration, leadership, creativity, judgement, trade skills tied to local tools and materials, and anything culturally defined. These are reported as narrative evidence with context, **not scores to compare across people.**

**7. How is change or decay represented?** Evidence events are time-stamped. Inferred capability is recalculated with a recency weight, and old evidence is shown as old, not deleted silently. "Not yet demonstrated" is never shown as "cannot". Decay rates are an open research question, so the default is to display dates, not a decay model.

**8. What must never be inferred from this evidence?**
- General intelligence, fixed ability or "potential".
- Personality, character, trustworthiness or emotional state.
- Future job performance or earnings (unless a validated predictive study exists for that exact use).
- Anything about a child from their family, school or neighbourhood.
- That NBC *caused* learning (without a trial).
- Any capability not directly tasked.

**9. Can participants inspect, correct, contest, export and delete?** They must, by design:
- **Inspect:** a plain-language view.
- **Contest:** a re-assessment right with a different rater.
- **Correct:** metadata fixes.
- **Export:** as Open Badges 3.0 / Verifiable Credentials that the person holds.
- **Delete:** raw evidence expires by default; derived records are deleted on request unless the person has chosen to keep them for a live recognition process.

For under-18s, parents or guardians act with the child and the child's views count. This follows UNICEF's guidance *(snippet)* and the thesis §X.

**10. Why would a graph beat a portfolio, assessment record or database?** Today, **it wouldn't.** A portfolio plus a well-designed assessment record answers every year-one question. A graph adds value only when:
- (a) transfer edges exist and let the system say something about a *new* context that a record can't;
- (b) the adaptive system uses edges to choose the next most informative experience;
- (c) several providers contribute to one shared map.

All three need validated edges first. **Recommendation:** HCG v0 = an evidence-record schema + an anchor-task bank + a crosswalk file. Don't use a graph database until at least 3 transfer edges are validated.

**11. Does cross-context evidence create defensible value, or mainly raise validation costs?** Both. It raises costs: two contexts, more tasks, delays and blind rating put an L3 demonstration at ~$25.55 in the after-school model, against ~$19.81 for a formative L1 reading, and pilot scale can push it to ~$145 [MODEL]. It creates defensible value **only if** the evidence predicts better than cheaper alternatives. The asset is then the validated task bank and the transfer coefficients, which competitors can't copy without running the studies. If it doesn't predict better, cross-context evidence is cost without value, and the thesis has to change (§7, S5).

**12. What incentives would persuade institutions to contribute and trust evidence?**
- *Trust:* published validity studies; independent replication; an external assessor on the governance board; bias audits.
- *Contribution:* lower assessment costs for RPL bodies (they gain capacity); evidence reports funders already ask for (programmes); pre-screened candidates with contest rights (employers, later).
- *Reciprocity:* contributors get the aggregated transfer map back.
- **Not** payment for data, which creates perverse incentives.

**13. What could go wrong in high-stakes selection?**
- Wrong "not yet" labels exclude people. Errors fall hardest on groups for whom the tasks work less well (the Pymetrics disparities are the warning).
- Teaching to the anchor tasks destroys their validity.
- Children's early records follow them (permanence).
- Institutions over-trust a number.
- Legal exposure: the EU AI Act treats education and employment AI as high-risk, and NYC LL144 requires bias audits.

**Rule:** no selection use of under-18 records. For adults, evidence is supplementary, contestable and bias-audited, never the only input.

---

## 5. Market comparison and recommended entry point

*Economics column: base-case outputs of `hcg_economics.py` (100-site network, low-income wages, all inputs assumptions). "Per credible demonstration" means per CDTC at L3–L4, or per credible observation at L1–L2 (which fall short of the definition). No market sizes are used or implied.*

| Market | User | Payer | Decision improved | Existing workaround | Evidence burden | Access advantage (Algo Peers) | Adoption friction | Economics [MODEL] | Contribution to the broader thesis |
|---|---|---|---|---|---|---|---|---|---|
| **Makerspaces and informal learning** | Young people and adult makers | Space operators, sponsors, libraries | Which programmes build real skill; member progression | Showcases, project portfolios | Low to medium (L2) | Low to medium: maker and coding communities (DEV-015 directory) | Low, but budgets are small and irregular | ~$1,870 per space-year; ~$52 per credible observation (few learners, heavy equipment) | Rich, varied contexts for transfer. Weak payer |
| **Home and community** | Children and families | Parents; community groups; sponsors | What to practise next; is my child learning? | Report cards, homework, tutors, AI apps | Low (L1) | Medium: parent relationships through after-school | High: no facilitator, hard to guarantee capture quality | ~$442 per cluster-year; ~$25 per formative observation | Tests whether evidence works without institutions. Weak validity |
| **Schools and after-school programmes** | Learners 9–15; teachers; facilitators | Operators and proprietors (per term); programme funders; sponsors for public schools | Programme continuation; what to teach next; showing parents and funders what learners can do | Exams, teacher judgement, showcase days | Medium (L2 routine, L3 on a sample) | **High**: years of operations, 31 public-school relationships, a paid after-school channel [SOURCE] | Medium: term cycles; the synthetic studies found proof and terms dominate [SYNTHETIC] | After-school at L3: ~$1,379 per site-year, ~$23 per learner, **~$25.55 per CDTC** (~$64 incremental/causal). School at L2: ~$11 per learner, ~$7.55 per credible observation | **Directly tests the core claim** (transfer across designed worlds) with fast iteration |
| **TVET and apprenticeships** | Apprentices and trainees 15–24; master craftspeople | RPL bodies (Ghana CTVET, Kenya KNQA); training providers; youth-employment programmes | Credit or certify prior learning; readiness for assessment | Trade tests, observation checklists, master's word | **High (L4)** | Low to medium: no direct relationships yet; policies exist | High: accreditation, assessor standards, slow institutions | ~$5,146 per cohort-year; **~$107 per CDTC** (9 tasks per capability, two raters) | **Tests recognition**: whether institutions act on the evidence. Tests adult-adjacent transfer |
| **Workforce and employer assessment** | Job applicants | Employers | Hiring and placement | Interviews, work trials, psychometric screens (Pymetrics-type) | **High (L4)**, plus legal bias-audit duties | Low | High: legal risk, competing HR vendors | ~$11,751 per employer-year; **~$98 per CDTC** | Tests economic use. **High harm risk**, and outside the children-first mission |
| **Adult reskilling and livelihoods** | Adults in informal work | NGOs, development funders, government programmes | Programme targeting; progress verification | Attendance records, surveys | Medium to high (L3) | Low | Medium: donor-driven | ~$1,489 per programme-year; ~$50 per CDTC | Tests transfer in adults. **Mission change** |

### 5.1 Children-first mission vs all-ages commercial strategy

- **Mission (keep):** *Next Billion Children*: children and young people, with infrastructure that is technically age-agnostic (open standards, a capability map that works for anyone). Designing infrastructure that *could* serve adults is not the same as *serving* adults.
- **Boundary:** youth transitions (15–24: TVET, apprenticeships, first jobs) are **within** the mission if the product serves the young person's transition. Selling assessment to employers, or reskilling for adults of all ages, would be an **all-ages commercial strategy**. That is a mission change, and it needs an explicit founder decision (and possibly a separate entity), not gradual drift.
- **Why it matters** [INFERENCE]: the risk profiles differ. Children's evidence has to stay formative and protected. Adult employer assessment is high-stakes and regulated. Mixing them in one product makes the child-protection promise hard to keep.

### 5.2 Recommendation

**Initial market: structured out-of-school learning for ages ~9–15.** This means after-school programmes, clubs and community learning, including clubs hosted in schools, where Algo Peers already operates.
- **The offer:** a termly programme plus an evidence report showing what learners can demonstrably do, and whether it held up in a new world.
- **The payer:** the operator, parents, or a programme funder that needs evidence for its own reporting.
- **What it tests:** whether consequential action in designed worlds yields valid evidence of near-to-mid transfer; whether paper capture works; whether operators and funders value (and pay for) transfer evidence; facilitator time and cost.
- **What stays unproven:** whether the evidence means anything outside designed worlds (real tasks, workplaces); whether external recognisers trust it; whether results hold in other countries, languages and ages; whether it works at scale without Algo Peers' own staff; any causal learning claim.

**Credible alternative: youth TVET / apprenticeship recognition (ages 15–24).** Work with an RPL body or a youth-employment programme in Ghana or Kenya.
- **What it tests:** whether a recogniser changes a decision based on NBC-style evidence, and whether the evidence transfers from designed worlds to trade tasks.
- **What stays unproven:** children's development, and whether cheaper evidence works at scale (in the model, L4 costs ~2× L3 at the same site and ~4× in a TVET cohort). It also depends on institutional partners who move slowly.

**Why not lead with schools as the payer?** Schools are valuable as a *research venue* (access and a sample), and they can buy later. But paying for evidence isn't their main decision, and public systems buy only after validity is established (vector 10). **Why not employers?** High legal and harm risk, and it's outside the children-first mission.

---

## 6. Intelligence-utility economics

*Full model: `foresight/hcg_economics.py` → `hcg_economics_results.md`. All inputs are assumptions with ranges in the code. The 2025–26 inference-price range and the $193 node amortisation come from earlier sourced or model work. No market sizes.*

### 6.1 The chain from machine intelligence to demonstrated human capability

| Link | Cost line | Declines with scale? | Declines with cheaper AI or devices? | Rises with credibility? |
|---|---|---|---|---|
| 1. AI and computation | Model inference, device amortisation | Somewhat | **Yes, fast** (P1: <$1.50 per learner-year by 2027) | No |
| 2. Physical materials and hardware | Printed tokens, consumables, devices | Yes (volume printing) | Yes (devices) | Slightly (standardised task kits) |
| 3. Maintenance and replacement | Field visits, spares | Slowly (route density) | Little: logistics and wages set the floor (P2) | No |
| 4. Facilitator time | Running tasks, setting up unfamiliar contexts, delayed sessions | No (per learner) | A little (faster capture) | **Yes**: more tasks, more contexts, delays |
| 5. Deployment and distribution | Setup, training, COCA | Yes, if referrals and channels work | No | Somewhat: recognisers need more assurance |
| 6. Evidence collection and validation | Blind scoring, second raters, audit, anchor-task development, reliability studies | Development costs are shared (**yes**); per-task scoring **no** | AI pre-scoring helps formative levels; not the high-stakes decision | **Yes, steeply**: tasks per claim 3 → 9; raters 1 → 2; audit |
| 7. Governance and interoperability | Consent, deletion, bias audits, standards export | Yes (shared) | No | **Yes**: fairness audits, contest processes |
| 8. Customer acquisition and procurement | Sales, pilots, procurement compliance | Yes with reputation | No | Procurement demands validation evidence |

### 6.2 The denominator, operationalised

A **CDTC** is counted when **all** of these hold (fixed before calculation):
1. The capability is pre-specified with a task family and published rubric.
2. The person performs it with optional AI assistance removed. Necessary assistive technology is retained and recorded (v5 amendment). Assistance state is recorded.
3. The context is one they haven't practised in, sharing structure but not surface features.
4. The performance is ≥2 weeks after instruction.
5. It is scored blind by someone other than their facilitator.
6. There are enough tasks to reach the reliability target, G ≥ 0.7 (G ≥ 0.8 for high-stakes). The number of tasks is k = r·G/(1−G), where r is the ratio of single-task error variance to true-score variance.

**Report two numbers and never merge them:**
- **Gross** = cost ÷ demonstrations observed (what it costs to *see* one).
- **Incremental** = cost ÷ (demonstrations − counterfactual demonstrations) (what it costs to *cause* one). This requires causal evidence that doesn't yet exist.

### 6.3 Results [MODEL]

| Finding | Number | So what |
|---|---|---|
| Tasks per capability rise with credibility | Formative 3 → anchored/transfer 5 → high-stakes 9 (r = 2) | Credibility is priced in tasks and raters, not compute |
| After-school site at L3 (CDTC) | ~$1,379 per site-year; ~$23 per learner; **$25.55 per CDTC gross; $63.87 incremental** | The current price assumption of $6 per child per term (~$18/yr) doesn't cover L3 on *every* learner |
| Same site, rising credibility | L1 $19.81 → L2 $21.96 → L3 $25.55 → L4 $53.61 per credible demonstration | A 2× jump at high stakes |
| High-stakes markets | TVET RPL ~$107; employer ~$98 per CDTC | Only payers with high-value decisions can afford L4 |
| Scale | $145 per CDTC at 3 sites → $25.55 at 100 → $22.21 at 1,000 | At pilot scale, validity development is **85%** of cost. The first studies look expensive by design |
| AI → free, plus better devices | Cuts cost per demonstration by ~1–20% | **Cheaper AI doesn't erode or create the advantage** |
| Commoditisable share after the shocks | 11–79% depending on market (lowest in high-stakes) | In high-stakes markets almost all cost is labour, calibration and trust |
| Sensitivity | Demonstration rate 15% → $51.09; 50% → $15.33; high-wage market → $69.85; TVET with r = 4 → $166 | The biggest swings come from scale, demonstration rate, wages, and task agreement in high-stakes use |

**Reconciliation with the earlier model** (`capability_cost_model.py`): it put a school's gross CDTC at ~$6.40. That model counted one demonstration per capability, with no task-sampling requirement. This model adds the tasks needed for a dependable score, so the earlier figure **understated the cost of credibility**. Use this model for evidence-cost questions.

### 6.4 Design implication: credibility sampling [INFERENCE from MODEL]

NBC doesn't need L3 evidence on every learner. The efficient design is:
- **L1–L2 evidence for everyone** (cheap and formative);
- **L3 transfer checks on a rotating sample** (e.g. 20% per term), which *calibrate* the cheap evidence and estimate how well it predicts transfer;
- **L4 only when a recogniser pays** for a specific high-stakes decision.

This is how survey statistics and audit sampling work. It keeps the per-learner price near the current assumptions while producing transfer evidence at programme level.

### 6.5 Does NBC's advantage survive cheaper AI, better devices and open tools?

- **Dramatically cheaper AI:** the cost falls only slightly and no rival gains an edge, because everyone gets the same cheap AI. *Survives*, but only if the advantage was never AI.
- **Better consumer devices:** phones capture evidence well. That helps NBC (no custom hardware needed) and helps competitors equally. *Neutral.*
- **Open-source learning tools:** these copy activities, software and even the graph schema. What they **can't** copy cheaply: (a) the **validated anchor-task bank with published reliability and transfer coefficients**; (b) a **trained, moderated rater network**; (c) **recognisers who have agreed to use the evidence**; (d) Algo Peers' local operating capability.

**Conclusion** [INFERENCE]: NBC's advantage survives *only* if it is built on validity, rater networks and institutional trust. An advantage built on hardware, content or AI would not survive. Open-sourcing the software and schema *strengthens* the position, because it invites contributors while the validity assets remain scarce.

---

## 7. Scenario matrix and narratives

### 7.1 Choosing the axes

AI getting cheaper and more capable happens **in every scenario** (vector 1; projection P1), so it isn't the key *uncertainty* for NBC. Candidate uncertainties, scored on strategic impact and how unresolved they are [INFERENCE]:

| Uncertainty | Impact on NBC | Unresolved? | Chosen? |
|---|---|---|---|
| **A. Premium on verified unassisted capability:** will institutions pay for evidence of what people can do *without* AI, or accept AI-assisted output as the thing that matters? | Very high: it decides whether NBC's evidence has buyers | High: evidence points both ways (vectors 5, 7) | **Yes (axis 1)** |
| **B. Control of recognition:** will capability evidence flow through open, multi-issuer public infrastructure (VCs, national DPI, RPL bodies) or through a few platforms (frontier-lab certifications, job platforms)? | Very high: it decides whether NBC is a contributor or a supplier | High: both are advancing (vectors 7, 8) | **Yes (axis 2)** |
| Whether cross-context transfer evidence proves valid and affordable | Decisive | NBC resolves it by experiment, not by waiting | Handled as the thesis-failure scenario S5 |
| Speed of AI progress | Moderate for NBC | Direction is known | No |
| Regulation of children's data | High but directional (tightening) | Medium | Folded into scenario conditions |

### 7.2 Matrix

| | **Open, multi-issuer recognition** | **Platform-controlled recognition** |
|---|---|---|
| **High premium on unassisted capability** | **S1 · Open Proof** | **S2 · Platform Proof** |
| **Low premium (assisted output is what counts)** | **S3 · Assisted Abundance** | **S4 · Platform Fluency** |

Plus: **S5 · No Transfer** (the central thesis fails) and **S6 · Good-Enough Portfolio** (a simpler alternative captures most of the value).

### 7.3 Narratives

#### S1 · Open Proof (high premium, open recognition)

| Field | Content |
|---|---|
| External conditions | AI-produced work is ubiquitous, so institutions want supervised demonstrations. Governments extend RPL and digital learner records built on open standards |
| Horizons | **0–2 yr:** RPL bodies and programmes pilot practical-evidence portfolios. **3–5 yr:** national records accept verifiable credentials from accredited issuers. **6–10 yr:** cross-issuer capability maps become public infrastructure |
| How people develop and demonstrate capability | Learning with AI; demonstrating without it, in supervised practical tasks across contexts |
| Who controls infrastructure and evidence | Public bodies set standards. Many issuers. Learners hold their records |
| What customers pay for | Validated assessment instruments, assessor capacity, evidence reports |
| NBC's viable role | Accredited evidence provider plus open task-bank steward. Contributes transfer edges to a public map |
| Business model | Programme fees with evidence reports. Assessment services to RPL bodies. Grants for public-good validity research |
| Obsolete | Seat-time certificates; output-only portfolios |
| Leading indicators | RPL volumes rising; VC-based national records; ministries requiring supervised practical evidence |
| Act now | Validity study; OB 3.0/VC export; talks with RPL bodies |
| Defer | Own credential brand; matching |
| Pivot or stop | If accredited issuers must be public bodies only, become a supplier of instruments to them |

#### S2 · Platform Proof (high premium, platform recognition)

| Field | Content |
|---|---|
| External conditions | Frontier labs and job platforms run supervised assessments and certifications at scale (OpenAI's stated aim: 10M certified by 2030 [ASPIRATION]) |
| Horizons | **0–2:** platform certifications for AI fluency. **3–5:** platforms add proctored practical tasks. **6–10:** platform-held skill profiles dominate hiring in formal sectors |
| Development and demonstration | Inside platform ecosystems; proctored online tasks |
| Control | Platforms hold the evidence and set the rules |
| What customers pay for | Platform access. Employers pay the platforms |
| NBC's viable role | **Offline and informal-context evidence supplier** where platforms don't reach: physical tasks, low connectivity, children. Or a validity auditor |
| Business model | Licensing validated tasks to platforms or programmes; programme evidence reports |
| Obsolete | NBC as a credential issuer or matching service |
| Leading indicators | Platforms accepting third-party evidence; proctored practical tasks launched |
| Act now | Keep evidence portable (so learners aren't locked in); publish validity |
| Defer | Any recognition layer |
| Pivot or stop | If platforms reach offline informal contexts cheaply, focus narrowly on children's formative evidence |

#### S3 · Assisted Abundance (low premium, open recognition)

| Field | Content |
|---|---|
| External conditions | Institutions judge people by what they deliver *with* AI. Open standards spread, but the evidence that counts is assisted work |
| Horizons | **0–2:** AI use permitted in assessments. **3–5:** assessments rewritten around human–AI tasks. **6–10:** "unassisted" becomes a niche for safety-critical trades |
| Development and demonstration | Projects done with AI; portfolios of assisted work |
| Control | Open records; many issuers |
| What customers pay for | Programmes that raise productive output with AI |
| NBC's viable role | **Development environments** that build judgement and physical capability (still scarce); evidence of *human-AI* performance, labelled as such |
| Business model | Programme fees; assisted-and-unassisted evidence as a differentiator for funders |
| Obsolete | The purest "AI removed" framing as a selling point |
| Leading indicators | Exams allowing AI; employers hiring on AI-assisted work trials |
| Act now | Record assistance state (both kinds of evidence) |
| Defer | Investments that only make sense for unassisted proof (heavy proctoring) |
| Pivot or stop | Stop positioning on "proof without AI". Position on "capability that holds up across contexts, with or without AI" |

#### S4 · Platform Fluency (low premium, platform recognition)

| Field | Content |
|---|---|
| External conditions | Platforms certify AI-assisted fluency. Children learn through AI tutors |
| Horizons | **0–2:** AI tutors at scale with philanthropic funding. **3–5:** platform learning records. **6–10:** capability defined by platform metrics |
| Development and demonstration | On platforms, with AI |
| Control | Platforms |
| What customers pay for | Access and certifications |
| NBC's viable role | **Weakest.** Physical and social learning environments for young children, plus independent verification for funders who doubt platform metrics |
| Business model | Programmes; independent evaluation for funders |
| Obsolete | HCG as infrastructure |
| Leading indicators | Funders accepting platform metrics as outcomes; ministries adopting platform records |
| Act now | Keep costs low; build verification relationships with funders |
| Defer | All infrastructure layers |
| Pivot or stop | Become an evaluation and programme organisation (Algo Peers' current shape), not an infrastructure venture |

#### S5 · No Transfer (the central thesis fails)

| Field | Content |
|---|---|
| External conditions | Any of the four quadrants |
| What happens | NBC's validity studies find that performance in one designed world doesn't predict performance in another beyond a pretest. Or reliability needs so many tasks that credible evidence is unaffordable |
| Horizons | **0–2:** the first study comes back null or underpowered. **3–5:** replication also fails |
| Development and demonstration | Capability shows up as context-specific skill |
| NBC's viable role | A provider of good *context-specific* learning and evidence (practical skills in named contexts) without transfer claims |
| Business model | Programmes and context-specific evidence; no graph |
| Obsolete | The HCG as a transfer map; "Proof of Human Capability" as a claim that travels across contexts |
| Leading indicators | Null partial correlations; high task-error ratio (r ≥ 4) |
| Act now | Pre-register; power the study; publish either way |
| Pivot or stop | **Stop the transfer claim** after two adequately powered nulls. Keep context-specific evidence if a payer values it |

#### S6 · Good-Enough Portfolio (a simpler alternative captures most of the value)

| Field | Content |
|---|---|
| External conditions | Portfolios + Open Badges + AI tutors with built-in quizzes + employer work trials cover most needs at low cost |
| What happens | NBC's evidence is somewhat more valid, but buyers don't pay for the difference |
| Horizons | **0–2:** operators prefer a showcase and certificate. **3–5:** free platforms offer portfolios |
| NBC's viable role | Contribute validated tasks and rubrics to open portfolio tools; sell a premium where stakes are high (RPL) |
| Business model | Open-source the instruments; paid services for high-stakes users only |
| Obsolete | A proprietary platform |
| Leading indicators | In the validity study, a facilitator's portfolio rating predicts World B about as well as NBC evidence |
| Act now | **Include a portfolio-rating arm in the validity study**, so the comparison is built in |
| Pivot or stop | If the portfolio matches NBC evidence within a small margin, drop the proprietary evidence engine and publish the tasks |

**Robust across scenarios** [INFERENCE]:
- the validated task bank;
- the assistance-state field;
- portable, standards-based records;
- child-protection rules;
- low fixed costs.

**Fragile:** hardware, a proprietary graph platform, a credential brand, matching.

---

## 8. Experiments, milestones and decision triggers

### 8.1 Choices

**Three actions useful across all scenarios**
1. **Build and publish a small anchor-task bank** (3–5 capabilities, 2 worlds each, 5+ tasks per capability), with rubrics and a reliability (G) study. It's valuable in S1–S6, including as an open contribution in S6.
2. **Make every evidence record portable and rights-respecting from day one:** assistance state, scorer role and context as mandatory fields; export to Open Badges 3.0 / Verifiable Credentials; inspect, contest and delete rights; no selection use of under-18 records.
3. **Run a pre-registered cross-context validity study with a portfolio comparison arm, and publish the result either way.** This is the fastest route to knowing which scenario NBC is in (S5 and S6 especially).

**Three inexpensive options that preserve flexibility**
1. **Exploratory conversations with two recognisers from two industry clusters**: a sector skills body or RPL body (Ghana CTVET SSB, Kenya SSAC) and a practitioner group in electrical/electronics/off-grid energy or ICT/digital work (§11.3). Ask what evidence they would accept, and which work tasks would make a good unfamiliar context. No commitments. This keeps the TVET alternative open.
2. **A crosswalk file** mapping NBC's capabilities to the national curriculum, ESCO and O*NET codes. A few days' work that avoids building a taxonomy.
3. **A replication partner in a second country** (an after-school or club network in Kenya, Nigeria or India from the DEV-015 directory), agreed in principle to run the same study later. This keeps the global scope real without cost now.

**Three investments to defer until specific evidence exists**

| Deferred investment | Evidence that would unlock it |
|---|---|
| Custom or electronic tokens, cameras, a node appliance | Paper capture fails on accuracy or durability, **and** a device improves reliability or cost per CDTC by a measured margin |
| A graph database, inference engine or proprietary model | ≥3 transfer edges validated (partial r ≥ 0.3, adequate n, replicated in a second site), and an adaptive-selection use that a table can't serve |
| Credential issuing under an NBC brand, matching, the contribution/settlement layer | A recogniser formally accepts NBC evidence, and an independent audit of fairness and validity has been completed |

**Three thesis-breaking findings to seek actively**
1. **No transfer:** World A performance doesn't predict World B beyond the pretest (partial r < 0.1 with adequate power), and it replicates.
2. **Unaffordable reliability:** the task-error ratio r ≥ 4, so credible transfer claims need 10+ tasks per capability at L3 (17 at L4), and no payer covers that cost.
3. **Simpler is as good:** a facilitator's portfolio rating predicts World B performance as well as NBC evidence does, or the evidence works much worse for one language or group.

### 8.2 4–8 week evidence plan

*Every milestone resolves a decision. Collecting data or finishing a prototype isn't a milestone unless the result says what it establishes. Any data collection with children needs ethics review, parental consent and child assent **before** it starts. Build that time into week 0–1.*

| Type | Current evidence | Available choices | Gating uncertainty | Experiment (weeks) | Decision threshold | If met | If missed |
|---|---|---|---|---|---|---|---|
| **Desirability and demand** | Synthetic studies only: buyers negotiate on proof and terms [SYNTHETIC] | Sell a programme with an evidence report / sell the programme alone / seek grant funding only | Will operators or funders pay for *transfer evidence*, not just activities? | **D1 (wk 1–4):** a priced offer (programme + evidence report, with and without the report as two price variants) to 10 out-of-school operators or programme funders across ≥2 countries | ≥3 of 10 pay a deposit or sign a paid letter of intent; ≥2 name the report as a reason | Keep the evidence-report offer; set the price from the variants | If they buy the programme but not the report: evidence isn't the product for this payer, so test the TVET alternative (D2). If nobody buys: revisit the payer |
| **Desirability (recognisers)** | None | Pursue the TVET alternative now / later / never | Would a recogniser change a decision based on NBC-style evidence? | **D2 (wk 2–6):** show 4 recognisers from **2 industry clusters** (an SSB/SSAC or RPL assessor and a practitioner in each), plus a programme manager, 10 anonymised mock evidence records next to conventional certificates. Structured decision exercise | ≥1 recogniser in each cluster says the record would change a named decision and states which | Open the TVET alternative as a parallel track in that cluster | Keep TVET as an option only; try the second-wave clusters |
| **Institutional trust (industry content validity)** | None | Use designed worlds only / add workplace-like contexts | Do NBC's transfer contexts resemble real work demands in the target clusters? | **I2 (wk 2–6):** practitioners from 2 clusters (≥3 per cluster) review World B tasks and one draft workplace-like task, mapped to the relevant occupational standard (e.g. Kenya CDACC electrical installation; ICT) | ≥2 of 3 practitioners per cluster rate the tasks "recognisably like the work" and each names one change | Build a workplace-like World C for the replication (M3) | Keep designed worlds only; claims stay inside designed contexts |
| **Technical feasibility** | Paper-first design [SOURCE]; no capture test | Paper + phone / paper + node camera / manual coding only | Can paper tokens + a phone camera capture state changes reliably, fast enough? | **T1 (wk 1–3):** 2 sites, 2 worlds; compare automated capture against two human coders on 300 state changes; time the setup | ≥95% agreement with human coders; setup ≤5 min; facilitator ≤2.5 min per learner-task | Use phone capture in V1. No hardware | Use manual paper coding for the study. Hardware stays deferred either way |
| **Learning and measurement validity** | Power check: ~80 learners detect partial r ≈ 0.31 (DEV-003) [MODEL]. No real data | Proceed with the transfer claim / narrow to context-specific evidence / stop | Does evidence from World A predict blind-scored World B performance beyond a pretest, and beat a portfolio rating? | **V1 (wk 1–8):** pre-registered; ~80 learners aged 9–15; pretest → World A (3 weeks) → ≥2-week delay → World B, unassisted, blind-scored with 5 tasks per capability; facilitator's portfolio rating collected before World B; G-study; fairness by language and gender | Partial r ≥ 0.3 beyond the pretest; NBC evidence ≥ portfolio (Δr ≥ 0.1); rater agreement κ ≥ 0.7; r ≤ 2; no fairness gap beyond the preset threshold | Replicate in a second country; begin HCG v0 (record + task bank) | r < 0.1: scenario S5, narrow the claim. Portfolio ≈ NBC: scenario S6, open-source the instruments. r ≥ 4: redesign the tasks before any sale |
| **Learning validity (assistance)** | Bastani 2025; OECD 2026 [MEASURED/snippet] | Record assistance state or not; position on unassisted or assisted evidence | Is the assisted–unassisted gap large enough to matter? | **V2 (wk 4–8), inside V1:** a subset does matched tasks with and without AI help | Gap ≥ 0.3 SD, and recognisers in D2 care about it | Lead with "capability without AI" | Lead with "capability across contexts" (the S3 positioning) |
| **Commercial viability** | Model only: $25.55 per CDTC (after-school, L3); $145 at pilot scale [MODEL] | L3 for everyone / sampled L3 / L1–L2 only | Do real time and cost logs match the model? | **C1 (wk 1–8):** log every minute and dollar in T1 and V1; recompute cost per credible demonstration and per learner | Real cost within 1.5× of the model; sampled-L3 design keeps the per-learner cost ≤ the price point tested in D1 | Set price and credibility sampling from real numbers | Redesign (fewer tasks, group administration) or narrow to funder-paid evidence |
| **Institutional trust and adoption** | None | Seek an institutional partner now / after V1 | Will an institution co-own validation? | **I1 (wk 2–8):** propose a joint validation protocol to one public body or university (e.g. a TVET agency or an education faculty) | A written agreement to co-review the protocol or results | Add an external validator to governance; plan procurement pathway | Publish independently; retry after V1 results |

### 8.3 Milestones and decision triggers

| Milestone | Decision it resolves | Trigger to proceed | Trigger to pivot or stop |
|---|---|---|---|
| **M1 (week 4): demand and capture** | Is there a payer for transfer evidence, and can capture run on paper and a phone? | D1 ≥3 of 10, and T1 ≥95% | D1 0–1 of 10 → test the TVET payer. T1 < 90% → manual coding, and hardware stays deferred |
| **M2 (week 8): validity** | Does NBC's core evidence claim hold in one site? | V1 partial r ≥ 0.3 and ≥ portfolio | Null → S5 path; ≈ portfolio → S6 path |
| **M3 (after replication, ~6 months)** | Does it generalise beyond one population, and to a workplace-like context? | Replication in a second country passes, and World C (co-designed with one industry cluster) shows transfer beyond the pretest | Population fails → claims stay local. World C fails → claims stay inside designed worlds |
| **M4 (12 months)** | Is it time to build the graph and recognition layers? | ≥3 validated transfer edges; a sector skills body or RPL body agrees to review NBC evidence against its occupational standards; the Capability Evidence Council (§11.4) is formed; the cost model holds | Otherwise stay at HCG v0 |

---

## 9. Revised venture thesis

> **NBC: the Human Capability Graph (revised, September 2026)**
>
> As machine intelligence becomes abundant, what becomes scarce is not knowledge but **credible evidence of what people can do on their own, in situations they have not rehearsed, that others will act on**. Billions of young people, especially in low-resource and informal settings, develop real capability that no institution can see, and AI-generated work is making conventional evidence less trustworthy.
>
> NBC's long-term ambition is the **Human Capability Graph**: open infrastructure that represents what people can demonstrably do, how those capabilities develop, and whether they transfer across tasks and environments. It pairs a public, shared map of capabilities and validated transfer relationships with evidence records that people control and can carry. Learning environments of many kinds can feed it, including NBC's computational worlds, schools, apprenticeships and workplaces. Institutions can use it to invest in capability rather than credentials.
>
> **Today that is a hypothesis, not an asset.** No transfer relationship has yet been measured. NBC therefore starts with the smallest claim that everything else depends on: that **evidence from consequential action in one designed environment predicts unassisted performance in a different one**, better than a pretest and better than a simpler portfolio, fairly across languages and groups.
>
> - **First application:** evidence of near-to-mid transfer in practical reasoning capabilities among young people aged about 9–15 in structured out-of-school learning, where Algo Peers already operates.
> - **First payer:** programme operators and funders who need to show what their learners can do. **Alternative:** youth recognition bodies (RPL, apprenticeships, ages 15–24).
> - **First experiment:** a pre-registered, paper-based validity study, replicated in a second country. No custom hardware, proprietary model or universal taxonomy.
> - **What stays true to the original:** children first; "observe the state of the environment, not the totality of the child"; evidence that is contextual, contestable and learner-controlled; public education stays public.
> - **What changes:** the graph, hardware, Village AI and the contribution economy become **staged options**, each unlocked by a named evidence threshold (§8.3). None is an assumption. NBC's defensible assets are validated tasks, a trusted rater network and institutions that accept the evidence, not compute, content or devices, which are getting cheaper for everyone.
> - **Who it is built with:** the industries whose work defines capability in practice. Sector skills bodies and practitioners co-design transfer contexts and review what counts as evidence, through an advisory Capability Evidence Council. Global networks such as the WEF's Global Future Councils serve as benchmarks and knowledge channels, not as governance.
> - **What would end it:** no transfer, reliability too costly to afford, or a simpler portfolio that works as well.

**Changes to the NBC documents this implies (proposed, not adopted):**
1. **Thesis v3:** reframe the thesis around the HCG. Move Node/token/Village AI into "evidence generators (staged)". Replace "transfer becomes a property of the architecture" (§IX) with a testable claim of near-to-mid transfer.
2. **Business model:** add an evidence-report offer and credibility sampling (§6.4). Label L1–L4 evidence levels in all pricing.
3. **Products:** add P0, "HCG v0: evidence-record schema + anchor-task bank + crosswalk", ahead of P1–P12.
4. **DE Step 2 (beachhead):** redefine it as out-of-school programmes for ages 9–15 across ≥2 countries, with TVET/RPL as the named alternative.
5. **Governance:** adopt the rule of no selection use of under-18 records, plus the rights in §4 Q9.
6. **Industry clusters (§11):** add recognisers and industry clusters as a segment and audience; add assumptions B10–B11; add the council function to the architecture.

---

## 10. Source register

*Retrieved 23–25 September 2026. **Access:** "page" = opened directly; "snippet" = search-result text only (the page may have been blocked by the egress policy). Where a snippet reported a figure from a secondary source, that is stated.*

### 10.1 NBC internal sources

| # | Organisation | Title | Date | Location | Claim used | Limitations |
|---|---|---|---|---|---|---|
| I1 | NBC | *NBC: The Human Capability Utility* (thesis v3, unified) | 2026-09-24 | `thesis/v3-unified/THESIS.md` | Definitions of Capability Graph (§VII), transfer (§IX), privacy (§X), staging (§XVIII), research program (§XIX), first system (§XX) | Founder's thesis. Aspirations and hypotheses, not evidence |
| I2 | NBC | Business model v3; products P1–P12; marketing strategy; unit-economics outputs | 2026-09-24 | `business-model/`, `products/`, `go-to-market/` | Prices, B1–B9, COCA, LTV | Model assumptions |
| I3 | NBC | Development log DEV-001–018 | 2026-09-25 | `second-brain/DEVELOPMENT_LOG.md` | Founder decisions; flagged claims (DEV-007); power check (DEV-003) | Internal record |
| I4 | NBC | Foresight 2026; Four methods; projections; cost models | 2026-09-25 | `foresight/` | P1–P5; earlier CDTC model | Models; the earlier CDTC model omitted task sampling (see §6.3) |
| I5 | NBC | Synthetic studies v3 and 02 | 2026-09-25 | `synthetic-market-research-v3/`, `synthetic-research-study-02/` | Buyer objections as hypotheses | **Fictional; not evidence** |
| I6 | NBC | `hcg_economics.py` and its results | 2026-09-25 | `foresight/` | All [MODEL] figures in §5–6 | All inputs are assumptions |

### 10.2 External sources

| # | Organisation | Title | Date | URL | Relevant claim | Limitations |
|---|---|---|---|---|---|---|
| E1 | World Economic Forum | *Future of Jobs Report 2025* | Jan 2025 | https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf | Employers expect 39% of core skills to change by 2030; 63% cite skill gaps as the top barrier; 170M jobs created, 92M displaced | Employer survey; **forecast**; snippet |
| E2 | OpenAI | *Expanding economic opportunity with AI*; *Launching our first OpenAI Certifications courses* | Sep 2025; 2026 | https://openai.com/index/expanding-economic-opportunity-with-ai/ ; https://openai.com/index/openai-certificate-courses/ | Jobs Platform; aim to certify 10M Americans by 2030 | **Aspiration / commercial claim**; status per secondary sources (employer pilots, May 2026); snippet |
| E3 | Anthropic | *Anthropic Economic Index, March 2026* | 2026-03-24 | https://www.anthropic.com/research/economic-index-march-2026-report | Usage patterns; learning by doing; uneven adoption | Usage data from one provider |
| E4 | Anthropic / Gates Foundation | Partnership announcement | 2026-05-14 | https://www.anthropic.com/news/gates-foundation-partnership | Funding for AI in education and health | Announcement; outcomes not yet reported |
| E5 | Gates Foundation (via Fortune) | Coverage of the AI-in-education commitment | 2026-09-19 | https://fortune.com/2026/09/19/the-gates-foundation-ai-schools-teachers-warn-gap-reading-math/ | Large philanthropic AI commitment in Africa | Snippet; Semafor blocked |
| E6 | Epoch AI | *LLM inference price trends* | 2025–26 | https://epoch.ai/data-insights/llm-inference-price-trends | Price declines of 9×–900× per year by task | Snippet; trends may not continue |
| E7 | Coefficient Giving | *Announcing our new $120M Abundance & Growth Fund*; Abundance & Growth fund page; rename announcement | 2025; 2026 | https://coefficientgiving.org/research/announcing-our-new-120m-abundance-and-growth-fund/ ; https://coefficientgiving.org/funds/abundance-and-growth/ ; https://coefficientgiving.org/research/open-philanthropy-is-now-coefficient-giving/ | ≥$120M/3 yrs; 2026 priorities: innovation, energy, clinical trials, housing, state capacity. Global Growth ≥$40M/3 yrs. No education fund | **Snippet only (site blocked)**; fit is my inference |
| E8 | OECD | *Digital Education Outlook 2026* | Jan 2026 | https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html | Outsourcing tasks to GenAI raises performance "with no real learning gains" | Snippet; synthesis of studies |
| E9 | OECD | *PISA 2025 Learning in the Digital World* | Framework 2023–25; results due 2027 | https://www.oecd.org/en/topics/sub-issues/learning-in-the-digital-world/pisa-2025-learning-in-the-digital-world.html | Open-ended digital environments to assess self-regulated learning and computational problem solving | Results not yet published |
| E10 | OECD | PISA 2025 press release | Sep 2026 | https://www.oecd.org/en/about/news/press-releases/2026/09/pisa-2025-students-reading-and-mathematics-performance-declined-sharply-across-the-oecd.html | Reading and maths declines; excessive device use associated with lower performance | Snippet; OECD countries; correlational |
| E11 | UNESCO | AI competency frameworks for students and teachers | 2024 | https://www.unesco.org/en/articles/what-you-need-know-about-unescos-new-ai-competency-frameworks-students-and-teachers | Normative competency frameworks | Normative, not evidence |
| E12 | UNICEF | *Policy guidance on AI and children* (v3) | Dec 2025 | https://www.unicef.org/innocenti/reports/policy-guidance-ai-children | Child-rights requirements for AI systems | Guidance; snippet |
| E13 | UNICEF | *The Learning Passport reaches over 10 million* | 2025-03-25 | https://www.unicef.org/partnerships/learning-passport-unicefs-digital-learning-programme-reaches-over-10-million | 10M+ users in 47 countries (Mar 2025); 11.03M in 48 (Aug 2025 progress report); the goal was 30M by 2025 | Registered users, not learning outcomes |
| E14 | ILO | *Generative AI and jobs: 2025 update*; *WESO Trends 2024* | May 2025; 2024 | https://www.ilo.org/publications/generative-ai-and-jobs-2025-update ; https://www.ilo.org/sites/default/files/2024-06/WESO_May2024%20-%20Final_30-05-24_2.pdf | Exposure of tasks to GenAI; ~58% informal employment globally | Snippet; exposure is not displacement |
| E15 | World Bank | Nigeria AI tutoring pilot | 2025 | https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324 | ~0.3 SD gains after a short after-school programme | Snippet; single pilot |
| E16 | Henkel et al. (Rori) | *Effective and scalable math support: evidence on the impact of an AI tutor* (Ghana) | 2024 | https://arxiv.org/abs/2402.09809 | Effect size ~0.37 on maths | Snippet; preprint; taught-content outcomes |
| E17 | Bastani et al. | *Generative AI without guardrails can harm learning* (PNAS) | 2025 | https://www.pnas.org/doi/10.1073/pnas.2422633122 | Unguarded GPT-4 users did worse once AI was removed | Snippet; one high-school context (Türkiye) |
| E18 | African Union | *Continental Artificial Intelligence Strategy* | Jul 2024 | https://au.int/en/documents/20240809/continental-artificial-intelligence-strategy | Continental priorities for AI | **Aspiration**; implementation varies |
| E19 | Ghana CTVET | Recognition of Prior Learning; National Apprenticeship Policy | Current | https://ctvet.gov.gh/recognition-of-prior-learning/ | RPL and apprenticeship policy exist | Snippet; volumes unknown |
| E20 | Kenya KNQA; ILO | KNQA RPL service; ILO article on Kenya RPL | 2024–25 | https://knqa.go.ke/service/recognition-of-prior-learning/ ; https://www.ilo.org/resource/article/self-taught-certified-kenyas-recognition-prior-learning-rpl-awards-over-600 | 600+ RPL awards | Snippet; small scale |
| E21 | Government of India (PIB) | APAAR / Academic Bank of Credits | Jul 2026 | https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202675912501.pdf | 263.5M learner IDs | Snippet; IDs are not usage |
| E22 | Credential Engine | *Counting Credentials 2025* | Dec 2025 | https://credentialengine.org/all-resources/2025-counting-credentials/ | 1,850,034 US credentials; 1,022,028 badges; 134,491 providers | US only; the jump partly reflects better counting |
| E23 | 1EdTech | *2025 Badge Count*; CLR/Open Badges FAQ | 2025 | https://www.1edtech.org/1edtech-article/2025-badge-count-shows-accelerating-momentum-in-digital-credentials/411353 ; https://www.1edtech.org/clr/faq | Growth of digital badges; OB 3.0 / CLR 2.0 standards | Industry body; snippet |
| E24 | W3C | *Verifiable Credentials Data Model 2.0* | May 2025 | https://www.w3.org/TR/vc-data-model-2.0/ | Standard for portable, verifiable claims | A standard, not adoption evidence |
| E25 | Harvard Business School & Burning Glass Institute | *Skills-Based Hiring: The Long Road from Pronouncements to Practice* | Feb 2024 | https://www.hbs.edu/managing-the-future-of-work/Documents/research/Skills-Based%20Hiring.pdf | ~0.14% of hires affected at firms that removed degree requirements | US firms; snippet |
| E26 | Shavelson, Baxter & Gao | *Sampling variability of performance assessments* (J. Educational Measurement 30(3)) | 1993 | https://doi.org/10.1111/j.1745-3984.1993.tb00424.x | Task sampling dominates error; many tasks are needed; rater error small with trained raters | Older; US science and maths tasks; but foundational and widely replicated |
| E27 | Sala & Gobet | *Does far transfer exist? Negative evidence from chess, music, and working memory training* (Current Directions in Psych. Science 26(6)) | 2017 | https://doi.org/10.1177/0963721417712760 | Far transfer is rarely found; effects shrink with better designs | Concerns far transfer from specific trainings; near transfer is not addressed |
| E28 | Mislevy, Steinberg & Almond | *On the structure of educational assessments* (Measurement 1(1)) | 2003 | https://doi.org/10.1207/S15366359MEA0101_02 | Evidence-centred design: competency, evidence and task models | Framework, not an empirical result |
| E29 | Educational Research Review | *Taking the maker movement to school: a systematic review of preK-12 school-based makerspace research* | 2021 | https://www.sciencedirect.com/science/article/abs/pii/S1747938X21000361 | 22 empirical studies; outcomes varied; assessment methods underdeveloped | Snippet; mostly middle/high school in high-income settings |
| E30 | Osmo / Byju's (Wikipedia; Lowpass) | *Osmo (game system)*; *Osmo rises from the ashes* | 2024–26 | https://en.wikipedia.org/wiki/Osmo_(game_system) ; https://www.lowpass.cc/p/osmo-is-back-ar-edutainment-ipad-apps | Operations shut in 2024 after Byju's collapse; IP sold for $825,000 to former staff, Dec 2025 | Secondary sources; snippet |
| E31 | Dynamicland | Dynamicland / Realtalk | 2024–25 | https://dynamicland.org/ | Screenless, paper-and-camera communal computing, still a research lab | Snippet; not a deployed product |
| E32 | Raspberry Pi | *Mastering edge AI on Raspberry Pi with LiteRT and Gemma* | 2025 | https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/ | Open models run on low-cost edge devices | Vendor blog; snippet |
| E33 | Hugging Face / The Robot Studio | LeRobot SO-101 arm | 2025 | https://github.com/TheRobotStudio/SO-ARM100 | Open-source robot arm at ~$100–500 in parts | Snippet; price depends on sourcing |
| E34 | European Union | *AI Act regulatory framework*; FPF analysis of the emotion-recognition prohibition | 2024–26 | https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai ; https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/ | Education and employment AI are high-risk; emotion recognition is banned in education and workplaces | **Enacted**; EU jurisdiction; phased application |
| E35 | New York City (DCWP) | Automated Employment Decision Tools (Local Law 144) | In force 2023 | https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page | Bias audits required for automated hiring tools | **Enacted**; NYC only; enforcement criticised |
| E36 | Fortune; Stanford Report | *Largest study of AI hiring algorithms … finds "clear racial disparities"*; *AI hiring tools show racial bias* | 2026-05-26; Jun 2026 | https://fortune.com/2026/05/26/ai-hiring-algorithm-racial-disparities-pymetrics-stanford-study/ ; https://news.stanford.edu/stories/2026/06/ai-hiring-tools-racial-bias-research | 4M+ applications, 156 employers; 26% of Black applicants applied to positions with adverse-impact outcomes | Snippet; one vendor; press coverage of a paper |
| E37 | Yoder-Himes et al. (Frontiers in Education) | *Racial, skin tone, and sex disparities in automated proctoring software* | 2022 | https://www.frontiersin.org/articles/10.3389/feduc.2022.881449/full | Proctoring flags students with darker skin more often | One study; US university |
| E38 | Williamson | *Big Data in Education: The Digital Future of Learning, Policy and Practice* (SAGE) | 2017 | https://uk.sagepub.com/en-gb/eur/big-data-in-education/book245835 | Datafication critique: data systems reshape what counts as learning | Critical scholarship; argumentative |
| E39 | ESCO; O*NET; Lightcast | ESCO classification; O*NET; Lightcast Open Skills | Current | https://esco.ec.europa.eu/ ; https://www.onetcenter.org/ ; https://lightcast.io/open-skills | Existing skills taxonomies (Lightcast 35k+ skills) | Built from formal labour markets in high-income economies |
| E40 | Credential Engine | Credential Transparency Description Language (CTDL) | Current | https://credreg.net/ctdl/handbook | Schema for describing credentials and competencies | A standard, not adoption evidence |
| E41 | Ghana (NaCCA; News Ghana); GNA | AI and robotics in the basic-school curriculum; Data Protection Bill announcement | May–Jul 2026; Mar 2026 | https://www.newsghana.com.gh/ghana-integrates-ai-and-robotics-into-basic-school-curriculum/ ; https://gna.org.gh/2026/03/govt-to-introduce-new-data-protection-bill-to-regulate-ai-cross-border-data-flows/ | Curriculum change; data-protection reform | Snippet; implementation unknown |
| E42 | Internet Society | *2024 West Africa submarine cable outage report* | 2024 | https://www.internetsociety.org/resources/doc/2024/2024-west-africa-submarine-cable-outage-report/ | Connectivity shocks | Snippet |
| E43 | World Economic Forum | Network of Global Future Councils, 2025–26 term (concept note; council list) | Mar 2025 – Dec 2026 | https://initiatives.weforum.org/global-future-council/councils ; https://www3.weforum.org/docs/WEF_GFC_2025_2026_Concept_note.pdf | 37 thematic councils, 700+ experts, a "time-bound think-tank". The former Global Agenda Council URLs now point to the Global Future Councils page | Snippet; the selection process wasn't verified |
| E44 | World Economic Forum | Global Future Council on Human Capital Development; *New Economy Skills: Unlocking the Human Advantage* | 2025 | https://initiatives.weforum.org/global-future-council-on-human-capital-development/home | Defines human-centric skills; proposes a framework for assessing, developing and credentialling them; co-chaired by Ricardo Hausmann (Harvard Growth Lab) | Snippet; white paper, not an evaluation |
| E45 | World Economic Forum | *Global Skills Taxonomy Adoption Toolkit* | 2025 (taxonomy 2021) | https://www.weforum.org/publications/global-skills-taxonomy-adoption-toolkit-defining-a-common-skills-language-for-a-future-ready-workforce/ | A "common skills language" for employers, governments and educators | Snippet; adoption evidence not reported |
| E46 | World Economic Forum | *Reskilling Revolution on track to reach over 850 million people* | Jan 2026 | https://www.weforum.org/press/2026/01/world-economic-forum-reskilling-revolution-on-track-to-reach-over-850-million-people/ | Goal of 1B people by 2030; commitments reported for 856M; 79 economies, 18 industries, 350+ organisations | **Self-reported commitments and reach**, not demonstrated capability; snippet |
| E47 | World Economic Forum | UpLink Innovation Challenge Series, Spring 2026 | 2026 | https://uplink.weforum.org/uplink-innovation-challenge-series-spring-2026 | Challenges open to startups that have raised <$50M; the Spring 2026 themes don't include education | Snippet; themes change each series |
| E48 | Ghana CTVET (with GIZ/EU Pact for Skills) | Coverage of Sector Skills Bodies | Dec 2023 | https://citinewsroom.com/2023/12/ctvet-pact-for-skills-project-collaborate-to-put-sector-skill-bodies-into-the-spotlight/ ; https://gtvets.gov.gh/tvet-qualifications-framework/ | Industry-led SSBs (agriculture, construction, tourism and hospitality) generate and validate occupational standards for CBT Levels 1–5 | News coverage; snippet; current activity levels unknown |
| E49 | Kenya TVET CDACC | Sector Skills Advisory Committees (appointment and functions) | 2023 | https://www.tvetcdacc.go.ke/wp-content/uploads/2023/07/Appointment-Requirements-and-Functions-of-SSAC.pdf | 98 SSACs; 406 competency-based occupational standards; SSACs validate assessment tools and take part in assessment | Snippet; counts may have changed |
| E50 | India NSDC | Sector Skill Councils; National Occupational Standards | Current | https://www.nsdcindia.org/products/sector-skill-council ; https://nsdcindia.org/nos | 36 operational SSCs; 1,319 qualification packs; 6,625 NOS; RPL through SSC-empanelled providers | Snippet; figures from NSDC pages of uncertain date |

**Not accessible or not verified:**
- the NotebookLM notebook;
- full texts behind blocked domains (Coefficient Giving, Semafor, LinkedIn, Taylor & Francis);
- Coefficient Giving grant lists (no education grants found);
- revenue data for Algo Peers' after-school channel.

The "3.5 vs ~20 percentage points" figure on degree removal vs assessment infrastructure appeared only in blog summaries and is **not used**. Tangible-programming findings rest on search snippets of reviews and are described qualitatively only.

---

## 11. Industry clusters and the council function

*Added 25 September 2026 in response to the founder's follow-up:*
> *"Benchmark the thesis and add a role of the Global Agenda Council — shouldn't that also define that we speak to other clusters of industries if we are thinking of the future of learning and human capability? Be objective, you can reject or accept."*

### 11.1 Benchmark: who actually convenes industries around skills and evidence?

| Body | What it is today | Evidence and date | What it means for NBC |
|---|---|---|---|
| **WEF Global Agenda Councils → Global Future Councils** | The Agenda Councils no longer exist under that name. The WEF's expert network is now the **Network of Global Future Councils**: 37 thematic councils, 700+ experts from academia, business, government and civil society, working as a "time-bound think-tank" for the term March 2025 – December 2026. The old Global Agenda Council web addresses point to the Future Councils page | E43 [ADOPTION of a network; snippet] | Advisory and convening, **not** a recognition or standards authority. The Forum convenes the members; I found no open application route (not verified) |
| **Global Future Council on Human Capital Development** | Co-chaired by Ricardo Hausmann (Harvard Growth Lab). Published *New Economy Skills: Unlocking the Human Advantage* (2025), which defines human-centric skills and proposes a framework for **assessing, developing and credentialling** them | E44 [ASPIRATION/framework] | The closest global analogue to the HCG's evidence question. It is **both a benchmark and a potential rival framing.** A Harvard route to a conversation may exist through the founder's HGSE network [INFERENCE] |
| **WEF Global Skills Taxonomy** | A "common skills language" (2021), with an adoption toolkit (2025) | E45 | This is the *universal taxonomy* that §2.5 advises NBC not to build. **Crosswalk to it** |
| **WEF Reskilling Revolution** | Aims to reach 1 billion people by 2030. In January 2026 it reported commitments to reach 856M+ across 79 economies and 18 industries | E46 [self-reported ASPIRATION/reach] | It counts *reach*, not *demonstrated capability*. That is the exact gap NBC's evidence addresses [INFERENCE] |
| **WEF UpLink** | Startup challenges (for startups that have raised <$50M). The Spring 2026 themes don't include education | E47 | An opportunistic channel only |
| **Ghana CTVET Sector Skills Bodies (SSBs)** | Industry-led bodies (agriculture, construction, tourism and hospitality, and others), set up with GIZ/EU Pact for Skills support. They generate and validate occupational standards for competency-based training, Levels 1–5 | E48 [ENACTED structure; snippet] | **The real "industry cluster councils" in NBC's first country.** They decide what counts as competence in their sector |
| **Kenya TVET CDACC Sector Skills Advisory Committees (SSACs)** | 98 committees of industry experts, trainers, professional bodies and regulators. They developed 406 occupational standards, validate assessment tools and take part in competency-based assessment | E49 [ENACTED structure; snippet] | A direct route to "is this evidence acceptable?" in a second country |
| **India NSDC Sector Skill Councils (SSCs)** | 36 operational councils; 1,319 qualification packs; 6,625 National Occupational Standards; RPL through empanelled providers | E50 [ADOPTION; snippet] | The largest working model of industry-defined standards plus recognition of prior learning |

**Reading** [INFERENCE]: global councils shape the *language and agenda*. National sector skills bodies control the *standards and recognition* that decide whether evidence changes a young person's opportunities. For the HCG, the second matters more, sooner.

### 11.2 Verdict

| Proposal | Verdict | Reason |
|---|---|---|
| Add "a role for the Global Agenda Council" to the thesis | **Reject as written** | (1) The body no longer exists under that name. (2) A thesis should not depend on a body NBC doesn't control and can't join on request. (3) The councils are advisory and time-bound (this term ends December 2026). They don't recognise or certify anyone, so they can't make NBC's evidence count |
| Use the WEF network, Global Skills Taxonomy, *New Economy Skills* framework and Reskilling Revolution as **benchmarks and a knowledge channel** | **Accept** | This is where the global "common skills language" and human-skills credentialing frameworks are being set. NBC should crosswalk to them. Once NBC has results (M2), it has something to contribute |
| Build a **council function** into NBC's architecture | **Accept, in a different form** | The HCG needs someone to decide what counts as credible evidence for which decision (§4 Q12). NBC should create an advisory **Capability Evidence Council**, modelled on SSACs rather than on the WEF: recognisers from ≥2 industry clusters, an education/TVET authority, a psychometrician, a child-rights and data-protection expert, and a youth and parent voice. It stays advisory until evidence exists, and forms after M2 |
| **Speak to other industry clusters** when thinking about the future of learning and human capability | **Accept, bounded** | Industry clusters supply three things the thesis can't get elsewhere: (a) **unfamiliar, real contexts** for measuring transfer (§4 Q3); (b) the **standards and validation** of what counts (SSBs, SSACs, SSCs); (c) the answer to scenario axis 1, **whether anyone pays a premium for unassisted capability** (§7) |
| Speak to **all** clusters now | **Reject** | The 4–8 week plan has room for two clusters, not eighteen. Breadth before evidence repeats the architecture-before-evidence weakness (§1) |

**Mission guard.** Industry engagement serves children's and young people's pathways: task design, standards alignment, and later recognition for 15–24-year-olds. It is **not** a pivot to adult or employer assessment (§5.1). No industry partner receives children's evidence, and there is no selection use of under-18 records.

### 11.3 Which clusters first, and why

Criteria:
1. Capability is practical and observable, so it fits evidence from consequential action.
2. A recognition body exists in at least one NBC country.
3. Young people enter the sector in large numbers, often informally.
4. It fits Algo Peers' strengths (computing, physical computing, AI).
5. AI is changing the tasks, so the assisted-vs-unassisted question is live.

Ratings are [INFERENCE]. No sector sizes are claimed.

| Cluster | 1 Practical | 2 Recognition body | 3 Youth entry | 4 Algo Peers fit | 5 AI changes tasks | Role for NBC | Priority |
|---|---|---|---|---|---|---|---|
| **Electrical, electronics and off-grid energy** (installation, repair, solar) | High | Kenya CDACC electrical-installation standards; Ghana CBT trades | High | **High** (physical computing, circuits, debugging) | Medium | Workplace-like transfer contexts for systematic debugging and measurement; RPL link | **First wave** |
| **ICT and digital services** (support, data work, including AI data work) | Medium-high | Kenya CDACC ICT standards; India IT-ITeS SSC | High | **High** | **Very high** | The sharpest test of assisted vs unassisted evidence; a link to AI labs (P12, stage 5) | **First wave** |
| **Construction and built environment** | High | Ghana SSB (construction) | High | Medium (measurement, proportional reasoning, planning) | Low-medium | Transfer contexts for measurement and proportional reasoning; an SSB relationship in Ghana | Second wave |
| **Agriculture and agro-processing** | High | Ghana SSB (agriculture) | High | Medium (resource allocation, planning under uncertainty) | Medium | Contexts close to the thesis's water and market worlds | Second wave |
| Tourism and hospitality | Medium | Ghana SSB | High | Low | Medium | Communication and service contexts | Later |
| Health and care | High | Kenya community-health standards | Medium | Low | Medium | Regulated and high-stakes | Later |
| Frontier AI labs (not a cluster in the SSB sense) | — | — | — | Medium | — | Possible buyers of evaluation worlds built without child data (P12); funders | Keep warm; no data sharing |

### 11.4 Tactics this adds (all cheap, in order)

> **Deferred, pending founder decision D4 ([reconciliation](../strategy/RECONCILIATION.md)).** With a 9–12 first task family (v5), SSB/SSAC conversations, practitioner review of workplace-like tasks and the Capability Evidence Council move to after the first eight-week cycle. In this cycle, keep only T1 (desk crosswalk) and one domain-informed reviewer for the CVS tasks.

| # | Tactic | When | Output | Decision it informs |
|---|---|---|---|---|
| T1 | **Desk crosswalk:** map NBC's 3–5 capabilities to the relevant occupational standards (Kenya CDACC electrical installation and ICT; Ghana CBT trades) and to the WEF Global Skills Taxonomy | Week 1 | A crosswalk file (part of HCG v0) | Which workplace tasks can serve as unfamiliar contexts |
| T2 | **Practitioner review** of World B and one workplace-like task (experiment I2, §8.2) | Weeks 2–6 | Content-validity ratings | Whether to build World C with a cluster |
| T3 | **Recogniser conversations** with an SSB or SSAC and practitioners in two clusters (experiment D2) | Weeks 2–6 | Decision-exercise results | Whether TVET/RPL becomes a parallel track |
| T4 | **Form the Capability Evidence Council** (advisory, 6–8 people) | After M2 | Terms of reference; first review of the evidence standard | Governance of what counts before any recognition layer |
| T5 | **Global knowledge channel:** a 2-page note, "Transfer evidence for human-centric skills", sent to the GFC on Human Capital Development's network (for example through Harvard contacts) | **Only after M2**, with results | A note and a conversation | Whether global frameworks cite or adopt transfer evidence |

**What not to do:** claim any WEF affiliation; pay for event access; pitch employers on screening children; build a sector taxonomy.

### 11.5 Draft messages (drafts only; not sent. The founder decides whether and when to send)

**To a sector skills body (Ghana) or SSAC (Kenya):**
> Subject: A short conversation on evidence of practical skill among young people
>
> Dear [name], I lead Algo Peers, which has run computing and physical-computing programmes for young people in Ghana. We are testing whether young people's practical problem-solving, observed in one setting, still holds when the task changes, and how that evidence could be presented so that bodies like yours can judge it against your occupational standards. We are not selling a product or asking for data. Could we have 30 minutes to learn which forms of evidence your sector already trusts, and which workplace tasks you would regard as a fair test? We would share our study protocol and results with you. With thanks, Sam Quansah

**To a practitioner (a master electrician, solar installer or IT support lead):**
> Subject: Would these tasks look like real work to you?
>
> Hello [name], we are designing short practical tasks to see whether young people can apply what they have learned to a problem they haven't seen before. We'd value 45 minutes of your judgement on whether three draft tasks look like the real work in your trade, and what you would change. We can offer [a modest honorarium / acknowledgement in the study report]. No personal data is involved. Sam Quansah, Algo Peers

### 11.6 New assumptions (carried into the business model)

| # | Assumption | Test |
|---|---|---|
| **B10** | Recognisers in at least one industry cluster would accept NBC evidence as an input to a named decision | D2; M4 |
| **B11** | Transfer from designed worlds extends to workplace-like tasks co-designed with an industry cluster | I2 → World C at M3 |
