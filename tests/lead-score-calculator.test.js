"use strict";

const assert = require("assert");
const { scoreLead } = require("../tools/lead-score-calculator/index.js");

const hotLead = {
  budgetRange: "mid",
  timeline: "1-3-months",
  productFit: "strong",
  decisionMaker: true,
  engagementLevel: "high",
};

const result = scoreLead(hotLead);

assert.strictEqual(typeof result.score, "number");
assert.ok(result.score >= 75, "expected hot tier score");
assert.strictEqual(result.tier, "Hot");
assert.ok(result.breakdown.productFit === 25);

const weakLead = {
  budgetRange: "low",
  timeline: "exploring",
  productFit: "weak",
  decisionMaker: false,
  engagementLevel: "low",
};

const weak = scoreLead(weakLead);
assert.ok(weak.score < 30, "expected low priority score");
assert.strictEqual(weak.tier, "Low priority");

console.log("lead-score-calculator.test.js: ok");
