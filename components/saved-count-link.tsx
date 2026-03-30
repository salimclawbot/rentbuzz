"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SAVED_LISTINGS_EVENT, getSavedIds } from "@/lib/saved-listings";

export function SavedCountLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setCount(getSavedIds().length);

    syncCount();
    window.addEventListener("storage", syncCount);
    window.addEventListener(SAVED_LISTINGS_EVENT, syncCount);

    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncCount);
    };
  }, []);

  return (
    <Link
      href="/saved"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111111] text-lg text-white transition hover:border-orange-500 hover:text-orange-500"
      aria-label="Saved listings"
    >
      ♥
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-black">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
