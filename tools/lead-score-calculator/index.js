#!/usr/bin/env node
"use strict";

/**
 * Lead Score Calculator
 * Scores a lead from 0–100 using explicit, editable weights.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const WEIGHTS = {
  budgetRange: 20,
  timeline: 20,
  productFit: 25,
  decisionMaker: 15,
  engagementLevel: 20,
};

const BUDGET_SCORES = {
  low: 5,
  mid: 15,
  high: 20,
  enterprise: 20,
  unknown: 8,
};

const TIMELINE_SCORES = {
  immediate: 20,
  "1-3-months": 18,
  "3-6-months": 12,
  "6-plus-months": 6,
  exploring: 4,
  unknown: 8,
};

const FIT_SCORES = {
  strong: 25,
  moderate: 15,
  weak: 5,
  unknown: 10,
};

const ENGAGEMENT_SCORES = {
  high: 20,
  medium: 12,
  low: 4,
  unknown: 8,
};

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function scoreLead(lead) {
  let score = 0;
  const breakdown = {};

  breakdown.budgetRange =
    BUDGET_SCORES[lead.budgetRange] ?? BUDGET_SCORES.unknown;
  breakdown.timeline = TIMELINE_SCORES[lead.timeline] ?? TIMELINE_SCORES.unknown;
  breakdown.productFit = FIT_SCORES[lead.productFit] ?? FIT_SCORES.unknown;
  breakdown.decisionMaker = lead.decisionMaker === true ? WEIGHTS.decisionMaker : 0;
  breakdown.engagementLevel =
    ENGAGEMENT_SCORES[lead.engagementLevel] ?? ENGAGEMENT_SCORES.unknown;

  score =
    breakdown.budgetRange +
    breakdown.timeline +
    breakdown.productFit +
    breakdown.decisionMaker +
    breakdown.engagementLevel;

  const tier =
    score >= 75 ? "Hot" : score >= 50 ? "Warm" : score >= 30 ? "Nurture" : "Low priority";

  return { score, tier, breakdown };
}

function printHelp() {
  console.log(`Lead Score Calculator

Usage:
  node index.js [path/to/lead.json]
  cat lead.json | node index.js

Expected fields (all optional; missing fields use neutral defaults):
  budgetRange     low | mid | high | enterprise | unknown
  timeline        immediate | 1-3-months | 3-6-months | 6-plus-months | exploring | unknown
  productFit      strong | moderate | weak | unknown
  decisionMaker   true | false
  engagementLevel high | medium | low | unknown

Example:
  node index.js ../../examples/example-lead.json
`);
}

function main() {
  const arg = process.argv[2];

  if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  }

  let raw;
  try {
    raw = readInput(arg);
  } catch (error) {
    console.error("Could not read input:", error.message);
    process.exit(1);
  }

  let lead;
  try {
    lead = JSON.parse(raw);
  } catch (error) {
    console.error("Invalid JSON:", error.message);
    process.exit(1);
  }

  const result = scoreLead(lead);

  console.log("\nLead Score Report");
  console.log("=================");
  console.log(`Name:    ${lead.name ?? "(not provided)"}`);
  console.log(`Company: ${lead.company ?? "(not provided)"}`);
  console.log(`Score:   ${result.score} / 100`);
  console.log(`Tier:    ${result.tier}`);
  console.log("\nBreakdown:");
  for (const [key, value] of Object.entries(result.breakdown)) {
    console.log(`  ${key}: ${value}`);
  }
  console.log("\nReview scores with your team. Adjust weights in index.js to match your business.");
}

main();
