/** Realistic case-study covers — product photography / UI stills, not chart SVGs. */

const COVER_BY_SLUG = {
  ivygpt: "/images/work/ivygpt-cover.png",
  "servicenow-agentic": "/images/work/servicenow-agentic-cover.png",
  "jio-platforms": "/images/work/jio-platforms-cover.png",
  "daily-dev-digest": "/images/work/daily-dev-digest-cover.png",
  "claude-graph": "/images/work/claude-graph-cover.png",
  "ai-voice-bot": "/images/work/ai-voice-bot-cover.png",
};

export default function CaseStudyVisual({ slug, src, alt = "", featured = false }) {
  const cover = src || COVER_BY_SLUG[slug] || "";

  if (!cover) {
    return (
      <div
        className={`relative w-full h-full min-h-0 overflow-hidden bg-[#12151a] ${
          featured ? "min-h-[240px] md:min-h-full" : ""
        }`}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full min-h-0 overflow-hidden bg-[#12151a] ${
        featured ? "min-h-[240px] md:min-h-full" : ""
      }`}
    >
      <img
        src={cover}
        alt={alt}
        width={640}
        height={400}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        loading="lazy"
      />
    </div>
  );
}
