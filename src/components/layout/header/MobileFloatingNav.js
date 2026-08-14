"use client";

import { useHeaderContext } from "@/context_api/HeaderContext";
import useHomeLink from "@/hooks/useHomeLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

/**
 * Mobile-only chrome: floating hamburger (+ logo bar on inner pages).
 * Desktop keeps the full Header / edge theme tab unchanged.
 */
export default function MobileFloatingNav() {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const { isIndexPage } = useHeaderContext();
  const homeLink = useHomeLink();
  const pathname = usePathname() || "";
  const showTopLogo = !isIndexPage;
  // Blog breadcrumb is full-bleed under the chrome — no spacer, light logo.
  const bannerUnderChrome = pathname === "/blogs" || pathname.startsWith("/blogs/");

  return (
    <div className="lg:hidden">
      {showTopLogo ? (
        <>
          {!bannerUnderChrome ? (
            <div
              className="h-[calc(3.75rem+env(safe-area-inset-top))]"
              aria-hidden
            />
          ) : null}
          <div className="pointer-events-none fixed inset-x-0 top-0 z-[2147483000] px-5 sm:px-6 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="container max-w-[1120px] min-[1920px]:!max-w-[1680px] flex items-center justify-between gap-3">
              <Link
                href={homeLink("/")}
                className="pointer-events-auto logo inline-flex h-11 items-center"
                aria-label="Home"
              >
                {bannerUnderChrome ? (
                  <Image
                    className="size-9"
                    src="/img/logo/logo.png"
                    alt="Dev Mohan"
                    width={72}
                    height={72}
                    priority
                  />
                ) : (
                  <>
                    <Image
                      className="size-9 hidden dark:inline-block"
                      src="/img/logo/logo.png"
                      alt="Dev Mohan"
                      width={72}
                      height={72}
                      priority
                    />
                    <Image
                      className="size-9 inline-block dark:hidden"
                      src="/img/logo/logo-dark.png"
                      alt="Dev Mohan"
                      width={72}
                      height={72}
                      priority
                    />
                  </>
                )}
              </Link>
              <span className="size-11 shrink-0" aria-hidden />
            </div>
          </div>
        </>
      ) : null}

      <MobileMenu
        isActiveMobileMenu={isActiveMobileMenu}
        setIsActiveMobileMenu={setIsActiveMobileMenu}
        fullHeight
        onDarkBanner={bannerUnderChrome}
      />
    </div>
  );
}
