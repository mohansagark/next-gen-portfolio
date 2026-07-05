import assert from "node:assert/strict";
import { defaultContent, setContent, getContent } from "../src/data/content";

assert.equal(defaultContent.jobs.length, 6);
assert.equal(defaultContent.jobs[0].company, "ServiceNow");
assert.equal(defaultContent.jobs[0].period, "NOW");
assert.equal(defaultContent.projects.length, 6);
assert.ok(defaultContent.bio.includes("9+ years"));
assert.equal(defaultContent.socials.length, 3);

assert.equal(getContent().jobs[0].company, "ServiceNow");
setContent({ bio: "new bio" });
assert.equal(getContent().bio, "new bio");
assert.equal(getContent().jobs.length, 6, "merge preserves other keys");
setContent(undefined as never); // must not throw
console.log("content store OK");
