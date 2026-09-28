# Cost per credibly demonstrated transferable capability (MODEL)

Definition, rates and inputs: see the docstring of `capability_cost_model.py`. All USD per site per year.

## Private school node (upper primary)

| Cost line | Low | Base | High |
|---|---|---|---|
| compute | 110 | 193 | 345 |
| materials | 150 | 340 | 390 |
| facilitation | 45 | 100 | 360 |
| development | 250 | 350 | 450 |
| maintenance | 75 | 120 | 210 |
| distribution | 142 | 173 | 560 |
| evidence | 80 | 150 | 600 |
| governance | 30 | 60 | 200 |
| integration | 20 | 50 | 200 |
| **Total** | **902** | **1,536** | **3,315** |

Base shares: facilitation 7%, evidence 10%, compute 13%.

| Case | Cost per learner-year | Gross cost per CDTC (observed) | Incremental cost per CDTC (causal) |
|---|---|---|---|
| best case (low cost, most learners, optimistic rates) | $4.51 | $1.80 | $3.01 |
| base | $9.60 | $6.40 | $16.00 |
| worst case (high cost, fewest learners, pessimistic rates) | $27.62 | $36.83 | $184.17 |

## After-school centre (mixed ages)

| Cost line | Low | Base | High |
|---|---|---|---|
| compute | 110 | 193 | 345 |
| materials | 90 | 190 | 250 |
| facilitation | 300 | 600 | 1,000 |
| development | 150 | 250 | 400 |
| maintenance | 75 | 120 | 210 |
| distribution | 142 | 173 | 560 |
| evidence | 40 | 80 | 400 |
| governance | 30 | 60 | 200 |
| integration | 0 | 20 | 80 |
| **Total** | **937** | **1,686** | **3,445** |

Base shares: facilitation 36%, evidence 5%, compute 11%.

| Case | Cost per learner-year | Gross cost per CDTC (observed) | Incremental cost per CDTC (causal) |
|---|---|---|---|
| best case (low cost, most learners, optimistic rates) | $10.41 | $4.16 | $6.94 |
| base | $28.10 | $18.73 | $46.83 |
| worst case (high cost, fewest learners, pessimistic rates) | $86.12 | $114.83 | $574.17 |

## TVET / apprenticeship RPL cohort (young adults)

| Cost line | Low | Base | High |
|---|---|---|---|
| compute | 110 | 193 | 345 |
| materials | 150 | 300 | 600 |
| facilitation | 400 | 800 | 1,600 |
| development | 150 | 300 | 500 |
| maintenance | 75 | 120 | 210 |
| distribution | 200 | 400 | 1,000 |
| evidence | 200 | 400 | 1,200 |
| governance | 30 | 60 | 200 |
| integration | 100 | 250 | 600 |
| **Total** | **1,415** | **2,823** | **6,255** |

Base shares: facilitation 28%, evidence 14%, compute 7%.

| Case | Cost per learner-year | Gross cost per CDTC (observed) | Incremental cost per CDTC (causal) |
|---|---|---|---|
| best case (low cost, most learners, optimistic rates) | $17.69 | $8.84 | $14.74 |
| base | $70.58 | $58.81 | $147.03 |
| worst case (high cost, fewest learners, pessimistic rates) | $312.75 | $521.25 | $2,606.25 |

**Reading:** compute is a small share of cost in every setting; facilitation, distribution and evidence dominate. The incremental (causal) figure is highly sensitive to the gap between demonstration and counterfactual rates, which no study has yet measured for NBC.
