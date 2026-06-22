# Simple ROI Estimator

Estimate the potential **monthly and annual revenue impact** of improved follow-up or conversion — for planning conversations, not financial reporting.

## What it does

Given lead volume, conversion rates, and average sale value, returns:

- `currentRevenue` — monthly revenue at today's conversion rate
- `projectedRevenue` — monthly revenue at the improved rate
- `estimatedMonthlyLift` — difference per month
- `estimatedAnnualLift` — monthly lift × 12
- `assumptions` — plain-language notes about the estimate

## Input fields

| Field | Description |
| --- | --- |
| `monthlyLeads` | Number of leads per month |
| `currentConversionRate` | Decimal (`0.12`) or percent (`12`) |
| `improvedConversionRate` | Decimal (`0.18`) or percent (`18`) |
| `averageSaleValue` | Average revenue per closed deal |

## Usage

```bash
node index.js ../../examples/example-roi.json
```

## Programmatic use

```javascript
const { estimateRoi } = require("./index.js");

const result = estimateRoi({
  monthlyLeads: 40,
  currentConversionRate: 0.12,
  improvedConversionRate: 0.18,
  averageSaleValue: 2500,
});

console.log(result.estimatedAnnualLift);
```

## Important

This is an educational planning tool. It does not account for costs, seasonality, or market changes. Validate assumptions with your own data.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
