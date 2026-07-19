"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Collapsed quotes are clamped to this many lines so every card starts at a
// consistent height regardless of testimonial length. Cards whose quote
// overflows the clamp get a Read more / Read less toggle that expands the tile.
const CLAMP_LINES = 6;

const TestimonialsCard = ({ testimonial }) => {
  const { authorName, authorDesig, desc, img, logoImg, logoImgLight } =
    testimonial ? testimonial : {};

  const quoteRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  // Detect overflow only while collapsed: if the clamped paragraph's content
  // is taller than its box, the quote is longer than CLAMP_LINES lines. Skip
  // when expanded so the toggle stays visible; re-measure on resize.
  useEffect(() => {
    if (expanded) return;
    const el = quoteRef.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [desc, expanded]);

  const clampStyle = expanded
    ? undefined
    : {
        display: "-webkit-box",
        WebkitLineClamp: CLAMP_LINES,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      };
  return (
    <div className="p-25px bg-white-color dark:bg-primary-color-light rounded-15px relative z-0 group">
      <div className="flex justify-between gap-30px mb-5">
        {logoImg && logoImgLight ? (
          <div className="max-w-100px w-full">
            <Image
              src={logoImg}
              alt=""
              className="!hidden dark:!block"
              width={500}
              height={100}
            />
            <Image
              src={logoImgLight}
              alt=""
              className="!block dark:!hidden"
              width={500}
              height={100}
            />
          </div>
        ) : (
          <div className="max-w-100px w-full" />
        )}
        <div className="max-w-120px w-2/5">
          <Image
            className="rounded-5px rounded-bl-125px w-full"
            src={img || "/img/testimonials/1.png"}
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="text-primary-color-light dark:text-white-color relative z-10">
        <div className="icon-box mb-25px flex gap-1">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300"
          >
            <path
              d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
              fill="url(#paint6_linear_263_514)"
              className="fill-primary-color"
            ></path>
            <defs>
              <linearGradient
                x1="-0.0363755"
                y1="-0.0729998"
                x2="35.3333"
                y2="-0.0729991"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="1" stopColor="var(--tj-theme-primary)"></stop>
                <stop offset="1" stopColor="#140C1C" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300 ml-1"
          >
            <path
              d="M0.105431 2.18998C0.0301532 0.988687 1.02531 -0.00647222 2.2266 0.0688056L19.4961 1.15097C21.2148 1.25867 22.0029 3.34358 20.7852 4.56127L4.5979 20.7486C3.3802 21.9663 1.2953 21.1781 1.1876 19.4594L0.105431 2.18998Z"
              fill="url(#paint7_linear_263_515)"
              className="fill-primary-color"
            ></path>
            <defs>
              <linearGradient
                x1="-0.0363755"
                y1="-0.0729998"
                x2="35.3333"
                y2="-0.0729991"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="1" stopColor="var(--tj-theme-primary)"></stop>
                <stop offset="1" stopColor="#140C1C" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mb-30px md:mb-50px">
          <p
            ref={quoteRef}
            style={clampStyle}
            className="text-primary-color-light dark:text-body-color"
          >
            {desc}
          </p>
          {overflowing && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              style={{ color: "var(--tj-theme-primary)" }}
              className="mt-2 text-sm font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity focus:outline-none"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
        <h4 className="text-lg mb-2">{authorName}</h4>

        <p className="text-primary-color-light dark:text-body-color text-sm">
          {authorDesig}
        </p>
      </div>
    </div>
  );
};

export default TestimonialsCard;
