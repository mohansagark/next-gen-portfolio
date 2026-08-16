/** Realistic case-study covers — product photography / UI stills, not chart SVGs. */

import Image from "next/image";
import { isOptimizableImageSrc } from "@/libs/optimizableImage";

const COVER_BY_SLUG = {
  ivygpt: "/images/work/ivygpt-cover.jpg",
  "servicenow-agentic": "/images/work/servicenow-agentic-cover.jpg",
  "jio-platforms": "/images/work/jio-platforms-cover.jpg",
  "daily-dev-digest": "/images/work/daily-dev-digest-cover.jpg",
  "claude-graph": "/images/work/claude-graph-cover.jpg",
  "ai-voice-bot": "/images/work/ai-voice-bot-cover.jpg",
};

function resolveCover(slug, src) {
  if (src) {
    // Prefer CMS/mapped src. Rewrite same-origin PNG covers to the
    // compressed JPEG sibling when that is what public/ ships.
    if (src.startsWith("/") && !src.startsWith("//")) {
      return String(src).replace(/-cover\.png$/i, "-cover.jpg");
    }
    return src;
  }
  return (slug && COVER_BY_SLUG[slug]) || "";
}

export default function CaseStudyVisual({ slug, src, alt = "", featured = false }) {
  const cover = resolveCover(slug, src);

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
      {isOptimizableImageSrc(cover) ? (
        <Image
          src={cover}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        />
      ) : (
        <img
          src={cover}
          alt={alt}
          width={640}
          height={400}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
