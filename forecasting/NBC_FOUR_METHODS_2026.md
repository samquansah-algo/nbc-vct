# NBC under uncertainty: four complementary methods

> **Superseded on scope (25 Sep 2026).** NBC is now framed around the **Human Capability Graph**, with schools as one possible entry market. Where this document treats NBC as a school or node product, [`NBC_HCG_STRATEGY_2026.md`](NBC_HCG_STRATEGY_2026.md) takes precedence. Its evidence-cost model (`hcg_economics.py`) also supersedes the CDTC figures here.

*25 September 2026. A companion to [`NBC_STRATEGIC_FORESIGHT_2026.md`](NBC_STRATEGIC_FORESIGHT_2026.md). The four methods are kept separate on purpose: none of them is a prediction that NBC succeeds.*

**Labels used throughout:**

| Label | Meaning |
|---|---|
| **[SOURCED]** | Dated external fact, with citation |
| **[CALC]** | Output of [`projections.py`](projections.py) or [`capability_cost_model.py`](capability_cost_model.py) |
| **[JUDGEMENT]** | Analyst estimate |
| **[VALUE]** | Normative choice |
| **[FICTION]** | Constructed scenario or persona element |
| **[SIM]** | Earlier synthetic study (not evidence) |

---

## 0. Why not limit the scope to Ghana? (The founder's question)

**Short answer:** there's no reason to limit the *mission* or the *evidence* to Ghana. My earlier report did so implicitly by building its forecasts, actors and costs around Ghana, and that was a mistake. Ghana is only a candidate for the **first sales test**, because that is where the founder has access. The analysis below separates three scopes.

