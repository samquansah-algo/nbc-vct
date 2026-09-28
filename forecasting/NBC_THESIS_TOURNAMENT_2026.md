# Which NBC thesis is strongest? A thesis tournament and adversarial review

*27 Sep 2026. It was prompted by the founder re-sharing **"NBC: Infrastructure for the Next Billion Children"** (the v2 thesis, stored at [`../thesis/v2-nbc-infrastructure/THESIS.md`](../thesis/v2-nbc-infrastructure/THESIS.md)). The founder asked which thesis is strongest from forecasting and futures perspectives, for a hard critique with verdicts, and for other ways to imagine NBC.*

*Method:*
- five theses compared;
- a ten-seat adversarial review panel;
- five futures lenses (reference-class forecasting, trend projection, resolvable forecasts, scenarios, Three Horizons and backcasting);
- a weighted scorecard;
- a pre-mortem.

*Labels: **[SRC]** a repository source; **[GK]** general knowledge, to verify before external use; **[JUDGEMENT]** my assessment. Nothing here is evidence about NBC's learners, buyers or economics.*

---

## 0. Bottom line

1. **v2 is the best-written and most original statement of the problem.** Its central ideas still stand:
   - the "coming inversion" (intelligence abundant, capability scarce);
   - "observe the state of the learning environment, not the totality of the child";
   - "maximum learning intelligence from minimum personal data";
   - "the total cost of reliably producing a unit of human capability" as the economic metric.

   These should stay in NBC's public narrative. **As a company thesis it fails**: it describes nine products at once, bets against personal devices when forecasts say devices will be cheap, and has no first buyer.
2. **None of the five existing theses is the strongest on its own.** v2 has the best *why*. v5 has the best *first move*. The HCG strategy has the most *defensible long-run asset*. v1 has the boldest *economics* but the weakest assumption. v3 tries to hold everything and loses sharpness.
3. **The strongest thesis we can state is a synthesis** (§6), proposed as a v6 candidate for the founder to accept or reject. It keeps v2's inversion and principles, but changes the core bet:
   - **from** "make the intelligence of a great school portable through a Node";
   - **to** "build open infrastructure for the two things that stay scarce when intelligence is abundant: consequential experiences that build capability, and trustworthy evidence of what a person can do, with and without AI".

   It is **device-agnostic, not device-averse**. The Node, the OS, the licence and the contribution economy become earned options behind evidence gates, not the thesis.
4. **The most future-proof idea across all versions** is v2's "Proof of Human Capability", renamed to avoid "proof". As AI makes finished artifacts cheap, observed demonstrations under known conditions gain value in every scenario the repository has modelled except one (S5, where transfer can't be shown).

---

## 1. The five theses in the tournament

| ID | Thesis | Core bet | Where |
|---|---|---|---|
| **T1** | v1 · The Human Capability Utility | Community-owned intelligence infrastructure becomes *productive*, so communities participate in the intelligence economy | [`thesis/v1-…`](../thesis/v1-human-capability-utility/THESIS.md) |
| **T2** | v2 · NBC: Infrastructure for the Next Billion Children (**the text re-shared**) | **Institutional portability:** make the intelligence of a great school portable; the NBC Node as the deployment unit | [`thesis/v2-…`](../thesis/v2-nbc-infrastructure/THESIS.md) |
| **T3** | v3 · Unified thesis | v1 frame + v2 architecture, with economics staged behind gates | [`thesis/v3-unified/THESIS.md`](../thesis/v3-unified/THESIS.md) |
| **T4** | HCG strategy (DEV-019/020) | The Human Capability Graph as open evidence infrastructure; transfer evidence as the first application | [`foresight/NBC_HCG_STRATEGY_2026.md`](NBC_HCG_STRATEGY_2026.md) |
| **T5** | v5 (ChatGPT-drafted, founder-provided) | Learning infrastructure for children; learning before measurement; one testable offer (Learning Worlds for programme owners) | [`strategy/`](../strategy/) |

---

## 2. The adversarial panel: ten seats, ten verdicts on v2

Each seat reads v2 as written and gives one verdict: **Pass**, **Pass with conditions** or **Reject as company thesis**.

