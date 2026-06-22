"use strict";

const assert = require("assert");
const { estimateRoi, toRate } = require("../tools/simple-roi-estimator/index.js");

assert.strictEqual(toRate(0.12), 0.12);
assert.strictEqual(toRate(12), 0.12);

const result = estimateRoi({
  monthlyLeads: 40,
  currentConversionRate: 0.12,
  improvedConversionRate: 0.18,
  averageSaleValue: 2500,
});

assert.strictEqual(result.currentRevenue, 12000);
assert.strictEqual(result.projectedRevenue, 18000);
assert.strictEqual(result.estimatedMonthlyLift, 6000);
assert.strictEqual(result.estimatedAnnualLift, 72000);
assert.ok(Array.isArray(result.assumptions));
assert.ok(result.assumptions.length >= 3);

const percentInput = estimateRoi({
  monthlyLeads: 10,
  currentConversionRate: 10,
  improvedConversionRate: 20,
  averageSaleValue: 1000,
});

assert.strictEqual(percentInput.currentRevenue, 1000);
assert.strictEqual(percentInput.projectedRevenue, 2000);

assert.throws(
  () => estimateRoi({ monthlyLeads: "x", currentConversionRate: 0.1, improvedConversionRate: 0.2, averageSaleValue: 100 }),
  /Required numeric fields/
);

console.log("simple-roi-estimator.test.js: ok");
