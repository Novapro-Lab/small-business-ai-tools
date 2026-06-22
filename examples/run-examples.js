#!/usr/bin/env node
"use strict";

/**
 * Run all public tools with fictional example data.
 * No dependencies. Prints clear sectioned output to the console.
 */

const { execSync } = require("child_process");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const RUNS = [
  {
    title: "Lead Score Calculator",
    command: "node tools/lead-score-calculator/index.js examples/example-lead.json",
  },
  {
    title: "Follow-Up Message Generator",
    command: "node tools/follow-up-message-generator/index.js examples/example-lead.json reminder",
  },
  {
    title: "Customer Segmentation (Basic)",
    command: "node tools/customer-segmentation-basic/index.js examples/example-customers.json",
  },
  {
    title: "Business Readiness Check",
    command: "node tools/business-readiness-check/index.js examples/example-business-readiness.json",
  },
  {
    title: "Follow-Up Schedule Planner",
    command: "node tools/follow-up-schedule-planner/index.js examples/example-follow-up-schedule.json",
  },
  {
    title: "Customer Data Quality Check",
    command: "node tools/customer-data-quality-check/index.js examples/example-customer-record.json",
  },
  {
    title: "Customer Response Classifier",
    command: "node tools/customer-response-classifier/index.js examples/example-customer-response.json",
  },
  {
    title: "Simple ROI Estimator",
    command: "node tools/simple-roi-estimator/index.js examples/example-roi.json",
  },
];

function divider(title) {
  const line = "=".repeat(Math.max(title.length + 4, 48));
  console.log(`\n${line}`);
  console.log(`  ${title}`);
  console.log(`${line}\n`);
}

function main() {
  console.log("Small Business AI Tools — Example Run");
  console.log("All data below is fictional. Review output before using in production.\n");

  for (const run of RUNS) {
    divider(run.title);
    try {
      const output = execSync(run.command, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
      process.stdout.write(output);
    } catch (error) {
      console.error(`Failed: ${run.command}`);
      if (error.stdout) process.stdout.write(error.stdout);
      if (error.stderr) process.stderr.write(error.stderr);
      process.exit(1);
    }
  }

  divider("Complete");
  console.log("All example tools finished successfully.\n");
}

main();