### 2.1 Venture investor (early-stage IC partner)
- **For:** a large, clear problem with a quotable frame. It is candid about uncertainty (§29), and "the cost of a unit of capability" is a metric an investor can remember.
- **Against:**
  - **Nine products in one deck:** Node, token, computational matter, Experience Protocol, Capability Graph, Village AI, NBC OS, licence and network. Each is a company-sized problem.
  - It combines hardware, an operating system, a certification body and a two-sided creator economy. Those are four business models with four capital profiles.
  - There is no named buyer, no price and no first use.
  - "Radically inexpensive" and "dramatically less infrastructure" are asserted before any cost data exists.
- **Verdict: Reject as a company thesis; accept as the founding vision.** "Show me the one thing someone pays for in month three."

### 2.2 Learning scientist
- **For:**
  - It protects foundational learning (§9) instead of trading it for "future skills".
  - Its progression from physical to symbolic to transfer echoes Bruner's enactive, iconic and symbolic modes, and "concreteness fading" research (Fyfe et al., 2014) **[GK]**.
  - It makes transfer a first-class objective (§11).
- **Against:**
  - **Far transfer is rare and hard to show.** Meta-analyses of training programmes find little far transfer (e.g. Sala & Gobet on chess, music and working-memory training) **[GK]**. The thesis leans on it heavily.
  - **Domain-general skills are a known trap.** The capability list ("judgment", "adaptation", "abstraction") treats skills as content-free. The evidence says knowledge is largely domain-specific, and transfer depends on what the learner knows about the new situation. v5 fixed this; v2 does not.
  - **Manipulatives aren't automatically better.** Concrete materials help when faded towards symbols, and can distract when they don't.
  - "Different representation, same capability" adaptation (§10) is exactly where evidence is thinnest.
- **Verdict: Pass with conditions.** Narrow to one capability family with published transfer evidence (control of variables, Chen & Klahr 1999 **[SRC]**). Use explicit instruction plus probes. Treat "capability" as domain-anchored.

### 2.3 Development economist (education in low- and middle-income countries)
- **For:** it asks the right economic question (cost per unit of capability) and refuses the "cheaper version of rich-country infrastructure" reflex.
- **Against:**
  - **The best-evidenced, cost-effective interventions are unglamorous.** Structured pedagogy (teacher guides plus coaching), teaching at the right level and giving families information top the "smart buys" lists (e.g. GEEAP) **[GK]**. Hardware-led programmes have a poor record. The best-known case is One Laptop per Child in Peru: a randomised evaluation found no gains in maths or language, with some cognitive-skill effects **[GK]**.
  - v2's Node is closer to the weak reference class than the strong one. Its strongest components (educator intelligence, sequencing, routines) are closer to structured pedagogy, and they don't need a Node.
- **Verdict: Pass with conditions.** Lead with the teacher and facilitator routine. Compare against structured pedagogy as the "simple alternative", and prove the extras add value over it.

### 2.4 Futurist / forecaster
- **For:** the inversion is well founded. Inference prices for a fixed capability have fallen fast (Epoch AI tracking; repository forecast F3, ~65–75% likely to fall a further ≥10× within a year **[SRC]**).
- **Against:**
  - **The premise that personal devices are the expensive part is ageing.** Handset and tablet prices keep falling, and foundation-funded AI tutors on existing devices are spreading (repository F2: ~70–80% likely that a frontier lab or major foundation funds a ≥100-school tutor deployment in Ghana, Nigeria, Kenya or India by end-2027 **[SRC]**). A World Bank pilot in Nigeria reported sizeable gains from after-school AI tutoring on shared devices **[GK]**.
  - The shared-Node advantage therefore shrinks over the next five to ten years in most scenarios.
  - **What stays scarce** (trusted adults, time, motivation, physical experience, credible evidence of unassisted capability) is exactly what v2 names in §1. But it then spends most of its architecture on computation.
- **Verdict: Pass with conditions.** Become device-agnostic: work with a shared node, a teacher's phone or children's own devices. Put the moat in experiences and evidence, not compute placement.

