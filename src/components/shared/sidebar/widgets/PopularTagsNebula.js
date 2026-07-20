"use client";

import getPopularTags from "@/libs/getPopularTags";
import makePath from "@/libs/makePath";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MAX_ORBS = 12;

// Sidebar "Popular Topics" widget: tags as weighted violet orbs floating in a
// nebula, diameter scaling with post count. Orb size is derived from the
// measured column width so it fits the narrow sidebar. On fine-pointer devices
// the orbs ease away from the cursor; on touch / small screens the cursor
// physics are dropped for a calm packed cloud. Reduced-motion pins them static.
const PopularTagsNebula = () => {
  const tags = (getPopularTags() || []).slice(0, MAX_ORBS);

  const fieldRef = useRef(null);
  const orbEls = useRef([]);
  const sim = useRef({ orbs: [], mouse: { x: -9999, y: -9999 }, raf: 0 });
  const [bases, setBases] = useState([]); // [{x,y,d}] center coords + diameter

  const counts = tags.map((t) => t.count);
  const maxC = counts.length ? Math.max(...counts) : 1;
  const minC = counts.length ? Math.min(...counts) : 1;

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
      // Orb diameter derived from the measured column width so the nebula
      // fits whatever space the sidebar gives it.
      const base = W * 0.18;
      const sizeOf = (c) => {
        const t = maxC === minC ? 1 : (c - minC) / (maxC - minC);
        const d = base * (0.7 + 0.85 * Math.pow(t, 0.9));
        return Math.max(30, Math.min(W * 0.42, d));
      };
      const placed = [];
      tags.forEach(({ count }) => {
        const d = sizeOf(count);
        const r = d / 2;
        let x = W / 2;
        let y = H / 2;
        for (let i = 0; i < 260; i++) {
          x = r + 5 + Math.random() * Math.max(1, W - d - 10);
          y = r + 5 + Math.random() * Math.max(1, H - d - 10);
          if (placed.every((p) => Math.hypot(p.x - x, p.y - y) > (p.r + r) * 0.88))
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
          tx += Math.cos(t / 1600 + o.ph) * 5;
          ty += Math.sin(t / 1900 + o.ph) * 5;
        }
        if (fine) {
          const dx = o.x - mouse.x;
          const dy = o.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < o.r + 60) {
            const f = ((o.r + 60 - dist) / (o.r + 60)) * 20;
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
    <div
      className="px-15px md:px-25px py-30px bg-cream-light-color dark:bg-primary-color-light rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <h3 className="mb-25px text-primary-color dark:text-white-color uppercase relative z-0 text-size-lg md:text-xl font-bold">
        Popular Topics
      </h3>

      <div
        ref={fieldRef}
        className="relative rounded-lg overflow-hidden h-[320px]"
        style={{
          background:
            "radial-gradient(120% 90% at 25% 15%, rgba(135,80,247,.12), transparent 60%), radial-gradient(120% 90% at 85% 95%, rgba(155,141,255,.12), transparent 60%)",
        }}
      >
        {tags.map((t, i) => {
          const b = bases[i];
          const positioned = Boolean(b);
          const d = b ? b.d : 44;
          const fontSize = Math.max(10, Math.min(15, d * 0.26));
          return (
            <Link
              key={t.tag}
              href={`/blogs?tag=${makePath(t.tag)}`}
              ref={(el) => (orbEls.current[i] = el)}
              aria-label={`${t.tag} — ${t.count} posts`}
              title={`${t.tag} · ${t.count} posts`}
              className="flex flex-col items-center justify-center text-center text-white-color no-underline"
              style={{
                position: positioned ? "absolute" : "relative",
                width: d,
                height: d,
                left: positioned ? b.x - d / 2 : undefined,
                top: positioned ? b.y - d / 2 : undefined,
                margin: positioned ? 0 : 4,
                display: positioned ? "flex" : "inline-flex",
                borderRadius: "50%",
                cursor: "pointer",
                willChange: "transform",
                background:
                  "radial-gradient(circle at 35% 30%, #b98cff, #8750f7 55%, #2a1454)",
                boxShadow:
                  "0 0 0 1px rgba(155,141,255,.35), 0 6px 18px rgba(135,80,247,.35), inset 0 5px 12px rgba(255,255,255,.18)",
              }}
            >
              <span
                className="font-bold leading-tight px-1"
                style={{ fontSize }}
              >
                {t.tag}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTagsNebula;
