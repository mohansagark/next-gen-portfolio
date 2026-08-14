"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHeaderContext } from "@/context_api/HeaderContext";
import getNavItems from "@/libs/getNavItems";
import useHomeLink from "@/hooks/useHomeLink";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useId, useMemo } from "react";
import MobileMenuController from "./MobileMenuController";
import ThemeToggle from "@/components/shared/others/ThemeToggle";

const PANEL_EASE = { type: "tween", duration: 0.68, ease: [0.32, 0.72, 0, 1] };

const navListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: 18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: [0.32, 0.72, 0, 1] },
  },
};

const TOGGLE_SHELL = "menu-bar pointer-events-auto";

export default function MobileMenu({
  isActiveMobileMenu,
  setIsActiveMobileMenu,
  headerHeight = 0,
  fullHeight = false,
  onDarkBanner = false,
}) {
  const { isIndexPage } = useHeaderContext();
  const navItems = getNavItems();
  const homeLink = useHomeLink();
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const menuTop = fullHeight
    ? 0
    : headerHeight > 0
      ? Math.max(0, headerHeight - 1)
      : 64;

  const menuItems = useMemo(() => {
    const items = Array.isArray(navItems) ? [...navItems] : [];
    const hasContact = items.some(
      (item) => item?.path === "#contact" || item?.path2 === "/#contact",
    );
    if (!hasContact) {
      items.push({ name: "Contact", path: "#contact", path2: "/#contact" });
    }
    return items;
  }, [navItems]);

  useEffect(() => {
    if (!isActiveMobileMenu) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsActiveMobileMenu(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isActiveMobileMenu, setIsActiveMobileMenu]);

  const close = () => setIsActiveMobileMenu(false);

  return (
    <>
      <AnimatePresence>
        {isActiveMobileMenu ? (
          <motion.button
            key="mobile-menu-backdrop"
            type="button"
            aria-label="Close menu"
            className="fixed inset-x-0 bottom-0 z-[2147483100] bg-black/40 dark:bg-black/60 backdrop-blur-[2px] lg:hidden"
            style={{ top: menuTop }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0.01 } : PANEL_EASE}
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      {/*
        Always mounted: one hamburger/X lives on the sliding panel so it rides
        with the drawer. Closed (panel x: 100%): control peeks at viewport
        top-right. Open: same control sits at the panel’s top-left (leading edge).
      */}
      <motion.aside
        id={menuId}
        role={isActiveMobileMenu ? "dialog" : undefined}
        aria-modal={isActiveMobileMenu || undefined}
        aria-label={isActiveMobileMenu ? "Navigation menu" : undefined}
        className="fixed bottom-0 right-0 z-[2147483200] flex w-[min(19.5rem,86vw)] flex-col overflow-visible border-l border-black/10 dark:border-white/10 bg-[var(--off-white-color)] dark:bg-[var(--black-color)] shadow-[-16px_0_48px_rgba(0,0,0,0.18)] dark:shadow-[-16px_0_48px_rgba(0,0,0,0.55)] lg:hidden"
        style={{ top: menuTop }}
        initial={false}
        animate={{ x: isActiveMobileMenu ? 0 : "100%" }}
        transition={reduceMotion ? { duration: 0.01 } : PANEL_EASE}
      >
        {/*
          Anchored to panel top-left (open sketch). Closed: pull left by the
          control’s own width + gutter so it still peeks at viewport top-right
          while the panel is off-screen. Same node morphs ≡ ↔ X.
        */}
        <motion.div
          className={`absolute z-[2147483210] top-[max(1rem,env(safe-area-inset-top))] left-3 ${TOGGLE_SHELL}${
            onDarkBanner && !isActiveMobileMenu ? " menu-bar--on-dark" : ""
          }`}
          initial={false}
          animate={{
            /*
              Closed peek: pull left by control width + gutter.
              2.25rem ≈ left-3 (0.75) + ~1.5rem viewport inset (was 1.25,
              which left only ~0.5rem after left-3). Open stays at left-3.
            */
            x: isActiveMobileMenu
              ? 0
              : "calc(-100% - 2.25rem - env(safe-area-inset-right, 0px))",
          }}
          transition={reduceMotion ? { duration: 0.01 } : PANEL_EASE}
        >
          <MobileMenuController
            isActiveMobileMenu={isActiveMobileMenu}
            setIsActiveMobileMenu={setIsActiveMobileMenu}
          />
        </motion.div>

        <div
          className="flex h-full min-h-0 flex-col pt-[max(3.25rem,calc(env(safe-area-inset-top)+1.5rem))]"
          aria-hidden={!isActiveMobileMenu}
          style={{ pointerEvents: isActiveMobileMenu ? "auto" : "none" }}
        >
          {/* Logo top-center; horizontal padding clears the leading-edge X */}
          <div className="flex items-center justify-center px-14 pb-10">
            <Link
              href={homeLink("/")}
              onClick={close}
              className="logo inline-flex items-center"
              aria-label="Home"
              tabIndex={isActiveMobileMenu ? 0 : -1}
            >
              <Image
                className="w-12 h-12 hidden dark:inline-block"
                src="/img/logo/logo.png"
                alt="Dev Mohan"
                width={96}
                height={96}
              />
              <Image
                className="w-12 h-12 inline-block dark:hidden"
                src="/img/logo/logo-dark.png"
                alt="Dev Mohan"
                width={96}
                height={96}
              />
            </Link>
          </div>

          <motion.nav
            className="flex flex-1 flex-col items-center gap-0.5 overflow-y-auto px-3 py-2 text-center"
            initial={false}
            animate={isActiveMobileMenu ? "show" : "hidden"}
            variants={reduceMotion ? undefined : navListVariants}
          >
            {menuItems.map(({ name, path, path2 }) => (
              <motion.div
                key={name}
                className="w-full flex justify-center"
                variants={reduceMotion ? undefined : navItemVariants}
              >
                <Link
                  href={isIndexPage ? path : homeLink(path2)}
                  onClick={close}
                  tabIndex={isActiveMobileMenu ? 0 : -1}
                  className="block w-full rounded-xl px-3.5 py-3.5 text-center text-[1.05rem] font-medium text-primary-color-light dark:text-[#e5e7eb] transition-colors duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-teal-700 dark:hover:text-teal-300 active:scale-[0.99]"
                >
                  {name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <div className="mt-auto border-t border-black/10 dark:border-white/10 px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex flex-col gap-2.5">
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-primary-color-light/55 dark:text-white/45 font-medium px-0.5">
                Appearance
              </span>
              <ThemeToggle tabIndex={isActiveMobileMenu ? 0 : -1} />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
