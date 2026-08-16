"use client";
import { useHeaderContext } from "@/context_api/HeaderContext";
import Image from "next/image";
import Link from "next/link";
import useHomeLink from "@/hooks/useHomeLink";

const Logo = ({ isSticky = false }) => {
  const { headerType, isIndexPage } = useHeaderContext();
  const homeLink = useHomeLink();
  const isWide = headerType === 9 || headerType === 10;
  // Absolute header on inner pages sits over the dark breadcrumb banner.
  const onDarkBanner = !isSticky && !isIndexPage;

  return (
    <Link href={homeLink("/")} className="logo">
      {onDarkBanner ? (
        <Image
          className={`${isWide ? "w-full max-w-[190px]" : "w-15 h-15"}`}
          src={isWide ? "/img/logo/logo-9.png" : "/img/logo/logo.png"}
          alt="Dev Mohan"
          width={1000}
          height={1000}
          priority
        />
      ) : (
        <>
          <Image
            className={`${isWide ? "w-full max-w-[190px]" : "w-15 h-15"} hidden dark:inline-block`}
            src={isWide ? "/img/logo/logo-9.png" : "/img/logo/logo.png"}
            alt="Dev Mohan"
            width={1000}
            height={1000}
            priority
          />
          <Image
            className={`${isWide ? "w-full max-w-[190px]" : "w-15 h-15"} inline-block dark:hidden`}
            src="/img/logo/logo-dark.png"
            alt="Dev Mohan"
            width={1000}
            height={1000}
            priority
          />
        </>
      )}
    </Link>
  );
};

export default Logo;
