#!/usr/bin/env node
"use strict";

/**
 * Follow-Up Message Generator
 * Builds editable follow-up drafts from lead JSON and a scenario type.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const SCENARIOS = ["initial", "reminder", "post-call", "no-response"];

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function firstName(fullName) {
  if (!fullName || typeof fullName !== "string") {
    return "there";
  }
  return fullName.trim().split(/\s+/)[0];
}

function normalizeProblemText(text) {
  const value = (text || "the workflow challenges you mentioned").trim();
  return value.replace(/[.!?]+\s*$/, "");
}

function buildMessage(lead, scenario) {
  const name = firstName(lead.name);
  const company = lead.company || "your team";
  const problem = normalizeProblemText(lead.problemSummary);

  const templates = {
    initial: `Subject: Following up on your inquiry

Hi ${name},

Thank you for reaching out${lead.company ? ` from ${company}` : ""}. I reviewed your note about ${problem}.

I'd like to learn a bit more about your priorities, timeline, and what success would look like for you. If you're open to it, I can suggest a few practical next steps — no pressure either way.

Would a brief 20-minute call this week work? Feel free to reply with a time that suits you.

Best regards,
[Your name]
[Your company]`,

    reminder: `Subject: Quick follow-up

Hi ${name},

I wanted to follow up on my earlier message about ${problem}.

If timing has shifted, no problem — just let me know. If it's still relevant, I'm happy to share a short outline of how similar teams have approached this.

Reply when convenient, or tell me if I should close the loop for now.

Best regards,
[Your name]
[Your company]`,

    "post-call": `Subject: Summary and next steps from our call

Hi ${name},

Thanks for your time today. Here's a brief summary of what we discussed:

- Challenge: ${problem}
- Your priorities: [fill in from call notes]
- Suggested next step: [fill in — demo, proposal, internal review, etc.]

I'll [specific action you promised] by [date]. If I missed anything, reply and I'll update this note.

Best regards,
[Your name]
[Your company]`,

    "no-response": `Subject: Closing the loop (for now)

Hi ${name},

I haven't heard back since my last message about ${problem}, so I'll assume the timing isn't right.

If you'd like to revisit later, reply anytime — I'll keep context on file. Wishing you and ${company} a productive quarter.

Best regards,
[Your name]
[Your company]`,
  };

  return templates[scenario];
}

function printHelp() {
  console.log(`Follow-Up Message Generator

Usage:
  node index.js [path/to/lead.json] <scenario>

Scenarios:
  initial      First follow-up after inbound interest
  reminder     Gentle nudge after no reply
  post-call    Summary email after a discovery call
  no-response  Polite close-the-loop message

Example:
  node index.js ../../examples/example-lead.json reminder
`);
}

function main() {
  const filePath = process.argv[2];
  const scenarioArg = process.argv[3];

  if (!scenarioArg || filePath === "--help" || filePath === "-h") {
    printHelp();
    process.exit(filePath === "--help" || filePath === "-h" ? 0 : 1);
  }

  const scenario = scenarioArg.toLowerCase();
  if (!SCENARIOS.includes(scenario)) {
    console.error(`Unknown scenario "${scenarioArg}". Use: ${SCENARIOS.join(", ")}`);
    process.exit(1);
  }

  let lead;
  try {
    lead = JSON.parse(readInput(filePath));
  } catch (error) {
    console.error("Could not read or parse input:", error.message);
    process.exit(1);
  }

  console.log(buildMessage(lead, scenario));
  console.log("\n---\nEdit placeholders before sending. A human should review every message.");
}

module.exports = {
  buildMessage,
  firstName,
  normalizeProblemText,
  SCENARIOS,
};

if (require.main === module) {
  main();
}
