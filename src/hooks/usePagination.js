"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

/**
 * Blog list pagination synced to the URL via `?page=` (1-based).
 * Reload / share keeps the same page. Page 1 omits the param.
 */
const usePagination = (
  filteredItems,
  currentLimit,
  pagiItemsLengthPerView,
  scrollTargetId = "blogs"
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = currentLimit ? currentLimit : 6;
  const totalItems = filteredItems?.length ?? 0;
  const totalPages = Math.ceil(totalItems / limit) || 0;

  const currentpage = useMemo(() => {
    if (totalPages <= 0) return 0;
    const raw = parseInt(searchParams.get("page") || "1", 10);
    const index = Number.isFinite(raw) ? raw - 1 : 0;
    if (index < 0) return 0;
    if (index > totalPages - 1) return totalPages - 1;
    return index;
  }, [searchParams, totalPages]);

  const dropPageFromUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("page")) return;
    params.delete("page");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  const setPageInUrl = useCallback(
    (pageIndex) => {
      const params = new URLSearchParams(searchParams.toString());
      const pageNum = Math.max(1, pageIndex + 1);
      if (pageNum <= 1) params.delete("page");
      else params.set("page", String(pageNum));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Keep ?page= honest: drop it when there are no results, and clamp or discard
  // values that filters made out of range or that were never a number at all.
  useEffect(() => {
    const param = searchParams.get("page");
    if (param === null) return;
    if (totalPages <= 0) {
      dropPageFromUrl();
      return;
    }
    const raw = parseInt(param, 10);
    if (!Number.isFinite(raw)) {
      dropPageFromUrl();
      return;
    }
    if (raw < 1 || raw > totalPages) {
      setPageInUrl(Math.min(Math.max(raw - 1, 0), totalPages - 1));
    }
  }, [totalPages, searchParams, setPageInUrl, dropPageFromUrl]);

  const skip = limit * currentpage;
  const currentItems = filteredItems?.slice(skip, skip + limit);
  const totalCurrentItems = currentItems?.length ?? 0;
  const paginationItems = useMemo(
    () => Array.from({ length: totalPages }, (_, idx) => idx),
    [totalPages]
  );

  const handleCurrentPage = (e, id) => {
    // The links carry href="#blogs" only as a no-JS fallback; we suppress the
    // hash navigation (it would stack history entries) and scroll explicitly,
    // otherwise the viewport stays parked on the pagination bar.
    e?.preventDefault?.();
    setPageInUrl(id);
    if (typeof document === "undefined") return;
    document
      .getElementById(scrollTargetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let showMore = false;
  let currentPaginationItems = paginationItems;
  if (totalPages > pagiItemsLengthPerView) {
    showMore = currentpage + 1 > totalPages / 2 ? "left" : "right";
    const sliceStartPoint =
      currentpage >= totalPages - (pagiItemsLengthPerView < 6 ? 2 : 3)
        ? -(pagiItemsLengthPerView - 2)
        : currentpage < pagiItemsLengthPerView - 3
          ? 0
          : showMore === "left"
            ? currentpage - 1
            : currentpage - (pagiItemsLengthPerView - 4);
    const sliceEndPoind =
      currentpage >= totalPages - (pagiItemsLengthPerView < 6 ? 2 : 3)
        ? totalPages
        : currentpage < pagiItemsLengthPerView - 3
          ? pagiItemsLengthPerView - 2
          : showMore === "left"
            ? currentpage + (pagiItemsLengthPerView - 3)
            : currentpage + 2;
    currentPaginationItems = paginationItems?.slice(
      sliceStartPoint,
      sliceEndPoind
    );
  }

  return {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage: setPageInUrl,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
    firstItem: totalItems ? skip + 1 : 0,
    lastItem:
      totalItems < limit
        ? totalItems
        : skip + (totalCurrentItems < limit ? totalCurrentItems : limit),
  };
};

export default usePagination;
