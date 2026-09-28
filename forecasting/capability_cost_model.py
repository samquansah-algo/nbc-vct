"""Cost per credibly demonstrated transferable capability (CDTC) — a MODEL, not a measurement.

DEFINITION (fixed before calculation)
A *credibly demonstrated transferable capability* is recorded when a learner, with AI assistance
removed, performs a pre-specified capability on an anchor task set in a context they have not
practised in (an unfamiliar "world" or real task), at least 2 weeks after instruction, and the
performance is scored blind by someone other than their facilitator against a published rubric.

Two ratios are reported and must never be merged:
  gross CDTC cost       = total annual cost / (learners × capabilities targeted × demonstration rate)
                          -> the cost of OBSERVING a credible demonstration (inferred capability)
  incremental CDTC cost = total annual cost / (learners × capabilities × (rate − counterfactual rate))
                          -> the cost of CAUSING one (requires causal evidence; rates are assumptions)

All inputs are ASSUMPTIONS unless marked [MODEL] (from business-model/unit_economics.py base case).
USD per site per year. Stdlib only. Run: python3 foresight/capability_cost_model.py
"""

SETTINGS = {
    # learners/yr, capabilities targeted per learner/yr, and cost lines (low, base, high)
    "Private school node (upper primary)": dict(
        learners=(120, 160, 200), caps=(3, 5, 5),
        compute=(110, 193, 345),            # [MODEL] hardware amortised + replacement
        materials=(150, 340, 390),          # [MODEL] printed tokens + consumables
        facilitation=(45, 100, 360),        # added teacher time: 4 classes × 36 sessions × 0.5–1 h × $0.6–1.4/h (Ghana pay, ~GHS 1,500–3,500/mo);
                                            # high = a higher-wage market. Corrected 2026-09-25 (was $2.5–5/h, which overstated Ghana wages)
        development=(250, 350, 450),        # [MODEL] teacher development
        maintenance=(75, 120, 210),         # [MODEL] field support visits
        distribution=(142, 173, 560),       # COCA $710/$866/$2,800 amortised over 5 yrs [MODEL range]
        evidence=(80, 150, 600),            # anchor tasks + blind scoring of a 20% sample; high = external audit [ASSUMPTION]
        governance=(30, 60, 200),           # consent, DPIA upkeep, deletion checks [ASSUMPTION]
        integration=(20, 50, 200),          # curriculum mapping, reporting to school [ASSUMPTION]
    ),
    "After-school centre (mixed ages)": dict(
        learners=(40, 60, 90), caps=(3, 5, 5),
        compute=(110, 193, 345), materials=(90, 190, 250), facilitation=(300, 600, 1000),
        development=(150, 250, 400), maintenance=(75, 120, 210), distribution=(142, 173, 560),
        evidence=(40, 80, 400), governance=(30, 60, 200), integration=(0, 20, 80),
    ),
    "TVET / apprenticeship RPL cohort (young adults)": dict(
        learners=(20, 40, 80), caps=(2, 4, 6),
        compute=(110, 193, 345), materials=(150, 300, 600), facilitation=(400, 800, 1600),
        development=(150, 300, 500), maintenance=(75, 120, 210), distribution=(200, 400, 1000),
        evidence=(200, 400, 1200),          # assessor time for RPL-grade evidence is heavier [ASSUMPTION]
        governance=(30, 60, 200), integration=(100, 250, 600),  # CTVET alignment [ASSUMPTION]
    ),
}
RATES = {  # demonstration rate p and counterfactual p0 — pure ASSUMPTIONS until the transfer study reports
    "pessimistic": (0.15, 0.12), "base": (0.30, 0.18), "optimistic": (0.50, 0.20),
}
LINES = ["compute", "materials", "facilitation", "development", "maintenance", "distribution", "evidence", "governance", "integration"]


def run():
    print("# Cost per credibly demonstrated transferable capability (MODEL)\n")
    print("Definition, rates and inputs: see the docstring of `capability_cost_model.py`. All USD per site per year.\n")
    for name, s in SETTINGS.items():
        print(f"## {name}\n")
        print("| Cost line | Low | Base | High |")
        print("|---|---|---|---|")
        tot = [0, 0, 0]
        for line in LINES:
            v = s[line]
            tot = [tot[i] + v[i] for i in range(3)]
            print(f"| {line} | {v[0]:,} | {v[1]:,} | {v[2]:,} |")
        print(f"| **Total** | **{tot[0]:,}** | **{tot[1]:,}** | **{tot[2]:,}** |\n")
        share_ev = s["evidence"][1] / tot[1]
        share_fac = s["facilitation"][1] / tot[1]
        print(f"Base shares: facilitation {share_fac:.0%}, evidence {share_ev:.0%}, compute {s['compute'][1] / tot[1]:.0%}.\n")
        print("| Case | Cost per learner-year | Gross cost per CDTC (observed) | Incremental cost per CDTC (causal) |")
        print("|---|---|---|---|")
        cases = [("best case (low cost, most learners, optimistic rates)", 0, 2, "optimistic"),
                 ("base", 1, 1, "base"),
                 ("worst case (high cost, fewest learners, pessimistic rates)", 2, 0, "pessimistic")]
        for label, ci, li, rate in cases:
            cost = tot[ci]
            learners = s["learners"][li]
            caps = s["caps"][1]
            p, p0 = RATES[rate]
            gross = cost / (learners * caps * p)
            inc = cost / (learners * caps * (p - p0))
            print(f"| {label} | ${cost / learners:,.2f} | ${gross:,.2f} | ${inc:,.2f} |")
        print()
    print("**Reading:** compute is a small share of cost in every setting; facilitation, distribution and "
          "evidence dominate. The incremental (causal) figure is highly sensitive to the gap between "
          "demonstration and counterfactual rates, which no study has yet measured for NBC.")


if __name__ == "__main__":
    run()
