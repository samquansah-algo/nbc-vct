# NBC v6: The Capability Layer

### Infrastructure that makes physical learning and human capability legible, for people, institutions and the AI frontier

> **Version 6 (27 Sep 2026), founder-directed.** It refines the v6 candidate in [`../../foresight/NBC_THESIS_TOURNAMENT_2026.md`](../../foresight/NBC_THESIS_TOURNAMENT_2026.md) §6 after the founder's challenge: "You are just building a wrapper that can be wiped out by an Anthropic feature release? I want real infrastructure for the future of learning." It integrates the five framings reviewed there, and the Baton invention (`../../invention/BATON.md`) as one evidence primitive. **Every central proposition is a hypothesis.** v5 remains the eight-week operating plan. The investor memo is `../../investor/INVESTOR_MEMO.md`.

*Labels: **[GK]** general knowledge, to verify before external use; **[JUDGEMENT]** my assessment; **[MODEL]** an illustrative calculation.*

---

## 1. The founder's challenge, answered

**Yes: Baton, built as an app, is a wrapper.** Its practice partner and "pass mode" are features a frontier lab can ship in a release, and major labs already offer study or learning modes **[GK]**. Anything whose value is *a clever use of a model* sits downstream of the model and loses when the model owner moves.

**A layer survives a lab's feature release when it holds one of five things labs can't ship from a data centre:**
1. **Atoms and presence:** physical learning environments, kits and trained people in thousands of places.
2. **Legitimacy:** a standard that institutions, governments and families trust, governed independently of any vendor.
3. **Neutrality:** an evaluator that is not also the model maker.
4. **Data labs cannot scrape:** a consented, governed record of how people perform real physical tasks and transfer them. It doesn't exist on the internet because it happens in rooms.
5. **Adoption by others:** a protocol many builders implement, so that switching away costs the whole ecosystem.

