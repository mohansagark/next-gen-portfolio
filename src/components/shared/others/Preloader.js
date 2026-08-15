"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];

const contentVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(6px)",
    transition: { duration: 0.32, ease: EASE_IN_OUT },
  },
};

const logoVariants = {
  initial: { opacity: 0, scale: 0.82, y: 16, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -10,
    filter: "blur(8px)",
    transition: { duration: 0.32, ease: EASE_IN_OUT },
  },
};

const ruleVariants = {
  initial: { opacity: 0, scaleX: 0 },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scaleX: 0.4,
    transition: { duration: 0.28, ease: EASE_IN_OUT },
  },
};

const progressVariants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 1.35, ease: EASE_OUT, delay: 0.3 },
      opacity: { duration: 0.3, delay: 0.28 },
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Home splash with staggered Motion enter/exit.
 * Shows only on a hard load/reload of `/` (boot script sets `html.splash-pending`).
 * Soft navigations back to home (e.g. from a service page) skip it.
 */
export default function Preloader({ isHome = false }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (!isHome) {
      document.documentElement.classList.remove("splash-pending");
      document.documentElement.style.removeProperty("background-color");
      document.body.classList.remove("loaded");
      // Syncing with the boot script's pre-hydration DOM class, not derivable
      // from props/state during render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    const isHardHomeLoad =
      document.documentElement.classList.contains("splash-pending");

    if (!isHardHomeLoad) {
      document.body.classList.remove("loaded");
      document.documentElement.style.removeProperty("background-color");
      setVisible(false);
      return;
    }

    setVisible(true);
    document.body.classList.add("loaded");
    document.documentElement.classList.remove("splash-pending");
    document.documentElement.style.removeProperty("background-color");
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !visible) return undefined;

    const minHold = reduceMotion ? 200 : 1500;
    const maxHold = reduceMotion ? 600 : 3000;

    let minReady = false;
    let loadReady = document.readyState === "complete";
    let dismissed = false;

    const dismiss = () => {
      if (dismissed || !minReady || !loadReady) return;
      dismissed = true;
      setVisible(false);
    };

    const minTimer = window.setTimeout(() => {
      minReady = true;
      dismiss();
    }, minHold);

    const maxTimer = window.setTimeout(() => {
      loadReady = true;
      minReady = true;
      dismiss();
    }, maxHold);

    const onLoad = () => {
      loadReady = true;
      dismiss();
    };

    if (!loadReady) {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [isHome, visible, reduceMotion]);

  const unlockScroll = () => {
    document.body.classList.remove("loaded");
    document.documentElement.classList.remove("splash-pending");
    document.documentElement.style.removeProperty("background-color");
  };

  if (!isHome && !visible) return null;

  if (reduceMotion) {
    return (
      <AnimatePresence onExitComplete={unlockScroll}>
        {visible ? (
          <motion.div
            key="splash-reduced"
            className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-[#0b0d10]"
            initial={false}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            aria-hidden
          >
            <div className="flex flex-col items-center px-6 text-center">
              <Image
                src="/img/logo/logo.png"
                alt=""
                width={80}
                height={80}
                className="mb-6 h-16 w-16"
                priority
              />
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-teal-300/80">
                Mohan Sagar
              </p>
              <p className="font-display text-2xl text-white whitespace-nowrap sm:text-3xl">
                AI Engineer · Frontend Architect
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {visible ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[2147483646] flex items-center justify-center overflow-hidden bg-[#0b0d10]"
          initial={false}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.55,
              ease: EASE_IN_OUT,
              when: "afterChildren",
            },
          }}
          aria-hidden
        >
          <motion.div
            className="pointer-events-none absolute -top-24 right-[-10%] h-[55vw] max-h-[560px] w-[55vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.22),transparent_68%)] blur-2xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 1, ease: EASE_OUT },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          />

          <motion.div
            className="relative flex flex-col items-center px-6 text-center"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div className="mb-6" variants={logoVariants}>
              <Image
                src="/img/logo/logo.png"
                alt=""
                width={80}
                height={80}
                className="h-16 w-16 sm:h-20 sm:w-20"
                priority
              />
            </motion.div>

            <motion.p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-teal-300/80"
              variants={itemVariants}
            >
              Mohan Sagar
            </motion.p>

            <motion.p
              className="font-display text-2xl text-white whitespace-nowrap sm:text-4xl"
              variants={itemVariants}
            >
              AI Engineer · Frontend Architect
            </motion.p>

            <motion.div
              className="mx-auto mt-8 h-px w-16 origin-center bg-teal-300/70"
              variants={ruleVariants}
            />

            <motion.div
              className="mt-10 h-px w-28 origin-left rounded-full bg-white/10"
              variants={progressVariants}
            >
              <span className="sr-only">Loading</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
