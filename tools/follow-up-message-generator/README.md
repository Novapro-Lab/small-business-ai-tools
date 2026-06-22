# Follow-Up Message Generator

Generate **professional, editable follow-up drafts** from a lead JSON file and a scenario type. Useful when you want consistency without copying the same email from memory.

## Scenarios

| Scenario | When to use |
| --- | --- |
| `initial` | First reply after an inbound inquiry |
| `reminder` | Gentle follow-up after no response |
| `post-call` | Summary and next steps after a discovery call |
| `no-response` | Polite close-the-loop message |

## Usage

```bash
node index.js ../../examples/example-lead.json initial
node index.js ../../examples/example-lead.json reminder
node index.js ../../examples/example-lead.json post-call
node index.js ../../examples/example-lead.json no-response
```

## Input fields

The generator uses these lead fields when present:

- `name` — first name in greeting
- `company` — company reference
- `problemSummary` — woven into the message body

All other context (call notes, next steps) uses `[placeholders]` you fill in before sending.

## Responsible use

- **Always review and edit** before sending
- Do not use for bulk unsolicited outreach
- Comply with CAN-SPAM, GDPR, and local marketing rules

## Privacy

Runs locally. No API calls.

## License

MIT — see repository [LICENSE](../../LICENSE).
