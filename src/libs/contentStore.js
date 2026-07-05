// Module-level content store. Seeded server-side by the root layout and
// client-side by ContentProvider before any consumer renders.
let store = {};

export function seedContent(bundle) {
  if (bundle && typeof bundle === "object") {
    store = { ...store, ...bundle };
  }
}

export function getContent(key) {
  return store[key];
}