### 2.5 Hardware and operations engineer
- **For:** paper tokens first (added in v3) is the right sequencing.
- **Against:**
  - Cheap passive tags (e.g. NFC or RFID stickers) exist, but **sensing surfaces, readers, power, heat, humidity, loss and repair** carry the cost. Educational hardware fleets fail through maintenance and logistics, not unit price.
  - A "computational token at commodity economics" is a multi-year hardware programme.
- **Verdict: Reject for the first 24 months.** Use printed tokens and a phone camera or facilitator logging, and instrument only a concrete need (v5 already says this).

### 2.6 Child-rights and data-protection counsel
- **For:** the strongest privacy principles in any version:
  - minimum data;
  - observe the state of the environment rather than the child;
  - local processing;
  - expiry;
  - "never tokenize childhood".
- **Against:**
  - **"Proof of Human Capability" drifts towards credentials and selection** as soon as schools or employers read it.
  - **Licensing public schools** puts a private actor in a certification role over public institutions.
  - **Contribution and settlement economies involving minors**, and **AI evaluation worlds** built in children's settings, create consent, exploitation and reputational risks, whatever the safeguards.
- **Verdict: Pass with conditions.** Hard walls around three things: no selection use of under-18 records, no commercial data flows, and evaluation worlds built without children's data. Rename "proof" to "capability evidence". Make families' correction and deletion rights architectural.

### 2.7 Ministry of Education / public-system buyer
- **For:** it is explicit that public schools stay public (§18). Curriculum compatibility through a capability map is attractive, and so is "stronger evidence about opportunities to learn".
- **Against:**
  - Sovereignty and dependency: ministries prefer open standards they control to a private licence and OS.
  - Procurement is slow and pilot-driven.
  - "NBC School" certification of public schools is politically unworkable.
- **Verdict: Pass with conditions.** Offer the Experience Protocol and capability map as **open standards** with public governance. Sell services and support, not a licence over public institutions.

### 2.8 Programme owner (the v5 first buyer)
- **For:** "reusable activities and a facilitator plan" is something the programme owner wants.
- **Against:** nothing in v2 tells them what to buy on Monday, what it costs or what changes for their staff.
- **Verdict: Reject as a sales document.** Use v5's offer language.

### 2.9 Teacher / facilitator
- **For:** "teachers become more important" and continuous small professional-learning nudges.
- **Against:**
  - "Teachers as creators" helps a few prolific creators; most teachers need time back, not a marketplace.
  - The administrative OS risks adding data entry.
- **Verdict: Pass with conditions.** Measure the time saved per week before adding any creator economy.

### 2.10 Red team: pre-mortem from 2031

*"NBC failed. Why?"* **[JUDGEMENT]**, ranked by likelihood × damage:
1. **It became a hardware kit company.** Stock-outs, repairs and shipping ate the team, and the evidence work never ran.
2. **Cheap phones plus free AI tutors won the attention of funders and parents.** NBC's Node looked expensive and unnecessary.
3. **Transfer could not be shown credibly at an affordable cost.** Without it, the Capability Graph became a portfolio tool with no premium (repository scenario S5 **[SRC]**).
4. **OS sprawl.** Admissions, finance and scheduling features pulled the product towards generic school software, where incumbents are cheaper.
5. **A data or consent incident**, or the perception of "testing on African children", ended public-sector trust.
6. **The licence model stalled.** No one would pay for certification from an unproven body.

v2 guards against #5 in principle, but invites #1, #2, #4 and #6 by design.

### Panel summary

| Seat | Verdict on v2 |
|---|---|
| Venture investor | Reject as company thesis; keep as vision |
| Learning scientist | Pass with conditions |
| Development economist | Pass with conditions |
| Futurist / forecaster | Pass with conditions |
| Hardware / operations | Reject for 24 months |
| Child-rights counsel | Pass with conditions |
| Public-system buyer | Pass with conditions |
| Programme owner | Reject as sales document |
| Teacher / facilitator | Pass with conditions |
| Red team | Four of six top failure modes invited by design |

**Overall: v2 is the right problem statement and the wrong operating thesis.**

---

## 3. Futures lenses

### 3.1 Reference-class forecasting: what has actually scaled in education?

**[GK]**, summarised; verify details before external use.

