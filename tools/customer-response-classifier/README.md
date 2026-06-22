# Customer Response Classifier

Classify simple customer replies using **transparent, rule-based logic** — no machine learning, no external APIs.

## Categories

| Category | Typical signals |
| --- | --- |
| `interested` | Wants to schedule, move forward, or proceed |
| `needs_more_info` | Asks for details, pricing, or documentation |
| `price_objection` | Budget or cost concerns |
| `not_ready` | Timing not right; asks to revisit later |
| `no_response` | Empty or missing text |
| `negative` | Declines further contact |
| `unknown` | No clear rule match |

## What it returns

- `category` — best-matching classification
- `confidence` — `high`, `medium`, or `low`
- `suggestedNextAction` — recommended sales response
- `matchedSignals` — keywords or phrases that triggered the match

## Usage

```bash
node index.js ../../examples/example-customer-response.json
```

## Programmatic use

```javascript
const { classifyCustomerResponse } = require("./index.js");

const result = classifyCustomerResponse({
  responseText: "Can you send pricing details for the standard plan?",
  channel: "email",
});

console.log(result.category, result.suggestedNextAction);
```

## Customize

Edit the `RULES` array in `index.js` to add industry-specific phrases. Keep rules documented so your team can audit them.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
