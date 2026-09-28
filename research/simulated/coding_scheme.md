# Coding scheme (study 02): fixed before any transcript was read

> **SIMULATION STUDY.** These rules govern how fictional interview answers are coded and counted. Written 2026-09-25, after the interviews were launched and before any transcript was opened, so the results cannot shape the rules.

## 1. Unit of coding

One **coding record** = persona ID + question ID + **exact quote** from that transcript + code + a one-sentence interpretation. Every count in the dashboard is computed by script from these records (`coded_responses.json`). Nothing is counted by hand.

## 2. Assumption codes (per persona, per assumption)

For each persona and each assumption, the synthesis agent assigns **one** summary code, supported by at least one coding record:

| Code | Meaning |
|---|---|
| **Supporting** | The fictional account of past behaviour or circumstances is consistent with the assumption, with no blocking condition |
| **Mixed/Conditional** | Consistent only under stated conditions, or for part of the assumption, or the account contains both supporting and challenging elements |
| **Challenging** | The fictional account contradicts the assumption, or describes circumstances in which it would fail |
| **Not Assessable** | The persona has no basis or authority to speak to it, or the interview did not produce relevant material |

When a code is in doubt between two options, choose the **less favourable** one and note it.

**Eligibility (fixed in advance):**
- **B1 (price):** eligible only for personas with purchasing authority (P01–P05). All others are *Not Assessable: outside buying authority*.
- **B2, B4, B8, B9:** eligible for any persona who gives relevant first-hand material. A persona without such material is coded Not Assessable.
- **B3 (churn), B5 (Show-Me Day conversion), B6 (sponsors), B7 (validity and transfer):** interview statements cannot test these (see `assumption_evidence_matrix.md`). Personas may still be coded, so their **context** is preserved, but the assumption's **status is Not assessable** whatever the codes show.

## 3. Declared aggregation rule (applied by script)

The column is headed **"Simulation-only stress-test status, not market validation"**. The rules below are checked in this order, and the first that applies sets the status:

1. **Not assessable**
   - The assumption is B3, B5, B6 or B7.
   - Or fewer than 3 personas are eligible.
2. **Invalidated within simulation**
   - At least 50% of eligible codes are **Challenging**.
3. **Validated within simulation**
   - At least 75% of eligible codes are **Supporting**, and **none** are Challenging.
4. **Partially validated within simulation**
   - Every case not covered above.

Percentages are shares of the **eligible** denominator: personas coded anything other than Not Assessable. Percentages are rounded to one decimal place (half-up), so each row may sum to 99.9–100.1%.

## 4. Willingness to pay (the defined offer only)

This is coded only against the approved offer (`interview_script.md`, C1).

| Category | Definition |
|---|---|
| **Accept** | Would pay the deposit on the offered terms as stated, now |
| **Negotiate** | Would pay only if stated conditions are met or the terms change (price, timing, proof, contract) |
| **Reject** | Would not pay on these or any stated terms |
| **Not assessable or outside buying authority** | Cannot purchase (P06–P10), or the answer does not address the offer |

The denominator is the number of qualified buyers (at most 5, P01–P05). This is **not a 10-buyer conversion test**. Conditions attached to Accept or Negotiate are recorded verbatim.

## 5. Objection categories (defined before reading)

| ID | Category |
|---|---|
| O1 | Price, affordability or cash flow |
| O2 | Parents won't pay, or fee collection |
| O3 | Equipment liability, loss, breakage or theft |
| O4 | Power or solar reliability |
| O5 | Teacher workload or time |
| O6 | Dependence on a specialist, or staff turnover |
| O7 | Competition with exams or the timetable |
| O8 | Provider trust or continuity (disappearing vendors, lock-in) |
| O9 | Credibility: needs to see it working or needs proof |
| O10 | Children's data, privacy or photos |
| O11 | Decision authority: needs someone else's approval |
| O12 | Curriculum alignment |
| O13 | Contract terms (deposit, notice, exit) |

Categories that emerge during coding are allowed. They are added as O14 onward, labelled "emergent", with a definition. **Each persona is counted at most once per category.** The denominator is 10.

## 6. Other required records

- **Unmet-need candidates:** quotes, plus competing interpretations.
- **Counterexamples:** quotes that go against the majority pattern for an assumption.
- **Artifact flags:** results that may come from persona construction, prompt wording or shared model tendencies (for example, every persona using the same phrase).
- **Recurring phrases:** these are reported as **model-generated language**, not market language.