| Analogue | What it was | Outcome pattern | Lesson for NBC |
|---|---|---|---|
| One Laptop per Child | Low-cost personal hardware for children | Large deployments; weak learning effects in evaluations | Hardware-first is a weak reference class |
| Hole-in-the-Wall | Shared computers in public spaces, minimal adults | Striking stories; contested evidence | Shared access without adults is not enough |
| Bridge International Academies | Standardised, scripted low-cost private schools | A Kenya study reported learning gains; strong political opposition in some countries | A school chain meets politics; standardised pedagogy can work |
| AltSchool | Venture-funded, tech-heavy microschools | Pivoted to software after heavy spending | An institution plus a platform is capital-hungry |
| Teaching at the Right Level (Pratham / J-PAL) | A method: group by level, simple routines | Repeated RCT gains; scaled through governments | **Methods and routines scale; governments adopt them** |
| Scratch / BBC micro:bit | An open language and a cheap board with a community | Mass adoption; open ecosystems | **Open protocols and communities scale** |
| International Baccalaureate | A standard plus school authorisation | A long-lived, trusted network of authorised schools | **A quality standard can scale without owning schools** |
| Montessori | A method with no single owner | Global spread; very uneven quality | A standard without a guardian dilutes |
| Khan Academy | Free content and platform, philanthropy-funded | Global reach | Free public goods win reach; revenue comes from elsewhere |

**The pattern: open methods, protocols and standards with a guardian scale; proprietary hardware for schools rarely does.** NBC's strongest assets are therefore the Experience Protocol as an open standard, the capability-evidence method and facilitator routines. Its weakest are the token hardware, the Node as a product and NBC OS. v2's own §21 ("scales by making institutions replicable, not by owning every institution") points the right way. Its licence clause is the IB lesson, but only after NBC has earned the trust to certify.

### 3.2 Trend projection: what gets cheaper, what stays scarce

| Resource | 2026 → 2035 direction | Confidence | Consequence |
|---|---|---|---|
| Inference cost at fixed capability | Falls steeply | High **[SRC: Epoch, F3]** | Compute is not a moat; keep models replaceable |
| Capable small or edge models | Improve; run on phones and modest hardware | High **[GK]** | A shared Node is optional, not unique |
| Personal devices | Cheaper; more shared-then-personal access | Medium-high **[GK]** | A "no device per child" architecture loses its edge |
| Connectivity | Expands unevenly; outages persist | Medium | Offline-first stays valuable |
| Trusted adults' time | Stays scarce; wages rise with development | High | **Facilitator leverage is the real cost lever** |
| Physical, consequential experience | Stays scarce | High | **Programmable experiences keep value** |
| Credible evidence of unassisted capability | **Scarcer and more valuable** as AI-assisted output floods institutions | Medium-high **[JUDGEMENT]** | **The evidence layer is the most future-proof asset** |

### 3.3 Forecast register: new, resolvable questions

These add to F1–F8 in the four-methods report. Probabilities are **[JUDGEMENT]**, to be updated.

| ID | Question (resolves yes if…) | By | P | Why it matters |
|---|---|---|---|---|
| **G1** | A peer-reviewed or working-paper RCT in a low- or middle-income country reports ≥0.2 SD learning gains from an AI tutor on existing devices | 31 Dec 2027 | ~60% | Yes = the device-averse part of v2 weakens further |
| **G2** | A national ministry in sub-Saharan Africa publishes an AI-in-education policy requiring data localisation or local processing for pupil data | 31 Dec 2027 | ~50% | Yes = the local-processing principle becomes a selling point |
| **G3** | A major assessment body or university admissions system announces a supervised or observed "live demonstration" component explicitly because of generative AI | 31 Dec 2028 | ~55% | Yes = demand for capability evidence under known conditions |
| **G4** | NBC's first pilot shows external facilitators running sessions within the quoted support allowance (v5 delivery gate) | Week 8 of the pilot | ~50% | The single biggest internal uncertainty |
| **G5** | NBC's delayed, unfamiliar-task results are interpretable (v5 learning-feasibility gate), whatever the direction | Pilot end | ~55% | No = the evidence thesis must slow down |

### 3.4 Scenarios: which thesis survives most futures?

The axes follow the four-methods report's reassessment:
- **A:** where AI reaches children: *mostly personal devices* vs *mostly shared institutions*;
- **B:** whether institutions *accept contextual evidence of capability* or *keep only tests and credentials*.

