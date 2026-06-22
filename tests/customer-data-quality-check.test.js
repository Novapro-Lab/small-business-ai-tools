"use strict";

const assert = require("assert");
const { checkCustomerDataQuality } = require("../tools/customer-data-quality-check/index.js");

const complete = checkCustomerDataQuality({
  name: "Jordan Lee",
  email: "jordan@example.test",
  company: "Oakwood Design Studio",
  problemSummary: "Quotes take too long because requirements are scattered.",
  lastContactDate: "2026-06-10",
  nextStep: "Send proposal outline",
});

assert.ok(complete.completenessScore >= 65);
assert.strictEqual(complete.readyForFollowUp, true);
assert.strictEqual(complete.missingFields.length, 0);

const incomplete = checkCustomerDataQuality({
  name: "Jordan Lee",
  company: "Oakwood Design Studio",
});

assert.strictEqual(incomplete.readyForFollowUp, false);
assert.ok(incomplete.missingFields.length > 0);
assert.ok(incomplete.recommendedFixes.length > 0);

const weak = checkCustomerDataQuality({
  name: "Jordan Lee",
  email: "bad-email",
  company: "Oakwood Design Studio",
  problemSummary: "short",
  lastContactDate: "2026-06-10",
  nextStep: "TBD",
});

assert.ok(weak.weakFields.length > 0);
assert.ok(weak.completenessScore < complete.completenessScore);

console.log("customer-data-quality-check.test.js: ok");
