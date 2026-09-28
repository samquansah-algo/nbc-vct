# NBC conditional projections, 2026–2029 (PROJECTIONS, not predictions)

## P1 · Intelligence cost per learner-year

If a capable small model costs P0 per million tokens in 2026, prices fall by factor d each year, and each learner consumes T tokens per year (teacher-facing support + learner-facing hints), then cloud intelligence cost per learner-year is T·P.

| Case | P0 ($/M tokens, 2026) | Decline per year | Tokens per learner-year | 2026 | 2027 | 2028 | 2029 |
|---|---|---|---|---|---|---|---|
| teacher-facing only, slow decline | 1.0 | 3× | 108,000 | $0.11 | $0.04 | $0.01 | $0.00 |
| teacher-facing only, base | 0.3 | 10× | 108,000 | $0.03 | $0.00 | $0.00 | $0.00 |
| learner-facing hints, base | 0.3 | 10× | 900,000 | $0.27 | $0.03 | $0.00 | $0.00 |
| learner-facing, heavy use, slow decline | 1.0 | 3× | 3,600,000 | $3.60 | $1.20 | $0.40 | $0.13 |

Local alternative: node hardware amortised = $193/yr [MODEL] ÷ 160 learners = $1.21 per learner-year, falling 10–20%/yr if edge hardware prices follow recent trends [ASSUMPTION]. **Either way, intelligence is under ~$1.50 per learner-year by 2027**; the constraint is not compute.

## P2 · Hardware and maintenance per site-year

If hardware capex falls by h per year, life is 4 years with 10% replacement, and maintenance is visits × cost per visit (visit cost tracks local wages and transport), then:

| Case | Capex 2026 | h/yr | Visits/yr | $/visit | 2026 | 2027 | 2028 | 2029 |
|---|---|---|---|---|---|---|---|---|
| base | $700 | 15% | 4 | $30 | $312 | $284 | $259 | $238 |
| lean | $400 | 20% | 2 | $20 | $150 | $128 | $110 | $96.32 |
| harsh (heat, dust, remote) | $900 | 5% | 6 | $40 | $488 | $475 | $463 | $452 |

Maintenance becomes the larger share as hardware cheapens; repair logistics, not chips, set the floor.

## P3 · Facilitator time per learner-year (the dominant line)

If each class of n learners gets 36 sessions a year, each costing s minutes of facilitator time beyond normal teaching (setup, pack-away, evidence notes), at a fully loaded hourly cost w, then cost per learner-year = 36 × s/60 × w / n.

| Market profile (hourly cost w is an ASSUMPTION unless noted) | w ($/h) | s = 30 min (no guides) | s = 15 min | s = 5 min (target) |
|---|---|---|---|---|
| Ghana private school teacher (≈GHS 1,500–3,500/mo ÷ ~170 h) [SOURCED pay, derived rate]; class n=40 | 0.59 | $0.26 | $0.13 | $0.04 |
| Low-fee school elsewhere in SSA / South Asia (assumed similar band); class n=45 | 0.90 | $0.36 | $0.18 | $0.06 |
| After-school facilitator paid per session (assumed); class n=15 | 2.50 | $3.00 | $1.50 | $0.50 |
| Urban middle-income market (assumed); class n=30 | 6.00 | $3.60 | $1.80 | $0.60 |
| High-income comparator (assumed); class n=25 | 30.00 | $21.60 | $10.80 | $3.60 |

If guides cut added facilitator time from 30 to 5 minutes (B8), facilitation cost per learner falls about 6×. In high-wage markets facilitation dominates everything; in low-wage markets it is small in cash but large in *goodwill*: unpaid extra minutes are why programmes quietly die [SIM].

## P4 · Evidence-validation cost per credible demonstration

If a blind-scored demonstration needs m minutes of assessor time at rate a, plus a share of moderation overhead o, and AI pre-scoring removes a fraction r of human minutes (low-stakes only), then cost = m/60 × a × (1 − r) + o.

| Stakes | m (min) | a ($/h) | r (AI assist) | o ($) | Cost per demonstration |
|---|---|---|---|---|---|
| formative (school, 20% sample) | 10 | 3 | 50% | 0.2 | $0.45 |
| formative, no AI assist | 10 | 3 | 0% | 0.2 | $0.70 |
| high-stakes RPL / hiring (2 raters, 100%) | 40 | 6 | 0% | 2.0 | $6.00 |
| high-stakes, high-wage market | 40 | 40 | 0% | 10.0 | $36.67 |

High-stakes evidence costs ~10–100× formative evidence. **Evidence is cheap where it matters least and expensive where someone would pay for it**, so the business must charge recognisers, not learners.

## P5 · Adoption economics (site count and LTV:COCA)

If price per learner-year is π, cost to serve per learner-year is c, 160 learners per site, churn k, discount 12%, and COCA per site is C, then LTV = 160(π − c)/(k + 0.12) and LTV:COCA = LTV / C.

| π ($/learner-yr) | c | churn | COCA | LTV | LTV:COCA | Verdict |
|---|---|---|---|---|---|---|
| 12 | 7.02 | 20% | 866 | 2,490 | 2.9 | marginal (1–3) |
| 12 | 9.6 | 20% | 866 | 1,200 | 1.4 | marginal (1–3) |
| 12 | 7.02 | 35% | 1,393 | 1,695 | 1.2 | marginal (1–3) |
| 8 | 4.5 | 20% | 866 | 1,750 | 2.0 | marginal (1–3) |
| 15 | 7.02 | 20% | 866 | 3,990 | 4.6 | viable (≥3) |
| 6 | 2.9 | 15% | 400 | 1,837 | 4.6 | viable (≥3) |

$7.02 = business-model base cost; $9.60 = full cost including site-borne facilitation, evidence and governance (capability_cost_model.py). **Viability needs either lower COCA (referrals, associations, finance partners) or lower full cost (5-minute setup, more learners per node), not cheaper AI.**

**Discontinuities not modelled:** currency depreciation (costs in USD, revenue in local currency); grid shocks; a funder subsidising a competing product to zero; regulation banning camera-based evidence; a validity failure.