| | Contextual evidence accepted | Tests and credentials only |
|---|---|---|
| **AI via personal devices** | **Q1 "Open proof, personal AI"**: evidence layer strong; Node weak | **Q2 "Tutors everywhere"**: exam gains; NBC's value is experiences and facilitators; Node weak |
| **AI via shared institutions** | **Q3 "Community intelligence"**: v1 and v2 at their best; Node and evidence strong | **Q4 "Institutional AI, old credentials"**: Node useful as school infrastructure; evidence premium low |

How each thesis fares in each quadrant (● strong, ◐ partial, ○ weak) **[JUDGEMENT]**:

| Thesis | Q1 | Q2 | Q3 | Q4 | Robustness |
|---|---|---|---|---|---|
| T1 Human Capability Utility | ○ | ○ | ● | ◐ | Low: wins in one quadrant |
| T2 v2 Portable institutional intelligence | ◐ | ○ | ● | ● | Medium-low: needs shared-institution futures |
| T3 v3 unified | ◐ | ○ | ● | ◐ | Medium-low |
| T4 HCG evidence infrastructure | ● | ○ | ● | ○ | Medium: needs evidence acceptance |
| T5 v5 learning infrastructure | ◐ | ◐ | ◐ | ◐ | Medium: survives everywhere, dominates nowhere |
| **Synthesis (§6)** | ● | ◐ | ● | ◐ | **Highest:** device-agnostic experiences plus an evidence layer, with the Node as an option |

