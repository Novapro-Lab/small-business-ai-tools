#!/usr/bin/env node
"use strict";

/**
 * Customer Data Quality Check
 * Checks whether a lead or customer record has enough information for follow-up.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const REQUIRED_FIELDS = [
  { key: "name", label: "Contact name", weight: 20 },
  { key: "email", label: "Email address", weight: 20, altKey: "phone" },
  { key: "company", label: "Company or organization", weight: 15 },
  { key: "problemSummary", label: "Problem or need summary", weight: 20, altKey: "notes" },
  { key: "lastContactDate", label: "Last contact date", weight: 15 },
  { key: "nextStep", label: "Defined next step", weight: 10 },
];

const FOLLOW_UP_THRESHOLD = 65;

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function hasValue(record, key) {
  const value = record[key];
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}

function isWeakValue(record, key) {
  const value = record[key];
  if (typeof value !== "string") return false;

  const trimmed = value.trim();
  if (trimmed.length < 3) return true;
  if (/^(tbd|n\/a|na|unknown|none|-)$/i.test(trimmed)) return true;
  if (key === "email" && !trimmed.includes("@")) return true;
  if (key === "problemSummary" && trimmed.length < 15) return true;
  if (key === "notes" && trimmed.length < 15) return true;
  return false;
}

function fieldPresent(record, field) {
  if (hasValue(record, field.key)) return true;
  if (field.altKey && hasValue(record, field.altKey)) return true;
  return false;
}

function resolveFieldKey(record, field) {
  if (hasValue(record, field.key)) return field.key;
  if (field.altKey && hasValue(record, field.altKey)) return field.altKey;
  return field.key;
}

function checkCustomerDataQuality(record) {
  let completenessScore = 0;
  const missingFields = [];
  const weakFields = [];
  const recommendedFixes = [];

  for (const field of REQUIRED_FIELDS) {
    if (!fieldPresent(record, field)) {
      missingFields.push(field.label);
      recommendedFixes.push(`Add ${field.label.toLowerCase()} before the next follow-up.`);
      continue;
    }

    completenessScore += field.weight;
    const activeKey = resolveFieldKey(record, field);

    if (isWeakValue(record, activeKey)) {
      weakFields.push(field.label);
      recommendedFixes.push(`Improve ${field.label.toLowerCase()} — current value is too vague.`);
      completenessScore -= Math.round(field.weight * 0.4);
    }
  }

  completenessScore = Math.max(0, Math.min(100, completenessScore));
  const readyForFollowUp = completenessScore >= FOLLOW_UP_THRESHOLD && missingFields.length === 0;

  if (!readyForFollowUp && recommendedFixes.length === 0) {
    recommendedFixes.push("Complete core contact fields to reach the follow-up readiness threshold.");
  }

  return {
    completenessScore,
    missingFields,
    weakFields,
    recommendedFixes,
    readyForFollowUp,
  };
}

function printHelp() {
  console.log(`Customer Data Quality Check

Usage:
  node index.js [path/to/customer-record.json]

Useful fields:
  name, email, phone, company, problemSummary, notes,
  lastContactDate, nextStep

Example:
  node index.js ../../examples/example-customer-record.json
`);
}

function main() {
  const arg = process.argv[2];

  if (arg === "--help" || arg === "-h") {
    printHelp();
    process.exit(0);
  }

  let record;
  try {
    record = JSON.parse(readInput(arg));
  } catch (error) {
    console.error("Could not read or parse input:", error.message);
    process.exit(1);
  }

  const result = checkCustomerDataQuality(record);

  console.log("\nCustomer Data Quality Report");
  console.log("============================");
  console.log(`Name:               ${record.name ?? "(not provided)"}`);
  console.log(`Completeness:       ${result.completenessScore} / 100`);
  console.log(`Ready for follow-up: ${result.readyForFollowUp ? "yes" : "no"}`);
  console.log(`Missing fields:     ${result.missingFields.length ? result.missingFields.join(", ") : "(none)"}`);
  console.log(`Weak fields:        ${result.weakFields.length ? result.weakFields.join(", ") : "(none)"}`);
  console.log("\nRecommended fixes:");
  for (const fix of result.recommendedFixes) {
    console.log(`  * ${fix}`);
  }
}

module.exports = {
  checkCustomerDataQuality,
  REQUIRED_FIELDS,
  FOLLOW_UP_THRESHOLD,
};

if (require.main === module) {
  main();
}
