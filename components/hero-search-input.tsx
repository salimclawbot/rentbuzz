"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const hasMounted = useRef(false);

  const navigateToSearch = (nextValue: string) => {
    const suburb = nextValue.trim();
    const query = suburb ? `?suburb=${encodeURIComponent(suburb)}` : "";
    router.push(`/search${query}`);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (!value.trim()) return;
      navigateToSearch(value);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [router, value]);

  return (
    <form
      action="/search"
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        navigateToSearch(value);
      }}
    >
      <div className="relative">
        <input
          type="text"
          name="suburb"
          value={value}
          placeholder="Search suburb (e.g. Richmond)"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            navigateToSearch(value);
          }}
          className="w-full rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4 pr-12 text-base text-white placeholder:text-gray-600 focus:border-orange-500 focus:outline-none"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500">🔍</span>
      </div>
    </form>
  );
}
