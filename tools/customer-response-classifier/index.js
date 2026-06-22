#!/usr/bin/env node
"use strict";

/**
 * Customer Response Classifier
 * Classifies simple customer replies using transparent keyword rules.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const CATEGORY_ACTIONS = {
  interested: "Propose a specific next step — call, demo, or short proposal outline.",
  needs_more_info: "Answer the question clearly and confirm whether timing still works.",
  price_objection: "Clarify value, scope, and options without pressure; offer a comparison if helpful.",
  not_ready: "Acknowledge timing, set a reminder, and offer a lightweight check-in later.",
  no_response: "Send one concise reminder, then pause outreach if still silent.",
  negative: "Thank them, confirm no further contact unless they reach out, and close the loop.",
  unknown: "Reply with a clarifying question to understand intent before proposing next steps.",
};

const RULES = [
  {
    category: "negative",
    patterns: [
      /\b(not interested|no thanks|stop emailing|unsubscribe|do not contact|leave me alone)\b/i,
      /\b(won't|will not) (move forward|proceed|continue)\b/i,
    ],
    weight: 5,
  },
  {
    category: "price_objection",
    patterns: [
      /\b(too expensive|over budget|can't afford|cannot afford|price is high|lower price|discount)\b/i,
      /\b(cost|pricing|quote|budget)\b.*\b(too|high|concern|issue)\b/i,
    ],
    weight: 4,
  },
  {
    category: "not_ready",
    patterns: [
      /\b(not ready|next quarter|next year|later this year|maybe later|circle back|revisit)\b/i,
      /\b(bad timing|busy right now|no bandwidth|on hold)\b/i,
    ],
    weight: 4,
  },
  {
    category: "needs_more_info",
    patterns: [
      /\b(more info|more information|tell me more|can you explain|what does|how does)\b/i,
      /\b(send (me )?(details|specs|documentation|a brochure))\b/i,
      /\b(pricing|price list|rate card)\b/i,
    ],
    weight: 3,
  },
  {
    category: "interested",
    patterns: [
      /\b(let's schedule|lets schedule|book a call|set up a (call|meeting|demo))\b/i,
      /\b(i'?m interested|we'?re interested|sounds good|looks good|move forward|next step|ready to proceed)\b/i,
      /\b(when can we|available (on|this|next))\b/i,
    ],
    weight: 4,
  },
  {
    category: "no_response",
    patterns: [/^\s*$/],
    weight: 1,
  },
];

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function normalizeText(text) {
  if (text === undefined || text === null) return "";
  return String(text).trim();
}

function classifyCustomerResponse(input) {
  const responseText = normalizeText(input.responseText);

  if (responseText === "") {
    return {
      category: "no_response",
      confidence: "high",
      suggestedNextAction: CATEGORY_ACTIONS.no_response,
      matchedSignals: ["empty or missing response text"],
    };
  }

  const scores = {};
  const matchedSignals = [];

  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      const match = responseText.match(pattern);
      if (match) {
        scores[rule.category] = (scores[rule.category] || 0) + rule.weight;
        matchedSignals.push(`${rule.category}: "${match[0]}"`);
      }
    }
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) {
    return {
      category: "unknown",
      confidence: "low",
      suggestedNextAction: CATEGORY_ACTIONS.unknown,
      matchedSignals: [],
    };
  }

  const [topCategory, topScore] = ranked[0];
  const secondScore = ranked[1]?.[1] ?? 0;
  const confidence =
    topScore - secondScore >= 2 ? "high" : topScore - secondScore >= 1 ? "medium" : "low";

  return {
    category: topCategory,
    confidence,
    suggestedNextAction: CATEGORY_ACTIONS[topCategory],
    matchedSignals,
  };
}

function printHelp() {
  console.log(`Customer Response Classifier

Usage:
  node index.js [path/to/response.json]

Expected fields:
  responseText   The customer's message (required)
  channel        optional — email, sms, form, etc.

Example:
  node index.js ../../examples/example-customer-response.json
`);
}

function main() {
  const arg = process.argv[2];

  if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  }

  let input;
  try {
    input = JSON.parse(readInput(arg));
  } catch (error) {
    console.error("Could not read or parse input:", error.message);
    process.exit(1);
  }

  const result = classifyCustomerResponse(input);

  console.log("\nCustomer Response Classification");
  console.log("================================");
  console.log(`Category:     ${result.category}`);
  console.log(`Confidence:   ${result.confidence}`);
  console.log(`Next action:  ${result.suggestedNextAction}`);
  console.log(`Signals:      ${result.matchedSignals.length ? result.matchedSignals.join("; ") : "(none)"}`);
  console.log("\nReview the classification before changing your sales approach.");
}

module.exports = {
  classifyCustomerResponse,
  CATEGORY_ACTIONS,
  RULES,
};

if (require.main === module) {
  main();
}
