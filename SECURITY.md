# Security Policy

Novapro Lab takes the security of **small-business-ai-tools** seriously. This document explains how to report vulnerabilities and what you can expect in response.

## Supported versions

Security fixes are applied to the latest release on the default branch (`main`). Older tags or forks may not receive patches.

| Version | Supported |
| --- | --- |
| Latest on `main` | Yes |
| Older tags / forks | Best effort only |

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Instead, report them privately so we can investigate and coordinate a fix before public disclosure.

### How to report

1. Email or contact Novapro Lab through the channels listed on [novaprolab.com](https://novaprolab.com).
2. Use the subject line: **Security report — small-business-ai-tools**
3. Include as much detail as possible:
   - Description of the issue and potential impact
   - Steps to reproduce
   - Affected file paths or tool names
   - Your environment (OS, Node.js version) if relevant
   - Any suggested fix, if you have one

### What to include in reports

Helpful reports describe **how** an attacker could exploit the issue in the context of this repository — for example, unsafe handling of untrusted input when running a tool locally.

### What not to include

- Real customer data, credentials, API keys, or production system details
- Proof-of-concept payloads that could harm third parties
- Automated scan output without a verified, reproducible finding

## Scope

### In scope

- Vulnerabilities in code shipped in this repository (tools, scripts, documentation with executable examples)
- Issues that could lead to unintended code execution, path traversal, or unsafe deserialization when processing untrusted input files
- Misleading security claims in documentation that could cause users to mishandle sensitive data

### Out of scope

- Vulnerabilities in Node.js itself (report those to the Node.js project)
- Issues in third-party systems where you deploy these tools (your CRM, email provider, hosting environment)
- Social engineering, physical access, or attacks requiring compromise of a contributor's machine outside this repo
- General security hardening requests without a demonstrated vulnerability
- Findings in dependencies — this project intentionally ships **without npm dependencies**; if you add dependencies in a fork, that fork is your responsibility

## Our response process

1. **Acknowledgment** — We aim to confirm receipt within **5 business days**.
2. **Triage** — We assess severity, reproducibility, and impact on users running tools locally.
3. **Fix** — We develop and test a patch on a private timeline appropriate to the severity.
4. **Disclosure** — We publish a fix and, when appropriate, a brief advisory describing the issue and mitigation steps.
5. **Credit** — With your permission, we acknowledge reporters who helped improve project security.

If you do not receive a response within a reasonable time, follow up using the same private channel.

## Safe use recommendations

This repository is designed for **local, offline use** with data you control. Reduce risk when using these tools:

- Run tools only on data you are authorized to process.
- Do not pipe untrusted JSON from unknown sources into the scripts without review.
- Review generated follow-up messages before sending them to customers.
- Store lead and customer files with appropriate access controls on your system.
- Keep Node.js updated to a supported LTS release.

## Security-related contributions

Improvements that harden input validation, clarify safe usage, or fix documented vulnerabilities are welcome via pull request after coordinated disclosure, or via the private reporting process above.

For general security questions that are not vulnerability reports, open a GitHub issue without including sensitive details.

## Disclaimer

These tools and templates are provided **as is** under the MIT License. They are not a substitute for legal, compliance, or professional security advice. You are responsible for how you deploy and use them in your organization.
