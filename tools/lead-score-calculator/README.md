# Lead Score Calculator

Score inbound leads from **0 to 100** using simple, transparent rules. No machine learning black box — every point comes from fields you control.

## What it does

Evaluates a lead JSON object on:

| Field | Max points | Values |
| --- | --- | --- |
| `budgetRange` | 20 | `low`, `mid`, `high`, `enterprise`, `unknown` |
| `timeline` | 20 | `immediate`, `1-3-months`, `3-6-months`, `6-plus-months`, `exploring`, `unknown` |
| `productFit` | 25 | `strong`, `moderate`, `weak`, `unknown` |
| `decisionMaker` | 15 | `true` / `false` |
| `engagementLevel` | 20 | `high`, `medium`, `low`, `unknown` |

**Tiers:**

- **Hot** — 75+
- **Warm** — 50–74
- **Nurture** — 30–49
- **Low priority** — below 30

## Usage

```bash
node index.js ../../examples/example-lead.json
```

Or pipe JSON:

```bash
cat ../../examples/example-lead.json | node index.js
```

## Example output

```
Lead Score Report
=================
Name:    Alex Rivera
Company: Rivera Logistics
Score:   78 / 100
Tier:    Hot
```

## Customize

Edit the `WEIGHTS` and score maps at the top of `index.js` to match your sales process. Keep rules documented so your team understands why a lead ranked high or low.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
