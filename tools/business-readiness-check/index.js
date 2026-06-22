#!/usr/bin/env node
"use strict";

/**
 * Business Readiness Check
 * Evaluates operational readiness for simple automation.
 * No network calls. No dependencies.
 */

const fs = require("fs");

const FIELD_WEIGHTS = {
  leadTracking: 15,
  followUpProcess: 15,
  customerDataQuality: 12,
  documentedProcesses: 12,
  responseTimeHours: 13,
  privacyAwareness: 11,
  automationReadiness: 11,
  reportingClarity: 11,
};

const LEAD_TRACKING_SCORES = {
  none: 0,
  spreadsheet: 8,
  "crm-basic": 12,
  "crm-structured": 15,
};

const FOLLOW_UP_SCORES = {
  "ad-hoc": 0,
  occasional: 6,
  documented: 12,
  "automated-reminders": 15,
};

const QUALITY_SCORES = {
  poor: 0,
  fair: 4,
  good: 8,
  excellent: 12,
};

const DOCUMENTATION_SCORES = {
  none: 0,
  partial: 4,
  mostly: 8,
  complete: 12,
};

const AWARENESS_SCORES = {
  low: 0,
  medium: 6,
  high: 11,
};

const READINESS_SCORES = {
  low: 0,
  medium: 6,
  high: 11,
};

const REPORTING_SCORES = {
  unclear: 0,
  basic: 4,
  clear: 8,
  advanced: 11,
};

function readInput(filePath) {
  if (filePath) {
    return fs.readFileSync(filePath, "utf8");
  }
  return fs.readFileSync(0, "utf8");
}

function scoreResponseTime(hours) {
  const value = Number(hours);
  if (Number.isNaN(value) || value < 0) return 4;
  if (value <= 4) return 13;
  if (value <= 12) return 10;
  if (value <= 24) return 7;
  if (value <= 48) return 4;
  return 0;
}

function resolveLevel(score) {
  if (score >= 85) return "advanced";
  if (score >= 70) return "ready";
  if (score >= 40) return "improving";
  return "basic";
}

const CATEGORY_HINTS = {
  leadTracking: {
    strengthMin: 12,
    riskMax: 4,
    strength: "Leads are tracked in a structured system.",
    risk: "Lead tracking is informal or missing.",
    action: "Define a single place where every inbound lead is recorded.",
    improvement: "Lead tracking works but could be more centralized for consistent follow-up.",
    improvementAction: "Consolidate leads into one shared list or lightweight CRM instead of scattered notes.",
  },
  followUpProcess: {
    strengthMin: 12,
    riskMax: null,
    strength: "Follow-up steps are documented or supported by reminders.",
    risk: "Follow-up depends on individual memory.",
    action: "Write a simple follow-up sequence with timing and message types.",
    improvement: "Follow-up happens but lacks a repeatable sequence the whole team can use.",
    improvementAction: "Document timing and message types for each lead stage.",
  },
  customerDataQuality: {
    strengthMin: 8,
    riskMax: null,
    strength: "Customer records are generally complete and usable.",
    risk: "Customer data quality may slow outreach.",
    action: "Standardize required fields on intake forms before automating.",
    improvement: "Records are usable but missing fields still slow down outreach.",
    improvementAction: "Add required intake fields for contact method, need summary, and next step.",
  },
  documentedProcesses: {
    strengthMin: 8,
    riskMax: null,
    strength: "Core sales processes are documented.",
    risk: "Undocumented handoffs create inconsistency.",
    action: "Document who owns each stage from first contact to close.",
    improvement: "Some process knowledge exists but handoffs are not fully documented.",
    improvementAction: "Map each sales stage to a named owner and expected handoff checklist.",
  },
  responseTimeHours: {
    strengthMin: 10,
    riskMax: null,
    strength: "Response times are fast enough to support timely automation.",
    risk: "Slow response times reduce the value of follow-up automation.",
    action: "Set a team SLA for first response and review weekly.",
    improvement: "Response times are acceptable but tightening them would improve conversion.",
    improvementAction: "Set a first-response target and review missed SLAs in a weekly standup.",
  },
  privacyAwareness: {
    strengthMin: 6,
    riskMax: null,
    strength: "Team shows awareness of privacy when handling customer data.",
    risk: "Limited privacy awareness increases compliance risk.",
    action: "Review data collection practices and train staff on retention basics.",
    improvement: "Privacy basics are understood but retention and access rules could be clearer.",
    improvementAction: "Document what customer data you collect, who can access it, and when it is deleted.",
  },
  automationReadiness: {
    strengthMin: 6,
    riskMax: null,
    strength: "Team is open to lightweight automation.",
    risk: "Automation may be resisted without clear benefits.",
    action: "Start with one low-risk helper (scoring or draft messages) and measure time saved.",
    improvement: "The team is cautiously open — start with small wins before expanding automation.",
    improvementAction: "Pilot one local tool for a month and track hours saved on follow-up tasks.",
  },
  reportingClarity: {
    strengthMin: 8,
    riskMax: null,
    strength: "Reporting makes pipeline status easy to understand.",
    risk: "Unclear reporting makes it hard to know if automation helps.",
    action: "Track leads contacted, replies received, and next actions due each week.",
    improvement: "Reporting exists but could better show pipeline health and next actions.",
    improvementAction: "Add a weekly view of leads contacted, replies received, and overdue follow-ups.",
  },
};

