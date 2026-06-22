#!/usr/bin/env node
"use strict";

/**
 * Simple ROI Estimator
 * Estimates monthly and annual revenue lift from improved follow-up or conversion.
 * No network calls. No dependencies.
 */

const fs = require("fs");

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function toRate(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  if (num > 1) return num / 100;
  return num;
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function estimateRoi(input) {
  const monthlyLeads = Number(input.monthlyLeads);
  const currentRate = toRate(input.currentConversionRate);
  const improvedRate = toRate(input.improvedConversionRate);
  const averageSaleValue = Number(input.averageSaleValue);

  if (
    Number.isNaN(monthlyLeads) ||
    monthlyLeads < 0 ||
    currentRate === null ||
    improvedRate === null ||
    Number.isNaN(averageSaleValue) ||
    averageSaleValue < 0
  ) {
    throw new Error(
      "Required numeric fields: monthlyLeads, currentConversionRate, improvedConversionRate, averageSaleValue."
    );
  }

  if (currentRate < 0 || currentRate > 1 || improvedRate < 0 || improvedRate > 1) {
    throw new Error("Conversion rates must be between 0 and 1 (or 0–100 as percentages).");
  }

  const currentRevenue = roundMoney(monthlyLeads * currentRate * averageSaleValue);
  const projectedRevenue = roundMoney(monthlyLeads * improvedRate * averageSaleValue);
  const estimatedMonthlyLift = roundMoney(projectedRevenue - currentRevenue);
  const estimatedAnnualLift = roundMoney(estimatedMonthlyLift * 12);

  const assumptions = [
    `${monthlyLeads} leads per month at $${averageSaleValue} average sale value.`,
    `Current conversion rate: ${(currentRate * 100).toFixed(1)}%.`,
    `Projected conversion rate: ${(improvedRate * 100).toFixed(1)}%.`,
    "Lift assumes improved follow-up or process quality — not guaranteed results.",
    "Does not subtract staff time, software, or marketing costs.",
  ];

  return {
    currentRevenue,
    projectedRevenue,
    estimatedMonthlyLift,
    estimatedAnnualLift,
    assumptions,
  };
}

function printHelp() {
  console.log(`Simple ROI Estimator

Usage:
  node index.js [path/to/roi-input.json]

Expected fields:
  monthlyLeads             number of leads per month
  currentConversionRate    decimal (0.12) or percent (12)
  improvedConversionRate   decimal (0.18) or percent (18)
  averageSaleValue         average revenue per closed deal

Example:
  node index.js ../../examples/example-roi.json
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

  let result;
  try {
    result = estimateRoi(input);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log("\nSimple ROI Estimate");
  console.log("===================");
  console.log(`Current monthly revenue:   $${result.currentRevenue.toLocaleString()}`);
  console.log(`Projected monthly revenue: $${result.projectedRevenue.toLocaleString()}`);
  console.log(`Estimated monthly lift:    $${result.estimatedMonthlyLift.toLocaleString()}`);
  console.log(`Estimated annual lift:     $${result.estimatedAnnualLift.toLocaleString()}`);
  console.log("\nAssumptions:");
  for (const item of result.assumptions) {
    console.log(`  * ${item}`);
  }
  console.log("\nUse as a planning estimate only — validate with your own historical data.");
}

module.exports = {
  estimateRoi,
  toRate,
};

if (require.main === module) {
  main();
}
