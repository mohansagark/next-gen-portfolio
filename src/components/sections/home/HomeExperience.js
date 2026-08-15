"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getContent } from "@/libs/contentStore";
import { fmtMonth, fmtRange } from "@/libs/contentMapping";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/sections/home/ScrollReveal";

const EASE = [0.32, 0.72, 0, 1];
const PANEL_TRANSITION = { duration: 0.45, ease: EASE };

const INSTITUTION_URLS = {
  "Vellore Institute of Technology": "https://vit.ac.in",
  Scaler: "https://www.scaler.com",
  "Imarticus Learning": "https://imarticus.org",
};

const PROVIDER_URLS = {
  AMD: "https://www.amd.com",
  LinkedIn: "https://www.linkedin.com/learning",
  "Imarticus Learning": "https://imarticus.org",
};

function resolveExperienceLogo(job) {
  const logo = String(job.logo || "");
  const company = String(job.company || "");
  const hay = `${logo} ${company}`.toLowerCase();

  if (/accenture/.test(hay)) return "/images/experience/accenture.jpg";
  if (/servicenow/.test(hay)) return "/images/experience/servicenow.jpg";
  if (/invesco/.test(hay)) return "/images/experience/invesco.jpg";
  if (/reliance|jio/.test(hay)) return "/images/experience/reliance.jpg";
  if (/zentree/.test(hay)) return "/images/experience/zentreelabs.jpg";
  if (/shell/.test(hay)) return "/images/experience/shell.jpg";

  if (!logo) return "";
  const file = logo.split("/").pop() || "";
  const localJpg = file.replace(/\.png$/i, ".jpg");
  if (localJpg && /\.(jpe?g|webp|svg)$/i.test(localJpg)) {
    return `/images/experience/${localJpg}`;
  }
  if (logo.startsWith("http") || logo.startsWith("/images/")) return logo;
  return `/images/experience/${file}`;
}

/** Same circular avatar treatment as experience — local education marks. */
function resolveCredentialLogo({ logo, badge, org } = {}) {
  const mark = String(logo || badge || "");
  const hay = `${mark} ${org || ""}`.toLowerCase();

  if (/vellore|\bvit\b/.test(hay)) return "/images/education/vit.png";
  if (/scaler/.test(hay)) return "/images/education/scaler.png";
  if (/imarticus/.test(hay)) return "/images/education/imarticus.png";
  if (/linkedin/.test(hay)) return "/images/education/linkedin.png";
  if (/\bamd\b/.test(hay)) return "/images/education/amd.png";

  if (!mark) return "";
  if (mark.startsWith("http") || mark.startsWith("/images/")) return mark;
  return `/images/education/${mark.split("/").pop()}`;
}

function splitLocationMode(location = "") {
  const parts = String(location)
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return {
      place: parts.slice(0, -1).join(" · "),
      mode: parts[parts.length - 1],
    };
  }
  const remote = /remote/i.test(location);
  return {
    place: location || "",
    mode: remote ? "Remote" : "",
  };
}

function inferEmploymentType(role = "") {
  if (/freelance|contract|consultant/i.test(role)) return "Contract";
  if (/intern/i.test(role)) return "Internship";
  return "Full-time";
}

function inferLevelPill(role = "") {
  if (/senior|sde\s*[–-]?\s*3|lead/i.test(role)) return "Senior level";
  if (/principal|staff|architect/i.test(role)) return "Staff level";
  if (/junior|associate|analyst/i.test(role)) return "Associate";
  return "";
}

function hostLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "visit site";
  }
}

function initials(name = "") {
  return String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ExperienceCredentialsToggle({ value, onChange }) {
  const isCredentials = value === "credentials";

  return (
    <div
      role="group"
      aria-label="Experience or credentials"
      className="relative mx-auto mb-10 md:mb-12 grid w-full max-w-md grid-cols-2 rounded-full border border-black/10 dark:border-white/12 bg-black/[0.04] dark:bg-white/[0.06] p-1"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full shadow-sm",
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
          isCredentials
            ? "translate-x-full bg-white dark:bg-[#181c22] dark:ring-1 dark:ring-white/10"
            : "translate-x-0 bg-white dark:bg-[#181c22] dark:ring-1 dark:ring-white/10",
        )}
      />

      <button
        type="button"
        aria-pressed={!isCredentials}
        onClick={() => onChange("experience")}
        className={cn(
          "relative z-[1] inline-flex items-center justify-center rounded-full px-3 py-2.5 text-xs sm:text-sm font-medium",
          "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          !isCredentials
            ? "text-primary-color-light dark:text-white"
            : "text-primary-color-light/55 dark:text-[#9aa3af]",
        )}
      >
        Experience
      </button>
      <button
        type="button"
        aria-pressed={isCredentials}
        onClick={() => onChange("credentials")}
        className={cn(
          "relative z-[1] inline-flex items-center justify-center rounded-full px-3 py-2.5 text-xs sm:text-sm font-medium",
          "transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isCredentials
            ? "text-primary-color-light dark:text-white"
            : "text-primary-color-light/55 dark:text-[#9aa3af]",
        )}
      >
        Credentials
      </button>
    </div>
  );
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * Job-board style tile: logo + timeline, org name, title, pills, location + site CTA.
 * No subtitle, no pay — matches the selected reference layout.
 */
