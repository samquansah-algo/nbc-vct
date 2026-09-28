# NBC strategic foresight 2026: benchmarking the Human Capability Utility

> **Superseded on scope (25 Sep 2026).** NBC is now framed around the **Human Capability Graph**, with schools as one possible entry market. Where this document treats NBC as a school or node product, [`NBC_HCG_STRATEGY_2026.md`](NBC_HCG_STRATEGY_2026.md) takes precedence. Its evidence-cost model (`hcg_economics.py`) also supersedes the CDTC figures here.

> **Erratum and scope note (25 Sep 2026, later the same day).**
> - **Cost correction.** The school-site facilitation cost was corrected from $360 to $100 a year. The earlier figure assumed $2.50–5 an hour; reported Ghana teacher pay implies about $0.60–1.40. The school node's full cost is now **$9.60 per learner-year** (was $11.22), with compute at 7–13% of cost. The conclusions are unchanged.
> - **Scope.** At the founder's prompting, *why limit the scope to Ghana?*, the geographic framing is widened in the companion analysis [`NBC_FOUR_METHODS_2026.md`](NBC_FOUR_METHODS_2026.md). Ghana is the first *sales* test site, not the scope of the mission or of the evidence.

*Prepared 25 September 2026 for Sam Quansah (Algo Peers / NBC). This is a reasoning exercise, not a prediction. Labels: **[SOURCE]** NBC or Algo Peers documents · **[OBSERVED]** a dated external fact, with citation · **[INFERENCE]** analyst judgement · **[ASSUMPTION]** a model input · **[FICTION]** a constructed scenario or persona element · **[SIM]** earlier synthetic studies (not evidence).*

> **How to read this.** Section 1 gives the decision. Sections 2–9 show the reasoning. Sections 10–12 turn it into tests and monitoring. Section 13 restates the thesis. Section 14 lists sources with access notes. Several sites (Semafor, Taylor & Francis, Facebook, LinkedIn) were blocked from this environment; claims resting only on search-result text are marked *(snippet)*.

---

## 1. Strategic verdict

**The decision.** Keep NBC's long-term thesis, but change what it claims is scarce and who it serves first:

- **The scarce thing is trusted evidence of unassisted, transferable, practically grounded capability.** Access to AI is not the scarce thing, and neither is AI tutoring.
- **Test two first applications in parallel for 8 weeks:**
  1. the existing priced **school and after-school node**;
  2. a new **capability-demonstration service for young people at the school-to-work transition** (TVET and apprenticeship recognition in Ghana).

The second is where the payer most needs the evidence.

**What the evidence below supports:**

