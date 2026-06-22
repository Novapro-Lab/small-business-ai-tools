#!/usr/bin/env node
"use strict";

/**
 * Customer Segmentation (Basic)
 * Groups customers using transparent rules — no ML, no external services.
 */

const fs = require("fs");

const VALUE_TIERS = {
  high: 5000,
  mid: 1000,
};

const AT_RISK_DAYS = 90;
const DORMANT_DAYS = 180;

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function valueTier(monthlyValue) {
  const value = Number(monthlyValue) || 0;
  if (value >= VALUE_TIERS.high) return "high-value";
  if (value >= VALUE_TIERS.mid) return "mid-value";
  return "entry-value";
}

function engagementBand(customer) {
  const days = Number(customer.lastPurchaseDaysAgo) ?? 999;
  const tickets = Number(customer.supportTicketsLast90Days) ?? 0;

  if (days <= 30) return "active-recent";
  if (days <= AT_RISK_DAYS) return "active-steady";
  if (days <= DORMANT_DAYS) return "at-risk";
  return "dormant";
}

function segmentCustomer(customer) {
  const tier = valueTier(customer.monthlyValue);
  const engagement = engagementBand(customer);
  const lifecycle = customer.lifecycleStage || engagement;

  const labels = [];
  labels.push(tier);
  labels.push(engagement);

  if (ticketsHigh(customer)) {
    labels.push("needs-attention");
  }

  return {
    id: customer.id,
    name: customer.name,
    industry: customer.industry || "unknown",
    monthlyValue: customer.monthlyValue ?? 0,
    lifecycleStage: lifecycle,
    segments: labels,
    recommendedAction: recommendAction(tier, engagement, customer),
  };
}

function ticketsHigh(customer) {
  return Number(customer.supportTicketsLast90Days) >= 3;
}

function recommendAction(tier, engagement, customer) {
  if (engagement === "dormant" && tier !== "entry-value") {
    return "Personal outreach — high-value account gone quiet";
  }
  if (engagement === "at-risk") {
    return "Check in — purchase gap widening";
  }
  if (ticketsHigh(customer)) {
    return "Review support history — possible satisfaction issue";
  }
  if (tier === "high-value" && engagement === "active-recent") {
    return "Maintain cadence — consider expansion conversation";
  }
  if (tier === "entry-value" && engagement === "active-recent") {
    return "Nurture — identify upsell fit over time";
  }
  return "Standard touchpoint — no immediate flag";
}

function printHelp() {
  console.log(`Customer Segmentation (Basic)

Usage:
  node index.js [path/to/customers.json]

Input: JSON array of customer objects with fields:
  id, name, industry, monthlyValue, lastPurchaseDaysAgo,
  supportTicketsLast90Days, lifecycleStage (optional)

Example:
  node index.js ../../examples/example-customers.json
`);
}

function main() {
  const arg = process.argv[2];

  if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  }

  let customers;
  try {
    customers = JSON.parse(readInput(arg));
  } catch (error) {
    console.error("Could not read or parse input:", error.message);
    process.exit(1);
  }

  if (!Array.isArray(customers)) {
    console.error("Input must be a JSON array of customers.");
    process.exit(1);
  }

  const results = customers.map(segmentCustomer);

  console.log("\nCustomer Segmentation Report");
  console.log("============================\n");

  for (const row of results) {
    console.log(`${row.name} (${row.id})`);
    console.log(`  Industry:  ${row.industry}`);
    console.log(`  MRR/value: $${row.monthlyValue}`);
    console.log(`  Segments:  ${row.segments.join(", ")}`);
    console.log(`  Action:    ${row.recommendedAction}`);
    console.log("");
  }

  const summary = {};
  for (const row of results) {
    for (const seg of row.segments) {
      summary[seg] = (summary[seg] || 0) + 1;
    }
  }

  console.log("Segment counts:");
  for (const [seg, count] of Object.entries(summary).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${seg}: ${count}`);
  }
}

main();