function RoleTile({
  logoSrc,
  org,
  title,
  timeline,
  pills = [],
  location,
  href,
  ctaLabel,
}) {
  const label = ctaLabel || (href ? hostLabel(href) : "");

  return (
    <li className="flex h-full flex-col rounded-2xl border border-[#e8eaed] dark:border-[#262b33] bg-white dark:bg-[#12151a] p-4 sm:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-full border border-[#e5e7eb] dark:border-[#262b33] bg-transparent">
          {logoSrc ? (
            // Full-bleed cover so colored logo squares fill the circle — no white chip/padding corners.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6] dark:bg-[#1a1e24] text-[0.7rem] font-semibold tracking-wide text-[#6b7280] dark:text-[#9aa3af]">
              {initials(org)}
            </span>
          )}
        </div>
        {timeline ? (
          <p className="hidden sm:block max-w-[60%] whitespace-nowrap text-right text-xs font-medium text-[#6b7280] dark:text-[#9aa3af] tabular-nums leading-snug pt-0.5">
            {timeline}
          </p>
        ) : null}
      </div>

      <p className="mt-3.5 text-sm font-medium text-[#0b0d10] dark:text-[#e5e7eb]">
        {org}
      </p>

      {timeline ? (
        <p className="mt-1 sm:hidden whitespace-nowrap text-[0.7rem] font-medium text-[#6b7280] dark:text-[#9aa3af] tabular-nums">
          {timeline}
        </p>
      ) : null}

      <h3 className="mt-2 text-[1.05rem] sm:text-lg font-semibold leading-snug text-[#0b0d10] dark:text-[#f3f4f6]">
        {title}
      </h3>

      {pills.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {pills.filter(Boolean).map((pill) => (
            <span
              key={pill}
              className="inline-flex rounded-full bg-[#f3f4f6] dark:bg-[#1a1e24] px-2.5 py-1 text-[0.7rem] font-medium text-[#4b5563] dark:text-[#9aa3af]"
            >
              {pill}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <div className="min-w-0">
          {location ? (
            <p className="text-xs sm:text-sm text-[#6b7280] dark:text-[#9aa3af] leading-snug">
              {location}
            </p>
          ) : null}
        </div>
        {href ? (
          <>
            {/* Mobile: plain icon link (not a button) */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${org} (${label})`}
              className="sm:hidden inline-flex shrink-0 items-center justify-center text-primary-color hover:text-primary-color/80 dark:text-[#5eead4] dark:hover:text-[#5eead4]/80 transition-colors"
            >
              <ExternalLinkIcon className="size-5" />
            </a>
            {/* Desktop: secondary button theme */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex shrink-0 items-center justify-center rounded-full border border-primary-color px-3.5 py-2 text-xs font-medium lowercase tracking-wide text-primary-color transition-colors duration-300 hover:bg-primary-color hover:text-white dark:border-[#5eead4] dark:text-[#5eead4] dark:hover:bg-[#5eead4] dark:hover:text-[#0b0d10]"
            >
              {label}
            </a>
          </>
        ) : null}
      </div>
    </li>
  );
}

function TileGrid({ children }) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
      {children}
    </ul>
  );
}

function ExperienceList({ jobs }) {
  return (
    <TileGrid>
      {jobs.map((job) => {
        const logoSrc = resolveExperienceLogo(job);
        const timeline = fmtRange(job.startDate, job.endDate, job.current);
        const { place, mode } = splitLocationMode(job.location);
        const pills = [
          inferEmploymentType(job.role),
          mode || inferLevelPill(job.role),
        ].filter(Boolean);

        return (
          <RoleTile
            key={`${job.company}-${job.startDate}`}
            logoSrc={logoSrc}
            org={job.company}
            title={job.role}
            timeline={timeline}
            pills={pills}
            location={place || job.location}
            href={job.companyUrl}
          />
        );
      })}
    </TileGrid>
  );
}

function CredentialsList({ degrees, certifications, achievements }) {
  return (
    <div className="space-y-8 md:space-y-10">
      {degrees.length ? (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-[#6b7280] dark:text-[#9aa3af] mb-3 md:mb-4">
            Education
          </h3>
          <TileGrid>
            {degrees.map((d) => {
              const href =
                d.institutionUrl || INSTITUTION_URLS[d.institution] || "";
              return (
                <RoleTile
                  key={`${d.institution}-${d.degree}-${d.endDate}`}
                  logoSrc={resolveCredentialLogo({
                    logo: d.logo,
                    org: d.institution,
                  })}
                  org={d.institution}
                  title={[d.degree, d.field].filter(Boolean).join(" · ")}
                  timeline={fmtRange(d.startDate, d.endDate, false)}
                  pills={["Education", d.grade ? `Grade ${d.grade}` : ""].filter(
                    Boolean,
                  )}
                  location={d.location}
                  href={href}
                />
              );
            })}
          </TileGrid>
        </div>
      ) : null}

      {certifications.length ? (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-[#6b7280] dark:text-[#9aa3af] mb-3 md:mb-4">
            Certifications
          </h3>
          <TileGrid>
            {certifications.map((c) => {
              const href =
                c.credentialUrl ||
                c.providerUrl ||
                PROVIDER_URLS[c.provider] ||
                "";
              return (
                <RoleTile
                  key={`${c.title}-${c.provider}-${c.issueDate}`}
                  logoSrc={resolveCredentialLogo({
                    badge: c.badge,
                    org: c.provider,
                  })}
                  org={c.provider}
                  title={c.title}
                  timeline={
                    c.issueDate ? `Issued ${fmtMonth(c.issueDate)}` : ""
                  }
                  pills={[
                    "Certification",
                    c.expiryDate ? `Expires ${fmtMonth(c.expiryDate)}` : "",
                  ].filter(Boolean)}
                  location={c.location || undefined}
                  href={href}
                  ctaLabel={c.credentialUrl ? "Credential" : undefined}
                />
              );
            })}
          </TileGrid>
        </div>
      ) : null}

      {achievements.length ? (
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-[#6b7280] dark:text-[#9aa3af] mb-3 md:mb-4">
            Awards
          </h3>
          <TileGrid>
            {achievements.map((a) => (
              <RoleTile
                key={`${a.title}-${a.year}`}
                logoSrc={resolveExperienceLogo({
                  company: a.company || "",
                  logo: "",
                })}
                org={a.company || a.org || "Award"}
                title={a.title}
                timeline={a.year}
                pills={["Award"]}
              />
            ))}
          </TileGrid>
        </div>
      ) : null}
    </div>
  );
}

export default function HomeExperience() {
  const [tab, setTab] = useState("experience");
  const reduceMotion = useReducedMotion();
  const jobs = getContent("experience") || [];
  const education = getContent("education") || {};
  const degrees = education.degrees || [];
  const certifications = education.certifications || [];
  const achievements = getContent("achievements") || [];

  const isExperience = tab === "experience";
  const heading = isExperience ? "Experience" : "Credentials";
  const subcopy = isExperience
    ? "Ownership, architecture, and outcomes."
    : "Education, certifications, and recognition";

  return (
    <section id="experience" className="scroll-mt-24 lg:scroll-mt-28 py-16 sm:py-20 md:py-28">
      <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] px-5 sm:px-6">
        <ScrollReveal>
          <div className="relative min-h-[4.75rem] sm:min-h-[5.5rem] mb-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`heading-${tab}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={reduceMotion ? { duration: 0.01 } : PANEL_TRANSITION}
                className="text-center"
              >
                <h2 className="font-display text-3xl md:text-4xl text-[#0b0d10] dark:text-[#f3f4f6] mb-3">
                  {heading}
                </h2>
                <p className="text-[#374151] dark:text-[#9aa3af] max-w-2xl leading-relaxed mx-auto">
                  {subcopy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <ExperienceCredentialsToggle value={tab} onChange={setTab} />

        <div className="relative min-h-[12rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, filter: "blur(4px)" }
              }
              transition={reduceMotion ? { duration: 0.01 } : PANEL_TRANSITION}
            >
              {isExperience ? (
                <ExperienceList jobs={jobs} />
              ) : (
                <CredentialsList
                  degrees={degrees}
                  certifications={certifications}
                  achievements={achievements}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