| Judgement | Confidence | Why |
|---|---|---|
| AI-assisted performance is becoming a weaker signal of human capability, so evidence of *unassisted* capability gains value | **Medium-high** [INFERENCE from OBSERVED] | Several findings point the same way: OECD finds that outsourcing tasks to generative AI raises performance "with no real learning gains" ([OECD DEO 2026](https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html)); students given unguarded GPT-4 did worse once it was removed ([Bastani et al., PNAS 2025](https://www.pnas.org/doi/10.1073/pnas.2422633122)); AI-text detectors are unreliable and biased against non-native writers ([overview](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection)) |
| Cheap AI tutoring will substitute for much of NBC's "learning delivery" value | **Medium-high** [INFERENCE] | Structured AI tutoring produced large gains in West African trials: about 0.37 SD from a WhatsApp maths tutor over 8 months in Ghana ([Rori RCT](https://arxiv.org/abs/2402.09809)), and about 0.3 SD in 6 weeks in Nigeria ([World Bank](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324)). Inference prices at constant capability fall roughly 10–200× a year ([Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends)). Large funders are moving in: the Gates Foundation has a reported $1B AI commitment, about 40% to education *(snippet)* ([Semafor, 21 Sep 2026](https://www.semafor.com/article/09/21/2026/gates-foundation-commits-1b-to-local-language-ai-development-in-africa)), and Anthropic–Gates has $200M over four years ([Anthropic, 14 May 2026](https://www.anthropic.com/news/gates-foundation-partnership)) |
| NBC's defensible contribution is **consequential physical practice plus trustworthy evidence plus a portable institution**, not tutoring | **Medium** [INFERENCE] | No trial measures transfer across tools and environments, or unassisted capability under consequence, at NBC's cost level. That gap is the opportunity, and also the unproven claim |
| Private schools will pay per child for "evidence of transfer" | **Low** [SIM + SOURCE] | Two synthetic studies found no buyer paying for evidence; they pay for parent-visible demonstrations and enrolment defence. The full cost at base (about $9.60 per child per year, §10) nearly equals price-sheet revenue (**$12 per child per year**) |
| The strongest demand for evidence is at **transitions** (hiring, certification, placement, funding) | **Medium** [INFERENCE] | These are decisions where someone bears the cost of a wrong judgement. Ghana's CTVET already runs Recognition of Prior Learning for informal apprentices ([CTVET RPL](https://ctvet.gov.gh/recognition-of-prior-learning/)). About 80% of Ghanaian employment is informal (about 85% across Africa, [ILO 2025](https://www.ilo.org/sites/default/files/2025-02/Africa_Informality%20Regional%20statistical%20profile.pdf)), so skills mostly go unrecognised |

**Build now:** paper-first computational-matter kits; an anchor-task bank; a blind-scored demonstration protocol; a standards-compatible capability record (W3C Verifiable Credentials, Open Badges 3.0); a teacher and facilitator playbook for running sessions without a specialist.

**Test first (weeks 1–8):**
1. Transfer validity: does node evidence predict blind-scored transfer beyond a pretest?
2. A priced school or centre offer with deposits.
3. Whether a CTVET assessor or employer will act on a demonstration record.

**Keep as options:** Village AI on an edge device (Gemma-class models already run offline on a Raspberry Pi 5 ([Raspberry Pi](https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/))); the evening cohort; NBC Center licences; public-school delivery through Ghana's BSTEM programme.

**Abandon or defer:**
- Defer the contribution economy and credits, and community compute sold as a beachhead product.
- Defer electronic tokens until they beat paper.
- Abandon any proprietary "graph as moat" strategy.
- Abandon any inference about emotion, biometrics or personality. This is also prohibited in EU education settings since February 2025 ([FPF](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/)).

**Mission boundary (a value choice for the founder).** Extending to young people aged 15–24 at the school-to-work transition *extends the architecture*. Children stay the mission's anchor, and the same capability record follows them. Making adult workforce certification the main business would *change the mission*: NBC would become a skills-verification company that happens to serve young people. Section 13 proposes wording that keeps children primary.

---

## 2. Source-grounded thesis map

**Sources reconciled [SOURCE]:**
- the latest approved thesis: *NBC: The Human Capability Utility*, v3, which merges v1 and v2 (founder decision DEV-009);
- business model v3 (24 steps), products P1–P12, marketing strategy, architecture map;
- development log to DEV-016, including founder corrections (USD reporting; scope beyond Cape Coast);
- Algo Peers venture background;
- synthetic studies v3 and 02 (hypotheses only).

**Not accessible:** the NotebookLM notebook.

**Terminology.** The sources call it the **Capability Graph** (thesis §VII), not the "Human Capability Graph". This report treats the two as the same object and uses a working definition in §9.

| Layer | Element | Status | Evidence today |
|---|---|---|---|
| **Demonstrated (Algo Peers)** | Five years running computing, physical-computing and AI learning in Ghana | [SOURCE] | Venture background: over 1,000 children reached directly; relationships with 31 Cape Coast public schools (11,214 students, 620 educators profiled); design for connectivity under 70 kbps; Top-4 hardware project at Coolest Projects 2024; 45+ open activities (labs.algopeers.com); an AI pilot with 33 learners and about 8,580 interactions. *DEV-007 flags some claims (e.g. "620 trained") for correction before external use* |
| | Paid after-school channel | [SOURCE] | afterschool.algopeers.com exists; revenue data not in sources |
| **Proposed architecture** | Computational Matter, tokens, Experience Protocol, Capability Graph, Village AI, NBC OS, Contribution and Settlement layer, NBC Node | [SOURCE] hypothesis | No component built or measured; the architecture map marks every row "untested hypothesis" |
| **Product and market hypotheses** | Stage 1 Node-as-a-Service at $4/$6/$2.50 per child per term; B1–B9 | [SOURCE] assumption | Two synthetic studies found buyers negotiate on proof, terms and approval, and dispute per-child pricing [SIM] |
| **Long-term ambition** | A community-owned Human Capability Utility; a contribution economy; AI evaluation worlds | [SOURCE] staged (stages 3–5) | Deliberately gated behind evidence (thesis §XVIII) |
| **Scientific uncertainties** | Transfer across worlds; state transitions as valid evidence; equity across wealth and language; foundations not displaced | [SOURCE] §XIX | The power check: 3 arms of 60–120 children are underpowered; incremental validity is detectable at about 80 children (DEV-003) [MODEL] |
| **Commercial uncertainties** | Price covers cost; utilization of 160 children or more; churn; COCA | [SOURCE] | The model's base LTV:COCA is 1.8 (direct) or 2.9 (blended COCA). A different base is used in each document (flagged in study 02) |
| **Institutional uncertainties** | Licences; public-system fit; recognition of evidence; child-data governance | [SOURCE] | None tested |

**What the thesis must keep, in its own words** [SOURCE]:
- "Computation can escape the computer."
- "Make the intelligence of a great school portable."
- "Observe the state of the learning environment, not the totality of the child."
- "What persists when the world changes?" (transfer)
- "Proof of Human Capability... contextual, contestable, developmental, learner-controlled."
- "Tokenize attributable contributions if useful. Never tokenize childhood."

**Settings beyond schools** [INFERENCE]:

| Setting | Justification | Change of mission? |
|---|---|---|
| Homes and families | Parents are the ultimate payers and witnesses | Extension |
| After-school, makerspaces, libraries, community centres | The source already names them (thesis §XIII) | Extension |
| TVET and informal apprenticeships | Transition point; consequential physical tasks; an existing RPL institution | Extension if framed as youth transition (15–24); a change if adult certification becomes the core |
| Workplaces and informal economies | Strongest demand for evidence of practical competence | A change of mission if it leads; an option if it follows the youth pathway |

---

## 3. Actor and power analysis

**Typology of influence.** Distinguishing these avoids calling anyone "quasi-government" loosely:

| Code | Kind of influence |
|---|---|
| **L** | Formal legal authority |
| **O** | Ownership or financial influence |
| **C** | Contractual control |
| **P** | Procurement dependence |
| **S** | Standard-setting |
| **A** | Agenda-setting or advocacy |
| **?** | Speculation, not evidence |

| Actor | Publicly stated objective | Observed action (dated) | Resources and dependencies controlled | Influence | Accountability | Implication for NBC | Evidence limits |
|---|---|---|---|---|---|---|---|
| **World Economic Forum** | Shape agendas on the future of work | *Future of Jobs 2025*: 39% of key skills change by 2030; 170M jobs created and 92M displaced ([WEF, Jan 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/)) | Convening; employer survey | A | Member-funded; no public mandate | Useful framing for funders; its employer survey under-represents informal economies | A survey of employer expectations, not measured change |
| **OpenAI** | "Expand economic opportunity with AI" | Certifications through OpenAI Academy; a Jobs Platform matching on "demonstrated AI competencies", targeted for mid-2026; a goal of certifying 10M Americans by 2030; partners include Walmart ([OpenAI](https://openai.com/index/expanding-economic-opportunity-with-ai/); [Campus Technology, Sep 2025](https://campustechnology.com/articles/2025/09/10/openai-to-launch-ai-powered-jobs-platform-by-mid-2026.aspx)) | Frontier models; distribution; employer network | O, A, emerging S (credential formats) | Corporate governance; limited external audit of certifications | **A competing recognition regime** for *AI-assisted* competence. NBC's niche is the complement: unassisted, physical, local | US-focused; Africa rollout not observed |
| **Anthropic** | Beneficial AI; research on economic effects | Economic Index (Mar 2026): experienced users achieve more; the top 20 countries' share of per-capita usage rose from 45% to 48% ([Anthropic, 24 Mar 2026](https://www.anthropic.com/research/economic-index-march-2026-report)); Gates partnership: $200M over 4 years, including foundational-literacy apps in sub-Saharan Africa and public benchmarks ([Anthropic, 14 May 2026](https://www.anthropic.com/news/gates-foundation-partnership)) | Models; research; philanthropic partnerships | O, A, emerging S (public benchmarks) | Corporate governance | **Partnership or benchmark opportunity** (public goods, benchmarks); also a source of subsidised substitutes | Implementation details not public |
| **Google / DeepMind** | "The most pedagogical AI" (LearnLM) | LearnLM built into Gemini ([Google Cloud](https://cloud.google.com/solutions/learnlm)); open Gemma models, including on-device variants (Gemma 4, Apr 2026 *(snippet)*); Genie 3 world model (Aug 2025) ([DeepMind](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/)) | Android, Chromebooks, Classroom; open weights | O, P (school devices), A | Corporate governance | Open edge models **lower Village AI cost**. Classroom and Chromebook lock-in dominates device-rich schools, not NBC's segment | World-model use in education is speculative |
| **Open-model ecosystem** (Gemma, Llama, Qwen, Phi) | Open distribution | Models under 4B parameters run offline on a Raspberry Pi 5 or phones ([Raspberry Pi](https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/)) | Weights; licences | O (licence terms) | Licences vary | Makes a **local, offline node technically cheap**. Licence and geopolitics risk | Quality varies by local language |
| **Coefficient Giving** (formerly Open Philanthropy) | Important, neglected, tractable causes | Renamed Nov 2025; now a multi-donor platform of 13 funds ([Coefficient Giving](https://coefficientgiving.org/research/open-philanthropy-is-now-coefficient-giving/)) | Grant capital | O, A | Donor governance | Possible fit only through global health and development or science funds; **education is not a stated focus**. Low near-term relevance | Fund priorities from secondary summaries |
| **Gates Foundation** | Equitable AI; foundational learning | A reported $1B+ for AI over two years, about 40% to education *(snippet)* ([Semafor, 21 Sep 2026](https://www.semafor.com/article/09/21/2026/gates-foundation-commits-1b-to-local-language-ai-development-in-africa); [Fortune, 19 Sep 2026](https://fortune.com/2026/09/19/the-gates-foundation-ai-schools-teachers-warn-gap-reading-math/)); ADQ partnership on foundational learning in sub-Saharan Africa ([Gates, Dec 2025](https://www.gatesfoundation.org/ideas/media-center/press-releases/2025/12/education-systems-partnership)) | Very large grant capital; agenda-setting | O, A, P (grantee dependence) | Board; limited public accountability | **Largest near-term capital pool**, but focused on foundational literacy and numeracy and AI tutoring. NBC must show it protects foundations (thesis §VIII) or it's off-strategy | Terms from press coverage only |
| **Mastercard Foundation** | 30M young Africans in dignified work by 2030; 3M in Ghana (70% women) ([MCF Ghana](https://mastercardfdn.org/en/where-we-work/ghana/)) | EdTech Mondays; the EdTech Fellowship with MEST (3rd cohort 2026, including offline tools) ([Citi Newsroom, Apr 2026](https://www.citinewsroom.com/2026/04/mest-africa-boosts-ghanaian-learning-with-3rd-mastercard-foundation-edtech-fellowship-cohort/)) | Grants; convening; a Ghana ecosystem presence | O, A | Board | **Aligned with the school-to-work transition wedge.** The fellowship is an entry route | Fellowship eligibility not verified |
| **IDP Foundation** | Strengthen low-fee private schools | Rising Schools: school-management training plus below-market loans; about 600 schools and 140,000 students, 96% repayment ([IDP](https://www.idpfoundation.org/learn_impact/rising-schools-program/)) | Finance channel to proprietors | O, A | Foundation board | **A finance and distribution partner** for the proprietor segment (paying for the node through school loans) | Scale figures self-reported and undated |
| **OECD** | Evidence for education policy | PISA 2025: reading and maths at their lowest ever; one in five students a low performer in all three subjects ([OECD, Sep 2026](https://www.oecd.org/en/about/news/press-releases/2026/09/pisa-2025-students-reading-and-mathematics-performance-declined-sharply-across-the-oecd.html)); Learning in the Digital World results due May 2027 | Measurement agenda | S, A | Member governments | Strengthens the "foundations first" guardrail; PISA's digital-learning measure may legitimise process-based evidence | Mostly OECD countries |
| **UNESCO** | Education as a public good | AI competency frameworks for students and teachers (2024) ([UNESCO](https://www.unesco.org/en/articles/what-you-need-know-about-unescos-new-ai-competency-frameworks-students-and-teachers)) | Norms; ministry relationships | S, A | Member states | Align NBC's capability claims with these frameworks for legitimacy | Frameworks, not assessments |
| **UNICEF** | Child rights in AI | *Guidance on AI and Children* v3 (Dec 2025): ten requirements ([UNICEF Innocenti](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)) | Norms; country offices | A, S (soft) | Member states | **A governance checklist** NBC should adopt publicly | Voluntary guidance |
| **ILO** | Decent work | About a quarter of jobs exposed to generative AI; exposure 11% in low-income countries vs 34% in high-income ([ILO, May 2025](https://www.ilo.org/publications/generative-ai-and-jobs-2025-update)); African informality 85.3% (2024) | Statistics; tripartite norms | S, A | Tripartite | In Ghana the bigger issue is **informality and unrecognised skills**, not automation | Exposure is not displacement |
| **World Bank** | End learning poverty | About 87–89% learning poverty in sub-Saharan Africa ([Education Outcomes Fund summary](https://www.educationoutcomesfund.org/post/learning-poverty)); Nigeria AI-tutor RCT | Lending; evidence agenda | O, P (government loans), A | Shareholder governments | Foundations dominate the policy agenda; NBC must not be seen as a distraction from them | Estimates modelled |
| **African Union** | Africa-centric AI | Continental AI Strategy endorsed in Accra, July 2024, with 2025–2030 implementation ([AU](https://au.int/en/documents/20240809/continental-artificial-intelligence-strategy)); CESA 2026–2035 | Continental norms | A, S (soft) | Member states | Legitimacy frame for local, sovereign, community-owned AI | Implementation capacity varies |
| **Government of Ghana** (MoE, GES, NaCCA, NTC, CTVET) | Modernise basic education; jobs | BSTEM launched 22 May 2026; 7,000+ teachers trained in STEM; revised curriculum with coding, AI and robotics received from NaCCA on 23 Jul 2026, awaiting approval ([NewsGhana](https://www.newsghana.com.gh/ghana-integrates-ai-and-robotics-into-basic-school-curriculum/); [GBC](https://www.gbcghanaonline.com/news/education/stem-teachers-ghana/2026/)); CTVET RPL and the national apprenticeship policy | Curriculum, licensing, procurement, certification | **L**, P, S | Parliament; elections | **Demand is being created by mandate**, not by market; a curriculum-aligned node could become a procurement item. Also a competition risk (government-supplied labs) | Timelines uncertain |
| **India DPI** (APAAR, DigiLocker, Academic Bank of Credits) | Portable lifelong learner records | 26.35 crore (263.5 million) verified APAAR IDs by 2 Jul 2026 ([PIB, Jul 2026](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202675912501.pdf)) | State digital infrastructure | **L**, S | Parliament; courts | A precedent for **state-run capability records**. NBC's record must be exportable into, not competing with, such systems | Privacy debates continue |
| **Standards bodies** (W3C, 1EdTech) | Interoperable credentials | Verifiable Credentials 2.0; Open Badges 3.0 final (Jun 2024); CLR 2.0 ([1EdTech](https://www.1edtech.org/clr/faq)) | Standards | S | Membership processes | **Adopt; don't invent.** Interoperability is cheaper and more trusted than a proprietary graph | Adoption in Africa is thin |
| **EU (AI Act)** | Trustworthy AI | Emotion recognition in education banned since 2 Feb 2025; education assessment is high-risk (Annex III), now due Dec 2027 after the omnibus deal *(snippet)* ([EU](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)) | Market access to the EU | **L** (extraterritorial for EU markets) | EU institutions | A **de facto global design bar** for any evidence system that influences placement or certification | Dates subject to the omnibus deal |
| **US Commerce (BIS)** | Technology security | AI Diffusion Rule rescinded 13 May 2025; replacement pending ([BIS](https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens)) | Chip export licences | **L** | US government | Edge chips for NBC are low-end and unlikely to be restricted; frontier compute access remains geopolitical | Replacement rule unknown |
| **Chip and edge makers** (NVIDIA, Raspberry Pi, Hailo, Qualcomm) | Sell compute | Raspberry Pi AI HAT+ with Hailo NPU (Jan 2026) *(snippet)* | Component supply | O, P | Markets | Node BOM falls; supply chain and repair are the risk, not price | — |
| **Peter Thiel** (as an individual) | Publicly argues higher education is a "bubble"; funds alternatives | Thiel Fellowship: $100,000 grants to "stop out" of college (since 2011) ([EdSurge, 2023](https://www.edsurge.com/news/2023-12-12-how-a-billionaire-s-fellowship-spread-skepticism-about-college-s-value)) | Personal capital; networks | O, A | Private | Adds weight to a **credential-scepticism narrative** that could raise demand for direct evidence of capability. No evidence of involvement in African basic education | Views are public statements; no inference of wider agenda |
| **Founders Fund** (Thiel co-founded) | Venture returns | No education portfolio evidence found in this research | Venture capital | O | LPs | No observed relevance | Search did not surface portfolio data |
| **Palantir** (Thiel co-founded; a separate company) | Data platforms for governments | Leads the NHS Federated Data Platform (£330M; break-clause review before March 2027) ([NHS England](https://www.england.nhs.uk/digitaltechnology/nhs-federated-data-platform/security-privacy/contract-explainer/)); MoD contract Dec 2025 *(snippet)* | Contractual control of public data systems | **C**, P | Public procurement, Parliament ([Hansard, 16 Apr 2026](https://hansard.parliament.uk/Commons/2026-04-16/debates/2FDCA71C-D0C1-4738-BEE8-A4BDA311DB99/NHSFederatedDataPlatform)) | **A cautionary model**: private operation of public data platforms creates contractual dependence. NBC should design the opposite (community control, exportability, break clauses). No education activity found | Association with Thiel does not establish control or a shared agenda |

**Is anyone "quasi-government" in NBC's domain?** [INFERENCE] Three forms of governance-like power are observable, each resting on a different mechanism:

| Mechanism | Who | What it means for NBC |
|---|---|---|
| **Contractual control of public data platforms** | Palantir in the UK NHS | A warning, not a local actor |
| **Procurement and agenda power of very large funders** | Gates, Mastercard Foundation, World Bank | Ministries often align programmes to what these fund |
| **Platform-defined credentials** | OpenAI certifications and jobs matching | Could become de facto standards if employers adopt them |

None of these is legal authority. In Ghana, formal authority over curriculum, licensing and certification remains with MoE, NaCCA, NTC and CTVET. **NBC's strategic rule: be interoperable with public records, fundable by more than one large funder, and never the sole custodian of learners' records.**

---

## 4. Strategic-variable benchmark

Confidence is **H**, **M** or **L**. "NBC opportunity" and "exposure" are [INFERENCE].

### Technology

| Variable | Observed state | Direction | Evidence/date | Scope | Conf. | Counterevidence | NBC opportunity | NBC exposure | Leading indicator |
|---|---|---|---|---|---|---|---|---|---|
| AI capability, reliability, cost | Price at constant capability falls roughly 10–200× a year | ↓ cost, ↑ capability | [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends) (2025–26) | Global | H | Rates vary by task; the fastest drops may not persist | Village AI becomes nearly free | Tutoring and content lose value as a differentiator | Price of a GPT-4-class model per million tokens; quality of on-device models in Twi and Fante |
| Agent autonomy | Agents complete more multi-step digital tasks | ↑ | Economic Index: learning-by-doing, more collaborative use (Mar 2026) | Global, concentrated in rich countries | M | Physical-world reliability remains low | Human capability in the physical, social and consequential world stays scarce | Digital-only tasks lose value as evidence | Share of workplace tasks delegated to agents |
| Open vs proprietary | Strong open small models (Gemma 4, Apr 2026 *(snippet)*) | Open models keep pace at small sizes | [Gemma](https://en.wikipedia.org/wiki/Gemma_(language_model)) | Global | M-H | Licence changes; frontier gap | Local, sovereign, offline node | Licence dependence | Licences of the top 3 small models |
| Edge and offline | Sub-4B models run on a Pi 5 or phones; NPU add-ons | ↑ | [Raspberry Pi](https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/) | Global | H | Heat, dust and power limit uptime | A $100–200 node is technically plausible [INFERENCE] | Phones may be good enough, with no node needed | Tokens per second on a $100 device; local-language accuracy |
| Robotics, world models, programmable materials | World models generate interactive 3D worlds (Genie 3); robotics foundation models are emerging | ↑ in labs | [DeepMind, Aug 2025](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | Labs | M | Cost, durability and safety block classroom use | Simulated "worlds" may complement physical tokens | Screen-based simulated worlds could substitute cheaply for physical ones | Price of classroom-grade programmable-matter kits; world-model access costs |
| Energy, connectivity, repair | Ghana lost about 960 MW after the Akosombo substation fire (23 Apr 2026), triggering load shedding *(snippet)* | Volatile | [B&FT](https://thebftonline.com/2025/08/01/ghanas-electric-power-outages-and-blackouts-ending-the-persistent-electric-load-shedding-dum-sor-problem-from-the-perspective-of-a-seasoned-electric-power-industry-practit/); news *(snippet)* | Ghana | M | Recovery timeline | Solar, offline design is a real advantage | Hardware repair and parts logistics | Outage hours per week; solar kit prices |
| Authenticity of AI-assisted work | Detectors unreliable and biased; C2PA provenance immature | Worsening signal quality | [Overview](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection); [C2PA critique](https://arxiv.org/html/2604.24890v1) | Global | H | Watermarking and provenance may improve | **Supervised, consequential, in-person demonstrations become valuable** | In-person evidence is costly to scale | Institutions reverting to in-person or oral assessment |

### Human development

| Variable | Observed state | Direction | Evidence/date | Scope | Conf. | Counterevidence | Opportunity | Exposure | Indicator |
|---|---|---|---|---|---|---|---|---|---|
| Transfer and retention | Structured AI tutoring gains are large on the targeted outcome; unguarded AI harms unassisted performance | Mixed | [Rori](https://arxiv.org/abs/2402.09809); [Bastani](https://www.pnas.org/doi/10.1073/pnas.2422633122); [OECD DEO 2026](https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html) | Ghana, Nigeria, Türkiye, OECD | M-H | Few studies measure *far* transfer | Measuring transfer is NBC's scientific edge | Far transfer is historically hard to produce; NBC may fail to show it | Studies reporting delayed, far-transfer outcomes for AI or physical learning |
| Foundations | Learning poverty about 87–89% in sub-Saharan Africa; PISA declines in the OECD | Persistent | [EOF](https://www.educationoutcomesfund.org/post/learning-poverty); [OECD Sep 2026](https://www.oecd.org/en/about/news/press-releases/2026/09/pisa-2025-students-reading-and-mathematics-performance-declined-sharply-across-the-oecd.html) | SSA; OECD | H | — | A node that strengthens foundations wins funders | Seen as a luxury that distracts from foundations | Funders' foundational-learning share |
| Motivation, agency, trust | Teachers fear extra work and public failure [SIM] | — | Study 02 [SIM] | Constructed | L | Real data needed | Facilitation design | Quiet non-use | Sessions run without staff ÷ scheduled |
| Language, disability, development | Detectors are biased against non-native English writers; tests in English misclassify | — | [Overview](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection) | Global | M | — | Performance-based, multimodal evidence can be fairer | English-only evidence would reproduce bias | Validity split by language and disability |
| Physical practice and mentorship | Scarce and unrecognised in the informal sector; RPL exists | Slowly formalising | [CTVET RPL](https://ctvet.gov.gh/recognition-of-prior-learning/) | Ghana | M | — | NBC supports masters and apprentices | Master-craftsperson culture may resist outside assessment | RPL candidates per year |
| Tool-assisted vs independent | OECD: outsourcing raises performance without learning | ↑ salience | OECD DEO 2026 | OECD | H | — | **Core wedge** | Evidence costs rise | Share of assessments with an AI-off condition |

### Economics

| Variable | Observed state | Direction | Evidence/date | Scope | Conf. | Counterevidence | Opportunity | Exposure | Indicator |
|---|---|---|---|---|---|---|---|---|---|
| Labour demand and automation | About 25% of jobs exposed to GenAI; 11% in low-income countries | Transformation more than displacement | [ILO May 2025](https://www.ilo.org/publications/generative-ai-and-jobs-2025-update) | Global | M | Exposure isn't loss | Practical and physical trades grow (WEF lists construction and care) | Clerical routes shrink | ILO exposure updates |
| Informality | 85.3% of employment in Africa is informal; about 80% in Ghana | Persistent | [ILO 2025](https://www.ilo.org/sites/default/files/2025-02/Africa_Informality%20Regional%20statistical%20profile.pdf) | Africa | H | — | Skills recognition is a large unmet need | Informal buyers can't pay much | RPL uptake; apprenticeship formalisation |
| Employer training incentives | Global firms are building their own credentials (OpenAI with Walmart and others) | ↑ | [OpenAI](https://openai.com/index/expanding-economic-opportunity-with-ai/) | US | M | Local SMEs rarely train | Employer-accepted demonstration | Platforms could own recognition | Ghanaian employers accepting non-degree evidence |
| Household and public budgets | Low-fee schools depend on fee collection; the government is expanding BSTEM | Tight | [IDP](https://www.idpfoundation.org/learn_impact/low-fee-private-schools-closing-the-education-gap-in-ghana/); BSTEM news | Ghana | M | — | Government procurement | Price ceilings | BSTEM procurement notices |
| Cost of credible assessment | Blind scoring, anchor tasks and audits cost money | Rising (in-person needed) | §10 [MODEL] | — | M | AI-assisted scoring may cut it | A service business | Evidence cost may exceed willingness to pay | Cost per blind-scored demonstration |
| Distribution and acquisition | COCA $866 blended to $1,393 direct [MODEL] | — | Business model | Ghana | L | — | Association and IDP channels | COCA exceeds LTV at stated prices [SIM] | Real COCA from the first 10 offers |

### Institutions, power, policy and society

| Variable | Observed state | Direction | Evidence/date | Scope | Conf. | Counterevidence | Opportunity | Exposure | Indicator |
|---|---|---|---|---|---|---|---|---|---|
| Recognition of alternative evidence | Ghana RPL; OpenAI jobs matching on competencies; India APAAR | ↑ | Cited above | Ghana, US, India | M | Degrees still dominate formal hiring | A demonstration record that feeds RPL | Platforms or states own records | Employers or TVET bodies accepting VC-format records |
| Centralised vs distributed | State DPI (India) and platforms grow alongside open standards | Both | APAAR; W3C VC 2.0 | Global | M | — | A standards-based, learner-held record | Lock-in by platforms | Ghana MoE digital record plans |
| Public vs private control of records | Palantir–NHS shows contested private operation | Contested | [Hansard, Apr 2026](https://hansard.parliament.uk/Commons/2026-04-16/debates/2FDCA71C-D0C1-4738-BEE8-A4BDA311DB99/NHSFederatedDataPlatform) | UK | M | — | Community-controlled design as a trust advantage | NBC seen as another extractive vendor | Ghana data-protection enforcement on edtech |
| Philanthropic priorities | Gates AI $1B (about 40% education); Anthropic–Gates $200M; MCF 30M-jobs goal | ↑ AI + foundations + jobs | Cited above | SSA | M-H | Priorities shift fast | Capital available for evidence and public goods | Crowding by subsidised tutors | Call-for-proposal topics |
| Child protection and AI policy | UNICEF v3 (Dec 2025); EU bans emotion recognition in education; high-risk assessment | Tightening | Cited above | Global / EU | H | — | "Safe by design" as a moat | Compliance costs | Ghana adoption of child-AI guidance |
| Climate and infrastructure | Grid shocks; heat | Worsening | Ghana 2026 outages *(snippet)* | Ghana | M | — | Solar, offline resilience | Hardware failure in heat and dust | Node uptime in the dry season |
| Geopolitics and supply | AI Diffusion Rule rescinded; replacement pending | Uncertain | [BIS, May 2025](https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens) | Global | M | — | Low-end chips unaffected | Frontier access conditions | New BIS rule |
| Inequality of participation | The top 20 countries' share of per-capita AI use is rising | ↑ divergence | [Anthropic, Mar 2026](https://www.anthropic.com/research/economic-index-march-2026-report) | Global | M | — | Mission relevance | Access alone doesn't close the gap | Usage-share trend |
| Demography and urbanisation | Young, urbanising West Africa (well established; not re-sourced here) | ↑ | [ASSUMPTION: consensus] | SSA | M | — | Large youth-transition market | Informal urban settings are hard to serve | School-to-work transition rates |

---

## 5. Cross-impact analysis

```
                    (+) cheaper edge AI ─────────────► lower Village AI cost ─┐
                                                                             ▼
 (+) AI-assisted work floods ──► assessments lose signal ──► PREMIUM ON UNASSISTED,  ◄── (+) in-person, consequential
     digital channels              (detectors fail)            PHYSICAL, TRANSFERABLE        demonstration costs
                                                               EVIDENCE                      (facilitation, scoring)
                                                                    │                                 ▲
       (+) platform credentials (OpenAI etc.) ──── competes ────────┤                                 │
       (+) state DPI records (APAAR-type) ─── integrates or crowds ─┤                                 │
                                                                    ▼                                 │
                                              who pays? recognisers at transitions ── constrains ─────┘
                                              (employers, CTVET, funders) > schools
                                                                    │
     (−) foundational-learning crisis ──► funders prioritise literacy/numeracy ──► NBC must prove "foundations protected"
     (−) grid shocks ──► solar and offline valued ──► but hardware uptime risk rises
     (+) child-data regulation ──► favours "state not child" design ──► raises compliance cost for everyone
```

| Pair | Relationship | Effect on NBC | Possible tipping point |
|---|---|---|---|
| Cheap AI tutoring × foundational-learning funding | **Reinforcing** for substitutes | Tutoring apps win foundational funding; NBC can't compete on tutoring | A large funder standardises on 1–2 AI tutors for Ghana |
| AI-assisted work × detection failure | **Reinforcing** | Raises the value of supervised, unassisted evidence | Universities or employers in Ghana adopt AI-off practical assessments |
| Unassisted-evidence premium × cost of in-person assessment | **Constraint** | The premium exists only if someone pays more than the evidence costs | Cost per blind-scored demonstration falls below the recogniser's cost of a bad decision |
| Platform credentials × open standards | **Competing** | If platforms win, NBC becomes a supplier. If standards win, NBC's records travel | A platform credential is accepted by Ghanaian employers or government |
| State DPI × learner-held records | **Dependency** | NBC records must feed state systems | Ghana announces a national learner-record system |
| Grid instability × solar offline design | **Reinforcing** | Advantage for NBC | — |
| Child-protection rules × evidence design | **Constraint and advantage** | Rules out biometric shortcuts; rewards NBC's design | Ghana data protection enforcement on edtech |
| Government BSTEM mandate × private-school demand | **Mixed** | A mandate creates demand, but public provision may crowd out private buying | BSTEM equipment reaches private schools free |

---

## 6. Consequential uncertainty register

Horizons: **N** = 0–2 years, **M** = 3–5 years, **L** = 6–10 years. "Influence" means NBC's influence over the outcome.

### A. External uncertainties

| Uncertainty | Plausible outcomes | Impact | Evidence quality | Horizon | Dependencies | Influence | Decision affected | Evidence needed |
|---|---|---|---|---|---|---|---|---|
| **Do recognisers pay a premium for unassisted, transferable evidence?** | Yes, at transitions / only in elite settings / no (platform AI certificates suffice) | **Very high** | Medium (directional) | N–M | Authenticity crisis; platform credentials | Low–medium (can demonstrate value) | Market selection; architecture of the record | Recognisers' actual use of demonstration records in hiring or RPL decisions |
| **Who controls recognition infrastructure?** | Open standards / states (DPI) / platforms | High | Medium | M | Standards adoption; government digital plans | Low | Record format; partnerships | Ghana learner-record announcements; employer adoption |
| **Do AI tutors capture foundational-learning funding?** | Yes / partly / no (evidence disappoints at scale) | High | Medium-high (RCTs) | N | Funders; evidence at scale | Low | Whether NBC positions as a complement | Funders' calls; scale evaluations |
| **Grid and hardware reliability in the beachhead** | Stable / seasonal shocks / chronic | Medium | Medium | N | Energy policy | Low (design mitigates) | Hardware design; solar spec | Uptime logs |
| **Child-data and AI regulation in Ghana** | Light / aligned with UNICEF and EU / restrictive | Medium | Low | M | Data Protection Commission | Medium (can shape by example) | Evidence design | Guidance issued |

### B. Venture assumptions that experiments can resolve

| Uncertainty | Plausible outcomes | Impact | Evidence quality | Horizon | Dependencies | Influence | Decision affected | Evidence needed |
|---|---|---|---|---|---|---|---|---|
| **Does node evidence predict blind-scored transfer beyond a pretest?** (B7) | Yes / only near transfer / no | **Thesis-breaking** | None yet | N | Anchor tasks; sample of about 80 or more | High | Whether to continue the evidence thesis | Validity study (DEV-003 design) |
| **Will a buyer pay a deposit at a price that covers cost?** (B1) | Schools yes / centres only / neither | **Very high** | Synthetic only | N | Offer terms; references | High | Beachhead; pricing | Step 21 priced offer |
| **Can non-specialists run sessions unaided?** (B8) | Yes with guides / only with support / no | High | Synthetic only | N | Guide quality | High | Cost to serve; MVBP | Wizard-of-Oz observation |
| **Will a CTVET assessor or employer act on a demonstration record?** | Yes / only as supplementary evidence / no | High | None | N | Rubric alignment | Medium-high | Second wedge | Assessor and employer pilot |
| **Does paper beat electronic tokens?** | Paper enough / electronic needed | Medium | Simulation (probe-design) | N | — | High | Hardware spend | Tokens-vs-paper test |

### C. Value choices (founder decisions, not experiments)

| Choice | Options | Affects |
|---|---|---|
| Mission boundary | Children only / young people 8–24 / all ages | Market selection; funders; brand |
| Who owns records | Learner-held / school / state / NBC | Architecture; trust; business model |
| Revenue from evidence | Charge recognisers / charge learners / fund as a public good | Equity; incentives |
| Prohibited uses | Ranking, prediction of life outcomes, selling data, automated exclusion | Governance; legal exposure |
| Brand architecture | NBC / Papa Algo / Algo Peers (open since DEV-010) | Sales; partnerships |

### D. Watch, don't test yet

| Unknown | Horizon | Indicator |
|---|---|---|
| Programmable matter becoming classroom-cheap | L | Price of reprogrammable kits |
| World models replacing physical worlds for practice | M–L | Evidence that simulated practice transfers to physical tasks |
| Proof-of-personhood / national digital ID linked to skills | M | Ghana Card integration with learning records |
| Frontier-lab credentials becoming de facto standards | N–M | Employer acceptance in West Africa |
| Contribution-economy demand (AI labs buying physical evaluation worlds) | L | Any lab buying non-child evaluation environments |

---

## 7. Futures map

| Category | Future | Why it's in this category |
|---|---|---|
| **Possible** | Programmable matter in every classroom; a global capability graph adopted by states; communities own intelligence nodes as utilities | Not ruled out by physics or law, but needs cost, institutional and governance breakthroughs with no visible pathway today |
| **Plausible** | (a) Recognisers pay for supervised, unassisted demonstrations at school-to-work transitions. (b) Ghana procures curriculum-aligned hands-on computing kits at scale through BSTEM. (c) AI tutors become free foundational-learning infrastructure, funded by philanthropy. (d) Platform AI certificates become common hiring signals | Each has a credible causal pathway traced to an observed actor or trend (§3–4) |
| **Probable** (qualitative) | **Cheap AI tutoring spreads faster than any evidence infrastructure** (likely: falling costs, funder commitments, RCT results). **Degrees and exams remain the dominant formal signal in Ghana for 5+ years** (likely: institutional inertia; BECE-centred accountability). **In-person assessment re-grows where stakes are high** (moderately likely: detector failure) | Supported by several independent indicators. No numeric probabilities are given, because no defensible base rates exist |
| **Preferable** (for learners, families, teachers and communities, judged by child-rights, equity and agency values) | Learners hold portable, contestable evidence of what they can do. Evidence is gathered without surveillance. Recognition is open and multi-issuer. Local institutions keep control. Informal-sector skills are recognised | Explicit values (thesis §IX–X, UNICEF v3). **Not implied to be probable** |
| **Wild cards** | A major child-data breach by an edtech firm triggers bans; an AI credential-fraud crisis makes all remote credentials worthless; a collapse in AI costs *plus* mandated national learner IDs; a regional conflict or supply shock cuts hardware | Low or unknown likelihood, high impact; used as stress tests in §8 |

---

## 8. Scenario matrix and persona narratives

### Axes (horizon 2029–2033)

- **Axis 1, the unassisted-capability premium.** Do recognisers (employers, certifiers, schools, funders) demand and pay for evidence that a person can perform *without AI assistance, in a new context*? Or do AI-assisted outputs and platform AI certificates count as good enough? *Why this axis:* it is genuinely uncertain (§6A), it decides whether NBC's core value exists, and the evidence runs both ways (OECD DEO vs OpenAI's competency certificates).
- **Axis 2, control of intelligence and recognition infrastructure.** Is it **open and locally operable** (open models on the edge, standards-based learner-held records, public or community recognition)? Or **centralised and platform-mediated** (metered cloud AI, proprietary credential platforms, closed records)? *Why this axis:* it is largely independent of Axis 1 (open models can coexist with closed recognition), and it decides NBC's role: operator or supplier.

Other variables (grid reliability, funder priorities, child-data rules, Ghana curriculum rollout) shape conditions *inside* each scenario.

|  | **Open, locally operable** | **Centralised, platform-mediated** |
|---|---|---|
| **High premium on unassisted capability** | **A · Commons of Proof** | **B · Gatekept Proof** |
| **Low premium** | **C · Tutors Everywhere** | **D · The Assisted Economy** |
| Thesis failure | **E · Transfer Doesn't Travel** | |
| Wild card | **F · Trust Shock** | |

### Constructed personas **[FICTION: analytical devices, not research findings]**

Grounded in the source segment and the study 02 persona patterns. Their statements and choices are imagined.

| Persona | Role, geography, life stage | Goals / constraints | Workaround today | Resources / authority | Trusted channels | Success means | Could lose |
|---|---|---|---|---|---|---|---|
| **Esi, 13** | JHS1 pupil, low-fee private school, Cape Coast | Pass the BECE; likes building things. Few devices; power cuts | Copies notes; borrows her brother's phone | None (parents pay) | Teacher; church youth group; WhatsApp via parent | Gets into a good SHS; is known as "good with tech" | Time taken from exam subjects; her privacy |
| **Kwame, 24** | Facilitator on national service at an after-school centre; wants a teaching job | A reference and skills. Paid per session | Follows the owner's plans; calls the owner when stuck | Uses equipment; can recommend | Centre WhatsApp; friends | Runs sessions confidently; gets a permanent post | Looks foolish; the job |
| **Mrs Adjoa Mensah, 49** | Proprietor, 350-pupil fee-charging school, Central Region | Enrolment, reputation, cash flow. About 60% of levies collected [SIM] | Textbook ICT; old PCs in a storeroom | Signs and pays; consults a GNAPS peer | GNAPS; other proprietors; church | Parents stay; no equipment liability | Money; face with parents |
| **Mr Daniel Asare, 41** | Owner of a solar-installation firm in Accra; also a CTVET-registered trade assessor | Hire apprentices who can wire safely. Unreliable certificates | Two-week unpaid trial on site | Hires; assesses RPL candidates | Trade association; CTVET; clients | Fewer bad hires; faster assessments | Time; liability for unsafe work |
| **Abdul, 17** | Hard-of-hearing apprentice electrician; left school after the BECE; Tamale / Kumasi | Get certified, get paid more. English written tests exclude him | Learns by watching his master; no paper record | Little; master decides | Master craftsman; Ghanaian Sign Language community | Recognised as competent; fair assessment | Misclassification by text-based tests; exposure of his disability data |
| **Ms Grace Tetteh, 45** | District ICT coordinator (GES), Central Region | Roll out BSTEM with few specialists | Cascade training; hands-on kits locked away | Recommends; influences procurement | GES hierarchy; NaCCA; donors | Schools actually run the curriculum | Blame for failed rollout |

### Scenario A · Commons of Proof (open + high premium), 2029–2033

**Pathway:** AI-text detection fails; universities and employers revert to supervised practicals → Ghana adopts VC-format learner records within its digital ID rollout → funders pay for verified outcomes, not app usage → open small models make local nodes cheap.

**Conditions:**
- **Technology:** edge AI is nearly free; paper and camera tokens are standard.
- **Economy:** recognisers pay per verified demonstration.
- **Politics:** data rules favour local processing.
- **Institutions:** CTVET and NaCCA accept multi-issuer evidence.

**Who controls:** intelligence is open or local; recognition is public plus accredited issuers; evidence is held by learners.

**What becomes scarce:** accredited assessors and facilitators; valid anchor tasks.

**NBC's role:** an accredited **evidence-protocol and node operator**. Revenue: per-site node service, plus per-demonstration fees paid by recognisers (employers, CTVET, outcome funds), plus licences for NBC Centers.

**Barriers:** accreditation, assessor supply, equity validation.

**Early indicators:** Ghana announces portable learner records; an employer group accepts supervised demonstration records.

**Actions:** accredit early; publish validity studies; open the rubric bank.

**Stop or pivot if:** validity fails equity checks.

| Persona | Day in the life | Consequential decision | Capability developed or shown | Product interaction | Who pays, why | Why they might refuse | Benefits and risks |
|---|---|---|---|---|---|---|---|
| Esi | Weekly world-session; termly Show-Me Day | Joins the school's robotics track | A blind-scored transfer task at term end | NBC node at school | School, recovered through fees; parents value visible progress | Exam-time pressure | Portable proof. Risk: pressure to "perform" |
| Kwame | Runs three sessions from guides | Applies for a teaching post | His facilitation record | NBC facilitator credential | Centre pays; the credential helps him | Extra paperwork | A job pathway |
| Mrs Mensah | Checks the evidence summary | Renews the node | — | NBC | Her school; enrolment | Price | Reputation gain |
| Mr Asare | Watches an apprentice's supervised wiring demonstration | Hires Abdul | — | NBC demonstration record, via CTVET RPL | His firm pays per assessment (cheaper than failed trials) | Distrust of new formats | Better hires |
| Abdul | Demonstrates wiring with sign-language instructions | Takes RPL Proficiency I | Performance-based, not text-based | NBC evidence accepted by CTVET | Employer or RPL fee | Fear of exposure | **Fairer recognition.** Risk: disability data must stay minimal |
| Ms Tetteh | Monitors BSTEM sites | Adopts NBC protocols for public schools | — | NBC as protocol supplier | Government (BSTEM) | Procurement rules | Scale. Risk: vendor dependence |

### Scenario B · Gatekept Proof (centralised + high premium)

**Pathway:** Global AI platforms extend certification into supervised assessment centres → large employers and some governments accept platform credentials → recognition data sits in private platforms or national systems run by contractors (the Palantir–NHS pattern).

**Conditions:**
- **Technology:** cloud AI metered.
- **Economy:** platforms subsidise tests and monetise matching.
- **Politics:** governments outsource.
- **Institutions:** accreditation flows through platform partnerships.

**Who controls:** platforms control recognition and data; intelligence is proprietary.

**What becomes scarce:** local, physical, supervised test sites.

**NBC's role:** a **local assessment-centre operator and physical-task supplier** inside others' credential systems. Revenue: per-sitting fees from platforms; node service to schools.

**Barriers:** platform terms, and dependence on a single platform.

**Early indicators:** a platform credential listed in Ghanaian job adverts.

**Actions:** stay standards-compliant so records can be exported; negotiate non-exclusive deals.

**Stop if:** the terms require NBC to surrender learner data.

| Persona | Day | Decision | Capability | Interaction | Who pays | Refusal | Benefits and risks |
|---|---|---|---|---|---|---|---|
| Esi | Uses a platform AI tutor at home; the school's node for practicals | Sits a platform "AI skills" test | AI-assisted skills badge plus NBC practical | Platform + NBC as test site | Platform, a subsidised test | Data terms | Access. **Risk: her record is locked in the platform** |
| Kwame | Proctors platform tests at the centre | Becomes a certified proctor | — | NBC centre as test site | Platform per sitting | Low pay | Income. Risk: deskilled role |
| Mrs Mensah | Rents her school hall for tests | Hosts a test centre | — | NBC | Platform fees | Loss of control | Extra income |
| Mr Asare | Filters applicants by platform badge | Relies on the badge | — | Platform | Platform (free to employers) | Badge doesn't show wiring skill | Convenience. Risk: poor practical signal |
| Abdul | Can't pass the text-heavy platform test | Stays uncertified | His skill stays invisible | Platform (excludes) | — | Inaccessible | **Excluded, misclassified** |
| Ms Tetteh | Rolls out a vendor platform through GES | Signs a platform MOU | — | Platform | Donor / government | Sovereignty concerns | Speed. Risk: lock-in |

### Scenario C · Tutors Everywhere (open + low premium)

**Pathway:** Open AI tutors, funded by philanthropy, become free on phones → foundational scores rise → recognisers keep using exams and degrees; nobody pays for transfer evidence.

**Conditions:** cheap intelligence; exam-centred institutions.

**What becomes scarce:** hands-on practice, mentors, and safe spaces where children do things with physical materials.

**NBC's role:** a **practical-learning programme and facilitation service**. Evidence is internal quality control only. Revenue: after-school fees, school service, BSTEM supply.

**Barriers:** low price ceilings; tutors perceived as "enough".

**Early indicators:** funders standardise on AI tutors; no employer uptake of alternative evidence.

**Actions:** compete on the practical experience and facilitation playbook; shrink the evidence layer.

**Pivot:** to a lean practical-STEM operator, or to licensing the playbook.

| Persona | Day | Decision | Capability | Interaction | Who pays | Refusal | Benefits and risks |
|---|---|---|---|---|---|---|---|
| Esi | AI tutor on her mother's phone every evening | Drops the robotics club for exam revision | Exam scores | AI tutor (free) | Philanthropy | — | Better scores. Risk: little practical skill |
| Kwame | Centre enrolment falls | Retrains as a tutor-app coach | — | Competitor | — | — | Job at risk |
| Mrs Mensah | Parents want exam results | Declines the node | — | None | — | Price vs value | Saves money |
| Mr Asare | Still runs two-week trials | No change | — | None | — | — | Status quo |
| Abdul | The tutor app is text-based | Nothing changes | — | None | — | Inaccessible | Still excluded |
| Ms Tetteh | Adopts the free tutor app for BSTEM | Hands-on kits deprioritised | — | Competitor | Donor | — | Scale; less practice |

### Scenario D · The Assisted Economy (centralised + low premium)

**Pathway:** Work is reorganised around AI assistance; being "AI-fluent" is the credential. Platforms certify fluency; employers value output, not independent ability.

**What becomes scarce:** access to premium AI tools, and platform standing.

**NBC's role:** minimal. At most a supplier of community access points (the old stage 4 idea) or a niche practical-trades evidence provider.

**Early indicators:** job adverts require platform AI certificates; practical trades remain outside the credential economy.

**Actions:** don't invest in a proprietary graph; keep costs small; hold the TVET option.

**Stop if:** no recogniser values physical demonstration within 24 months.

| Persona | Day | Decision | Capability | Interaction | Who pays | Refusal | Benefits and risks |
|---|---|---|---|---|---|---|---|
| Esi | Uses AI for all homework | Chooses a fluency certificate | AI-assisted output | Platform | Parents (subscription) | Cost | Access. Risk: shallow learning |
| Kwame | Coaches prompt skills | Platform coach | — | Platform | Platform | — | Income |
| Mrs Mensah | Markets "AI school" | Buys platform licences | — | Platform | School | — | Enrolment |
| Mr Asare | Uses an AI design tool; still needs safe wiring | Still trials hires | — | None | — | — | The practical gap remains |
| Abdul | Excluded from the fluency economy | — | — | — | — | Access | **Deepened exclusion** |
| Ms Tetteh | Platform partnership | — | — | Platform | Donor | — | Dependence |

### Scenario E · Transfer Doesn't Travel (thesis failure or substitution)

**Pathway:** NBC's validity study finds node evidence **does not predict blind-scored transfer beyond a pretest**, or does so only for wealthier or English-medium schools. Meanwhile phone AI tutors plus printed worksheets achieve similar near-term gains at about a tenth of the cost.

**NBC's role:** stop claiming evidence. Either (a) pivot to a practical-STEM programme operator (Scenario C), or (b) narrow to *measurement research*: publish negative results and license anchor tasks.

**Indicators:** validity study correlations below the threshold (§11).

**Actions:** pre-register the study; decide the thresholds before seeing data (DE Step 21 discipline).

**Stop the evidence thesis if:** there is no incremental validity in two independent samples.

| Persona | What happens |
|---|---|
| Esi | Keeps using the club for fun; no evidence value |
| Kwame | Keeps facilitation skills |
| Mrs Mensah | Buys only if parents value the activity itself |
| Mr Asare | Keeps his two-week trials |
| Abdul | No change |
| Ms Tetteh | Kits deprioritised |

*The benefit:* scarce capital isn't sunk into an invalid measurement system.

### Scenario F · Trust Shock (wild card)

**Trigger:** in the same year, (1) a large edtech breach leaks African children's recordings and profiles, and (2) an AI-generated certificate-fraud scandal hits West African hiring.

**Effects:** regulators restrict child data collection. Employers distrust remote credentials and demand in-person demonstrations. Parents withdraw consent from camera-based tools.

**NBC's exposure:** its camera reads tokens, so it could be caught by blanket bans.

**NBC's opportunity:** its "state of the environment, not the child" design, local processing and deletion-by-default could make it one of the few permitted evidence systems. Demand for supervised practical demonstrations spikes.

**Actions now:** make paper-only evidence capture possible (no camera); publish a DPIA and an independent privacy audit; keep no raw images.

| Persona | Effect |
|---|---|
| Esi | Her parents refuse camera tools. A paper-only mode keeps her in |
| Abdul | In-person demonstration becomes the norm, which helps him |
| Mr Asare | Pays more for supervised demonstrations |
| Ms Tetteh | Pauses all AI procurement pending guidance |

---

## 9. Human Capability Graph assessment

**Source definition [SOURCE, thesis §VII, §IX].** A graph of "relationships among increasingly sophisticated capabilities". It is curriculum-compatible, with "Proof of Human Capability" that is "contextual, contestable, developmental, learner-controlled".

**Working interpretation [INFERENCE]:**

| Element | Definition | Notes |
|---|---|---|
| **Node** | A **capability claim type**: a named capability at a defined level with a published rubric (e.g. "proportional reasoning: level 2") | Maps to curriculum indicators and TVET competency units |
| **Edge** | One of three kinds, each carrying an **evidence weight**: *prerequisite* (A before B); *hypothesised transfer* (evidence of A in world X should predict B in world Y); *curriculum mapping* (node ↔ national indicator) | Edges are hypotheses until tested |
| **Evidence event** (attached to a person, not part of the graph) | Observed performance with context: world or task, tools allowed, **assistance level** (none / hints / AI on), observer, blind or not, date, rubric version, language | — |

**Keep four concepts separate** (the graph must store them in different fields and never merge them):

| Concept | What it is | Where it lives | Valid for |
|---|---|---|---|
| 1. **Observed performance** | What a person did, in context | Evidence event | Formative feedback |
| 2. **Inferred capability** | An estimate, with uncertainty, that the person can do X under stated conditions | Model output per node, with confidence and recency | Teaching decisions; the learner's own record |
| 3. **Predicted performance** | A forecast of success in a new context | Forecast; must be validated against later outcomes | Only after predictive validity is shown |
| 4. **Causal evidence of learning** | That NBC activities *caused* capability change | Separate study data (a comparison group) | Funders, research. **Never** attached to an individual child's record |

| Question | Assessment [INFERENCE] |
|---|---|
| **What decision does it improve?** | (a) A teacher's next activity choice (formative; low stakes). (b) A recogniser's decision (hire, certify, place; high stakes, needing validity evidence and human review under EU-style rules). **Build (a) first; allow (b) only after validity studies** |
| **Who contributes, interprets, benefits, pays?** | Contribute: learners (through action), facilitators (observation), assessors (blind scoring). Interpret: teachers, learners, recognisers. Benefit: learners (portable proof), teachers (feedback), recognisers (lower decision cost). Pay: schools (formative), recognisers and funders (high-stakes) |
| **What could a simpler tool do?** | A **rubric plus portfolio plus Open Badges 3.0** could cover most of today's needs. The graph adds value only where **transfer edges** are tested and used to choose activities or predict. **Until then, run a rubric bank and badges and treat the graph as the schema** |
| **Context, uncertainty, provenance, assistance, recency** | Every event records context and assistance level. Inferred capability carries a confidence interval and a timestamp. Provenance uses VC signatures. Recency weighting and an "expires unless re-demonstrated" rule handle decay |
| **How is transfer established?** | Only through designed tests: a capability shown in world A, then an **unpractised, delayed, blind-scored** task in world B, compared with a pretest-only prediction (the thesis's media-invariance test). **Transfer edges are never inferred from co-occurrence alone** |
| **Change and decay** | Evidence ages. Capability estimates widen in uncertainty without new evidence. Re-demonstration windows vary by capability type |
| **Inspect, correct, contest, export, delete** | A learner or guardian view; a contest button that triggers a human re-assessment; export as VC or Open Badges; deletion by default for raw evidence; retention limits for derived records |
| **Prohibited inferences and uses** | Emotion, personality or intelligence scores; biometrics; ranking children; predicting life outcomes; sale or licensing of individual records; automated exclusion or admission without human review; any use by recognisers without the learner's consent. (These align with UNICEF v3 and the EU AI Act prohibitions and high-risk rules) |
| **What creates defensibility?** | **Not the data** (small, sensitive, must be exportable). Defensibility comes from: (1) a **calibrated anchor-task and rubric bank** with published validity and equity evidence; (2) **operating know-how** (facilitation, low-cost delivery); (3) **trust and accreditation** (recognisers accept NBC evidence); (4) local relationships. Network effects exist only if more sites cut calibration costs for the next ones, which is testable (the cost per verified gain falls between node 1 and node 5; architecture map) |
| **Interoperability vs proprietary control** | **Interoperability creates more value.** Recognisers won't accept a closed format; states are building their own records (APAAR precedent); child-rights guidance demands portability. A proprietary graph would be a liability. **Recommendation: an open schema; NBC competes on validity, delivery and trust** |

---

## 10. Economics and market-entry recommendation

### 10.1 The measure: defined before calculating

**A credibly demonstrated transferable capability (CDTC)** is recorded when a learner, **with AI assistance removed**, performs a pre-specified capability on an anchor task **in a context they have not practised in**, **at least 2 weeks after instruction**, and the work is **scored blind** by someone other than their facilitator against a published rubric.

Two costs are reported and never merged:
- **gross** cost per CDTC: the cost of *observing* credible demonstrations;
- **incremental** cost per CDTC: the cost of *causing* them, above a counterfactual rate.

The demonstration rates (15–50%) and counterfactual rates (12–20%) are **[ASSUMPTION]**. No study has measured them yet. Model: [`capability_cost_model.py`](capability_cost_model.py) → [`capability_cost_results.md`](capability_cost_results.md).

### 10.2 Full cost of turning machine intelligence into demonstrated capability (USD per site per year, base)

| Line | School node (160 learners) | After-school centre (60) | TVET / apprenticeship RPL cohort (40) |
|---|---|---|---|
| Computation (node) | 193 | 193 | 193 |
| Physical materials | 340 | 190 | 300 |
| Facilitation (incl. time the site absorbs) | 100 | 600 | 800 |
| Development | 350 | 250 | 300 |
| Maintenance | 120 | 120 | 120 |
| Distribution (COCA amortised) | 173 | 173 | 400 |
| Evidence collection and validation | 150 | 80 | 400 |
| Governance | 60 | 60 | 60 |
| Institutional integration | 50 | 20 | 250 |
| **Total** | **1,536** | **1,686** | **2,823** |
| **Per learner-year** | **$9.60** | **$28.10** | **$70.58** |
| Gross cost per CDTC (base) | $6.40 | $18.73 | $58.81 |
| Incremental cost per CDTC (base) | $16.00 | $46.83 | $147.03 |
| Incremental, worst case | $184 | $574 | $2,606 |

**Readings [MODEL + INFERENCE]:**
1. **Computation is only about 7–13% of cost.** Cheaper AI barely changes NBC's economics; facilitation, distribution and evidence dominate.
2. **At base, the school node costs about $9.60 per learner-year against price-sheet revenue of $12.** The margin is almost nil once site-borne facilitation and evidence are counted. School economics work only with lower facilitation cost (B8) or more learners per node (B2).
3. **TVET/RPL costs more per learner but serves a payer with more at stake.** Mr Asare's alternative is a two-week unpaid trial per hire [FICTION], and a recognised certificate has wage value. Whether a recogniser pays about $60–150 per credible demonstration is the key unknown.
4. **The incremental figure explodes when NBC's added effect is small.** The validity-and-transfer study decides the economics as much as the science.

### 10.3 Comparing entry markets

Ratings: **H** / **M** / **L** [INFERENCE from the sources, synthetic studies and §3–4].

| Market | User need | Payer urgency | Founder access | Alternatives | Scientific burden | Adoption friction | Cost to serve | Speed of learning | Option value |
|---|---|---|---|---|---|---|---|---|---|
| **Private schools (node)** | M (practical computing; BSTEM mandate) | L–M (enrolment defence; no one pays for evidence [SIM]) | **H** (Cape Coast; GNAPS routes) | Textbooks; free BSTEM kits; Ghana Code Club unplugged kits | M (formative only) | M (head veto, exam time) | M ($9.60 per learner) | M (termly) | M |
| **After-school centres** | M | M (sole decider) | H (Algo Peers' own channel) | Own kits; tutors | L–M | L | H per learner ($28) | **H** (fast iteration) | M |
| **TVET / informal apprenticeship RPL** | **H** (unrecognised skills; ~80% informal) | **M–H** (employers, candidates, CTVET) | M (needs new relationships) | Written tests; site trials | **H** (high-stakes validity) | M (masters' culture; assessor capacity) | H ($71 per learner) | M | **H** (the youth-transition pathway) |
| **Employer pre-hire demonstrations** (solar, electrical, ICT support) | H | **H** (the cost of bad hires) | L–M | Trials; referrals | H | M | M | H (per hire) | H |
| **Outcome funds and funders** (verification) | — | M (verification is a real cost) | M | Sample-based evaluation | **Very high** | M | M | L (slow cycles) | H |
| **Public schools via BSTEM** | H | M (mandated; procurement) | M (GES Cape Coast) | Government labs | M | H (procurement) | M | L | H (scale) |
| **Homes and parents direct** | M | L (small, skippable spend [SIM]) | M | AI tutors on phones | L | M | H | M | L |

**Recommendation:**
- **Keep the after-school centre as the fastest learning loop.** It is the source-backed beachhead with the fastest decisions.
- **Treat private schools as a priced test, not a certainty.**
- **Open a second, small wedge at the youth school-to-work transition:** a capability-demonstration pilot with one CTVET-registered assessor and 2–3 employers in solar or electrical trades in the Central Region. It serves the payer most exposed to wrong capability judgements, and keeps young people inside the mission.
- **Pursue public schools via BSTEM as a supplier or protocol partner, not as a revenue base.**
- **Pursue funders for the validity study** (a public good), not for operations.

This follows DE Step 2 logic. The beachhead remains one market for sales (Central Region centres and schools). The TVET pilot is a *customer-discovery option* (Steps 1 and 21) and does not open a second beachhead until it passes its threshold.

---

## 11. Experiments and strategic decision rules

### 11.1 Strategy across scenarios

| Candidate action | A Commons | B Gatekept | C Tutors | D Assisted | E Failure | Type |
|---|---|---|---|---|---|---|
| Anchor-task bank + blind-scoring protocol | ✔✔ | ✔ | ✔ (quality control) | ✔ | ✔ (publishable research) | **Robust** |
| Standards-based, learner-held record (VC / Open Badges 3.0) | ✔✔ | ✔ (exportable) | ✔ | ✔ | ✔ | **Robust** |
| Paper-first tokens; camera optional | ✔ | ✔ | ✔ | ✔ | ✔ | **Robust** (also protects against the F wild card) |
| Facilitator playbook (no specialist needed) | ✔ | ✔ | ✔✔ | ✔ | ✔ | **Robust** |
| Validity and transfer study (pre-registered) | ✔✔ | ✔ | ✔ | ✔ | ✔✔ (the decisive test) | **Robust, and gating** |
| TVET / employer demonstration pilot | ✔✔ | ✔ | ✗ | ✗ | ✗ | **Scenario-dependent bet**, low cost |
| Priced school or centre node | ✔ | ✔ | ✔ | ✗ | ✔ | Bet, low cost |
| Village AI edge device | ✔ | ✗ | ✔ | ✗ | — | **Option**; defer spend |
| Electronic tokens / programmable matter hardware | ? | ? | ✗ | ✗ | ✗ | **Defer** (irreversible capex) |
| Proprietary capability graph as a moat | ✗ | ✗ | ✗ | ✗ | ✗ | **Abandon** |
| Contribution economy, credits, AI evaluation worlds | ? | ✗ | ✗ | ✗ | ✗ | **Defer** (stage 5) |
| Community compute as a beachhead product | ✗ | ✗ | ✔? | ✔? | ✗ | **Defer** (the synthetic study rejected it at school sites) |

**Irreversible commitments to avoid now:** hardware manufacturing; exclusive platform or funder deals; a new company structure for NBC before B1–B3 and B7 evidence (open item since DEV-010); fixed staff for assessment centres.

**Thesis-breaking evidence** (pre-declared):
1. **Validity:** no incremental validity beyond a pretest (partial r < 0.2) in two independent samples, or validity more than 0.15 lower for home-language or low-fee settings.
2. **Payment:** fewer than 3 of 10 qualified buyers pay a deposit at any tested price (source kill criterion).
3. **Recognition:** no recogniser (employer, CTVET assessor or funder) acts on a demonstration record within 6 months.

### 11.2 A 4–8 week evidence plan

| # | Current evidence | Available choices | Gating uncertainty | Experiment (weeks) | Decision threshold (set now) | If met | If missed | Tests |
|---|---|---|---|---|---|---|---|---|
| 1 | Synthetic only; the offer has a pilot-discount flaw (study 02) | Price per site vs per child; percentage discount vs floor | **B1** | Priced written offer to 10 qualified buyers (centres first), 2 price variants, refundable deposit, decline reasons recorded; "no reference site yet" logged separately (wk 1–5) | ≥ 3 of 10 deposits at a price ≥ the site's base cost to serve | Book 3 paid pilot sites | Test the hybrid payer (school + parent cohort) or centre-only; revisit cost to serve | **Commercial viability** |
| 2 | No observation | Guides only / guides + WhatsApp help / trained lead | **B8** | Wizard-of-Oz sessions at 1–2 centres: 12+ sessions, timestamps, help calls, non-specialist leads (wk 2–7) | ≥ 80% of sessions completed without NBC staff; median setup ≤ 5 min | Budget development at ≤ $350 per site | Redesign guides; add a paid lead-facilitator role | **Technical feasibility, desirability** |
| 3 | A power-check design (DEV-003) | Near vs far transfer; which capabilities | **B7** (thesis) | Validity pilot: 80+ learners across 2 settings (including one low-fee or home-language class), pretest → 3 worlds → delayed, blind-scored transfer task in an unfamiliar world (wk 1–8, pre-registered) | Incremental validity partial r ≥ 0.3 (lower CI bound > 0.1); equity gap ≤ 0.15 | Proceed to a funder-backed study; publish | Narrow to near transfer; or Scenario E pivot | **Scientific validity** |
| 4 | None | Employer vs CTVET vs candidate as payer | **Recogniser uptake** | 1 CTVET-registered assessor + 3 employers review 15 supervised demonstration records (solar or electrical tasks) against their usual method (wk 3–8) | ≥ 2 of 3 employers use a record in a real hiring or trial decision; the assessor judges records admissible as supplementary RPL evidence | Design a paid demonstration service; approach MCF / MEST | Keep TVET as a watch-only option | **Institutional adoption, commercial** |
| 5 | Tokens-vs-paper simulation | Paper / camera / electronic | Hardware spend | Same sessions run with paper-only vs camera-read tokens (within experiment 2) | Camera adds ≥ 10% agreement with blind scoring, or cuts setup time ≥ 30% | Keep camera optional | Paper-only v0 | **Technical feasibility** |
| 6 | Theory | Protect foundations | Funder fit | Time-use log: does the node displace literacy or numeracy time? (within experiments 2 and 3) | No reduction in scheduled literacy and numeracy minutes | Funder pitch includes a "foundations protected" claim | Redesign timetable placement | **Desirability (funders), institutional** |

---

## 12. Monitoring dashboard (review monthly; update scenario weights quarterly)

| Signal | What to watch | Threshold that changes action | Source / cadence | Pushes toward |
|---|---|---|---|---|
| Recogniser uptake | Ghanaian employers or CTVET accepting supervised demonstration or VC records | First formal acceptance | Pilot 4; CTVET notices, monthly | A |
| Platform credentials in Ghana | Job adverts requiring platform AI certificates | More than 5% of sampled ICT adverts | Job-board sample, quarterly | B / D |
| Funders' AI tutoring commitments | Gates, MCF, World Bank calls naming AI tutors for Ghana | A standardised national tutor chosen | Calls for proposals, monthly | C |
| Assessment practice | Universities or WAEC moving to supervised practicals or orals because of AI | Announced policy | News, quarterly | A / B |
| Ghana curriculum and BSTEM | Cabinet approval; procurement specifications | Specification includes hands-on computing kits | MoE / NaCCA, monthly | Supplier route |
| Learner records | Ghana national learner-record or ID-linked skills record | Announcement | MoE / NIA, quarterly | A or B |
| Edge AI | Twi and Fante quality of the top open small model; price of a $100-class node | Usable local-language teacher support | Benchmarks, quarterly | Village AI option |
| Child-data regulation | Data Protection Commission guidance on edtech / AI | Any restriction on camera or biometric data | DPC, quarterly | F (paper mode) |
| Grid | Outage hours per week in the Central Region | More than 20 h per week | ECG / news, monthly | Solar spec |
| NBC internals | Deposits ÷ offers; sessions unaided ÷ scheduled; validity r; cost per learner-year; COCA | §11 thresholds | Pilot data, weekly | Continue / pivot / stop |

---

## 13. Revised NBC thesis (proposed)

> **NBC: The Human Capability Utility.** As machine intelligence becomes cheap and ubiquitous, the scarce resources in human development are **consequential practice in the physical and social world, skilled mentorship, and trustworthy evidence of what a person can do *without* the machine and *in a new context***. NBC builds locally operable infrastructure (programmable physical learning environments, shared local intelligence, and an open, learner-held capability record) that turns abundant machine intelligence into human capability, and turns human capability into evidence that families, teachers, employers and public institutions can trust and act on.
>
> **We serve children first and follow them into youth.** The same infrastructure supports learning in schools and after-school centres and, as young people reach the transition to work, recognition of practical capability in apprenticeships and TVET. We protect foundational learning. We observe the state of the environment, not the child. We never sell or rank children, and we keep records portable and contestable.
>
> **Our first proof** is narrow: that ordinary facilitators can run consequential learning worlds without a specialist; that the resulting evidence predicts unassisted performance in unfamiliar contexts, equally across schools and languages; and that someone who bears the cost of misjudging capability will pay for it.
>
> **The long-term ambition** stays staged behind evidence: community-owned nodes as productive infrastructure; open protocols across schools, centres and workplaces; and a contribution economy that never depends on children's data.

**What changed from v3** [INFERENCE]:

| Change | Why |
|---|---|
| "Scarcity" is sharpened to *unassisted, transferable, consequential* evidence | AI tutoring is becoming abundant |
| The customer path is made explicit (children → youth transition) | This is where evidence is paid for |
| The Capability Graph becomes an **open schema**, not a proprietary asset | §9 |
| Cost per credibly demonstrated transferable capability is the core metric | It replaces "cost per unit of capability" and separates observed from causal |

---

## 14. Source register

*Retrieved 23–25 September 2026. "Search snippet" means the page was not opened directly (egress policy); the claim rests on search-engine text.*

| # | Source | Date | Used for | Access |
|---|---|---|---|---|
| S1 | NBC thesis v3, architecture map, lineage (repo `nbc-next-billion-children-vct`) | 2026-09-24 | Thesis map | Read in full |
| S2 | NBC business model v3; products; marketing strategy; unit-economics and funnel outputs | 2026-09-24 | Economics, hypotheses | Read in full |
| S3 | Development log DEV-001–016 | 2026-09-25 | Founder decisions | Read in full |
| S4 | Algo Peers venture background (repo `next-billion-children`) | 2026-09-22 | Demonstrated operations | Read in full; claims flagged in DEV-007 |
| S5 | Synthetic studies v3 and 02 | 2026-09-25 | Hypotheses only | Read; **not evidence** |
| S6 | [WEF Future of Jobs 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) | Jan 2025 | Labour and skills | Search snippet |
| S7 | [OpenAI: expanding economic opportunity](https://openai.com/index/expanding-economic-opportunity-with-ai/); [Campus Technology](https://campustechnology.com/articles/2025/09/10/openai-to-launch-ai-powered-jobs-platform-by-mid-2026.aspx) | Sep 2025 | Platform credentials | Search snippet |
| S8 | [Anthropic Economic Index, Mar 2026](https://www.anthropic.com/research/economic-index-march-2026-report) | 2026-03-24 | Learning by doing; inequality | Page fetched |
| S9 | [Anthropic–Gates partnership](https://www.anthropic.com/news/gates-foundation-partnership) | 2026-05-14 | Funding; public benchmarks | Page fetched |
| S10 | [Gates $1B AI commitment (Semafor)](https://www.semafor.com/article/09/21/2026/gates-foundation-commits-1b-to-local-language-ai-development-in-africa); [Fortune](https://fortune.com/2026/09/19/the-gates-foundation-ai-schools-teachers-warn-gap-reading-math/) | 2026-09-19/21 | Funding | Search snippet (Semafor blocked) |
| S11 | [Google LearnLM](https://cloud.google.com/solutions/learnlm); [Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) | 2025–26 | Pedagogical AI; world models | Search snippet |
| S12 | [Gemma on Raspberry Pi](https://www.raspberrypi.com/news/mastering-edge-ai-on-raspberry-pi-with-litert-and-gemma/); [Gemma](https://en.wikipedia.org/wiki/Gemma_(language_model)) | 2025–26 | Edge AI | Search snippet |
| S13 | [Epoch AI inference price trends](https://epoch.ai/data-insights/llm-inference-price-trends) | 2025–26 | AI cost | Search snippet |
| S14 | [Coefficient Giving rename](https://coefficientgiving.org/research/open-philanthropy-is-now-coefficient-giving/) | Nov 2025 | Philanthropy | Search snippet |
| S15 | [OECD Digital Education Outlook 2026](https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html) | Jan 2026 | AI and learning | Search snippet |
| S16 | [OECD PISA 2025 press release](https://www.oecd.org/en/about/news/press-releases/2026/09/pisa-2025-students-reading-and-mathematics-performance-declined-sharply-across-the-oecd.html) | Sep 2026 | Foundations | Search snippet |
| S17 | [UNESCO AI competency frameworks](https://www.unesco.org/en/articles/what-you-need-know-about-unescos-new-ai-competency-frameworks-students-and-teachers) | 2024 | Norms | Search snippet |
| S18 | [UNICEF Guidance on AI and Children v3](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children) | Dec 2025 | Child rights | Search snippet |
| S19 | [ILO GenAI and jobs 2025](https://www.ilo.org/publications/generative-ai-and-jobs-2025-update); [ILO Africa informality profile](https://www.ilo.org/sites/default/files/2025-02/Africa_Informality%20Regional%20statistical%20profile.pdf) | May / Feb 2025 | Labour | Search snippet |
| S20 | [World Bank Nigeria AI tutor](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192529324) | 2025 | AI tutoring evidence | Search snippet |
| S21 | [Rori RCT, Ghana](https://arxiv.org/abs/2402.09809) | 2024 | AI tutoring evidence | Search snippet |
| S22 | [Bastani et al., PNAS](https://www.pnas.org/doi/10.1073/pnas.2422633122) | 2025 | Assisted vs unassisted | Search snippet |
| S23 | [Learning poverty (EOF summary of World Bank)](https://www.educationoutcomesfund.org/post/learning-poverty) | 2024 | Foundations | Search snippet |
| S24 | [African Union Continental AI Strategy](https://au.int/en/documents/20240809/continental-artificial-intelligence-strategy) | Jul 2024 | Policy | Search snippet |
| S25 | [Ghana AI, coding, robotics in curriculum](https://www.newsghana.com.gh/ghana-integrates-ai-and-robotics-into-basic-school-curriculum/); [7,000+ STEM teachers (GBC)](https://www.gbcghanaonline.com/news/education/stem-teachers-ghana/2026/) | May–Jul 2026 | Ghana policy | Search snippet |
| S26 | [CTVET Recognition of Prior Learning](https://ctvet.gov.gh/recognition-of-prior-learning/); [National Apprenticeship Policy](https://ctvet.gov.gh/national-apprenticeship-policy/) | Current | TVET wedge | Search snippet |
| S27 | [1EdTech CLR / Open Badges FAQ](https://www.1edtech.org/clr/faq) | Current | Standards | Search snippet |
| S28 | [India APAAR / ABC (PIB)](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc202675912501.pdf) | Jul 2026 | DPI precedent | Search snippet |
| S29 | [EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai); [FPF on emotion recognition](https://fpf.org/blog/red-lines-under-eu-ai-act-unpacking-the-prohibition-of-emotion-recognition-in-the-workplace-and-education-institutions/) | 2025–26 | Regulation | Search snippet |
| S30 | [BIS rescission of the AI Diffusion Rule](https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens) | May 2025 | Chips | Search snippet |
| S31 | [Thiel Fellowship coverage (EdSurge)](https://www.edsurge.com/news/2023-12-12-how-a-billionaire-s-fellowship-spread-skepticism-about-college-s-value) | 2023 | Actor analysis | Search snippet |
| S32 | [NHS FDP contract explainer](https://www.england.nhs.uk/digitaltechnology/nhs-federated-data-platform/security-privacy/contract-explainer/); [Hansard, 16 Apr 2026](https://hansard.parliament.uk/Commons/2026-04-16/debates/2FDCA71C-D0C1-4738-BEE8-A4BDA311DB99/NHSFederatedDataPlatform) | 2023–26 | Actor analysis | Search snippet |
| S33 | [Mastercard Foundation Ghana](https://mastercardfdn.org/en/where-we-work/ghana/); [MEST EdTech Fellowship 2026](https://www.citinewsroom.com/2026/04/mest-africa-boosts-ghanaian-learning-with-3rd-mastercard-foundation-edtech-fellowship-cohort/) | 2026 | Funders | Search snippet |
| S34 | [IDP Rising Schools](https://www.idpfoundation.org/learn_impact/rising-schools-program/) | Undated | Finance channel | Search snippet |
| S35 | [Ghana power sector (B&FT)](https://thebftonline.com/2025/08/01/ghanas-electric-power-outages-and-blackouts-ending-the-persistent-electric-load-shedding-dum-sor-problem-from-the-perspective-of-a-seasoned-electric-power-industry-practit/); 2026 outage reports | 2025–26 | Energy | Search snippet |
| S36 | [AI content detection (overview)](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection); [C2PA critique](https://arxiv.org/html/2604.24890v1) | 2023–26 | Authenticity | Search snippet |
| S37 | [EIDU (EdTech Hub)](https://edtechhub.org/evidence/edtech-hub-research-portfolio/improve-numeracy-outcomes-in-kenyan-classrooms/) | 2023–26 | Substitutes | Search snippet |
| S38 | [Ghana private enrolment share (R4D and other)](https://r4d.org/resources/exploring-public-and-private-education-costs-ghana/) | Various | Market size | Search snippet; figures approximate |
| S39 | Community directory (DEV-015), Ghana Code Club unplugged kits ([Adom Online](https://www.adomonline.com/ghana-code-club-targets-underserved-communities-with-coding-and-ai-training/)) | Mar 2026 | Competitors | Search snippet |

**Not accessible or not verified:** the NotebookLM notebook; full texts behind blocked domains (Semafor, Taylor & Francis, Facebook, LinkedIn); Founders Fund portfolio (no evidence found); any Coefficient Giving education grants.