v6 is designed so NBC holds all five. It treats frontier labs as **suppliers** (intelligence gets cheaper; NBC's costs fall) and as **customers** (they need what NBC produces), and never as competitors on intelligence.

---

## 2. The thesis

> **Frontier labs built the intelligence economy on the digital record of what humans wrote and said. The next frontier (physical, causal, embodied and transferable capability) has no such record. It happens in rooms, with objects and people, and is almost never captured in a form that institutions or machines can read.**
>
> **NBC builds the Capability Layer: the infrastructure that makes physical learning and human capability legible.** It has five parts:
> - an **open protocol** that describes real-world tasks so that people *and* machines can run them;
> - an **evidence standard** that records what someone demonstrated, under what conditions and with what help;
> - a **facilitator network** that runs these tasks in thousands of places on ordinary phones;
> - a **trust layer** that certifies learning environments and capability claims;
> - an **exchange** through which learning technologies, schools, funders, employers and AI developers build on all of it.
>
> **Children's data is never the product.** What AI developers license is built from designed worlds and consented, paid adult contributors. Children's records stay with families under an independent data trust.
>
> **North-star metric:** the cost of producing one verified unit of human capability, falling every year as intelligence gets cheaper and the network grows.

**Short form:** *Frontier labs made intelligence abundant. NBC makes human capability legible.*

---

## 3. Why now

1. **Intelligence is commoditising.** Inference prices at fixed capability keep falling (repository forecast F3 **[SRC]**). Value moves to what intelligence acts on and to what can be trusted.
2. **Digital text data is running out as a differentiator.** Labs increasingly pay for expert human data and hard, uncontaminated evaluations; human-data vendors have grown fast **[GK]**. Physical, causal and multilingual human performance is among the least-covered areas.
3. **Generalisation has become the central open question in AI.** Benchmarks that compare how humans and models handle novelty draw major attention (e.g. ARC-style tasks) **[GK]**. Physical, causal transfer tasks run by people across cultures are a natural next frontier.
4. **Credentials are weakening under AI.** When finished work can be generated, institutions need evidence of what a person can do under known conditions (repository forecast G3 **[SRC]**).
5. **Embodied AI needs task specifications.** Robots and world models need machine-readable descriptions of real tasks, their states and their consequences, which is what the Experience Protocol is.
6. **Learning poverty persists.** A large share of children in low- and middle-income countries can't read a simple text by age ten (World Bank "learning poverty" estimates) **[GK]**. The need for capability infrastructure is not speculative.

---

## 4. The stack

| Layer | What it is | Who uses it | Moat type | Owned by |
|---|---|---|---|---|
| **L5 · Exchange** | **Evaluation worlds and human baselines** for AI developers; **outcome contracts** priced per verified capability; a **creator marketplace** for world designers | AI labs, AI safety institutes, robotics teams, funders, governments, creators | Data labs can't scrape; neutrality | NBC Inc. |
| **L4 · Trust** | **The NBC Standard**: certification of worlds, learning environments and capability claims, by independent assessors | Schools, microschools, programmes, ministries, employers | Legitimacy | Standard: NBC Foundation · services: NBC Inc. |
| **L3 · Facilitator intelligence** | **The phone is the Node**: routines, preparation, observation, misconception maps, model-agnostic AI help, offline-first | Facilitators, teachers, programme operators | Presence; operational know-how | NBC Inc. |
| **L2 · Evidence** | **Capability Evidence Standard and records** (the HCG made practical): observed / inferred / predicted, conditions, assistance, uncertainty; the **pass** (Baton) as one evidence type | Everyone above; families own records | Adoption; trust | Standard: Foundation · records: family-controlled data trust |
| **L1 · Protocol** | **The Experience Protocol**: an open, machine-readable description of physical tasks (objects, states, actions, consequences, assistance, evidence), executable on paper, sensors, simulators, by humans and by AI agents | Any learning-tech builder, researchers, simulator and robotics teams | Ecosystem adoption | NBC Foundation (open licence) |
| **L0 · Places** | **Learning Worlds kits, microschool-in-a-box, community spaces**, licensed to operators, never owned by NBC | Operators, microschools, programmes, community hubs | Atoms and presence | Operators; NBC certifies and equips |

**The layering rule:** open where adoption matters (L1, L2), trusted where legitimacy matters (L4), commercial where the service is delivered (L3, L5), and operated by others where places are involved (L0).

---

## 5. New units of account

Like the kilowatt-hour for utilities or the token for language models, the Capability Layer needs units:

| Unit | Definition | Priced to | Never |
|---|---|---|---|
| **VCU: Verified Capability Unit** | One person demonstrating one defined capability on a fresh, held-out task under stated conditions, recorded to the Capability Evidence Standard and independently verifiable | Programmes, funders and governments (outcome contracts) | Sold as data; used to rank children |
| **HBU: Human Baseline Unit** | One consented, paid **adult's** attempt at an evaluation world, with a de-identified solution trace | AI developers, safety institutes, researchers | Collected from children |
| **CWU: Certified World Unit** | One world specification passing the NBC Standard (clear construct, held-out variants, accessibility, safety) | Creators (listing) and buyers (licence) | n/a |

**Operating metric:** *intelligence cost per VCU* (inference spend ÷ VCUs). It should fall year on year. This is how cheaper intelligence from labs becomes NBC's margin rather than its threat.

---

## 6. What NBC adds to the AI frontier and economy, without children's data

1. **Generalisation evaluations grounded in physical causality.** The same world runs as a physical kit (for people) and as a simulator or text version (for models). World variants are generated procedurally and held out, which resists contamination. The output is a leaderboard comparing *how humans and models transfer across worlds*, a question no text benchmark answers.
2. **Diverse human baselines.** Consented adults across countries and languages attempt the worlds, producing HBUs. They are paid for their time and expertise, and a benefit share returns to their communities (v1's idea of communities as producers, made concrete).
3. **Pedagogical intelligence.** Facilitator-authored explanations, teaching moves and aggregated misconception taxonomies improve tutoring models. They are licensed from adult contributors and aggregate statistics only.
4. **Embodied task specifications.** Experience Protocol worlds are machine-readable physical tasks for robot learning, evaluation and world models.

**The data covenant (binding in the charter):**
- No child's raw data (audio, video, text, identity) leaves the data trust.
- No child's data is used to train or evaluate commercial models.
- Aggregate statistics are released only above minimum group sizes, with the trust's approval.
- Every AI-exchange contract carries a benefit share to contributor communities.
- Audits are annual, independent and public.

---

## 7. The five framings, integrated

| Framing (tournament §7) | Place in v6 | When | What changes from the tournament version |
|---|---|---|---|
| **"The IB of the AI era"** | **L4 Trust:** the NBC Standard | Worlds certification from year 2; environments from year 3–4 | Split into a **foundation that owns the standard** and **independent assessors**, to avoid NBC certifying itself. It starts with *worlds*, the easiest thing to certify |
| **1 · Facilitator intelligence network** | **L3:** the engine of H1 and the source of presence | Now | It is the wedge. The phone is the Node; the AI inside is swappable; the moat is routines, training and a network in thousands of places |
| **2 · Evaluation worlds** | **L5 Exchange:** the frontier-revenue line | Pilot in the first 90 days | A **separate business unit with a data firewall**. Earliest non-education revenue; highest margin; the main mission-drift risk, so it is capped as a share of revenue until year 5 |
| **3 · Microschool-in-a-box** | **L0 via licensing** | Year 2–3 pilot (US education-savings-account states and African low-fee private operators) | NBC **never owns schools**. It sells certification, kits, the facilitator stack and the standard to operators |
| **4 · v1 community intelligence utility** | **L0/L5, narrowed** | Year 4+ option | **Compute resale is dropped**: small community nodes can't compete with hyperscale prices. Kept: **facilitators as local capability agents** (like mobile-money agents) earning from several services, and local inference for offline use |
| **Baton (the pass)** | **L2 evidence primitive + L3 routine** | Now | No longer a company. It is one open evidence type any builder can implement |

---

## 8. The flywheel

1. Facilitators run worlds in more places, which produces **VCUs**.
2. VCUs and misconception maps improve worlds and routines, so the cost per VCU falls.
3. Cheaper, credible evidence makes the **NBC Standard** worth adopting.
4. More operators and builders adopt the **protocol**.
5. More creators publish worlds.
6. More certified worlds enlarge the **evaluation corpus**, with adult HBUs.
7. AI-exchange revenue subsidises the free and public tiers.
8. That brings more facilitators, and the cycle repeats.

Two compounding assets sit underneath:
- the **world library**, with held-out variants and difficulty profiles from human baselines;
- the **transfer map**: which worlds share structure, measured, not assumed.

Neither can be generated by a model alone, because both need people doing physical tasks.

---

## 9. What would falsify v6

1. External facilitators can't produce interpretable evidence at a cost buyers bear (the v5 gates fail).
2. VCUs can't be verified reliably (independent scorers disagree beyond a prespecified threshold) or cheaply (cost per VCU doesn't fall across two cohorts).
3. No AI developer or safety institute pays for evaluation worlds with adult baselines after a real offer (fewer than 2 paid pilots in 12 months).
4. No external builder implements the protocol within 18 months.
5. Institutions won't accept certification from an independent standard body within 4 years.
6. Any breach of the data covenant. That is a stop condition, not a metric.

---

## 10. What stays from earlier versions

- **v1:** communities as participants in the intelligence economy, now through paid baselines and capability agents rather than compute resale.
- **v2:** the inversion; "observe the environment, not the child"; minimum personal data; cost per unit of capability; institutional portability.
- **v3:** economics staged behind evidence gates.
- **HCG strategy:** evidence semantics and edge meanings.
- **v5:** learning before measurement; the operator wedge; the eight-week plan.
- **Baton:** the pass as second-hand evidence.
