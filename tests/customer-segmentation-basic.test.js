"use strict";

const assert = require("assert");
const {
  segmentCustomer,
  segmentCustomers,
  valueTier,
} = require("../tools/customer-segmentation-basic/index.js");

assert.strictEqual(valueTier(5000), "high-value");
assert.strictEqual(valueTier(1000), "mid-value");
assert.strictEqual(valueTier(200), "entry-value");

const customer = {
  id: "cust-test",
  name: "Test Co",
  industry: "retail",
  monthlyValue: 2800,
  lastPurchaseDaysAgo: 7,
  supportTicketsLast90Days: 3,
};

const row = segmentCustomer(customer);
assert.strictEqual(row.id, "cust-test");
assert.ok(row.segments.includes("mid-value"));
assert.ok(row.segments.includes("active-recent"));
assert.ok(row.segments.includes("needs-attention"));
assert.ok(row.recommendedAction.length > 0);

const batch = segmentCustomers([customer]);
assert.strictEqual(batch.length, 1);

console.log("customer-segmentation-basic.test.js: ok");
