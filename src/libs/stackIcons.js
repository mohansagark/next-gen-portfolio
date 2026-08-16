/** Stack marks: Font Awesome icons or monogram badges, each with a brand color. */

const STACK = {
  react: { type: "img", src: "/images/skills/react.png" },
  "react.js": { type: "img", src: "/images/skills/react.png" },
  "react native": { type: "img", src: "/images/skills/reactnative.png" },
  "next.js": { type: "img", src: "/images/skills/nextjs.png" },
  nextjs: { type: "img", src: "/images/skills/nextjs.png" },
  javascript: { type: "fa", className: "fa-brands fa-js", color: "#F7DF1E" },
  "node.js": { type: "img", src: "/images/skills/nodejs.png" },
  node: { type: "img", src: "/images/skills/nodejs.png" },
  python: { type: "fa", className: "fa-brands fa-python", color: "#3776AB" },
  aws: { type: "fa", className: "fa-brands fa-aws", color: "#FF9900" },
  "amazon bedrock": { type: "fa", className: "fa-brands fa-aws", color: "#FF9900" },
  bedrock: { type: "fa", className: "fa-brands fa-aws", color: "#FF9900" },
  docker: { type: "fa", className: "fa-brands fa-docker", color: "#2496ED" },
  mongodb: { type: "img", src: "/images/skills/mongodb.png" },
  github: { type: "fa", className: "fa-brands fa-github", color: "#8B949E" },
  "github actions": { type: "fa", className: "fa-brands fa-github", color: "#2088FF" },
  graphql: { type: "fa", className: "fa-solid fa-diagram-project", color: "#E10098" },
  "llm integrations": {
    type: "fa",
    className: "fa-solid fa-wand-magic-sparkles",
    color: "#8B5CF6",
  },
  llm: { type: "fa", className: "fa-solid fa-wand-magic-sparkles", color: "#8B5CF6" },
  genai: { type: "fa", className: "fa-solid fa-wand-magic-sparkles", color: "#14B8A6" },
  "gen ai": { type: "fa", className: "fa-solid fa-wand-magic-sparkles", color: "#14B8A6" },
  agents: { type: "fa", className: "fa-solid fa-robot", color: "#F59E0B" },
  agentic: { type: "fa", className: "fa-solid fa-robot", color: "#F59E0B" },
  servicenow: { type: "img", src: "/images/skills/servicenow.png" },
  "workflow automation": {
    type: "fa",
    className: "fa-solid fa-gears",
    color: "#38BDF8",
  },
  "amazon connect": { type: "fa", className: "fa-brands fa-aws", color: "#FF9900" },
  "design systems": { type: "fa", className: "fa-solid fa-palette", color: "#A855F7" },
  performance: { type: "fa", className: "fa-solid fa-gauge-high", color: "#22C55E" },
  "mobile web": { type: "fa", className: "fa-solid fa-mobile-screen", color: "#38BDF8" },
  "team leadership": { type: "fa", className: "fa-solid fa-people-group", color: "#F472B6" },
  mdx: { type: "fa", className: "fa-brands fa-markdown", color: "#94A3B8" },
  "ast analysis": { type: "fa", className: "fa-solid fa-code-branch", color: "#A78BFA" },
  langgraph: { type: "fa", className: "fa-solid fa-diagram-project", color: "#60A5FA" },
  cloudflare: { type: "fa", className: "fa-solid fa-cloud", color: "#F6821F" },
  "durable objects": { type: "fa", className: "fa-solid fa-database", color: "#F6821F" },
  "groq tts": { type: "fa", className: "fa-solid fa-waveform-lines", color: "#F97316" },
  "shadow dom": { type: "fa", className: "fa-solid fa-puzzle-piece", color: "#EAB308" },
  sse: { type: "fa", className: "fa-solid fa-bolt", color: "#FACC15" },
  "prompt systems": { type: "fa", className: "fa-solid fa-comments", color: "#3B82F6" },
  prompts: { type: "fa", className: "fa-solid fa-comments", color: "#3B82F6" },
  "micro-frontends": { type: "fa", className: "fa-solid fa-cubes", color: "#EC4899" },
  microfrontends: { type: "fa", className: "fa-solid fa-cubes", color: "#EC4899" },
  sqlite: { type: "fa", className: "fa-solid fa-database", color: "#0EA5E9" },
  mcp: { type: "fa", className: "fa-solid fa-plug", color: "#D97706" },
  accessibility: { type: "fa", className: "fa-solid fa-universal-access", color: "#38BDF8" },
  typescript: {
    type: "badge",
    label: "TS",
    title: "TypeScript",
    color: "#3178C6",
  },
  ts: {
    type: "badge",
    label: "TS",
    title: "TypeScript",
    color: "#3178C6",
  },
};

function normalize(label) {
  return String(label || "")
    .trim()
    .toLowerCase();
}

export function getStackIcon(label) {
  const key = normalize(label);
  if (STACK[key]) return { ...STACK[key] };

  for (const [name, icon] of Object.entries(STACK)) {
    if (key.includes(name) || name.includes(key)) return { ...icon };
  }

  return {
    type: "fa",
    className: "fa-solid fa-layer-group",
    color: "#14B8A6",
  };
}

export function stackIconClass(label) {
  const icon = getStackIcon(label);
  return icon.type === "fa" ? icon.className : "";
}
