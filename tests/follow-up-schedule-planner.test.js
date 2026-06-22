"use strict";

const assert = require("assert");
const { planFollowUpSchedule } = require("../tools/follow-up-schedule-planner/index.js");

const result = planFollowUpSchedule({
  leadName: "Alex Rivera",
  leadStatus: "qualified",
  urgency: "high",
  lastContactDate: "2026-06-15",
});

assert.strictEqual(result.leadStatus, "qualified");
assert.strictEqual(result.urgency, "high");
assert.strictEqual(result.lastContactDate, "2026-06-15");
assert.ok(Array.isArray(result.schedule));
assert.ok(result.schedule.length >= 3);

const first = result.schedule[0];
assert.strictEqual(typeof first.dayOffset, "number");
assert.match(first.date, /^\d{4}-\d{2}-\d{2}$/);
assert.ok(first.action.length > 0);
assert.ok(["initial", "reminder", "post-call", "no-response"].includes(first.messageType));
assert.ok(first.notes.length > 0);

const highUrgency = planFollowUpSchedule({
  leadStatus: "new",
  urgency: "high",
  lastContactDate: "2026-06-01",
});

const mediumUrgency = planFollowUpSchedule({
  leadStatus: "new",
  urgency: "medium",
  lastContactDate: "2026-06-01",
});

assert.ok(
  highUrgency.schedule[1].dayOffset <= mediumUrgency.schedule[1].dayOffset,
  "high urgency should compress schedule"
);

assert.throws(
  () => planFollowUpSchedule({ leadStatus: "new", urgency: "medium" }),
  /lastContactDate/
);

console.log("follow-up-schedule-planner.test.js: ok");
