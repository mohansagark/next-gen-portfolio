"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

/**
 * Blog list pagination synced to the URL via `?page=` (1-based).
 * Reload / share keeps the same page. Page 1 omits the param.
 */
const usePagination = (filteredItems, currentLimit, pagiItemsLengthPerView) => {
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

  // If filters shrink the result set, clamp an out-of-range ?page= in the URL.
  useEffect(() => {
    if (totalPages <= 0) return;
    const raw = parseInt(searchParams.get("page") || "1", 10);
    if (!Number.isFinite(raw)) return;
    if (raw < 1 || raw > totalPages) {
      setPageInUrl(Math.min(Math.max(raw - 1, 0), totalPages - 1));
    }
  }, [totalPages, searchParams, setPageInUrl]);

  const skip = limit * currentpage;
  const currentItems = filteredItems?.slice(skip, skip + limit);
  const totalCurrentItems = currentItems?.length ?? 0;
  const paginationItems = useMemo(
    () => Array.from({ length: totalPages }, (_, idx) => idx),
    [totalPages]
  );

  const handleCurrentPage = (e, id) => {
    e?.preventDefault?.();
    setPageInUrl(id);
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
