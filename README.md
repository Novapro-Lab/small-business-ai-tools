# Small Business AI Tools

Practical, dependency-free tools and templates to help small businesses improve **lead management**, **sales follow-up**, **customer communication**, **customer segmentation**, and **operational clarity**.

Built and maintained by **[Novapro Lab](https://novaprolab.com)** — a software development organization focused on responsible AI, commercial systems, and operational automation.

---

## Overview

Most small businesses do not need complex enterprise software to run a better sales and customer workflow. They need **clear processes**, **repeatable templates**, and **simple tools** that turn everyday lead and customer data into useful decisions.

This repository provides:

- **Markdown templates** you can copy into your CRM, docs, or team handbook
- **Small JavaScript utilities** that run locally with Node.js — no installs, no API keys, no cloud dependency
- **Guides** on privacy-first automation and responsible AI in sales

Everything here is generic, readable, and safe to use in any industry. No proprietary logic, no private integrations, no vendor lock-in.

---

## Who this helps

| Audience | How this repository helps |
| --- | --- |
| **Small business owners** | Standardize follow-up, intake, and sales conversations without hiring a ops team first |
| **Sales and account teams** | Score leads consistently, segment customers, and draft follow-up messages faster |
| **Operations leads** | Run lightweight diagnostics on how leads and customers move through your process |
| **Developers and consultants** | Fork, extend, or embed these tools in client projects under the MIT license |

If you sell services, software, or high-consideration products and manage leads in spreadsheets, email, or a simple CRM, this repo is for you.

---

## What's included

### Tools (`/tools`)

| Tool | Purpose |
| --- | --- |
| [Lead Score Calculator](./tools/lead-score-calculator/) | Score a lead 0–100 from structured fields (budget, timeline, fit, engagement) |
| [Follow-Up Message Generator](./tools/follow-up-message-generator/) | Generate professional follow-up drafts by scenario (initial, reminder, post-call, no-response) |
| [Customer Segmentation (Basic)](./tools/customer-segmentation-basic/) | Group customers into segments using simple, transparent rules |
| [Business Readiness Check](./tools/business-readiness-check/) | Assess operational readiness for simple automation (0–100 score with actions) |
| [Follow-Up Schedule Planner](./tools/follow-up-schedule-planner/) | Build a dated follow-up schedule from lead status, urgency, and last contact |
| [Customer Data Quality Check](./tools/customer-data-quality-check/) | Verify whether a record has enough information for effective follow-up |
| [Customer Response Classifier](./tools/customer-response-classifier/) | Classify customer replies with transparent, rule-based categories |
| [Simple ROI Estimator](./tools/simple-roi-estimator/) | Estimate monthly and annual revenue lift from improved conversion |

Each tool has its own README with usage examples.

### Templates (`/templates`)

| Template | Purpose |
| --- | --- |
| [Lead follow-up template](./templates/lead-follow-up-template.md) | Email/message structure for consistent follow-up |
| [Customer intake form](./templates/customer-intake-form.md) | Questions to capture scope, budget, and timeline early |
| [Sales call script](./templates/sales-call-script.md) | Discovery call outline with ethical, non-pushy framing |
| [Business diagnostic checklist](./templates/business-diagnostic-checklist.md) | Review lead flow, handoffs, and response times |
| [Customer objection handling](./templates/customer-objection-handling.md) | Responses to common objections without pressure tactics |

### Documentation (`/docs`)

| Guide | Topic |
| --- | --- |
| [Privacy-first AI](./docs/privacy-first-ai.md) | Collect only what you need; keep data local when possible |
| [Small business automation guide](./docs/small-business-automation-guide.md) | Where automation helps — and where it hurts |
| [Responsible AI for sales](./docs/responsible-ai-for-sales.md) | Use AI to assist humans, not replace judgment or consent |

### Examples (`/examples`)

- [`example-lead.json`](./examples/example-lead.json) — sample input for the lead tools
- [`example-customers.json`](./examples/example-customers.json) — sample customer list for segmentation
- [`example-business-readiness.json`](./examples/example-business-readiness.json) — readiness assessment input
- [`example-follow-up-schedule.json`](./examples/example-follow-up-schedule.json) — schedule planner input
- [`example-customer-record.json`](./examples/example-customer-record.json) — data quality check input
- [`example-customer-response.json`](./examples/example-customer-response.json) — response classifier input
- [`example-roi.json`](./examples/example-roi.json) — ROI estimator input
- [`run-examples.js`](./examples/run-examples.js) — run all tools with fictional data

---

## v0.2.0 practical utilities

Release **v0.2.0** adds five dependency-free utilities for everyday small business operations:

- **Readiness and planning** — assess whether your process can support automation, then generate a follow-up schedule
- **Data quality** — confirm records are complete before outreach
- **Response handling** — classify inbound replies with auditable rules
- **Business case** — estimate revenue lift from better follow-up or conversion

All new tools export functions for programmatic use, include CLI demos, and ship with fictional examples and tests. No CRM, dashboard, authentication, database, or external API required.

---

## Quick start

**Requirements:** [Node.js](https://nodejs.org/) 18+ (for running tools locally)

```bash
git clone https://github.com/Novapro-Lab/small-business-ai-tools.git
cd small-business-ai-tools
```

**Score a lead:**

```bash
node tools/lead-score-calculator/index.js examples/example-lead.json
```

**Generate a follow-up message:**

```bash
node tools/follow-up-message-generator/index.js examples/example-lead.json reminder
```

**Segment a customer list:**

```bash
node tools/customer-segmentation-basic/index.js examples/example-customers.json
```

Copy any file from `/templates` into your workflow and adapt the placeholders (`[Company]`, `[Name]`, etc.).

### npm quick start

No `npm install` required — scripts invoke Node.js directly against local files.

```bash
git clone https://github.com/Novapro-Lab/small-business-ai-tools.git
cd small-business-ai-tools
npm run examples          # run all tools with fictional data
npm run example:lead-score
npm run example:business-readiness
npm test
```

### Available scripts

| Script | Description |
| --- | --- |
| `npm run example:lead-score` | Score a sample lead |
| `npm run example:follow-up` | Generate a reminder follow-up draft |
| `npm run example:segmentation` | Segment a sample customer list |
| `npm run example:business-readiness` | Run the readiness assessment |
| `npm run example:schedule` | Build a follow-up schedule |
| `npm run example:data-quality` | Check sample record completeness |
| `npm run example:response-classifier` | Classify a sample customer reply |
| `npm run example:roi` | Estimate revenue lift from improved conversion |
| `npm run examples` | Run all tools sequentially via `examples/run-examples.js` |
| `npm test` | Run dependency-free tests in `/tests` |

### Testing

Tests use Node.js built-in `assert` and the built-in test runner — no Jest, Mocha, or other dependencies.

```bash
npm test
```

Individual test files live in `/tests` and can be run directly:

```bash
node --test tests/business-readiness-check.test.js
```

---

## Privacy-first principles

This repository is designed to run **on your machine** with **your data**:

- Tools read local JSON files or stdin — nothing is sent to Novapro Lab or third parties
- No telemetry, analytics SDKs, or external API calls in the tool code
- Templates avoid collecting unnecessary personal data; adjust fields to your jurisdiction and policy

Read the full guide: [docs/privacy-first-ai.md](./docs/privacy-first-ai.md)

---

## Responsible AI note

AI can help draft messages, summarize calls, and highlight patterns in lead data. It should **not** auto-send communications, make binding promises, or score people using hidden biased criteria.

Use these tools and templates to **support** your team:

- Humans review every customer-facing message before sending
- Scoring rules are explicit and editable in source code
- Segmentation uses transparent thresholds you can audit

Read more: [docs/responsible-ai-for-sales.md](./docs/responsible-ai-for-sales.md)

---

## Contributing

We welcome improvements that stay generic, dependency-free, and useful to small businesses. See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before participating.

---

## Security

If you discover a security issue, please follow [SECURITY.md](./SECURITY.md). Do not open public issues for sensitive reports.

---

## License

MIT License — see [LICENSE](./LICENSE).

Copyright © 2026 Novapro Lab

---

## About Novapro Lab

Novapro Lab builds custom software platforms, SaaS products, AI agents, and automation systems for businesses that need production-ready operational tools — not experiments bolted onto spreadsheets.

- Website: [novaprolab.com](https://novaprolab.com)
- GitHub: [github.com/Novapro-Lab](https://github.com/Novapro-Lab)

This open-source project is offered as a public resource. It is not a substitute for legal, financial, or compliance advice.
