# Customer Data Quality Check

Check whether a lead or customer record has **enough useful information** for effective follow-up.

## What it does

Evaluates common CRM or spreadsheet fields and returns:

- `completenessScore` — 0 to 100
- `missingFields` — required labels not present
- `weakFields` — present but too vague to use
- `recommendedFixes` — specific improvements
- `readyForFollowUp` — `true` when score ≥ 65 and no missing fields

Useful fields: `name`, `email`, `phone`, `company`, `problemSummary`, `notes`, `lastContactDate`, `nextStep`.

Email or phone satisfies the contact requirement. `problemSummary` or `notes` satisfies the need summary.

## Usage

```bash
node index.js ../../examples/example-customer-record.json
```

## Programmatic use

```javascript
const { checkCustomerDataQuality } = require("./index.js");

const result = checkCustomerDataQuality({
  name: "Alex Rivera",
  email: "alex@example.test",
  company: "Rivera Logistics",
  problemSummary: "Manual order tracking causes delays.",
  lastContactDate: "2026-06-15",
  nextStep: "Send proposal outline",
});

console.log(result.readyForFollowUp);
```

## Customize

Edit `REQUIRED_FIELDS` and `FOLLOW_UP_THRESHOLD` in `index.js`.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
