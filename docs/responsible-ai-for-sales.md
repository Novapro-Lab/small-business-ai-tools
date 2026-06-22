# Responsible AI for Sales

AI can help sales teams move faster — drafting follow-ups, summarizing discovery calls, or highlighting patterns in lead data. Used carelessly, it can erode trust, create compliance risk, or prioritize the wrong opportunities. This guide describes how to use AI **as an assistant**, not a replacement for judgment, consent, or accountability.

## Guiding principle

**AI supports the conversation. People own the outcome.**

Every customer-facing message, commitment, and prioritization decision should remain under human control.

## Appropriate uses

These are strong fits for AI assistance in a small business sales context:

| Use case | Why it helps | Safeguard |
| --- | --- | --- |
| **Drafting follow-up emails** | Saves time on routine structure and phrasing | Human edits and approves before send |
| **Summarizing call notes** | Captures action items and open questions | Review for accuracy and sensitive details |
| **Suggesting next steps** | Surfaces reminders based on timeline or stage | Rep confirms fit with the relationship |
| **Explaining score breakdowns** | Makes rule-based prioritization easier to discuss internally | Do not share raw scores externally without context |
| **Brainstorming objection responses** | Offers starting points for common concerns | Avoid pressure tactics; stay truthful |

The tools in this repository align with these uses: they generate **drafts** and **transparent scores**, not autonomous decisions.

## Uses to avoid

| Avoid | Reason |
| --- | --- |
| Auto-sending messages without review | Errors, tone mismatches, and incorrect promises reach customers |
| Making binding offers or legal commitments via AI | Only authorized people should commit on behalf of the business |
| Hidden scoring with undisclosed criteria | People cannot contest or understand decisions they cannot see |
| Scraping or enriching contacts without a lawful basis | Violates privacy expectations and may breach regulations |
| Impersonating a specific person without disclosure | Deceives customers about who they are talking to |
| Using AI to manipulate urgency or vulnerability | Damages long-term trust and brand reputation |

## Human-in-the-loop workflow

A practical workflow for AI-assisted sales:

```
Lead data → Tool or AI draft → Human review → CRM update → Send / call
                ↑                    |
                └──── corrections ───┘
```

**Review checklist before sending any AI-assisted message:**

- [ ] Facts are correct (dates, pricing, product capabilities, names)
- [ ] Tone matches the relationship and your brand
- [ ] No confidential information about other customers is included
- [ ] The ask is clear and proportionate — not coercive
- [ ] Opt-out or pause options are honored where applicable

## Transparency with customers

You do not always need to disclose that AI helped draft an email. You **should** be honest when:

- A customer asks how their data is used or who they are speaking with
- Automated systems make decisions that materially affect them (pricing, eligibility, access)
- Regulations in your region require disclosure of automated processing

When in doubt, prefer clarity: "I used our internal notes to draft this — let me know if anything needs correcting."

## Fairness and lead scoring

Rule-based scoring — like the [Lead Score Calculator](../tools/lead-score-calculator/) — is easier to audit than opaque machine learning, but rules can still skew outcomes if they proxy for income, geography, or other sensitive factors.

**Good practice:**

- Tie points to business-relevant signals: budget fit, timeline, product need, engagement
- Document why each factor matters
- Revisit rules quarterly or when your ideal customer profile changes
- Train reps to treat scores as **prioritization hints**, not judgments of worth

**Avoid:**

- Penalizing leads based on names, accents, or inferred demographics
- Treating low scores as permission to ignore people
- Sharing scores with customers in ways that feel like rejection without explanation

## Segmentation ethics

Customer segmentation helps you tailor service levels, onboarding, or outreach. Keep segments:

- **Explainable** — "High lifetime value" should map to measurable behavior, not gut feel alone
- **Actionable** — Each segment has a defined treatment, not just a label
- **Revisable** — Customers move; segments should update with new data

See [Customer Segmentation (Basic)](../tools/customer-segmentation-basic/) for transparent, rule-based grouping you can edit.

## Working with templates

Templates in `/templates` are written for ethical, non-pushy sales conversations. When using AI to fill them in:

- Do not amplify aggressive or misleading language the model suggests
- Keep discovery questions open-ended rather than leading
- Respect "not now" and "not interested" without automated nag sequences

## Team policies

Document expectations so everyone applies AI consistently:

1. **Approved tools** — Which AI products may process customer data
2. **Review requirements** — Which outputs always need a manager or peer review
3. **Data boundaries** — What must never be pasted into external models
4. **Escalation** — How to report a harmful or biased AI output

## Measuring success responsibly

Track outcomes that reflect customer value, not only activity volume:

- Response quality and resolution rate
- Time to first meaningful reply
- Conversion with consent and clear expectations
- Complaints, unsubscribes, and refund requests

Optimizing only for "messages sent" or "calls booked" can incentivize behavior customers regret.

## When things go wrong

If an incorrect AI-assisted message goes out:

1. Acknowledge the mistake promptly and accurately
2. Correct factual errors — do not blame the tool to the customer
3. Update internal prompts, templates, or review steps to prevent recurrence
4. Retain records as needed for compliance or quality review

## Summary

| Principle | Action |
| --- | --- |
| Assist, don't automate outreach | Review every customer-facing draft |
| Stay transparent internally | Scoring and segmentation rules are readable and editable |
| Respect privacy | Follow [privacy-first AI](./privacy-first-ai.md) practices |
| Automate with intent | See [small business automation guide](./small-business-automation-guide.md) for scope |

This document is guidance, not legal advice. Combine it with your policies, training, and applicable regulations.
