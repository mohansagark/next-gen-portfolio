"use client";
import { btnMetallicWhiteClass } from "@/components/shared/buttons/ButtonPrimary";
import makePath from "@/libs/makePath";
import makeText from "@/libs/makeText";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const BlogSearchWidget = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => {
    const initialSearch = searchParams?.get("search");
    return initialSearch ? makeText(initialSearch) : "";
  });
  const debounceRef = useRef(null);
  // Last value this instance pushed to the URL. makePath is lossy (lowercases,
  // maps "/" and "&" to spaces), so echoing our own write back into the input
  // would rewrite what the user typed and jump the caret to the end.
  const lastPushedRef = useRef(searchParams?.get("search") || "");

  // Sync with genuinely external URL changes only: the other instance, history
  // navigation, or a category link.
  useEffect(() => {
    const q = searchParams?.get("search") || "";
    if (q === lastPushedRef.current) return;
    // Cancel an in-flight debounce so a stale applySearch can't overwrite
    // a just-applied ?category= / cleared search from another control.
    clearTimeout(debounceRef.current);
    lastPushedRef.current = q;
    setSearchTerm(q ? makeText(q) : "");
  }, [searchParams]);

  // Live search keeps ?search= in sync; new search resets ?page= to 1.
  const applySearch = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    const next = value.trim() ? makePath(value) : "";
    lastPushedRef.current = next;
    if (next) params.set("search", next);
    else params.delete("search");
    params.delete("page");
    const qs = params.toString();
    router.replace(qs ? `/blogs?${qs}` : "/blogs", { scroll: false });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => applySearch(value), 250);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    applySearch(searchTerm);
  };

  return (
    <div
      className="px-15px md:px-25px py-30px bg-white dark:bg-[#12151a] border border-[#e5e7eb] dark:border-[#262b33] rounded-lg wow fadeInUp"
      data-wow-delay=".3s"
    >
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="flex-grow">
            <input
              type="search"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search blogs & categories..."
              className="text-[#0b0d10] dark:text-[#f3f4f6] w-full pl-5 py-4 border border-[#e5e7eb] dark:border-[#262b33] bg-[#f3f4f6] dark:bg-black-color focus:border-teal-700 dark:focus:border-[#5eead4] rounded-l-lg outline-none focus:outline-none transition-all duration-300 placeholder:text-[#6b7280] dark:placeholder:text-[#9aa3af] leading-1"
            />
          </div>
          <div className="min-h-full">
            <button
              type="submit"
              className={`w-60px h-full rounded-r-lg text-xl inline-flex items-center justify-center ${btnMetallicWhiteClass}`}
            >
              <i className="fa-light fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogSearchWidget;
