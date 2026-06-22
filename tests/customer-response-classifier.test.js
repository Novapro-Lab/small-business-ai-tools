"use strict";

const assert = require("assert");
const { classifyCustomerResponse } = require("../tools/customer-response-classifier/index.js");

const interested = classifyCustomerResponse({
  responseText: "This sounds good — let's schedule a call next week.",
});

assert.strictEqual(interested.category, "interested");
assert.ok(interested.matchedSignals.length > 0);
assert.ok(interested.suggestedNextAction.length > 0);

const pricing = classifyCustomerResponse({
  responseText: "Can you send pricing details for the standard plan?",
});

assert.strictEqual(pricing.category, "needs_more_info");

const negative = classifyCustomerResponse({
  responseText: "Not interested — please stop emailing me.",
});

assert.strictEqual(negative.category, "negative");
assert.strictEqual(negative.confidence, "high");

const empty = classifyCustomerResponse({ responseText: "" });
assert.strictEqual(empty.category, "no_response");

const vague = classifyCustomerResponse({
  responseText: "Okay, noted.",
});

assert.strictEqual(vague.category, "unknown");
assert.strictEqual(vague.confidence, "low");

console.log("customer-response-classifier.test.js: ok");
