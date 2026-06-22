# Small Business Automation Guide

Automation can save time on repetitive work — or create brittle processes that frustrate customers and staff. This guide helps small businesses decide **what to automate**, **what to keep human**, and **how to roll out changes** using the tools and templates in this repository.

## Start with the process, not the tool

Before automating anything, map how work happens today:

1. Where do leads enter? (Website form, email, referral, event)
2. Who responds first, and how quickly?
3. What information is captured before a sales conversation?
4. Where do records live? (Spreadsheet, CRM, shared inbox)
5. What steps often fall through the cracks?

Use the [Business diagnostic checklist](../templates/business-diagnostic-checklist.md) to capture gaps in handoffs, response times, and ownership.

Automation should **strengthen a clear process** — not disguise the absence of one.

## Good candidates for automation

These tasks are usually safe and valuable to automate or semi-automate:

| Task | Automation level | Example in this repo |
| --- | --- | --- |
| **Lead scoring from structured fields** | Fully automated calculation; human interprets | [Lead Score Calculator](../tools/lead-score-calculator/) |
| **First-draft follow-up messages** | AI or template generates draft; human sends | [Follow-up Message Generator](../tools/follow-up-message-generator/), [lead follow-up template](../templates/lead-follow-up-template.md) |
| **Grouping customers by simple rules** | Automated tags; human defines strategy | [Customer Segmentation (Basic)](../tools/customer-segmentation-basic/) |
| **Reminder to follow up after N days** | Calendar or CRM reminder; human writes message | CRM task + template |
| **Intake question consistency** | Standard form; human reviews answers | [Customer intake form](../templates/customer-intake-form.md) |

The pattern: **automate calculation, formatting, and reminders — keep relationships human.**

## Poor candidates for automation

These usually need a person in the loop:

| Task | Why human judgment matters |
| --- | --- |
| **Pricing exceptions and negotiations** | Context, fairness, and margin trade-offs |
| **Handling complaints or distress** | Empathy and de-escalation |
| **Qualifying fit for complex services** | Nuance beyond checkbox fields |
| **Legal, medical, or financial advice** | Professional responsibility and liability |
| **Deciding to stop contacting someone** | Respect for consent and reputation |

If automation would make a reasonable customer feel ignored or tricked, redesign the step.

## A practical automation ladder

Roll out automation in stages:

### Stage 1 — Standardize (week 1–2)

- Adopt shared templates for intake, follow-up, and call scripts
- Agree on definitions: what is a "qualified lead," response-time target, owner per stage
- No new software required — copy files from `/templates`

### Stage 2 — Calculate (week 3–4)

- Run lead scoring and segmentation locally on exported JSON or CRM reports
- Use scores to **order** daily work, not to auto-delete leads
- Review whether rules match your actual best customers

### Stage 3 — Draft (ongoing)

- Generate follow-up drafts from tools or AI; always edit before sending
- Log what messaging works in your CRM notes

### Stage 4 — Integrate (optional)

- Connect exports, webhooks, or scripts in your own environment
- Keep integrations dependency-free and documented if you extend this repo
- Maintain [privacy-first](./privacy-first-ai.md) and [responsible AI](./responsible-ai-for-sales.md) practices

Skip stages that do not solve a problem you have measured.

## Measuring before and after

Pick one or two metrics before changing workflow:

- Median time to first response
- Percentage of leads with complete intake fields
- Follow-up tasks completed within SLA
- Conversion from qualified lead to next step

Change one variable at a time. If scores or templates do not improve outcomes within a few weeks, adjust the rules rather than adding more automation.

## Common failure modes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Leads still slip through | No single owner for each stage | Assign stage owners in diagnostic checklist |
| Scores feel wrong | Rules do not match your market | Edit scoring weights in tool source |
| Robotic customer emails | Drafts sent without editing | Enforce human review step |
| Team bypasses CRM | Tool is slower than inbox habits | Reduce fields; align tool with daily routine |
| Over-segmentation | Too many tiers, unclear actions | Merge segments; one action per segment |

## Tooling philosophy in this repository

Tools here are intentionally small:

- **No npm install** — clone and run with Node.js
- **No API keys** — works offline
- **Readable logic** — edit rules in plain JavaScript

That makes them easy to audit and fork, but they are not a full CRM. Use them alongside spreadsheets, email, or the CRM you already have.

## Workflow example

A simple weekly rhythm for a small sales team:

**Monday**

- Export new leads to JSON (or maintain a shared file)
- Run segmentation and scoring
- Prioritize hot and warm tiers for the week

**Daily**

- Work prioritized list first
- Use follow-up generator for drafts; personalize opening line
- Log outcomes in CRM

**Friday**

- Review nurture-tier leads — any timeline changes?
- Run diagnostic checklist monthly, not only when things break

Adjust cadence to your volume; the structure matters more than the exact schedule.

## Privacy and compliance reminders

Automation amplifies whatever data you feed it. Before scaling:

- Minimize fields in forms and exports
- Restrict file access on shared drives
- Document which systems store customer data
- See [Privacy-first AI](./privacy-first-ai.md) for a full checklist

## When to stop automating

Stop or pause if you observe:

- Increased unsubscribes or "stop contacting me" requests
- Reps spending more time fixing automation than selling
- Customers repeating information because handoffs failed
- Scores or segments that the team openly ignores

Automation should reduce friction, not create workarounds.

## Next steps

| Goal | Resource |
| --- | --- |
| Protect customer data | [Privacy-first AI](./privacy-first-ai.md) |
| Use AI ethically in sales | [Responsible AI for sales](./responsible-ai-for-sales.md) |
| Score leads transparently | [Lead Score Calculator](../tools/lead-score-calculator/) |
| Draft follow-ups | [Follow-up Message Generator](../tools/follow-up-message-generator/) |
| Improve process clarity | [Business diagnostic checklist](../templates/business-diagnostic-checklist.md) |

Start small, measure honestly, and keep people accountable for customer relationships — automation is there to support them, not replace them.
