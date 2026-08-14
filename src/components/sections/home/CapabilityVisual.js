/** Lightweight capability diagrams — geometric, not icon-pack. */
export function CapabilityVisual({ id }) {
  const common = {
    viewBox: "0 0 160 100",
    className: "w-full h-[52px] sm:h-[64px] lg:h-[72px] text-teal-700 dark:text-teal-300/80",
    fill: "none",
    "aria-hidden": true,
  };

  if (id === "ai-surfaces") {
    return (
      <svg {...common}>
        <rect x="18" y="18" width="124" height="64" rx="10" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <rect x="30" y="32" width="56" height="8" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="30" y="48" width="88" height="6" rx="2" fill="currentColor" opacity="0.18" />
        <rect x="30" y="60" width="72" height="6" rx="2" fill="currentColor" opacity="0.18" />
        <circle cx="126" cy="36" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M122 36h8M126 32v8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  if (id === "agentic") {
    // Centered cross layout — equal spacing, no clipped nodes
    return (
      <svg {...common}>
        <circle cx="80" cy="50" r="11" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <circle cx="80" cy="82" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <circle cx="36" cy="50" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <circle cx="124" cy="50" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <path
          d="M80 29v10M80 61v10M47 50h22M91 50h22"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.55"
        />
      </svg>
    );
  }

  if (id === "llm-plumbing") {
    return (
      <svg {...common}>
        <rect x="16" y="34" width="36" height="32" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <rect x="62" y="24" width="36" height="52" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
        <rect x="108" y="34" width="36" height="32" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M52 50h10M98 50h10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M74 40v8M80 40v8M86 40v8" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="20" y="22" width="50" height="56" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <rect x="80" y="22" width="60" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <rect x="80" y="54" width="60" height="24" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M34 38h22M34 50h16M34 62h20" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}
