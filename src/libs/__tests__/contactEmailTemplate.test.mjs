import test from "node:test";
import assert from "node:assert/strict";
import {
  escapeHtml,
  getContactEmailTemplate,
} from "../contactEmailTemplate.js";

test("escapeHtml escapes XSS-relevant characters", () => {
  assert.equal(
    escapeHtml(`<script>alert("x")</script>&'`),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;&#39;"
  );
  assert.equal(escapeHtml(null), "");
  assert.equal(escapeHtml(undefined), "");
});

test("getContactEmailTemplate escapes XSS payloads in every field", () => {
  const payload = {
    name: `<img src=x onerror=alert(1)>`,
    user_email: `" onclick="alert(1)"@evil.com`,
    company: `<a href="javascript:alert(1)">x</a>`,
    phone: `</td><script>alert(1)</script>`,
    select: `<svg/onload=alert(1)>`,
    message: `Hello <b>friend</b> & "foe"\n<script>document.cookie</script>`,
  };

  const html = getContactEmailTemplate(payload);

  // Tags must be entity-escaped (safe as text). Literal "onerror=" may still
  // appear inside escaped content like &lt;img ... onerror=...&gt;.
  assert.doesNotMatch(html, /<(?:script|img|svg)\b/i);
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(html, /&lt;script&gt;document\.cookie&lt;\/script&gt;/);
  assert.match(html, /&amp;/);
  assert.match(html, /&quot;/);
  // mailto href uses escaped email — quotes become &quot; so attribute cannot break out
  assert.match(
    html,
    /href="mailto:&quot; onclick=&quot;alert\(1\)&quot;@evil\.com"/
  );
  // Unescaped attribute-breaking quote pattern must not appear
  assert.doesNotMatch(html, /href="mailto:" onclick="/);
});
