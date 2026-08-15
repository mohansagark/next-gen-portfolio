"use client";

import DeferredIconStyles from "@/components/shared/others/DeferredIconStyles";
import ThmeModeSwither from "@/components/shared/others/ThmeModeSwither";
import LeoLoader from "@/components/shared/others/LeoLoader";
import { Analytics } from "@vercel/analytics/next";

/** Production / preview chrome that we strip from CI Lighthouse builds. */
export default function ShellExtras() {
  return (
    <>
      <DeferredIconStyles />
      <ThmeModeSwither />
      <LeoLoader workerUrl={process.env.NEXT_PUBLIC_LEO_WORKER_URL} />
      {process.env.VERCEL ? <Analytics /> : null}
    </>
  );
}
