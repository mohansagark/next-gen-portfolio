"use client";
import { seedContent } from "@/libs/contentStore";

// Seeds the client-side content store during render, before children render.
// seedContent is an idempotent merge, so React strict-mode double-invocation
// is harmless.
export default function ContentProvider({ content, children }) {
  seedContent(content);
  return children;
}
