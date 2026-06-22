# Follow-Up Schedule Planner

Create a **simple follow-up schedule** based on lead status, urgency, and last contact date. Outputs dated action items — not automated sends.

## What it does

Returns a list of schedule items, each with:

- `dayOffset` — days after last contact
- `date` — suggested calendar date
- `action` — what to do
- `messageType` — aligns with the Follow-Up Message Generator scenarios
- `notes` — context and review reminders

| Input | Values |
| --- | --- |
| `leadStatus` | `new`, `contacted`, `qualified`, `proposal`, `negotiating`, `nurture` |
| `urgency` | `high`, `medium`, `low` (high compresses timing) |
| `lastContactDate` | ISO date (`YYYY-MM-DD`) |

## Usage

```bash
node index.js ../../examples/example-follow-up-schedule.json
```

## Programmatic use

```javascript
const { planFollowUpSchedule } = require("./index.js");

const result = planFollowUpSchedule({
  leadName: "Alex Rivera",
  leadStatus: "qualified",
  urgency: "high",
  lastContactDate: "2026-06-15",
});

console.log(result.schedule);
```

## Customize

Edit `STATUS_PLANS` and `URGENCY_MULTIPLIERS` in `index.js` to match your sales cadence.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
