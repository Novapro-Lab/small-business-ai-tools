#!/usr/bin/env node
"use strict";

/**
 * Follow-Up Schedule Planner
 * Builds a simple follow-up schedule from lead status, urgency, and last contact.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const STATUS_PLANS = {
  new: [
    { dayOffset: 0, action: "Send initial follow-up", messageType: "initial" },
    { dayOffset: 3, action: "Send gentle reminder", messageType: "reminder" },
    { dayOffset: 7, action: "Offer helpful resource or case note", messageType: "reminder" },
    { dayOffset: 14, action: "Close the loop politely", messageType: "no-response" },
  ],
  contacted: [
    { dayOffset: 2, action: "Confirm receipt and propose next step", messageType: "reminder" },
    { dayOffset: 5, action: "Share relevant example or FAQ", messageType: "reminder" },
    { dayOffset: 10, action: "Check timing and offer to pause outreach", messageType: "no-response" },
  ],
  qualified: [
    { dayOffset: 1, action: "Send meeting summary and action items", messageType: "post-call" },
    { dayOffset: 4, action: "Follow up on open questions", messageType: "reminder" },
    { dayOffset: 8, action: "Propose concrete next step or proposal review", messageType: "reminder" },
  ],
  proposal: [
    { dayOffset: 2, action: "Confirm proposal received", messageType: "reminder" },
    { dayOffset: 5, action: "Answer questions and clarify scope", messageType: "reminder" },
    { dayOffset: 10, action: "Discuss timeline and decision process", messageType: "reminder" },
  ],
  negotiating: [
    { dayOffset: 1, action: "Recap agreed points and open items", messageType: "post-call" },
    { dayOffset: 3, action: "Address remaining objections", messageType: "reminder" },
    { dayOffset: 7, action: "Confirm decision timeline", messageType: "reminder" },
  ],
  nurture: [
    { dayOffset: 14, action: "Share useful update or insight", messageType: "reminder" },
    { dayOffset: 45, action: "Check if priorities have changed", messageType: "reminder" },
    { dayOffset: 90, action: "Re-engage or archive respectfully", messageType: "no-response" },
  ],
};

const URGENCY_MULTIPLIERS = {
  high: 0.6,
  medium: 1,
  low: 1.4,
};

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function parseDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function scaleDayOffset(dayOffset, urgency) {
  const multiplier = URGENCY_MULTIPLIERS[urgency] ?? URGENCY_MULTIPLIERS.medium;
  return Math.max(0, Math.round(dayOffset * multiplier));
}

function buildNotes(item, urgency, leadStatus) {
  const notes = [`Status: ${leadStatus}`, `Urgency: ${urgency}`];
  if (urgency === "high") {
    notes.push("Accelerated timing — review message before sending.");
  }
  if (item.messageType === "no-response") {
    notes.push("Use only if prior messages received no reply.");
  }
  return notes.join(". ");
}

function planFollowUpSchedule(input) {
  const leadStatus = (input.leadStatus || "new").toLowerCase();
  const urgency = (input.urgency || "medium").toLowerCase();
  const lastContactDate = parseDate(input.lastContactDate);

  if (!lastContactDate) {
    throw new Error("lastContactDate is required and must be a valid ISO date (YYYY-MM-DD).");
  }

  const plan = STATUS_PLANS[leadStatus] ?? STATUS_PLANS.new;
  const schedule = plan.map((item) => {
    const dayOffset = scaleDayOffset(item.dayOffset, urgency);
    const date = addDays(lastContactDate, dayOffset);

    return {
      dayOffset,
      date: formatDate(date),
      action: item.action,
      messageType: item.messageType,
      notes: buildNotes(item, urgency, leadStatus),
    };
  });

  return {
    leadName: input.leadName ?? null,
    leadStatus,
    urgency,
    lastContactDate: formatDate(lastContactDate),
    schedule,
  };
}

function printHelp() {
  console.log(`Follow-Up Schedule Planner

Usage:
  node index.js [path/to/schedule-input.json]

Expected fields:
  leadName          optional display name
  leadStatus        new | contacted | qualified | proposal | negotiating | nurture
  urgency           high | medium | low
  lastContactDate   ISO date (YYYY-MM-DD)

Example:
  node index.js ../../examples/example-follow-up-schedule.json
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
    result = planFollowUpSchedule(input);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log("\nFollow-Up Schedule");
  console.log("==================");
  console.log(`Lead:           ${result.leadName ?? "(not provided)"}`);
  console.log(`Status:         ${result.leadStatus}`);
  console.log(`Urgency:        ${result.urgency}`);
  console.log(`Last contact:   ${result.lastContactDate}`);
  console.log("\nSchedule:");

  for (const item of result.schedule) {
    console.log(`\n  Day +${item.dayOffset} (${item.date})`);
    console.log(`    Action:       ${item.action}`);
    console.log(`    Message type: ${item.messageType}`);
    console.log(`    Notes:        ${item.notes}`);
  }

  console.log("\nAdjust dates and messages before use. A human should review every outreach step.");
}

module.exports = {
  planFollowUpSchedule,
  STATUS_PLANS,
  URGENCY_MULTIPLIERS,
};

if (require.main === module) {
  main();
}