| Scope | Recommended boundary | Why |
|---|---|---|
| **Mission** | Children and young people (about 8–24) in low-resource settings worldwide, i.e. the "next billion". High-income settings serve as comparators and later markets | The problems are global: about 2 billion informal workers, 58% of global employment ([ILO 2024](https://www.ilo.org/sites/default/files/2024-06/WESO_May2024%20-%20Final_30-05-24_2.pdf)); about 1.3 billion people aged 15–24 by 2030 ([UN](https://www.un.org/esa/socdev/documents/youth/fact-sheets/YouthPOP.pdf)); learning poverty around 70% across low- and middle-income countries ([World Bank 2022](https://www.worldbank.org/en/news/press-release/2022/06/23/70-of-10-year-olds-now-in-learning-poverty-unable-to-read-and-understand-a-simple-text)) [SOURCED] |
| **Evidence** | **At least two countries and two or more languages from the first validity study** | The core claims (transfer, and equity across language and wealth) are only meaningful if they hold across contexts. A Ghana-only validation would prove little about the "next billion" [JUDGEMENT] |
| **First sales test** | One market at a time (Disciplined Entrepreneurship Step 2), **chosen on merit, not by default** | Selling needs concentration. The choice should be re-scored, as below |

**Re-scoring the first sales market** [JUDGEMENT; H/M/L]. The facts cited are [SOURCED]; the ratings are judgements.

| Criterion | Ghana (Cape Coast / Central) | Nigeria (Lagos) | Kenya (Nairobi) | India (low-fee private schools, e.g. Uttar Pradesh) |
|---|---|---|---|---|
| Density of fee-charging private providers | M: ~28–30% of primary enrolment is private ([R4D](https://r4d.org/resources/exploring-public-and-private-education-costs-ghana/)) | **H**: ~14,000 low-cost private schools enrolling ~70% of Lagos children ([FEE summary of Tooley](https://fee.org/articles/low-cost-private-schools-are-revolutionizing-education-for-millions-of-children-in-developing-nations/)) | M–H: over 40% of the poorest slum families use private schools (same source) | **H**: NISA claims 65,000–100,000 member schools ([NISA](https://nisaindia.org/)) |
| Recognition infrastructure for skills | M: CTVET RPL ([CTVET](https://ctvet.gov.gh/recognition-of-prior-learning/)) | M: NAPPS for schools; RPL less visible | **H**: a KNQA RPL portal and MIS; over 600 RPL certificates with ILO support ([ILO](https://www.ilo.org/resource/article/self-taught-certified-kenyas-recognition-prior-learning-rpl-awards-over-600)) | **H**: national RPL under Skill India (NSQF); APAAR, with 263.5 million IDs ([PIB, Jul 2026](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202675912501.pdf)) |
| Founder access and delivery partner | **H** (Algo Peers) | L | L | L |
| Competition and substitutes | Ghana Code Club unplugged kits; BSTEM | Many edtechs | EIDU, AI tutors | Very crowded edtech |
| Speed of learning for NBC | **H** | L–M | L–M | L |

**Recommendation** [JUDGEMENT]:
- Keep the **first sales test in Ghana**, because access makes learning fastest, and nothing about the thesis is Ghanaian.
- Run the **validity study in Ghana plus one other context within 6 months**, through a partner. Kenya is the strongest candidate on recognition infrastructure; Lagos on density.
- Hold **10 real discovery interviews in one second market** before month 6, so the next beachhead is chosen on evidence.
- Ghana's claim to go first is *access*, which is temporary. Lagos, Kenya and India may be better markets.

---

## 1. Five decisions and the uncertainties behind them

| # | Decision | Uncertainty that could change it | Type | Evidence now / missing | Depends on | Needed by | Cost of acting too early | Cost of waiting too long |
|---|---|---|---|---|---|---|---|---|
| **D1** | **Lead value:** learning delivery, evidence of unassisted transferable capability, or practical-learning experience | Do recognisers pay a premium for unassisted, transferable evidence? Does NBC evidence predict transfer? | External + **testable** | Directional external evidence (OECD DEO 2026; Bastani 2025; detector failure). **No NBC validity data** | D2, D3 | Before building evidence infrastructure (~8–12 weeks) | Building a graph and assessment system that no one trusts or buys | AI tutors and platform credentials occupy the space; funders commit elsewhere |
| **D2** | **First payer and market:** schools and centres (children) vs young-people transition recognisers; which country | Payer urgency and willingness to pay; recogniser uptake; mission boundary | **Testable** + **value choice** | Synthetic only [SIM]; RPL systems exist in Ghana, Kenya and India [SOURCED] | D1, D5 | Step 21 test (weeks 1–8) | Locking into a low-margin segment | Burning runway on the wrong buyer |
| **D3** | **Record architecture and governance:** open, learner-held, standards-based vs proprietary; who hosts | Will recognition consolidate around platforms or states or open standards? What will regulators require? | **External** + **value choice** | Open Badges 3.0 / VC 2.0 exist; APAAR precedent; OpenAI jobs platform planned [SOURCED] | D1 | Before the first real record is issued | Over-engineering before validity | Lock-in by others; retrofitting privacy |
| **D4** | **Hardware path:** paper and phone first vs a dedicated node vs electronic tokens | Does a camera or node add validity or save time over paper? Uptime in heat and outages | **Testable** | Probe-design simulation (paper ≈ exact scoring) [MODEL]; edge models run on a Pi 5 [SOURCED] | D1 | Before any hardware purchase over ~$5k | Stranded capex | Late to a device-dependent market (low risk) |
| **D5** | **Capital and entity:** catalytic grant for the validity study vs venture capital; NBC as a new company vs inside Algo Peers | Is there a venture-scale market? Which funders fund evidence public goods? | External + value choice | Large AI-education funding exists (Gates, Anthropic–Gates) [SOURCED] | D1, D2 | After first validity and deposit results | Dilution or mission capture before evidence | Missing funding windows |

---

## 2. Projections: what follows *if* stated conditions hold

*These are conditional statements, not predictions. Full tables: [`projections_results.md`](projections_results.md).*

### P1 · Intelligence cost

> **If** a capable small model costs $0.30–1.00 per million tokens in 2026 [ASSUMPTION], prices fall 3–10× a year at constant capability (Epoch reports 9–900× by task; ~10× a year as a sustained estimate, [SOURCED](https://epoch.ai/data-insights/llm-inference-price-trends)), **and** a learner uses 0.1–3.6 million tokens a year [ASSUMPTION], **then** cloud intelligence costs **$0.03–3.60 per learner-year in 2026, falling to $0.00–0.13 by 2029** [CALC].

**Local alternative:** node hardware costs about **$1.21 per learner-year** [CALC].

**Sensitivity:** heavy learner-facing use combined with a slow price decline is the only case above $1 after 2027.

**Discontinuities:**
- a cable cut, like the March 2024 West Africa outage across four subsea cables ([ISOC](https://www.internetsociety.org/resources/doc/2024/2024-west-africa-submarine-cable-outage-report/));
- export or licence changes;
- a need for local-language quality that small models lack.

**Implication:** compute is not NBC's constraint or its moat. Don't differentiate on AI.

| Persona [FICTION] | Effect |
|---|---|
| Mrs Mensah (buyer) | Cheaper AI doesn't change her bill, because her cost is people and parts |
| Priya (learner, India) | A free phone tutor is available, *if* her family's shared phone is free after her brother's use; household access, not price, limits her |

### P2 · Hardware and maintenance

> **If** node capex falls 5–20% a year from $400–900, with 4-year life, 10% replacement and 2–6 maintenance visits at $20–40, **then** hardware plus maintenance is **$96–452 per site-year by 2029** [CALC].

**Constraint:** maintenance visits (people and transport) become the larger share as chips cheapen.

**Implication:** design for local repair and paper fallback. Treat repair networks as the real infrastructure.

| Persona | Effect |
|---|---|
| Kwame (facilitator) | Faster repair matters more than a cheaper device; one dead session in front of parents costs him more |
| Abdul (at risk of exclusion) | Device cost is irrelevant unless the evidence method accommodates sign language |

### P3 · Facilitator time

> **If** each class gets 36 sessions a year and added facilitator time falls from 30 to 5 minutes per session through guides (B8), **then** facilitation cost per learner falls about 6×, from $0.26 to $0.04 at Ghana teacher pay (about GHS 1,500–3,500 a month, [SOURCED](https://colemanpublications.com/ges/ranks-and-salary-of-newly-recruited-teachers-in-ghana-education-service-2026/)), and from $21.60 to $3.60 at an assumed high-income wage [CALC].

**Implication:** in low-wage markets, facilitator time is cheap in cash but decisive in *goodwill*. Unpaid extra minutes are why programmes quietly die [SIM]. In high-wage markets it dominates cost, so the 5-minute setup is a global requirement.

**Correction:** this projection showed that my earlier model overstated Ghana facilitation cost. The school node's full cost is now **$9.60 per learner-year** (was $11.22) [CALC].

| Persona | Effect |
|---|---|
| Kwame | 5-minute setup is the difference between running sessions and avoiding them |
| Mrs Mensah | Sees no cash saving, but fewer staff complaints |

### P4 · Evidence-validation cost

> **If** a blind-scored demonstration takes 10 assessor-minutes (formative) or 40 minutes with two raters (high-stakes), at $3–40 an hour, and AI pre-scoring removes up to 50% of low-stakes time, **then** formative evidence costs **$0.45–0.70** and high-stakes evidence **$6–37** per demonstration [CALC].

**Implication:** evidence is cheap where it matters least and expensive where someone would pay for it. The payer for high-stakes evidence must be the *recogniser* (employer, certifier, funder), not the learner.

| Persona | Effect |
|---|---|
| Mr Kamau (RPL assessor, Nairobi) | Cost per candidate matters less than whether the evidence is admissible |
| Abdul | High-stakes demonstration is costly, and if the learner pays, he is excluded |

### P5 · Adoption economics

> **If** price is $12 per learner-year, full cost $9.60, churn 20% and blended COCA $866, **then** LTV:COCA is **1.4, which is marginal** [CALC].

**What would flip it to viable (≥3):**
- **$15 per learner-year**, which gives 4.6; or
- **COCA near $400** (referral, association or finance-partner channels) **with cost below $3 per learner**, which also gives 4.6.

**Implication:** viability depends on distribution through trusted intermediaries (associations; school-finance lenders such as IDP Rising Schools; RPL bodies) and on low full cost. It does not depend on cheaper AI.

| Persona | Effect |
|---|---|
| Mrs Mensah | Would pay more through a financed, instalment plan tied to enrolment |
| Esi (learner) | Her access depends on her school's margins, not on technology prices |

---

## 3. Forecasts: what is likely to occur?

*Own estimates are [JUDGEMENT]. Numbers are given only where a reference class exists; otherwise the likelihood is qualitative. None of these is a published forecast unless stated.*

| # | Question (outcome, scope, deadline) | Resolution source | Reference class / base rate | For | Against | Estimate | Update triggers | NBC decision |
|---|---|---|---|---|---|---|---|---|
| **F1** | Will **Ghana begin classroom implementation** of the revised basic curriculum including coding/AI in at least one grade nationwide by **30 Sep 2027**? | MoE / NaCCA / GES announcements | 2019 reform: rolled out Sep 2019 after July 2019 training; the JHS common core was developed in 2020 and implemented in 2021/22 ([NaCCA](https://nacca.gov.gh/curriculum/)), about 1–1.5 years from development to classroom | Curriculum received 23 Jul 2026; BSTEM launched May 2026; 7,000+ teachers trained [SOURCED] | Awaits Cabinet and Parliament; no start date announced [SOURCED] | **About 50%** (35–65%) | Cabinet approval; teacher-training calendar | D2 (public-supplier option); D4 (curriculum-aligned kits) |
| **F2** | Will a **frontier lab or major foundation fund an AI literacy/numeracy tutor deployment in public primary schools in at least one of Ghana, Nigeria, Kenya or India covering ≥100 schools**, publicly announced by **31 Dec 2027**? | Press releases | Recent pattern: Anthropic–Gates SSA/India FLN apps (May 2026); Gates $1B AI (Sep 2026, *snippet*); Rori in Ghana; EIDU in 46 of 47 Kenyan counties [SOURCED] | Money and partners are already committed | Implementation lags; government approvals | **Likely (~70–80%)** [JUDGEMENT] | Named country deployments | D1 (don't compete on tutoring); D5 (complement pitch) |
| **F3** | Will the price of the cheapest API model meeting a fixed capability threshold fall **≥10×** between Sep 2026 and Sep 2027 in Epoch AI's tracking? | [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends) | Median ~50× a year; ~10× a year sustained estimate | Competition, hardware, quantisation | The fastest drops may not persist | **Likely (~65–75%)** | Epoch updates | D4 (keep compute an option, not a moat) |
| **F4** | Will **OpenAI's Jobs Platform or certifications be available to users in any sub-Saharan African country** by **30 Jun 2027**? | OpenAI announcements | Launched as US-focused (Walmart, 10M Americans by 2030) [SOURCED] | Global Academy reach | No stated international plan | **Qualitative: uncertain, leaning unlikely** (no base rate) | Any non-US launch | D3 (platform recognition risk) |
| **F5** | Will **Ghana's Parliament pass the new Data Protection Bill** (with automated-decision provisions) by **31 Dec 2027**? | Parliament of Ghana | Announced Mar 2026 ([GNA](https://gna.org.gh/2026/03/govt-to-introduce-new-data-protection-bill-to-regulate-ai-cross-border-data-flows/)); the National AI Strategy launched Apr 2026 *(snippet)*. Ghanaian bills often take years (qualitative reference class) | Political priority on AI | Legislative backlog | **Unlikely to even (~25–40%)** | Bill laid before Parliament | D3 (compliance design) |
| **F6** | Will a follow-up study find **non-degree hires above 1%** at US firms that removed degree requirements, by **31 Dec 2028**? | HBS / Burning Glass or equivalent | 0.14% in the prior study ([HBS/BGI](https://www.hbs.edu/managing-the-future-of-work/Documents/research/Skills-Based%20Hiring.pdf)) | Policy removals keep rising | Applicant-tracking systems still filter on degrees; verification is costly [SOURCED] | **Unlikely (~15–25%)** | New data releases | D1 (recognisers say they want skills evidence but rarely act; test *behaviour*, not stated intent) |
| **F7** | Will **≥3 of 10 qualified buyers pay refundable deposits** in NBC's Step 21 priced offer by **31 Jan 2027**? | NBC records | No real reference class; synthetic studies suggest negotiation on proof and terms [SIM] | Low deposit amount; exit terms | No reference site; a pilot-discount flaw | **No number given: genuinely uncertain** | First 5 offers | D2, D5 |
| **F8** | Will NBC's validity pilot show **incremental validity partial r ≥ 0.3** (lower CI bound > 0.1) by **31 Mar 2027**? | Pre-registered study | Far transfer is historically hard to demonstrate (general learning-science literature) | Designed anchor tasks | Small samples; noisy observation | **No number given: genuinely uncertain** | Pilot data | D1 (continue or narrow the evidence thesis) |

**How forecasts change persona incentives** [JUDGEMENT; macro to individual only via stated mechanisms]:
- **If F2 resolves yes,** Priya's and Esi's schools get free tutors. That lowers proprietors' willingness to pay for "learning" and raises the relative value of practical and evidence offers. It says nothing about any one family's choice.
- **If F6 stays near zero,** employers like Mr Kamau keep saying they want skills evidence while hiring on credentials. NBC should measure *use in real decisions*, not interest.
- **If F1 resolves yes,** Kwame's centre faces free public alternatives. Ms Tetteh's district gets demand for classroom-ready kits.

---

## 4. Normative vision: what future should NBC help create?

**Whose values** [VALUE]:
- the founder's thesis (§IX–X: contextual, contestable, learner-controlled evidence; "never tokenize childhood");
- child rights (UNICEF *Guidance on AI and Children* v3, Dec 2025);
- decent work (ILO);
- local ownership (AU Continental AI Strategy).

These aren't neutral, and investors or employers may hold different ones.

**The preferred future (2035):**

| Dimension | Preferred state |
|---|---|
| **What people can do** | Children and young people can reason, build, fix, collaborate and adapt in the physical and social world, not only produce AI-assisted artefacts, and can *show* it wherever they live |
| **Distribution of opportunity** | Recognition doesn't depend on degree, English fluency, disability status or school wealth. Informal-sector skills can be recognised |
| **Control of evidence** | Learners, or guardians for minors, hold their records. Many issuers (schools, masters, assessors) can sign them. Public bodies set standards; no single company or state holds everyone's records |
| **Rights** | Inspect, correct, contest (with human review), export, delete. Refuse participation without losing a place. Know who viewed a record |
| **Unacceptable uses** | Emotion, biometric or personality inference; ranking children; predicting life outcomes; selling or licensing individual data; automated exclusion; employer access without consent |
| **Protections** | Affordability (no child excluded for non-payment; public or sponsored access); accessibility (multimodal and sign-language demonstrations, local languages); cultural variation (locally authored worlds and rubrics); foundations first |

**Stakeholder conflicts** (these are real; the vision must choose):

| Conflict | Learner / family want | Other party wants | Proposed resolution [VALUE] |
|---|---|---|---|
| Portability vs screening | Show strengths selectively | Employers want complete, comparable records | Learner-controlled disclosure; verifiable but selective |
| Visibility vs privacy | Recognition | Schools want marketing material (photos, results) | No children's images in marketing; aggregate reporting only |
| Returns vs community ownership | Affordable, permanent access | Investors want lock-in and data-driven margins | Charge for services and validation, never for data; open schema |
| Sovereignty vs speed | Local control | Funders and platforms want scale through their own systems | Interoperate with public systems; break clauses in any platform deal |
| Foundations vs frontier skills | Both | Funders prioritise literacy and numeracy | Prove the node protects foundational time, or don't deploy |

**Daily life in the preferred future** [FICTION]:

| Persona | Their day in 2035 |
|---|---|
| **Esi (Cape Coast, now 22)** | Holds a record of what she can build and explain, signed by her school, a makerspace mentor and a trade assessor. She shares three items with an employer; nothing else is visible. When one rubric misjudged her work in Fante, she contested it and it was re-scored |
| **Priya (Lucknow)** | Her budget private school runs the same open protocol. Her record links to her national student ID but stays under her family's control |
| **Abdul (hard of hearing)** | Demonstrates wiring with sign-language instructions and is assessed on performance, not written English. Only the fact of accommodation is recorded, not his disability data |
| **Kwame** | Runs sessions from guides in 5 minutes. His facilitation record helped him get a permanent post |
| **Mr Kamau (Nairobi)** | Accepts supervised demonstration records as RPL evidence under KNQA rules, and pays per validated candidate |

**Backcast:**

| Desired outcome | Necessary conditions | Capabilities and institutions required | Milestones | Next experiment |
|---|---|---|---|---|
| Portable, trusted, learner-held capability evidence across countries | (1) The evidence is valid and equitable. (2) Recognisers act on it. (3) Open standards are adopted. (4) Delivery is affordable. (5) Governance is trusted | An anchor-task and rubric bank; trained assessors; a facilitator playbook; a VC/Open Badges issuer; a DPIA; accreditation with RPL bodies; community governance | **2027:** validity shown in 2 countries; 1 RPL body accepts records. **2029:** 3 countries; recogniser-paid validation. **2031:** public-system interoperability; community-run centres | Validity pilot across 2 contexts; recogniser trial (Kenya or Ghana) |

**What NBC controls vs influences:**

| NBC controls | NBC can only influence |
|---|---|
| Evidence design, validity studies, privacy architecture, the open schema, pricing, the facilitation playbook, which markets it enters | Recogniser behaviour, national record systems, funder priorities, regulation, platform strategies, the cost of AI and hardware |

---

## 5. Scenarios: what different futures could plausibly emerge? (2030–2034)

### Reassessing the axes

The earlier report used two axes: (1) the **premium on unassisted capability** and (2) **open vs centralised control of intelligence *and* recognition**. The projections change the second axis. P1 and F3 suggest intelligence will be cheap under both open and closed conditions [CALC, JUDGEMENT], so openness of *intelligence* no longer separates futures much for NBC.

**Revised axes:**
- **Axis 1 (kept): premium on unassisted, transferable capability.** Do recognisers act on it, or accept AI-assisted outputs and platform certificates as good enough? It is still the top external uncertainty (register D1; F6 shows stated intent and behaviour diverge).
- **Axis 2 (narrowed): control of recognition.** Is it **public or open multi-issuer** (national qualification frameworks, RPL bodies, open standards, learner-held records)? Or **platform or proprietary** (a few global platforms or single contractors own credentials, matching and records)?

**Rejected alternative:** "who pays: public or philanthropic vs private". It is largely a *consequence* of the two axes, so it is used inside the scenarios instead.

**Recurring personas** [FICTION; constructed analytical devices, not evidence of demand]:

| Persona | Role | Place | Life stage | Goal | Constraint | Workaround | Authority | Trusted channels | Success | Could lose |
|---|---|---|---|---|---|---|---|---|---|---|
| **Esi** | Learner | Low-fee private school, Cape Coast, Ghana | 13 | Pass exams; build things | Shared phone; power cuts | Notes, a borrowed phone | None | Teacher, church | A good senior high school | Exam time, privacy |
| **Priya** | Learner | Budget private school, Lucknow, India | 12 | Science; a scholarship | Brother gets the phone first; household chores | Tuition classes | None | Teacher, parents | A scholarship | Tuition money |
| **Kwame** | Facilitator | After-school centre, Cape Coast | 24 | A permanent job | Paid per session; no training | Calls the owner when stuck | Use; recommend | Centre WhatsApp | Confident sessions | Face, the job |
| **Mrs Mensah** | Buyer | Proprietor, 350 pupils, Central Region, Ghana | 49 | Enrolment, reputation | About 60% fee collection [SIM] | Textbook ICT | Signs and pays | Proprietors' association, peers | Parents stay | Money, face |
| **Mr Kamau** | Recogniser | Garage owner and KNQA-registered RPL assessor, Nairobi | 44 | Hire competent mechanics; assess fairly | Time; fraud risk | Two-week unpaid trials | Hires; assesses | Trade association, KNQA | Fewer bad hires | Liability |
| **Abdul** | At risk of exclusion | Hard-of-hearing apprentice electrician, Ghana | 17 | Certification, higher pay | Text-based tests; stigma | Learns by watching | Little | Master, sign-language community | Fair recognition | Misclassification; exposure |

### Matrix

|  | **Public / open multi-issuer recognition** | **Platform / proprietary recognition** |
|---|---|---|
| **High premium on unassisted capability** | **S1 · Open Proof** | **S2 · Platform Proof** |
| **Low premium** | **S3 · Assisted Abundance** | **S4 · Platform Fluency** |
| **Core thesis fails** | **S5 · No Transfer, Cheap Tutors** | |
| **Wild card** | **S6 · Disconnection** (sovereign blocs + cable cuts + child-data backlash) | |

### S1 · Open Proof

**Pathway:** detectors fail and supervised practicals return (as observed trends extend) → national qualification bodies (Kenya KNQA, India NSQF, Ghana CTVET) accept supervised demonstration records under open standards → funders shift to paying for verified outcomes.

| Dimension | Conditions |
|---|---|
| **Technology** | Cheap edge AI; paper or camera evidence |
| **Policy** | Qualification frameworks expand RPL; data laws favour local processing |
| **Economics** | Recognisers pay per validated demonstration |
| **Power** | Public standard-setters plus accredited issuers; learners hold records |

**Scarce, and who controls access:** accredited assessors, valid anchor tasks and supervised settings. Qualification authorities gate accreditation.

**What the personas experience:**
- **Learner (Esi):** a termly world-session ends in a blind-scored transfer task; she keeps a signed record.
- **Facilitator (Kwame):** guide → 5-minute setup → run the session → log states → a monthly moderation call.
- **Buyer problem (Mrs Mensah):** "Is the node worth $12 per child per year if it helps retain 10 pupils?" She renews. *Separately*, Mr Kamau decides whether to pay $6 per validated candidate instead of running trials. He does.

**Who benefits, pays, refuses, is harmed:**
- **Benefits:** Abdul, if sign-language assessment is accredited.
- **Pays:** schools for formative use; recognisers for high-stakes evidence.
- **Refuses:** some master craftsmen, who fear losing control of apprentices.
- **Harmed:** candidates whose assessors are poorly trained, if quality slips.

**NBC's role:** accredited evidence-protocol provider plus node service. **Revenue:** site subscriptions, per-validation fees, licences.

**Indicators and triggers:** a KNQA or CTVET acceptance of supervised records → expand the TVET line. An employer association adopts VC records → build a recogniser portal.

**Classification:**

| Element | Status |
|---|---|
| Detector failure | Relatively likely [SOURCED trend] |
| RPL expansion | Plausible |
| Recogniser-paid validation | Plausible, unproven |
| The future as a whole | Preferable |

### S2 · Platform Proof

**Pathway:** global platforms move from "AI competency" certificates to supervised assessment (proctoring, test centres) → large employers adopt them → governments contract platforms for national records (the contractual-control pattern seen in other public data systems).

| Dimension | Conditions |
|---|---|
| **Technology** | Metered cloud AI plus proctoring |
| **Economics** | Platforms subsidise tests and monetise matching |
| **Power** | Platforms hold records; states depend on contracts |

**Scarce:** physical, local, supervised test capacity, and platform standing.

**What the personas experience:**
- **Learner (Priya):** she sits a platform test at a centre. Her record lives on the platform and is hard to export.
- **Facilitator (Kwame):** proctors for per-sitting fees; not much teaching.
- **Buyer (Mr Kamau):** filters applicants by platform badge. It's convenient but shows little practical skill, so he keeps trials anyway.

**Who benefits, pays, refuses, is harmed:**
- **Benefits:** platforms and large employers.
- **Pays:** platforms, then employers.
- **Refuses:** privacy-sensitive families.
- **Harmed:** **Abdul**, because text-heavy tests misclassify him.

**NBC's role:** a local test-centre and practical-task supplier, with non-exclusive, exportable records. **Revenue:** per sitting.

**Trigger:** a platform credential is required in more than 5% of sampled job adverts in Ghana, Kenya or India → negotiate supplier terms. **Stop** any deal that requires surrendering learner data.

**Classification:** plausible; **not preferable**.

### S3 · Assisted Abundance

**Pathway:** foundation-funded AI tutors become free public goods (F2 likely) → exam scores rise → institutions keep exams and degrees; nobody pays for transfer evidence.

**Scarce:** hands-on practice, mentors and safe spaces for physical learning. Access is controlled by school timetables and family time.

**What the personas experience:**
- **Learner (Esi):** a phone tutor every evening; the robotics club is optional.
- **Facilitator (Kwame):** coaches tutor-app use; his practical sessions shrink.
- **Buyer (Mrs Mensah):** "Why pay for anything when the tutor is free?" She pays only for visible practical activities that parents value.

**Who benefits, pays, refuses, is harmed:**
- **Benefits:** foundational scores.
- **Pays:** philanthropy.
- **Refuses:** exam-focused heads.
- **Harmed:** practical-skill development, and learners with poor phone access.

**NBC's role:** a practical-STEM programme and facilitation-playbook licensor, with evidence as internal quality control only. **Revenue:** programme fees, BSTEM-style supply.

**Trigger:** by 2027, a national tutor is standardised in two of the four markets → shrink the evidence layer.

**Classification:** the tutor spread is relatively likely (F2); the future as a whole is plausible and only partly preferable.

### S4 · Platform Fluency

**Pathway:** work reorganises around AI assistance; platform "AI fluency" certificates become the currency; physical trades stay informal.

**Scarce:** premium tool access, and platform standing.

**What the personas experience:**
- **Learner (Priya):** earns a fluency badge; her practical skills go unrecognised.
- **Facilitator (Kwame):** a platform coach.
- **Buyer (Mr Kamau):** still needs safe mechanics and still runs trials.

**Harmed:** Abdul, who is excluded.

**NBC's role:** minimal. At most a niche practical-trades evidence provider.

**Stop:** no recogniser values a physical demonstration within 24 months of pilots.

**Classification:** plausible; not preferable.

### S5 · No Transfer, Cheap Tutors (core thesis fails)

**Pathway:** NBC's pre-registered validity studies (in two countries) find no incremental validity beyond a pretest, or validity only in wealthier or English-medium settings. Meanwhile phone tutors plus print deliver near gains at a fraction of the cost.

**What the personas experience:**
- **Learner (Esi):** enjoys the club, but her record means nothing to recognisers.
- **Facilitator (Kwame):** keeps a useful skill.
- **Buyer (Mrs Mensah):** buys only if parents value the activity itself.

**NBC's role:** publish the negative results; license anchor tasks; become a lean practical-learning programme owner (S3) or stop.

**Trigger:** partial r < 0.2 in two samples, or an equity gap > 0.15 → stop evidence claims.

**Classification:** plausible (far transfer is historically hard); preventing it is not in NBC's control; acting on it is.

### S6 · Disconnection (wild card)

**Pathway:** geopolitical fragmentation restricts frontier model access and chip supply to some regions. A repeat of the March 2024 multi-cable subsea outage ([ISOC](https://www.internetsociety.org/resources/doc/2024/2024-west-africa-submarine-cable-outage-report/)) lasts weeks. Separately, a child-data breach at a large edtech triggers camera bans in schools.

**Scarce:** offline capability, local models and trusted paper processes.

**What the personas experience:**
- **Learner (Esi):** cloud tools vanish; the offline node and paper worlds keep running.
- **Facilitator (Kwame):** switches to paper-only mode.
- **Buyer (Mrs Mensah):** values the resilience; pauses anything camera-based.

**Harmed:** anyone dependent on cloud records.

**NBC's role:** offline-first resilience becomes a differentiator, *if* a camera-free evidence mode exists.

**Trigger:** any national camera restriction → switch to paper-first evidence.

**Classification:** possible and partly observed. The 2024 cable cuts are a precedent; the combination is a stress test.

---

## 6. Reconciling the four methods

| Method | Question answered | Main finding | Evidence basis | Persona implications | Limitation | Decision informed |
|---|---|---|---|---|---|---|
| **Projections** | What follows if conditions hold? | Compute becomes negligible (under $1.50 per learner-year by 2027). Facilitation goodwill, repair logistics, high-stakes evidence and COCA determine viability. The school node is marginal (LTV:COCA 1.4) unless price rises to $15 or COCA falls to about $400 | [CALC] on [SOURCED] baselines and labelled assumptions | Buyers gain little from cheaper AI; learners' access is limited by household and school, not price | Conditional; FX and regulatory shocks not modelled | D4, D5, D2 pricing |
| **Forecasts** | What is likely? | Foundation-funded AI tutors will likely spread (F2). Compute keeps getting cheaper (F3). Ghana's curriculum rollout is a coin flip by Sep 2027 (F1). Employers' stated skills-first hiring rarely turns into behaviour (F6) | Reference classes and dated sources; own estimates labelled | Free tutors shift schools' willingness to pay; employers' words aren't actions | Few defensible base rates; no numbers for NBC-internal questions | D1, D2 |
| **Normative vision** | What should NBC help create? | Learner-held, multi-issuer, contestable evidence; performance-based access; no child data for sale; foundations first | Values stated (thesis, UNICEF v3, ILO, AU) | Abdul and Esi gain only if accessibility and portability are designed in | Values conflict with investors, platforms and employers | D3, D5 |
| **Scenarios** | What futures could emerge? | NBC has a strong role only in S1 (Open Proof); a supplier role in S2; a programme role in S3; almost none in S4; S5 ends the evidence thesis. Offline design helps in S6 | Coherent pathways from observed trends | The same learner's opportunity varies hugely by who controls recognition | Not probabilities | D1, D2, D3 |

**Where the methods disagree:**

| Tension | Detail |
|---|---|
| Projections vs forecasts | P5's viability cases assume a $15 price or $400 COCA. F2 (free tutors spreading) and synthetic buyer behaviour [SIM] make higher prices *less* likely, so the school-subscription projection is fragile |
| Likely outcomes vs normative vision | The likely spread of platform credentials and funder-chosen tutors (F2, F4 trend) pulls toward S2/S3/S4. The preferred future is S1. **The vision is not the forecast** |
| Fragile strategies | A school-only subscription business is fragile in S3, S4 and S5. A proprietary graph fails in every scenario. Dependence on one funder or platform fails in S2 and S6 |
| Actions that work in several futures | An anchor-task and rubric bank; an open, learner-held record; the 5-minute facilitation playbook; paper-first evidence; a multi-country validity study; repair-friendly hardware |
| Where stakeholders diverge | Employers want comparable screening; learners want selective disclosure. Proprietors want marketing; parents want privacy. Investors want lock-in; communities want ownership |

### Recommendations

**1. A robust strategic direction.** Build NBC as **an open evidence-and-practice protocol with a service business around it**, not as a device or a graph. Its parts:
- an anchor-task and rubric bank;
- a facilitation playbook;
- a paper-first node kit;
- learner-held, standards-based records.

**2. Explicit bets, each with its evidence requirement:**

| Bet | Evidence requirement |
|---|---|
| (a) Recognisers will pay for supervised demonstration evidence at youth transitions | At least 1 recogniser uses records in real decisions within 8 weeks, and 1 RPL body treats them as admissible |
| (b) Schools and centres will pay above full cost | At least 3 of 10 deposits at ≥ $12 per learner-year, with a path to COCA ≤ $400 |
| (c) Transfer is measurable across contexts | Partial r ≥ 0.3 in 2 countries |

**3. Options to preserve:**
- a second-market beachhead (Kenya on recognition infrastructure; Lagos on density);
- Village AI on edge hardware;
- supplying BSTEM-type public programmes;
- NBC Center licences;
- a later partnership with tutor providers (as the complement that measures unassisted transfer).

**4. Commitments to delay:**
- hardware manufacturing and electronic tokens;
- a new company or venture raise before bets (a) to (c) resolve;
- exclusive platform or funder deals;
- the contribution economy and credits;
- a large assessor workforce.

**5. Pivot and stop conditions:**

| Trigger | Action |
|---|---|
| Validity fails in 2 samples | Stop evidence claims; pivot to S3 programme or research licensing |
| < 3 of 10 deposits at any price | Stop the school subscription; test recogniser-paid or centre-only |
| No recogniser acts within 6 months | Park the TVET line |
| Platform terms require data transfer | Refuse the deal |

---

## 7. Monitoring dashboard

| Signal | Indicator | Threshold | Cadence | Points toward |
|---|---|---|---|---|
| Recognition behaviour | Non-degree or RPL-based hires, acceptance of supervised records (Ghana CTVET, Kenya KNQA, India NSQF) | First formal acceptance | Monthly | S1 |
| Platform credentials | Share of sampled job adverts in 3 markets requiring platform AI certificates | > 5% | Quarterly | S2/S4 |
| Tutor standardisation | National AI-tutor deployments ≥ 100 schools (F2) | 2 of 4 markets | Quarterly | S3 |
| Compute price | Epoch AI constant-capability price (F3) | ≥ 10× in 12 months | Quarterly | Confirms P1 |
| Curriculum rollout | Ghana (F1); Kenya and India equivalents | Implementation date announced | Monthly | Supplier route |
| Data regulation | Ghana Data Protection Bill (F5); camera restrictions anywhere in the 4 markets | Bill laid; any restriction | Quarterly | S6 paper mode |
| Connectivity shocks | Multi-day national outages | Any | As they occur | S6 |
| NBC internals | Deposits ÷ offers; unaided sessions ÷ scheduled; validity r (2 countries); full cost per learner; COCA | §6 thresholds | Weekly | Continue, pivot or stop |

---

## 8. Three 4–8 week evidence milestones

| # | Milestone | Experiment | Threshold (set now) | Tests |
|---|---|---|---|---|
| **M1** | **Transfer is measurable in two contexts** | Pre-registered validity pilot: ≥ 80 learners in Ghana (low-fee plus one home-language class) and a partner cohort in a second country (Kenya or Nigeria), with pretest → worlds → delayed, blind-scored transfer task | Partial r ≥ 0.3 (CI lower bound > 0.1) in at least one context; equity gap ≤ 0.15; protocol runs in both | Scientific validity; technical feasibility across contexts |
| **M2** | **Someone pays above full cost** | Written priced offer to 10 qualified buyers (centres first), with per-site pricing, a percentage pilot discount, and decline reasons (including "no reference site") | ≥ 3 deposits at ≥ $12 per learner-year | Commercial viability; desirability |
| **M3** | **A recogniser acts on a record** | 15 supervised practical demonstrations, reviewed by 1 RPL assessor (CTVET or KNQA) and 3 employers against their usual method | ≥ 2 employers use a record in a real hiring or trial decision; the assessor accepts records as admissible supplementary evidence | Institutional adoption; commercial (recogniser as payer) |

---

## 9. Thesis revision (what this analysis changes)

> **NBC: The Human Capability Utility** is global infrastructure for the next billion children and young people, not a Ghanaian school product. As machine intelligence becomes nearly free, NBC's job is to make **consequential practice** widely available and to make **unassisted, transferable capability** verifiable in ways that learners control and that schools, employers and qualification bodies can trust and act on. It is delivered as an **open protocol** (anchor tasks, rubrics, learner-held records) plus **services** (facilitation, validation, nodes) that local institutions can run. **Ghana is the first place we test sales, not the boundary of the mission.** The evidence must hold in more than one country and language before we claim it.

**What changed:**

| Change | Why |
|---|---|
| (1) Scope is explicitly global; Ghana is demoted from "the market" to "the first sales test" | The founder's question; the global data in §0 |
| (2) The value proposition moves from compute and devices to protocol and services | P1: compute is negligible |
| (3) Recognisers, not learners, pay for high-stakes evidence | P4 |
| (4) Validity must be shown in two contexts | The mission is multi-context |
| (5) The school subscription is a bet with a viability test, not the foundation | P5, F2 |

---

## 10. Source notes

**New sources in this analysis** (retrieved 25 Sep 2026; *snippet* = search-result text only):
- [ILO WESO May 2024](https://www.ilo.org/sites/default/files/2024-06/WESO_May2024%20-%20Final_30-05-24_2.pdf) (global informality, *snippet*)
- [UN youth fact sheet](https://www.un.org/esa/socdev/documents/youth/fact-sheets/YouthPOP.pdf) (*snippet*)
- [HBS / Burning Glass, skills-based hiring](https://www.hbs.edu/managing-the-future-of-work/Documents/research/Skills-Based%20Hiring.pdf) (*snippet*)
- [KNQA RPL](https://knqa.go.ke/service/recognition-of-prior-learning/) and [ILO on Kenya RPL](https://www.ilo.org/resource/article/self-taught-certified-kenyas-recognition-prior-learning-rpl-awards-over-600) (*snippet*)
- [India RPL (MESC)](https://mescindia.org/recognition-of-prior-learning) (*snippet*)
- [FEE summary of low-cost private schools](https://fee.org/articles/low-cost-private-schools-are-revolutionizing-education-for-millions-of-children-in-developing-nations/) (*snippet*; advocacy source, figures from Tooley's research)
- [NaCCA curriculum history](https://nacca.gov.gh/curriculum/) (*snippet*)
- [GNA on Ghana's Data Protection Bill](https://gna.org.gh/2026/03/govt-to-introduce-new-data-protection-bill-to-regulate-ai-cross-border-data-flows/) (*snippet*)
- [Ghana GES entry salaries 2026](https://colemanpublications.com/ges/ranks-and-salary-of-newly-recruited-teachers-in-ghana-education-service-2026/) (*snippet*, approximate)
- [ISOC 2024 West Africa cable outage report](https://www.internetsociety.org/resources/doc/2024/2024-west-africa-submarine-cable-outage-report/) (*snippet*)
- [OpenAI Jobs Platform coverage](https://campustechnology.com/articles/2025/09/10/openai-to-launch-ai-powered-jobs-platform-by-mid-2026.aspx) (*snippet*)

**Other sources:** as listed in the companion report's source register (S1–S39).

**Correction logged:** school facilitation cost (see the erratum at the top of the companion report).
