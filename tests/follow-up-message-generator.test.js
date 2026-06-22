"use strict";

const assert = require("assert");
const { buildMessage, firstName, normalizeProblemText, SCENARIOS } = require("../tools/follow-up-message-generator/index.js");

const lead = {
  name: "Alex Rivera",
  company: "Rivera Logistics",
  problemSummary: "Manual order tracking causes delays.",
};

assert.strictEqual(firstName("Alex Rivera"), "Alex");
assert.strictEqual(firstName(""), "there");

for (const scenario of SCENARIOS) {
  const message = buildMessage(lead, scenario);
  assert.ok(message.includes("Alex"), `message should include first name for ${scenario}`);
  assert.ok(message.includes("Subject:"), `message should include subject for ${scenario}`);
}

const reminder = buildMessage(lead, "reminder");
assert.ok(reminder.includes("Subject:"));
assert.ok(reminder.includes("Manual order tracking"));
assert.ok(!reminder.includes("delays.."), "should not double punctuation after problem summary");

assert.strictEqual(normalizeProblemText("Manual order tracking causes delays."), "Manual order tracking causes delays");

const punctuatedLead = {
  ...lead,
  problemSummary: "Manual order tracking causes delays.",
};

for (const scenario of SCENARIOS) {
  const message = buildMessage(punctuatedLead, scenario);
  assert.ok(!message.includes(".."), `double period found in ${scenario} message`);
  assert.ok(!message.includes(".,"), `double punctuation before comma in ${scenario} message`);
}

console.log("follow-up-message-generator.test.js: ok");
