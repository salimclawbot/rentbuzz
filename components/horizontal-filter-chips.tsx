"use client";

import Link from "next/link";
import { useState } from "react";
import { PriceRangeSlider } from "@/components/price-range-slider";

type FilterChipBarProps = {
  current?: {
    beds?: string;
    priceMin?: number;
    priceMax?: number;
    type?: string;
    area?: string;
    suburb?: string;
  };
};

const typeChips = ["Any", "🏠 House", "🏢 Apartment", "🏘 Unit", "🏡 Townhouse"];
const areaChips = ["All VIC", "CBD", "Inner East", "Inner North", "South East", "West", "Geelong"];

export function HorizontalFilterChips({ current }: FilterChipBarProps) {
  const [open, setOpen] = useState(false);
  const activeBeds = current?.beds || "0";
  const activeType = current?.type || "Any";
  const activeArea = current?.area || "All VIC";
  const priceMin = current?.priceMin ?? 350;
  const priceMax = current?.priceMax ?? 800;

  const buildHref = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    if (current?.suburb) params.set("suburb", current.suburb);
    const merged = { beds: activeBeds, type: activeType, area: activeArea, ...overrides };
    if (current?.priceMin) params.set("priceMin", String(current.priceMin));
    if (current?.priceMax) params.set("priceMax", String(current.priceMax));
    if (merged.beds !== "0") params.set("beds", merged.beds);
    if (merged.type !== "Any") params.set("typeChip", merged.type);
    if (merged.area !== "All VIC") params.set("area", merged.area);
    const query = params.toString();
    return query ? `/search?${query}` : "/search";
  };

  // Compact summary for the collapsed bar
  const priceSummary = `$${priceMin}–$${priceMax}/wk`;
  const bedsSummary = activeBeds === "0" ? "Any beds" : `${activeBeds}+ beds`;
  const typeSummary = activeType === "Any" ? "" : ` · ${activeType.replace(/\p{Emoji}/gu, "").trim()}`;

  return (
    <div className="sticky top-[52px] z-40 border-b border-[#1A1A1A] bg-[#0D0D0D]">
      {/* Compact single-row bar */}
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1.5 text-left"
        >
          <span className="text-xs">⚙️</span>
          <span className="truncate text-xs font-semibold text-white">
            {priceSummary} · {bedsSummary}{typeSummary}
          </span>
          <span className={`ml-auto text-[10px] text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
        </button>
        <Link
          href="/search"
          className="shrink-0 rounded-full border border-[#2A2A2A] px-3 py-1.5 text-xs font-semibold text-gray-400 hover:border-orange-500 hover:text-orange-500"
        >
          All
        </Link>
      </div>

      {/* Expandable panel */}
      {open && (
        <div className="border-t border-[#1A1A1A] px-3 pb-3 pt-2">
          <PriceRangeSlider
            pathname="/search"
            suburb={current?.suburb}
            typeChip={activeType}
            area={activeArea}
            initialPriceMin={priceMin}
            initialPriceMax={priceMax}
            initialBeds={Number(activeBeds)}
          />

          <div className="scrollbar-none mt-2 flex gap-1.5 overflow-x-auto pb-1 pt-1">
            <ChipLabel label="Type:" />
            {typeChips.map((chip) => (
              <FilterChip key={chip} href={buildHref({ type: chip })} active={activeType === chip} label={chip} />
            ))}
            <Divider />
            <ChipLabel label="Area:" />
            {areaChips.map((chip) => (
              <FilterChip key={chip} href={buildHref({ area: chip })} active={activeArea === chip} label={chip} />
            ))}
          </div>

          <p className="mt-2 text-[10px] text-[#555]">
            Score legend: 🏫 Schools · 🛡️ Safety · 🏥 Health · 🚌 Transit — 🟢 8-10 Excellent · 🟡 6-7 Good · 🔴 &lt;6 Below avg
          </p>
        </div>
      )}
    </div>
  );
}

function ChipLabel({ label }: { label: string }) {
  return <span className="mr-0.5 self-center whitespace-nowrap text-xs font-medium text-gray-500">{label}</span>;
}

function Divider() {
  return <div className="mx-1 w-px flex-shrink-0 bg-[#2A2A2A]" />;
}

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition ${
        active ? "border-orange-500 text-orange-500" : "border-[#2A2A2A] text-gray-300 hover:border-orange-500 hover:text-orange-500"
      }`}
    >
      {label}
    </Link>
  );
}
