# Customer Segmentation (Basic)

Group customers into **transparent segments** using simple rules — monthly value, recency, support activity, and lifecycle stage.

No machine learning. No external APIs. Edit thresholds in `index.js` to match your business.

## Segments

**Value tier** (from `monthlyValue`):

| Tier | Threshold |
| --- | --- |
| `high-value` | $5,000+ / month |
| `mid-value` | $1,000 – $4,999 |
| `entry-value` | below $1,000 |

**Engagement band** (from `lastPurchaseDaysAgo`):

| Band | Condition |
| --- | --- |
| `active-recent` | purchase within 30 days |
| `active-steady` | 31–90 days |
| `at-risk` | 91–180 days |
| `dormant` | 180+ days |

**Flags:**

- `needs-attention` — 3+ support tickets in 90 days

Each customer also gets a **recommended action** string for your team to review.

## Usage

```bash
node index.js ../../examples/example-customers.json
```

## Input format

JSON array. Example:

```json
[
  {
    "id": "cust-001",
    "name": "Greenfield Dental",
    "industry": "healthcare",
    "monthlyValue": 1200,
    "lastPurchaseDaysAgo": 14,
    "supportTicketsLast90Days": 1,
    "lifecycleStage": "active"
  }
]
```

## Customize

Adjust `VALUE_TIERS`, `AT_RISK_DAYS`, and `DORMANT_DAYS` at the top of `index.js`.

## Privacy

Runs locally on your customer export. Do not commit real customer data to public repos.

## License

MIT — see repository [LICENSE](../../LICENSE).
