"""Conditional projections for NBC (2026 → 2029). PROJECTIONS, not predictions: each is
"if these assumptions hold, this follows". Stdlib only. Run: python3 foresight/projections.py

Baselines:
  - Node cost lines from business-model/unit_economics.py base case [MODEL].
  - Inference price decline: Epoch AI reports 9x–900x/yr by task, median ~50x/yr, with ~10x/yr cited as a
    sustained constant-capability estimate (epoch.ai/data-insights/llm-inference-price-trends) [SOURCED RANGE].
  - Ghana teacher pay: new entrants ~GHS 1,300–3,573/month (2026 reports) [SOURCED, approximate].
  - Everything else is [ASSUMPTION] and shown with ranges.
"""

YEARS = [2026, 2027, 2028, 2029]
GHS_PER_USD = 15  # [ASSUMPTION]; FX is a discontinuity risk (see note)


def fmt(x):
    return f"${x:,.2f}" if x < 100 else f"${x:,.0f}"


def p1_intelligence():
    print("## P1 · Intelligence cost per learner-year\n")
    print("If a capable small model costs P0 per million tokens in 2026, prices fall by factor d each year, and each learner "
          "consumes T tokens per year (teacher-facing support + learner-facing hints), then cloud intelligence cost per learner-year is T·P.\n")
    print("| Case | P0 ($/M tokens, 2026) | Decline per year | Tokens per learner-year | " + " | ".join(str(y) for y in YEARS) + " |")
    print("|---|---|---|---|" + "---|" * len(YEARS))
    cases = [("teacher-facing only, slow decline", 1.00, 3, 36 * 3_000),
             ("teacher-facing only, base", 0.30, 10, 36 * 3_000),
             ("learner-facing hints, base", 0.30, 10, 36 * 25_000),
             ("learner-facing, heavy use, slow decline", 1.00, 3, 36 * 100_000)]
    for name, p0, d, t in cases:
        vals = [t / 1e6 * p0 / (d ** i) for i in range(len(YEARS))]
        print(f"| {name} | {p0} | {d}× | {t:,} | " + " | ".join(fmt(v) for v in vals) + " |")
    print("\nLocal alternative: node hardware amortised = $193/yr [MODEL] ÷ 160 learners = $1.21 per learner-year, falling "
          "10–20%/yr if edge hardware prices follow recent trends [ASSUMPTION]. **Either way, intelligence is under ~$1.50 per "
          "learner-year by 2027**; the constraint is not compute.\n")


def p2_hardware_maintenance():
    print("## P2 · Hardware and maintenance per site-year\n")
    print("If hardware capex falls by h per year, life is 4 years with 10% replacement, and maintenance is visits × cost per "
          "visit (visit cost tracks local wages and transport), then:\n")
    print("| Case | Capex 2026 | h/yr | Visits/yr | $/visit | " + " | ".join(str(y) for y in YEARS) + " |")
    print("|---|---|---|---|---|" + "---|" * len(YEARS))
    for name, capex, h, visits, cpv in [("base", 700, 0.15, 4, 30), ("lean", 400, 0.20, 2, 20), ("harsh (heat, dust, remote)", 900, 0.05, 6, 40)]:
        vals = [capex * (1 - h) ** i / 4 * 1.1 + visits * cpv for i in range(len(YEARS))]
        print(f"| {name} | ${capex} | {h:.0%} | {visits} | ${cpv} | " + " | ".join(fmt(v) for v in vals) + " |")
    print("\nMaintenance becomes the larger share as hardware cheapens; repair logistics, not chips, set the floor.\n")


