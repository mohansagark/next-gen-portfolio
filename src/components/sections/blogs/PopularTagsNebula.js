"use client";

import getPopularTags from "@/libs/getPopularTags";
import makePath from "@/libs/makePath";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MAX_ORBS = 12;

// Tags as weighted orbs floating in a violet nebula: diameter tracks post
// count, orbs drift gently and (on fine-pointer devices) ease away from the
// cursor. On touch / small screens the cursor physics are dropped for a calm,
// battery-friendly packed cloud. Reduced-motion pins everything static.
const PopularTagsNebula = () => {
  const tags = (getPopularTags() || []).slice(0, MAX_ORBS);

  const fieldRef = useRef(null);
  const orbEls = useRef([]);
  const sim = useRef({ orbs: [], mouse: { x: -9999, y: -9999 }, raf: 0 });
  const [bases, setBases] = useState([]); // [{x,y,d}] center coords + diameter

  const counts = tags.map((t) => t.count);
  const maxC = counts.length ? Math.max(...counts) : 1;
  const minC = counts.length ? Math.min(...counts) : 1;
  const sizeOf = (c) => {
    const t = maxC === minC ? 1 : (c - minC) / (maxC - minC);
    return 40 + 66 * Math.pow(t, 0.9);
  };

  // Pack the orbs into the measured field with light relaxation, then run the
  // float / repulsion loop. Re-runs on resize.
  useEffect(() => {
    if (!tags.length) return;
    const field = fieldRef.current;
    if (!field) return;

    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;

    const layout = () => {
      const rect = field.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const placed = [];
      tags.forEach(({ count }) => {
        const d = sizeOf(count);
        const r = d / 2;
        let x = W / 2;
        let y = H / 2;
        for (let i = 0; i < 240; i++) {
          x = r + 6 + Math.random() * Math.max(1, W - d - 12);
          y = r + 6 + Math.random() * Math.max(1, H - d - 12);
          if (placed.every((p) => Math.hypot(p.x - x, p.y - y) > (p.r + r) * 0.9))
            break;
        }
        placed.push({ x, y, r, d });
      });
      const next = placed.map(({ x, y, d }) => ({ x, y, d }));
      setBases(next);
      sim.current.orbs = next.map((b, i) => ({
        bx: b.x,
        by: b.y,
        r: b.d / 2,
        x: b.x,
        y: b.y,
        ph: (i * 137.5 * Math.PI) / 180,
      }));
    };

    layout();

    const onMove = (e) => {
      const rect = field.getBoundingClientRect();
      sim.current.mouse.x = e.clientX - rect.left;
      sim.current.mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      sim.current.mouse.x = -9999;
      sim.current.mouse.y = -9999;
    };
    if (fine) {
      field.addEventListener("pointermove", onMove);
      field.addEventListener("pointerleave", onLeave);
    }

    const tick = (t) => {
      if (cancelled) return;
      const { orbs, mouse } = sim.current;
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        let tx = o.bx;
        let ty = o.by;
        if (!reduce) {
          tx += Math.cos(t / 1600 + o.ph) * 7;
          ty += Math.sin(t / 1900 + o.ph) * 7;
        }
        if (fine) {
          const dx = o.x - mouse.x;
          const dy = o.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < o.r + 70) {
            const f = ((o.r + 70 - dist) / (o.r + 70)) * 24;
            tx += (dx / dist) * f;
            ty += (dy / dist) * f;
          }
        }
        o.x += (tx - o.x) * 0.08;
        o.y += (ty - o.y) * 0.08;
        const el = orbEls.current[i];
        if (el) el.style.transform = `translate(${o.x - o.bx}px, ${o.y - o.by}px)`;
      }
      sim.current.raf = requestAnimationFrame(tick);
    };
    if (!reduce || fine) sim.current.raf = requestAnimationFrame(tick);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(sim.current.raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags.length]);

  if (!tags.length) return null;

  return (
    <section
      id="popular-tags"
      className="py-50px md:py-70px bg-white-color dark:bg-black-color"
    >
      <div className="container">
        <div className="flex items-center gap-3 mb-30px md:mb-40px">
          <span className="w-6 h-[2px] bg-primary-color rounded-full" />
          <h2 className="text-primary-color-light dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold tracking-wider">
            Popular Topics
          </h2>
        </div>

        <div
          ref={fieldRef}
          className="relative rounded-15px overflow-hidden h-[420px] sm:h-[360px] border border-border-color dark:border-gray-color-3"
          style={{
            background:
              "radial-gradient(120% 90% at 25% 15%, rgba(135,80,247,.10), transparent 60%), radial-gradient(120% 90% at 85% 95%, rgba(155,141,255,.10), transparent 60%)",
          }}
        >
          {tags.map((t, i) => {
            const base = bases[i];
            const d = base ? base.d : sizeOf(t.count);
            const positioned = Boolean(base);
            const fontSize = Math.max(11, Math.min(19, d * 0.24));
            return (
              <Link
                key={t.tag}
                href={`/blogs?tag=${makePath(t.tag)}`}
                ref={(el) => (orbEls.current[i] = el)}
                aria-label={`${t.tag} — ${t.count} posts`}
                className="group flex flex-col items-center justify-center text-center text-white-color no-underline"
                style={{
                  position: positioned ? "absolute" : "relative",
                  width: d,
                  height: d,
                  left: positioned ? base.x - d / 2 : undefined,
                  top: positioned ? base.y - d / 2 : undefined,
                  margin: positioned ? 0 : 6,
                  display: positioned ? "flex" : "inline-flex",
                  borderRadius: "50%",
                  cursor: "pointer",
                  willChange: "transform",
                  background:
                    "radial-gradient(circle at 35% 30%, #b98cff, #8750f7 55%, #2a1454)",
                  boxShadow:
                    "0 0 0 1px rgba(155,141,255,.35), 0 8px 26px rgba(135,80,247,.35), inset 0 6px 14px rgba(255,255,255,.18)",
                  transition: "box-shadow .25s",
                }}
              >
                <span
                  className="font-bold leading-tight px-1"
                  style={{ fontSize }}
                >
                  {t.tag}
                </span>
                {d > 60 ? (
                  <span
                    className="opacity-80 mt-[2px]"
                    style={{ fontSize: 10, fontFamily: "ui-monospace, Menlo, monospace" }}
                  >
                    {t.count} posts
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularTagsNebula;
