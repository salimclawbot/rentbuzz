"use client";

import { useEffect, useState } from "react";
import { SAVED_LISTINGS_EVENT, isSaved, saveListing, unsaveListing } from "@/lib/saved-listings";

type SaveButtonProps = {
  listingId: string;
  className?: string;
};

export function SaveButton({ listingId, className = "" }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const syncSaved = () => setSaved(isSaved(listingId));

    syncSaved();
    window.addEventListener("storage", syncSaved);
    window.addEventListener(SAVED_LISTINGS_EVENT, syncSaved);

    return () => {
      window.removeEventListener("storage", syncSaved);
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncSaved);
    };
  }, [listingId]);

  const toggleSaved = () => {
    if (saved) {
      unsaveListing(listingId);
      setSaved(false);
      return;
    }

    saveListing(listingId);
    setSaved(true);
  };

  return (
    <button
      type="button"
      onClick={toggleSaved}
      aria-pressed={saved}
      aria-label={saved ? "Remove saved listing" : "Save listing"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#0D0D0D]/90 text-lg transition hover:border-orange-500 hover:text-orange-500 ${saved ? "text-orange-500" : "text-[#B3B3B3]"} ${className}`}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
