"""
NBC go-to-market funnel: from first contact to renewed site, by channel.

Links the marketing plan to COCA in the business model. Every rate and cost is an
ASSUMPTION to be replaced with real funnel data from the first 90 days.

Standard-library Python only.  Usage: python3 go-to-market/funnel_model.py
"""

# stages: contacted -> attends Show-Me Day -> takes discounted pilot term -> pays term 2 -> renews year 2
CHANNELS = {
    # name: cost per contact ($), conversion rates at each stage (assumptions)
    "Association talk (proprietors' network)": dict(cost_per_contact=15, attend=0.30, pilot=0.40, pay=0.60, renew=0.75),
    "Referral from a paying school":           dict(cost_per_contact=10, attend=0.60, pilot=0.55, pay=0.70, renew=0.80),
    "Direct field visit":                      dict(cost_per_contact=40, attend=0.35, pilot=0.35, pay=0.55, renew=0.70),
    "After-school parent funnel (centres)":    dict(cost_per_contact=25, attend=0.40, pilot=0.50, pay=0.65, renew=0.75),
}
SHOW_ME_DAY_COST_PER_ATTENDEE = 60   # share of a Show-Me Day hosted at a paying site (assumption)
PILOT_SUBSIDY = 250                  # discounted first term (assumption; matches business-model base case)

YEAR1_TARGET_PAYING_SITES = {"Q1": 3, "Q2": 6, "Q3": 12, "Q4": 20}   # cumulative, targets not results
CHANNEL_MIX = {  # share of new paying sites by channel, by quarter (assumption)
    "Q1": {"Direct field visit": 0.7, "After-school parent funnel (centres)": 0.3},
    "Q2": {"Direct field visit": 0.4, "Association talk (proprietors' network)": 0.3, "After-school parent funnel (centres)": 0.3},
    "Q3": {"Association talk (proprietors' network)": 0.4, "Referral from a paying school": 0.3, "Direct field visit": 0.15, "After-school parent funnel (centres)": 0.15},
    "Q4": {"Referral from a paying school": 0.45, "Association talk (proprietors' network)": 0.35, "After-school parent funnel (centres)": 0.2},
}


def channel_economics(c):
    to_paid = c["attend"] * c["pilot"] * c["pay"]
    contacts_per_paid = 1 / to_paid
    cost = contacts_per_paid * c["cost_per_contact"]
    cost += contacts_per_paid * c["attend"] * SHOW_ME_DAY_COST_PER_ATTENDEE
    cost += (1 / c["pay"]) * PILOT_SUBSIDY  # subsidize every pilot, including those that don't convert
    return to_paid, contacts_per_paid, cost


def main():
    print("# NBC go-to-market funnel model (synthetic)\n")
    print("Stages: contacted → attends a Show-Me Day → takes a discounted pilot term → pays term 2 → renews year 2. "
          "All rates and costs are assumptions.\n")
    print("| Channel | Contact → paid | Contacts per paying site | **COCA per paying site** | Year-2 renewal |")
    print("|---|---|---|---|---|")
    econ = {}
    for name, c in CHANNELS.items():
        rate, contacts, cost = channel_economics(c)
        econ[name] = (contacts, cost)
        print(f"| {name} | {rate:.1%} | {contacts:.0f} | ${cost:,.0f} | {c['renew']:.0%} |")

    print("\n## Year-1 plan: new paying sites, contacts needed and acquisition spend\n")
    print("| Quarter | Cumulative paying sites (target) | New sites | Contacts needed | Acquisition spend | Blended COCA |")
    print("|---|---|---|---|---|---|")
    prev, total_spend, total_new = 0, 0.0, 0
    for q, cum in YEAR1_TARGET_PAYING_SITES.items():
        new = cum - prev
        contacts = sum(new * share * econ[ch][0] for ch, share in CHANNEL_MIX[q].items())
        spend = sum(new * share * econ[ch][1] for ch, share in CHANNEL_MIX[q].items())
        total_spend += spend; total_new += new
        print(f"| {q} | {cum} | {new} | {contacts:,.0f} | ${spend:,.0f} | ${spend / new:,.0f} |")
        prev = cum
    print(f"\n**Year 1:** {total_new} paying sites, acquisition spend ≈ ${total_spend:,.0f}, "
          f"blended COCA ≈ ${total_spend / total_new:,.0f}.\n")
    print("Reading: COCA falls as the mix shifts from direct visits to association talks and referrals. "
          "Referrals only exist once early sites renew, so Q1–Q2 are deliberately expensive. "
          "Compare with the business model's base-case COCA of ~$1,393 and LTV of ~$2,490 (private school) "
          "or ~$4,211 (school + evening cohort).")


if __name__ == "__main__":
    main()
