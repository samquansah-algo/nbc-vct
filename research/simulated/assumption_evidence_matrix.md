# Assumption-to-evidence matrix (study 02)

> **SIMULATION STUDY.** This matrix sets what fictional interview answers can and cannot tell us before any question is written. Interview statements, real or simulated, **cannot** establish payment, conversion, churn, setup time, unaided delivery, error rates, learning gains or transfer. Those need transactions, observation, experiments or records.

## 1. Priority order (by consequence for the next venture decision)

The next decision is **whether and how to run Step 21 test 1**: a priced offer, with deposits, to 10 proprietors and programme owners. Kill criterion (S04): fewer than 3 of 10 pay at any tested price. Assumptions are ranked by how much a wrong answer would change that decision, not by how easy they are to discuss.

| Rank | ID | Assumption (S04 Step 20 wording) | Why it ranks here |
|---|---|---|---|
| 1 | **B1** | Proprietors and programme owners pay about $4–6 per child per term, all-in | Decides the test directly; price has the largest sensitivity swing in the model (S05) |
| 2 | **B8** | Teachers run worlds without an NBC facilitator | If false, cost to serve and churn break; it also decides what the offer must include |
| 3 | **B9** | Parents value witnessed capability enough to keep paying fees to the school or centre | The buyer's reason to pay (S04 beachhead test 3) |
| 4 | **B2** | A node serves ≥ 160 children a year, or an evening cohort is added | Second-largest sensitivity swing; decides which sites qualify |
| 5 | **B4** | Teacher development ≤ $350 per site per year | Cost line that depends on B8 |
| 6 | **B5** | Show-Me Day converts ≥ 35% of attendees to a pilot | Acquisition engine; definition conflict C3 |
| 7 | **B3** | Annual churn ≤ 20% | Only measurable over time |
| 8 | **B7** | Learning evidence is valid and equitable, and capability transfers across worlds | Core thesis claim, but it is tested by the validity study, not by this sales decision |
| — | **B6** | Sponsors or outcome funds pay for public-school access | **Not assessable:** sponsors are outside the segment and the sample |

## 2. Evidence matrix

| ID | What an interview answer **could illuminate** | What it **cannot establish** | Evidence actually required (method, measure, threshold) | Questions |
|---|---|---|---|---|
| **B1** | Past spending on comparable items; budget source and timing; who signs; objections to recurring fees; conditions attached | That anyone will pay; the price accepted | **Transaction:** deposits collected ÷ offers made (threshold ≥ 3 of 10, S04); paid first-term invoices | Q1, Q2, Q12, C1 |
| **B8** | Past experiences of non-specialists running new activities; what failed; what support existed | Unaided delivery; setup time; error handling | **Observation (Wizard-of-Oz node):** per session, timestamps for arrival → first child action (setup, target < 5 min, S06), count of facilitator calls for help, sessions completed without NBC staff ÷ sessions scheduled | Q3, Q4 |
| **B9** | Past parent events; how parents judge quality; causes of withdrawal | That witnessed capability changes fee or renewal behaviour | **Behaviour and records:** Show-Me Day attendance ÷ enrolled families (target ≥ 50%, S06); term-2 renewal; re-enrolment against the prior year | Q6, Q7 |
| **B2** | How many children currently get computing time; timetable constraints | Real utilization | **Records:** enrolment and timetable per site; node session logs (children served ÷ 160) | Q8 |
| **B4** | Past training and support; its cost and aftermath | The real cost of development and support | **Financial records:** pilot cost log per site (≤ $350 per year) | Q5 |
| **B5** | How buyers decided after past demonstrations or events | Conversion | **Experiment:** attendees ÷ contacted, and pilot starts ÷ attendees, counted separately (resolves conflict C3) | Q6 |
| **B3** | Past cancellations of services and why | Churn | **Transaction over time:** paid term 2 ÷ pilot sites (≥ 2 of 3); year-2 renewal | Q2 |
| **B7** | What educators and buyers treat as evidence of understanding | Validity, equity, transfer | **Experiment (validity and transfer study, S02 §3):** agreement with blind expert ≥ 0.8; κ ≥ 0.6; delayed transfer beyond a pretest; results split by school wealth and language | Q9 |
| **Cross-cutting: disinterest and alternatives** | Reasons the problem may not matter; competing uses of money | — | Real interviews and a count of prospects who decline | Q10 |
| **Cross-cutting: DMU and liability** (S04 Step 12; conflict C10) | Who approves, who can veto, who carries loss | Any purchase | Real signatures; a named signer on the offer | Q11, Q12 |

## 3. The offer used in the closing question (one consistent offer)

Source-backed terms come from S04 Steps 6, 16 and 22, S06 §7 and S08 P1. **Terms marked HYPOTHETICAL are not in any source and need founder approval at checkpoint 2.**

| Term | Offer | Basis |
|---|---|---|
| Scope | One shared NBC Node (device with camera and solar pack), printed token sets, 2 learning worlds, teacher guides, one afternoon of teacher onboarding, teacher-facing support on the device, a Show-Me Day each term, a one-page class evidence report | S04 Steps 6 and 22; S08 P1–P6 |
| Price | **Private school: $4 per participating child per term. After-school centre: $6 per child per term.** Quoted as a per-site total, e.g. 160 children × $4 = $640 per term, or 60 children × $6 = $360 per term | S04 Step 16 [ASSUMPTION]; S06 §7 (lead with the per-site number) |
| First term | A discounted pilot term: **$250 less than the per-site termly price** (approved at checkpoint 2) | The size follows the `pilot_subsidy` of $250 per site in `unit_economics.py` (S05). S04 and S06 say "discounted" |
| Payment timing | **HYPOTHETICAL:** a 25% deposit of the first-term fee at signing, refunded if NBC does not install by the agreed date; the balance in two instalments within the term. Later terms are also paid in termly instalments | S06 §7 (instalments; never lump sum); S04 Step 21 (deposits); deposit size and refund rule unspecified |
| Support | Termly maintenance visit; faulty parts swapped; **HYPOTHETICAL:** phone or WhatsApp help within one working day | S04 Step 6 (termly visit); response time unspecified |
| Equipment ownership | NBC owns, insures, repairs and replaces the equipment; no capital outlay by the school or centre | S04 Steps 6 and 16; S06 §3 |
| Exit | **HYPOTHETICAL:** stop at the end of any term with 4 weeks' notice and no penalty; NBC removes its equipment; printed guides stay | Unspecified in sources |
| Commitments | NBC gives a written commitment to return for term 2. No child's participation depends on a parent top-up. No photos or names of children without written consent | S06 §5, §7, §9 |