const CATEGORY_MAX = {
  leadTracking: 15,
  followUpProcess: 15,
  customerDataQuality: 12,
  documentedProcesses: 12,
  responseTimeHours: 13,
  privacyAwareness: 11,
  automationReadiness: 11,
  reportingClarity: 11,
};

function isCriticalRisk(category, score) {
  const hints = CATEGORY_HINTS[category];
  return hints.riskMax !== null && score <= hints.riskMax;
}

function evaluateCategory(category, score, strengths, risks, recommendedActions) {
  const hints = CATEGORY_HINTS[category];
  const max = CATEGORY_MAX[category];

  if (score >= hints.strengthMin) {
    strengths.push(hints.strength);
    return;
  }

  if (isCriticalRisk(category, score)) {
    risks.push(hints.risk);
    recommendedActions.push(hints.action);
    return;
  }

  if (score <= max * 0.35) {
    risks.push(hints.risk);
    recommendedActions.push(hints.action);
  }
}

function lowestCategories(breakdown, count) {
  return Object.entries(breakdown)
    .map(([category, score]) => ({
      category,
      score,
      ratio: score / (CATEGORY_MAX[category] || 1),
    }))
    .sort((a, b) => a.ratio - b.ratio || a.score - b.score)
    .slice(0, count);
}

function fillImprovementNotes(breakdown, risks, recommendedActions) {
  const candidates = lowestCategories(breakdown, 3).filter(
    ({ category, score }) => score < CATEGORY_HINTS[category].strengthMin
  );

  for (const { category } of candidates) {
    const hints = CATEGORY_HINTS[category];
    risks.push(hints.improvement);
    recommendedActions.push(hints.improvementAction);
  }

  if (risks.length === 0) {
    risks.push("No critical gaps found — focus on incremental gains in your weakest operational areas.");
    recommendedActions.push("Re-run this assessment after your next process change to track progress.");
  }

  if (recommendedActions.length === 0) {
    recommendedActions.push("Pick one improvement action above and assign an owner with a target date.");
  }
}

function evaluateBusinessReadiness(input) {
  const breakdown = {};
  let score = 0;

  breakdown.leadTracking =
    LEAD_TRACKING_SCORES[input.leadTracking] ?? LEAD_TRACKING_SCORES.none;
  breakdown.followUpProcess =
    FOLLOW_UP_SCORES[input.followUpProcess] ?? FOLLOW_UP_SCORES["ad-hoc"];
  breakdown.customerDataQuality =
    QUALITY_SCORES[input.customerDataQuality] ?? QUALITY_SCORES.poor;
  breakdown.documentedProcesses =
    DOCUMENTATION_SCORES[input.documentedProcesses] ?? DOCUMENTATION_SCORES.none;
  breakdown.responseTimeHours = scoreResponseTime(input.responseTimeHours);
  breakdown.privacyAwareness =
    AWARENESS_SCORES[input.privacyAwareness] ?? AWARENESS_SCORES.low;
  breakdown.automationReadiness =
    READINESS_SCORES[input.automationReadiness] ?? READINESS_SCORES.low;
  breakdown.reportingClarity =
    REPORTING_SCORES[input.reportingClarity] ?? REPORTING_SCORES.unclear;

  for (const value of Object.values(breakdown)) {
    score += value;
  }

  const level = resolveLevel(score);
  const strengths = [];
  const risks = [];
  const recommendedActions = [];

  for (const [category, value] of Object.entries(breakdown)) {
    evaluateCategory(category, value, strengths, risks, recommendedActions);
  }

  if (strengths.length === 0) {
    strengths.push("Starting assessment provides a baseline for improvement.");
  }

  if (risks.length === 0) {
    fillImprovementNotes(breakdown, risks, recommendedActions);
  } else if (recommendedActions.length === 0) {
    fillImprovementNotes(breakdown, risks, recommendedActions);
  }

  return {
    score,
    level,
    breakdown,
    strengths,
    risks,
    recommendedActions,
  };
}

function printHelp() {
  console.log(`Business Readiness Check

Usage:
  node index.js [path/to/business.json]

Expected fields:
  leadTracking          none | spreadsheet | crm-basic | crm-structured
  followUpProcess       ad-hoc | occasional | documented | automated-reminders
  customerDataQuality   poor | fair | good | excellent
  documentedProcesses   none | partial | mostly | complete
  responseTimeHours     number (median hours to first response)
  privacyAwareness      low | medium | high
  automationReadiness   low | medium | high
  reportingClarity      unclear | basic | clear | advanced

Example:
  node index.js ../../examples/example-business-readiness.json
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

  const result = evaluateBusinessReadiness(input);

  console.log("\nBusiness Readiness Report");
  console.log("=========================");
  console.log(`Business: ${input.businessName ?? "(not provided)"}`);
  console.log(`Score:    ${result.score} / 100`);
  console.log(`Level:    ${result.level}`);
  console.log("\nBreakdown:");
  for (const [key, value] of Object.entries(result.breakdown)) {
    console.log(`  ${key}: ${value}`);
  }
  console.log("\nStrengths:");
  for (const item of result.strengths) {
    console.log(`  + ${item}`);
  }
  console.log("\nRisks:");
  for (const item of result.risks) {
    console.log(`  - ${item}`);
  }
  console.log("\nRecommended actions:");
  for (const item of result.recommendedActions) {
    console.log(`  * ${item}`);
  }
}

module.exports = {
  evaluateBusinessReadiness,
  resolveLevel,
  FIELD_WEIGHTS,
};

if (require.main === module) {
  main();
}
