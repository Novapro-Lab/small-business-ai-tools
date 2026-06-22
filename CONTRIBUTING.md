# Contributing

Thank you for your interest in **small-business-ai-tools**. This project is maintained by [Novapro Lab](https://novaprolab.com) and released under the [MIT License](./LICENSE). Contributions that help small businesses run clearer sales and customer workflows are welcome.

## Before you start

1. Read the [README](./README.md) to understand the repository layout.
2. Read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
3. Check existing [issues](https://github.com/Novapro-Lab/small-business-ai-tools/issues) and [pull requests](https://github.com/Novapro-Lab/small-business-ai-tools/pulls) to avoid duplicate work.

## What we accept

We welcome contributions that fit the project's goals:

| Area | Examples |
| --- | --- |
| **Tools** | Bug fixes, clearer output, better error messages, small feature additions that stay dependency-free |
| **Templates** | Generic sales, intake, or follow-up templates usable across industries |
| **Documentation** | Clearer guides, corrected examples, improved onboarding |
| **Examples** | Sanitized sample JSON that demonstrates tool usage without real customer data |

## What we generally do not accept

To keep this repository useful and safe for public use, we usually decline contributions that:

- Add npm dependencies, external API calls, or cloud-only workflows
- Include proprietary logic, client-specific content, or industry-locked assumptions
- Collect or transmit user data, telemetry, or analytics
- Embed real customer names, emails, or other personal information
- Expand scope into full CRM, marketing automation, or enterprise platform territory

When in doubt, open an issue describing your idea before investing in a large change.

## Design principles

Contributions should align with these principles:

- **Dependency-free tools** — JavaScript utilities should run with Node.js 18+ and the standard library only.
- **Local-first** — Tools read local files or stdin; nothing should phone home.
- **Transparent logic** — Scoring, segmentation, and rules should be readable and editable in source.
- **Generic by default** — Placeholders and examples should work for any small business, not a single vertical.
- **Human in the loop** — Templates and tools assist people; they do not auto-send messages or make binding commitments.

## How to contribute

### Reporting bugs

Open a [GitHub issue](https://github.com/Novapro-Lab/small-business-ai-tools/issues) with:

- A clear title and description
- Steps to reproduce (command, input file, expected vs. actual output)
- Your Node.js version (`node --version`)

Do **not** attach files containing real customer or employee data. Use sanitized examples or describe the structure instead.

### Suggesting improvements

Open an issue labeled as a feature request or documentation improvement. Explain the problem, who it helps, and why it fits the project scope.

### Submitting pull requests

1. Fork the repository and create a branch from `main`.
2. Make focused changes — one logical improvement per pull request when possible.
3. Test tools locally before submitting:

   ```bash
   node tools/lead-score-calculator/index.js examples/example-lead.json
   node tools/follow-up-message-generator/index.js examples/example-lead.json reminder
   node tools/customer-segmentation-basic/index.js examples/example-customers.json
   ```

4. Update relevant README files in the directories you changed.
5. Open a pull request with:
   - A concise summary of what changed and why
   - Links to related issues, if any
   - Confirmation that you did not include real personal or customer data

### Commit messages

Write clear commit messages in the imperative mood, for example:

- `Fix timeline scoring when value is unknown`
- `Add post-meeting follow-up scenario to message generator`
- `Clarify data minimization section in privacy guide`

## Code and content style

- **JavaScript** — Use plain Node.js without frameworks. Match existing formatting and naming in each tool directory.
- **Markdown** — Use clear headings, short paragraphs, and tables where they aid scanning. Avoid jargon without explanation.
- **Templates** — Use bracket placeholders such as `[Company]` and `[Name]`. Keep tone professional and non-aggressive.

## Review process

Maintainers review pull requests for correctness, scope, privacy impact, and alignment with project principles. We may request changes or suggest splitting large contributions into smaller pull requests.

Not every contribution will be merged, but we aim to respond thoughtfully and promptly.

## Questions

For questions about contributing, open a GitHub issue or reach out through [novaprolab.com](https://novaprolab.com).

By participating, you agree that your contributions will be licensed under the same [MIT License](./LICENSE) as the project.
