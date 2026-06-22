# Business Readiness Check

Evaluate whether a small business is operationally ready for **simple automation** — before adding tools, templates, or AI-assisted workflows.

## What it does

Scores eight operational areas from **0 to 100** and returns:

- **Level** — `basic`, `improving`, `ready`, or `advanced`
- **Strengths** — what is already working
- **Risks** — gaps that could block automation
- **Recommended actions** — practical next steps

| Field | Values |
| --- | --- |
| `leadTracking` | `none`, `spreadsheet`, `crm-basic`, `crm-structured` |
| `followUpProcess` | `ad-hoc`, `occasional`, `documented`, `automated-reminders` |
| `customerDataQuality` | `poor`, `fair`, `good`, `excellent` |
| `documentedProcesses` | `none`, `partial`, `mostly`, `complete` |
| `responseTimeHours` | median hours to first response (number) |
| `privacyAwareness` | `low`, `medium`, `high` |
| `automationReadiness` | `low`, `medium`, `high` |
| `reportingClarity` | `unclear`, `basic`, `clear`, `advanced` |

## Usage

```bash
node index.js ../../examples/example-business-readiness.json
```

## Programmatic use

```javascript
const { evaluateBusinessReadiness } = require("./index.js");

const result = evaluateBusinessReadiness({
  leadTracking: "spreadsheet",
  followUpProcess: "documented",
  customerDataQuality: "good",
  documentedProcesses: "mostly",
  responseTimeHours: 8,
  privacyAwareness: "medium",
  automationReadiness: "medium",
  reportingClarity: "clear",
});

console.log(result.level, result.score);
```

## Customize

Edit score maps at the top of `index.js` to reflect how your team defines readiness.

## Privacy

Runs locally. No data leaves your machine.

## License

MIT — see repository [LICENSE](../../LICENSE).
