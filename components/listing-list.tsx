"use client";

import { useCallback, useEffect, useState } from "react";
import { type Listing } from "@/data/listings";
import { ListingCard, ListingCardLarge, ListingCardLine } from "@/components/listing-card";
import { type ListingViewMode, ViewToggle } from "@/components/view-toggle";

type ListingListProps = {
  listings: Listing[];
};

const STORAGE_KEY = "rentvic-view";

export function ListingList({ listings }: ListingListProps) {
  const [view, setView] = useState<ListingViewMode>("card");

  useEffect(() => {
    const storedView = window.localStorage.getItem(STORAGE_KEY);
    if (storedView === "line" || storedView === "card" || storedView === "large") {
      setView(storedView);
    }
  }, []);

  const handleViewChange = useCallback((nextView: ListingViewMode) => {
    setView(nextView);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <ViewToggle value={view} onChange={handleViewChange} />
      </div>

      <div className={view === "large" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-2"}>
        {listings.map((listing) => {
          if (view === "line") return <ListingCardLine key={listing.id} listing={listing} />;
          if (view === "large") return <ListingCardLarge key={listing.id} listing={listing} />;
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </div>
    </div>
  );
}
