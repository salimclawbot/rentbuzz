"use client";

import Image from "next/image";
import Link from "next/link";
import { OfferButton } from "@/components/offer-button";
import { useState } from "react";
import { type Listing } from "@/data/listings";
import { SaveButton } from "@/components/save-button";
import { getNeighbourhoodScores } from "@/lib/rent-data";
import { formatCurrency, formatDate } from "@/lib/site";

const scoreMeta = {
  schools: { icon: "🏫", label: "Schools" },
  safety: { icon: "🛡️", label: "Safety" },
  health: { icon: "🏥", label: "Health" },
  transit: { icon: "🚌", label: "Transit" },
} as const;

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="lift-card overflow-hidden rounded-2xl border border-[#1E1E1E] bg-[#111111] transition hover:border-[#333]">
      <div className="flex gap-0">
        <div className="relative h-28 w-28 flex-shrink-0">
          <Image src={listing.imageUrl} alt={listing.title} fill className="object-cover" sizes="112px" />
          {listing.featured ? (
            <span className="absolute left-1.5 top-1.5 rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-black text-black">
              ★
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1 p-3">
          <div className="mb-0.5 flex items-start justify-between gap-3">
            <div>
              <span className="text-lg font-black text-orange-500">
                {formatCurrency(listing.price)}
                <span className="ml-0.5 text-xs font-normal text-gray-500">/wk</span>
              </span>
              <p className="mt-1 truncate text-sm font-semibold text-white">{listing.address}</p>
              <p className="truncate text-xs text-gray-500">{listing.suburb}, VIC</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs capitalize text-gray-600">{listing.type}</span>
              <SaveButton listingId={listing.id} />
            </div>
          </div>

          <div className="mb-2 mt-3 flex items-center gap-3">
            <span className="text-xs text-gray-400">🛏 {listing.bedrooms}</span>
            <span className="text-xs text-gray-400">🚿 {listing.bathrooms}</span>
            <span className="text-xs text-gray-400">🚗 {listing.parking}</span>
            <span className="ml-auto text-[11px] text-gray-500">Avail {listing.available.slice(5)}</span>
          </div>

          <ScoreRow listing={listing} />
        </div>
      </div>
    </article>
  );
}

export function ListingCardLarge({ listing }: { listing: Listing }) {
  return (
    <article className="lift-card overflow-hidden rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111]">
      <div className="relative aspect-[16/9]">
        <Image src={listing.imageUrl} alt={listing.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {listing.featured ? (
            <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-black text-black">Featured</span>
          ) : null}
        </div>
        <SaveButton listingId={listing.id} className="absolute right-4 top-4" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-black text-orange-500">
              {formatCurrency(listing.price)}
              <span className="ml-1 text-xs font-normal text-gray-500">/wk</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">{listing.address}</h3>
            <p className="text-sm text-[#8D8D8D]">{listing.suburb}, VIC</p>
          </div>
          <span className="rounded-full border border-[#2A2A2A] px-3 py-1 text-xs capitalize text-[#A8A8A8]">{listing.type}</span>
        </div>

        <p className="text-sm leading-7 text-[#A8A8A8]">{listing.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[#BDBDBD]">
          <span>🛏 {listing.bedrooms} beds</span>
          <span>🚿 {listing.bathrooms} baths</span>
          <span>🚗 {listing.parking} parking</span>
          <span>Available {formatDate(listing.available)}</span>
        </div>

        <ScoreRow listing={listing} />
      </div>
    </article>
  );
}

export function ListingCardLine({ listing }: { listing: Listing }) {
  return (
    <article className="lift-card rounded-2xl border border-[#1E1E1E] bg-[#111111] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="text-lg font-black text-orange-500">
            {formatCurrency(listing.price)}
            <span className="ml-1 text-xs font-normal text-gray-500">/wk</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{listing.address}</p>
            <p className="truncate text-xs text-gray-500">{listing.suburb}, VIC</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#BDBDBD]">
            <span>🛏 {listing.bedrooms}</span>
            <span>🚿 {listing.bathrooms}</span>
            <span>🚗 {listing.parking}</span>
            <span className="capitalize">{listing.type}</span>
            <span>Avail {listing.available.slice(5)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          <SaveButton listingId={listing.id} />
          <Link href={`/listings/${listing.id}`} className="text-sm font-semibold text-orange-500">
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}

function ScoreRow({ listing }: { listing: Listing }) {
  const scores = getNeighbourhoodScores(listing.suburb);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ScoreBadge icon={scoreMeta.schools.icon} label={scoreMeta.schools.label} score={scores.schools} />
        <ScoreBadge icon={scoreMeta.safety.icon} label={scoreMeta.safety.label} score={scores.safety} />
        <ScoreBadge icon={scoreMeta.health.icon} label={scoreMeta.health.label} score={scores.health} />
        <ScoreBadge icon={scoreMeta.transit.icon} label={scoreMeta.transit.label} score={scores.transit} />
        <button
          type="button"
          onClick={() => setShowLegend((current) => !current)}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#2A2A2A] text-[11px] font-bold text-[#B3B3B3] transition hover:border-orange-500 hover:text-orange-500"
          aria-expanded={showLegend}
          aria-label="Toggle neighbourhood score legend"
        >
          ?
        </button>
        <Link href={`/listings/${listing.id}`} className="ml-auto text-xs font-semibold text-orange-500">
          View →
        </Link>
      </div>

      {showLegend ? (
        <div className="rounded-2xl border border-[#1F1F1F] bg-[#0D0D0D] px-3 py-2 text-xs text-[#BDBDBD]">
          <p>🏫 Schools · 🛡️ Safety · 🏥 Health · 🚌 Transit</p>
          <p className="mt-1">🟢 8-10 Excellent · 🟡 6-7 Good · 🔴 1-5 Below avg</p>
        </div>
      ) : null}
    </div>
  );
}

function ScoreBadge({ icon, label, score }: { icon: string; label: string; score: number }) {
  const colour = score >= 8 ? "text-emerald-400" : score >= 6 ? "text-amber-400" : "text-red-400";

  return (
    <div className="group relative flex flex-col items-center gap-0.5">
      <span className="text-[10px]">{icon}</span>
      <span className={`text-[10px] font-bold ${colour}`}>{score}/10</span>
      <div className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded-lg border border-[#2A2A2A] bg-[#0D0D0D] px-2 py-1 text-[10px] font-medium text-white shadow-lg group-hover:block">
        {label}: {score}/10
      </div>
    </div>
  );
}