The substitution scenario (ordinary materials plus a good facilitator do as well) and S5 (transfer can't be shown) hurt every thesis. The synthesis limits the damage because its first offer (experiences plus facilitator routines) still has value without transfer claims.

### 3.5 Three Horizons and backcasting

- **H1 (now to 2027): prove the routine.** Learning Worlds for programme owners; external facilitators; delayed unfamiliar tasks; paid continuation (v5).
- **H2 (2027–2030): make it interoperable.** Publish the Experience Protocol and the capability-evidence method as open specifications with a guardian. Add a second capability family and a contrasting site. Let others build worlds.
- **H3 (2030+): earn the infrastructure.** Build the Node, shared intelligence services, a certification standard for NBC Centers and the contribution economy, *only where the evidence shows shared infrastructure beats the alternatives*.

**Backcast from a preferred 2040:** children in scarce and abundant settings alike can show, and correct, trusted records of what they can do under stated conditions, and learning environments are cheap to start. For that to exist, there must be by about 2032:
- an open experience standard used beyond NBC;
- an evidence method that institutions accept;
- a facilitator network that works without the founders.

None of these requires owning hardware.

---

## 4. Scorecard

Weights reflect what decides survival for an early venture with a public-good mission **[JUDGEMENT]**. Scores run 1 (weak) to 5 (strong).

| Criterion (weight) | T1 v1 | T2 v2 | T3 v3 | T4 HCG | T5 v5 | Synthesis |
|---|---|---|---|---|---|---|
| Problem insight and originality (15%) | 4 | **5** | 4 | 4 | 3 | 5 |
| Falsifiability; a clear test (15%) | 2 | 3 | 3 | 4 | **5** | 5 |
| Near-term buyer and offer (15%) | 1 | 1 | 2 | 3 | **5** | 5 |
| Fit with evidence on what works (10%) | 2 | 3 | 3 | 4 | **5** | 5 |
| Robustness across scenarios (15%) | 2 | 2 | 2 | 3 | 4 | **5** |
| Capital efficiency (10%) | 1 | 1 | 2 | 4 | **5** | 4 |
| Child-safety and ethical risk (10%, higher = safer) | 2 | 3 | 3 | 3 | **5** | 5 |
| Long-run defensibility and ambition (10%) | 4 | 4 | 4 | **5** | 2 | 5 |
| **Weighted total (out of 5)** | **2.25** | **2.75** | **2.85** | **3.70** | **4.25** | **4.90** |

*The synthesis scores highest partly by construction, since it borrows the best parts of each. That is the point of the exercise, but it has not been tested either.*

**Ranking of what exists today:**
1. **T5 (v5)**, as the operating thesis.
2. **T4 (HCG)**, as the long-run asset.
3. **T3 (v3)**.
4. **T2 (v2)**, strongest as narrative.
5. **T1 (v1)**.

---

## 5. What in v2 to keep, change and move

| v2 element | Decision | Why |
|---|---|---|
| §1 "The coming inversion" | **Keep, lead with it** | The best framing in any version |
| §2 infrastructure mismatch | **Keep, soften** | Replace "how can every child have a computer?" with a device-agnostic framing; devices are getting cheap |
| §3 institutional intelligence is separable | **Keep as a hypothesis** | Frame it as "routines and knowledge travel; buildings and relationships don't" |
| §4 NBC Node | **Move to H3** | An earned option, not the unit of the thesis |
| §5–6 computational matter and token | **Keep the idea; paper-first** | Printed tokens; instrument only a proven need |
| §7 Experience Protocol | **Promote: make it an open standard** | The strongest scaling lever (reference class: Scratch, micro:bit) |
| §8 Capability Graph | **Keep, domain-anchor** | Drop content-free skills as nodes; anchor to tasks and domains; explicit edge meanings (HCG strategy) |
| §9 foundational learning | **Keep** | Essential guardrail; add measurable foundational outcomes |
| §10 adaptive pathways by Village AI | **Delay** | Fixed sequence plus human interpretation first (v5); adapt only after a baseline |
| §11 transfer | **Keep as the central research question** | Test first with one family, with explicit instruction plus probes |
| §12 evidence without surveillance | **Keep verbatim** | A differentiator and a legal asset |
| §13 Proof of Human Capability | **Keep, rename** | "Capability evidence under stated conditions". No selection use for under-18s |
| §14 Village AI | **Recast** | "Intelligence where it helps": device-agnostic, human-reviewed |
| §15 teachers more important | **Keep; measure time saved** | Lead with facilitator leverage (structured-pedagogy evidence) |
| §16–17 NBC OS and governance | **Drop from the thesis** | Generic school-software territory; revisit only if programme owners pull for it |
| §18 public education | **Keep; open standards** | No private licence over public schools |
| §19 cheaper institution formation | **Move to H3** | Microschool economics are real but regulatory and capital-heavy |
| §21–22 NBC Schools, Centers, licence | **Move to H3 as an IB-style standard** | Certify only after the evidence method is trusted |
| §23, §26 incentives, contribution economy | **Move to an appendix** | Premature; ethically sensitive near minors |
| §24 community intelligence infrastructure | **Move to H3 (v1 option)** | Only in shared-institution scenarios |
| §25 AI evaluation worlds | **Separate research track** | Worlds built for evaluation, never from children's data; a funding option, not the core |
| §28 cost per unit of capability | **Keep as the north-star metric** | Needs the evidence layer to be measurable at all |
| §30 first Node | **Replace with the v5 eight-week plan** | Same questions, far lower cost and risk |

---

## 6. The strongest thesis we can state (v6 candidate)

> **As machine intelligence becomes abundant, two things become the binding constraints on human development: consequential experiences through which children build capability, and trustworthy evidence of what a person can do, with and without AI. NBC builds open learning infrastructure for both.**
>
> **Programmable experiences** run on ordinary materials and on whatever devices a setting already has. **Facilitator routines** make them deliverable by people beyond the founding team. **Capability evidence** records what a child did, under what conditions, with what help and with what uncertainty, from the minimum personal data, owned and correctable by families.
>
> NBC starts as a supported programme for people who run after-school and holiday learning programmes (ages ~9–12, one capability family, Cape Coast plus a contrasting site). It grows by publishing its Experience Protocol and evidence method as open standards others can build on. It earns shared intelligence infrastructure (the Node), certification of NBC Centers and a contributor economy only where evidence shows they beat simpler alternatives.
>
> **North-star metric:** the total cost of reliably producing, and credibly evidencing, a unit of human capability.
>
> **Principle:** observe the learning environment, not the child. Never tokenize childhood.

**What changes versus v2:**
1. The core bet moves from *portability of the institution* to *experiences plus evidence*.
2. Device-averse becomes device-agnostic.
3. Proprietary platform becomes open standards with a guardian.
4. The Node and licence move from the start of the thesis to the end of the roadmap.

**What stays:** the inversion, foundational learning, transfer, privacy architecture, public-school protection, and the cost-per-capability metric.

**What would falsify it:**
- Children don't engage with the experiences, or engage without developing the target capability (engagement and learning are tested separately).
- External facilitators can't deliver within an affordable support allowance.
- Delayed unfamiliar-task results can't be interpreted at a cost buyers or funders will bear.
- Three of ten qualified programme owners don't pay after an honest offer.
- In a contrasting high-AI-access site, the evidence adds nothing beyond what AI tutors and ordinary portfolios already provide.

---

## 7. Other ways to imagine NBC

Five alternative framings, each coherent enough to pursue, ranked by expected value under uncertainty **[JUDGEMENT]**.

| Rank | Framing | One line | Best when | Biggest risk |
|---|---|---|---|---|
| 1 | **"The IB of the AI era"** | A standard and quality mark for capability-building learning environments, with open experiences and trusted evidence | Institutions start valuing observed capability (G3 yes) | Needs years of trust before anyone pays for the mark |
| 2 | **Facilitator intelligence network** | TaRL-style routines plus AI coaching on the facilitator's phone; the teacher is the Node | Tutors spread (Q2); human time is the constraint | Looks like structured pedagogy; needs a clear edge |
| 3 | **Transfer lab / evaluation worlds** | A shared set of worlds that tests generalisation in children *and* AI systems, with no children's data | AI labs fund evaluation diversity | Mission drift; consent optics; must stay separate from child records |
| 4 | **Microschool-in-a-box** | "Safe space + capable adults + NBC stack + licence = a learning centre" (v2 §19) | Private demand for low-cost quality schooling | Regulation, capital, politics (Bridge reference class) |
| 5 | **Community capability utility** | The Node as productive community infrastructure (v1) | Shared-institution futures (Q3) | Financing assumption; low utilisation |

The v6 synthesis is framing #1's long-run destination, reached through #2's operating model, with #3 as a funding option kept at arm's length.

---

## 8. Recommended decisions

1. **Adopt the v6 synthesis as the working thesis**, with v2's §1, §12 and §28 kept as the narrative. Create `thesis/v6-…` only if the founder agrees; under the repository's rule, a new version is needed because a core claim changes.
2. **Keep v5 as the eight-week operating plan.** Nothing here changes the pilot.
3. **Publish nothing claiming "radically cheaper" or "portable school"** until the cost sheet and pilot logs exist.
4. **Start the Experience Protocol as an open specification now**, as a human-readable document. It is the cheapest high-leverage asset.
5. **Register G1–G5** alongside F1–F8 and review them quarterly.
6. **Brand and website:** they already carry the synthesis (v3 brand, DEV-027/028). The only change is to phrase the Node and licence as "later, behind gates", which the website's architecture section already does.

---

## 9. Source notes

- **Repository sources [SRC]:**
  - v1, v2 and v3 thesis texts;
  - [`NBC_FOUR_METHODS_2026.md`](NBC_FOUR_METHODS_2026.md) (forecasts F1–F8, scenarios S1–S6, Epoch AI inference-price trend);
  - [`NBC_HCG_STRATEGY_2026.md`](NBC_HCG_STRATEGY_2026.md);
  - [`../strategy/RECONCILIATION.md`](../strategy/RECONCILIATION.md) (Chen & Klahr 1999; Shavelson, Baxter & Gao 1993).
- **General knowledge [GK]**, to verify before any external use:
  - OLPC Peru evaluation (Cristia et al.);
  - GEEAP "smart buys" reports;
  - Teaching at the Right Level RCTs (J-PAL / Pratham);
  - Bridge International Academies study and controversies;
  - AltSchool pivot;
  - Hole-in-the-Wall debate;
  - Scratch and BBC micro:bit adoption;
  - IB authorisation model;
  - Sala & Gobet on far transfer;
  - Fyfe et al. (2014) on concreteness fading;
  - World Bank AI-tutor pilot in Nigeria.
- **[JUDGEMENT]:** panel verdicts, scenario placements, probabilities for G1–G5, and scorecard weights and scores.
