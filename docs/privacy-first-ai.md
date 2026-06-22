# Privacy-First AI

Small businesses often handle names, contact details, budgets, and conversation notes about real people. Any tool — AI-assisted or not — should respect that data. This guide outlines practical principles for using the resources in this repository and for adding AI to your sales workflow without unnecessary exposure.

## Core idea

**Collect only what you need. Process it where you control it. Delete what you no longer need.**

The tools in this repository are built around that idea: they run locally, read files you provide, and do not send data to Novapro Lab or third-party services.

## What "privacy-first" means here

| Principle | In practice |
| --- | --- |
| **Data minimization** | Ask for fields that change a decision — not everything you might someday use |
| **Local processing** | Run scoring and segmentation on your machine with Node.js; no cloud upload required |
| **Transparency** | Scoring rules and segment thresholds are visible in source code, not hidden in a model |
| **Purpose limitation** | Use lead data for qualifying and serving customers — not unrelated profiling |
| **Human review** | Draft messages with assistance, then review before sending |

## Before you collect data

When adapting templates or building intake forms, ask:

1. **Do we need this field to serve the customer or qualify the lead?** If not, omit it.
2. **Who can access this data?** Restrict spreadsheets, CRM exports, and shared drives.
3. **How long do we keep it?** Set a retention period and delete stale records.
4. **What does our jurisdiction require?** Privacy laws vary by region; adjust consent and notices accordingly.

This repository does not provide legal advice. Work with qualified counsel for compliance in your market.

## Using the tools safely

### Local files

Tools accept JSON files or stdin on your computer. Nothing in the default tool code transmits that content over the network.

```bash
node tools/lead-score-calculator/index.js examples/example-lead.json
```

Keep lead files on encrypted drives where appropriate, and avoid committing real customer data to version control.

### Example and test data

Use sanitized examples — like those in `/examples` — for demos and development. Replace placeholders with fictional names and generic company details.

### Shared environments

If you run these tools on a shared server or CI system, treat input files as sensitive. Clean up artifacts after jobs complete and restrict who can read job logs.

## Adding AI to your workflow

Many teams use external AI services to draft emails, summarize calls, or suggest next steps. If you do:

| Do | Avoid |
| --- | --- |
| Redact or omit unnecessary personal identifiers before sending text to a model | Pasting full CRM exports into public chat tools without review |
| Use vendors with clear data processing terms | Assuming "free tier" means your data is not stored or trained on |
| Document which systems receive customer data | Routing every message through AI by default |
| Keep a human reviewer for outbound communication | Auto-sending AI output without reading it |

Prefer providers that offer data retention controls, business terms, and options to disable training on your inputs.

## Templates and forms

Templates in this repository use bracket placeholders — `[Name]`, `[Company]`, and similar — so you can adapt them without embedding real data in the repo.

When deploying templates:

- Collect email and phone only when you have a clear follow-up reason.
- Avoid sensitive categories (health, financial hardship, government IDs) unless legally required for your service.
- Tell people why you are asking and how to request deletion or correction.

## Segmentation and scoring

Rule-based lead scoring and customer segmentation can still affect people — for example, by prioritizing some leads over others. Mitigate fairness and privacy risks by:

- Keeping rules simple enough for your team to explain to a colleague or customer.
- Reviewing whether criteria correlate with protected characteristics you should not use.
- Updating rules when your product, market, or policy changes.
- Not treating scores as permanent labels; reassess as new information arrives.

## Incident readiness

Prepare before something goes wrong:

- Know where customer data lives (CRM, email, spreadsheets, backups).
- Have a contact path for privacy questions or deletion requests.
- If data is exposed, contain access, assess impact, and follow applicable breach notification rules.

## Checklist

Use this quick checklist when rolling out tools or AI-assisted workflows:

- [ ] We only collect fields we actively use
- [ ] Access to lead and customer data is limited to people who need it
- [ ] Tools run locally or in environments we control
- [ ] AI vendors and data flows are documented
- [ ] Outbound messages are reviewed by a human before sending
- [ ] Retention and deletion practices are defined
- [ ] Example and test data contain no real personal information

## Related reading

- [Responsible AI for sales](./responsible-ai-for-sales.md) — human oversight and ethical use in sales contexts
- [Small business automation guide](./small-business-automation-guide.md) — where automation helps without over-collecting data

This guide is educational. Adapt it to your organization's size, industry, and legal obligations.
