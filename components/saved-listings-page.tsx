"use client";

import { useEffect, useState } from "react";
import { type Listing } from "@/data/listings";
import { ListingList } from "@/components/listing-list";
import { SAVED_LISTINGS_EVENT, getSavedIds } from "@/lib/saved-listings";

type SavedListingsPageProps = {
  listings: Listing[];
};

export function SavedListingsPage({ listings }: SavedListingsPageProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const syncSavedIds = () => setSavedIds(getSavedIds());

    syncSavedIds();
    window.addEventListener("storage", syncSavedIds);
    window.addEventListener(SAVED_LISTINGS_EVENT, syncSavedIds);

    return () => {
      window.removeEventListener("storage", syncSavedIds);
      window.removeEventListener(SAVED_LISTINGS_EVENT, syncSavedIds);
    };
  }, []);

  const savedListings = listings.filter((listing) => savedIds.includes(listing.id));

  return (
    <div className="bg-[#0D0D0D] pb-12 text-white">
      <div className="container-shell space-y-6 pt-8">
        <div className="space-y-4">
          <div className="eyebrow">Saved listings</div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your shortlist</h1>
          <p className="text-sm text-[#999999]">Keep the rentals you want to compare later in one place.</p>
        </div>

        {savedListings.length > 0 ? (
          <ListingList listings={savedListings} />
        ) : (
          <div className="card-surface soft-grid rounded-[2rem] p-8 text-center">
            <div className="text-5xl">♡</div>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight">No saved listings yet</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
              Tap the heart on any listing card to save it here for later comparison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
