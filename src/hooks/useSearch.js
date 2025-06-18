"use client";
import filterItems from "@/libs/filterItems";
import makePath from "@/libs/makePath";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const useSearch = (items, pathForRedirect) => {
  const [searchString, setSearchString] = useState(null);
  const [searchedItems, setSearchedItems] = useState(null);
  const [previousSearchedItems, setpreviousSearchedItems] = useState(null);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowQuickSearchResult, setIsShowQuickSearchResult] = useState(false);
  // ref
  const searchStartRef = useRef(null);
  const router = useRouter();
  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`${pathForRedirect}?search=${makePath(searchString)}`);
    setIsShowSearch(true);
    setpreviousSearchedItems(searchedItems);
    e.target.search.value = "";
  };
  // get search string
  const handleSearchString = (e) => {
    const value = e.target.value;
    setIsShowSearch(false);
    setSearchString(value.toLowerCase());
    setIsShowQuickSearchResult(true);
  };
  // star search
  const startSearch = () => {
    searchStartRef.current = setTimeout(() => {
      setSearchedItems(filterItems(items, "search", searchString));
    }, 200);
  };
  // close search
  const closeSearch = () => {
    clearTimeout(searchStartRef.current);
  };

  return {
    searchString,
    searchedItems,
    previousSearchedItems,
    isShowSearch,
    setIsShowSearch,
    handleSearch,
    handleSearchString,
    startSearch,
    closeSearch,
    isShowQuickSearchResult,
    setIsShowQuickSearchResult,
  };
};

export default useSearch;
