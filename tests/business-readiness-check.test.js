"use strict";

const assert = require("assert");
const {
  evaluateBusinessReadiness,
  resolveLevel,
} = require("../tools/business-readiness-check/index.js");

assert.strictEqual(resolveLevel(85), "advanced");
assert.strictEqual(resolveLevel(84), "ready");
assert.strictEqual(resolveLevel(70), "ready");
assert.strictEqual(resolveLevel(69), "improving");
assert.strictEqual(resolveLevel(66), "improving");
assert.strictEqual(resolveLevel(45), "improving");
assert.strictEqual(resolveLevel(20), "basic");

const strong = evaluateBusinessReadiness({
  leadTracking: "crm-structured",
  followUpProcess: "automated-reminders",
  customerDataQuality: "excellent",
  documentedProcesses: "complete",
  responseTimeHours: 3,
  privacyAwareness: "high",
  automationReadiness: "high",
  reportingClarity: "advanced",
});

assert.ok(strong.score >= 85);
assert.strictEqual(strong.level, "advanced");
assert.ok(strong.strengths.length > 0);
assert.ok(strong.risks.length > 0);
assert.ok(strong.recommendedActions.length > 0);

const midReady = evaluateBusinessReadiness({
  businessName: "Harbor View Consulting",
  leadTracking: "spreadsheet",
  followUpProcess: "documented",
  customerDataQuality: "good",
  documentedProcesses: "mostly",
  responseTimeHours: 8,
  privacyAwareness: "medium",
  automationReadiness: "medium",
  reportingClarity: "clear",
});

assert.strictEqual(midReady.score, 66);
assert.strictEqual(midReady.level, "improving");
assert.ok(midReady.risks.length > 0, "expected improvement notes when no critical risks");
assert.ok(midReady.recommendedActions.length > 0);

const weak = evaluateBusinessReadiness({
  leadTracking: "none",
  followUpProcess: "ad-hoc",
  customerDataQuality: "poor",
  documentedProcesses: "none",
  responseTimeHours: 72,
  privacyAwareness: "low",
  automationReadiness: "low",
  reportingClarity: "unclear",
});

assert.ok(weak.score < 40);
assert.strictEqual(weak.level, "basic");
assert.ok(weak.risks.length > 0);
assert.ok(weak.recommendedActions.length > 0);

console.log("business-readiness-check.test.js: ok");