def p3_facilitation():
    print("## P3 · Facilitator time per learner-year (the dominant line)\n")
    print("If each class of n learners gets 36 sessions a year, each costing s minutes of facilitator time beyond normal teaching "
          "(setup, pack-away, evidence notes), at a fully loaded hourly cost w, then cost per learner-year = 36 × s/60 × w / n.\n")
    print("| Market profile (hourly cost w is an ASSUMPTION unless noted) | w ($/h) | s = 30 min (no guides) | s = 15 min | s = 5 min (target) |")
    print("|---|---|---|---|---|")
    profiles = [("Ghana private school teacher (≈GHS 1,500–3,500/mo ÷ ~170 h) [SOURCED pay, derived rate]", (1500 / GHS_PER_USD) / 170, 40),
                ("Low-fee school elsewhere in SSA / South Asia (assumed similar band)", 0.9, 45),
                ("After-school facilitator paid per session (assumed)", 2.5, 15),
                ("Urban middle-income market (assumed)", 6.0, 30),
                ("High-income comparator (assumed)", 30.0, 25)]
    for name, w, n in profiles:
        vals = [36 * s / 60 * w / n for s in (30, 15, 5)]
        print(f"| {name}; class n={n} | {w:.2f} | " + " | ".join(fmt(v) for v in vals) + " |")
    print("\nIf guides cut added facilitator time from 30 to 5 minutes (B8), facilitation cost per learner falls about 6×. "
          "In high-wage markets facilitation dominates everything; in low-wage markets it is small in cash but large in *goodwill*: "
          "unpaid extra minutes are why programmes quietly die [SIM].\n")


def p4_evidence():
    print("## P4 · Evidence-validation cost per credible demonstration\n")
    print("If a blind-scored demonstration needs m minutes of assessor time at rate a, plus a share of moderation overhead o, "
          "and AI pre-scoring removes a fraction r of human minutes (low-stakes only), then cost = m/60 × a × (1 − r) + o.\n")
    print("| Stakes | m (min) | a ($/h) | r (AI assist) | o ($) | Cost per demonstration |")
    print("|---|---|---|---|---|---|")
    rows = [("formative (school, 20% sample)", 10, 3, 0.5, 0.20),
            ("formative, no AI assist", 10, 3, 0.0, 0.20),
            ("high-stakes RPL / hiring (2 raters, 100%)", 40, 6, 0.0, 2.00),
            ("high-stakes, high-wage market", 40, 40, 0.0, 10.00)]
    for name, m, a, r, o in rows:
        print(f"| {name} | {m} | {a} | {r:.0%} | {o} | {fmt(m / 60 * a * (1 - r) + o)} |")
    print("\nHigh-stakes evidence costs ~10–100× formative evidence. **Evidence is cheap where it matters least and expensive where "
          "someone would pay for it**, so the business must charge recognisers, not learners.\n")


def p5_adoption():
    print("## P5 · Adoption economics (site count and LTV:COCA)\n")
    print("If price per learner-year is π, cost to serve per learner-year is c, 160 learners per site, churn k, discount 12%, "
          "and COCA per site is C, then LTV = 160(π − c)/(k + 0.12) and LTV:COCA = LTV / C.\n")
    print("| π ($/learner-yr) | c | churn | COCA | LTV | LTV:COCA | Verdict |")
    print("|---|---|---|---|---|---|---|")
    for pi, c, k, C in [(12, 7.02, 0.20, 866), (12, 9.60, 0.20, 866), (12, 7.02, 0.35, 1393), (8, 4.50, 0.20, 866),
                        (15, 7.02, 0.20, 866), (6, 2.90, 0.15, 400)]:
        ltv = 160 * (pi - c) / (k + 0.12)
        ratio = ltv / C
        verdict = "viable (≥3)" if ratio >= 3 else ("marginal (1–3)" if ratio >= 1 else "not viable (<1)")
        print(f"| {pi} | {c} | {k:.0%} | {C:,} | {ltv:,.0f} | {ratio:.1f} | {verdict} |")
    print("\n$7.02 = business-model base cost; $9.60 = full cost including site-borne facilitation, evidence and governance "
          "(capability_cost_model.py). **Viability needs either lower COCA (referrals, associations, finance partners) or lower "
          "full cost (5-minute setup, more learners per node), not cheaper AI.**\n")


if __name__ == "__main__":
    print("# NBC conditional projections, 2026–2029 (PROJECTIONS, not predictions)\n")
    p1_intelligence(); p2_hardware_maintenance(); p3_facilitation(); p4_evidence(); p5_adoption()
    print("**Discontinuities not modelled:** currency depreciation (costs in USD, revenue in local currency); grid shocks; "
          "a funder subsidising a competing product to zero; regulation banning camera-based evidence; a validity failure.")
