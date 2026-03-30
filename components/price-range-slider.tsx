"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PriceRangeSliderProps = {
  pathname?: string;
  suburb?: string;
  typeChip?: string;
  area?: string;
  initialPriceMin?: number;
  initialPriceMax?: number;
  initialBeds?: number;
};

const MIN_PRICE = 100;
const MAX_PRICE = 2000;
const STEP = 50;

export function PriceRangeSlider({
  pathname = "/search",
  suburb,
  typeChip,
  area,
  initialPriceMin = 350,
  initialPriceMax = 800,
  initialBeds = 0,
}: PriceRangeSliderProps) {
  const router = useRouter();
  const hasMounted = useRef(false);
  const [priceMin, setPriceMin] = useState(initialPriceMin);
  const [priceMax, setPriceMax] = useState(initialPriceMax);
  const [beds, setBeds] = useState(initialBeds);

  useEffect(() => {
    setPriceMin(initialPriceMin);
    setPriceMax(initialPriceMax);
    setBeds(initialBeds);
  }, [initialBeds, initialPriceMax, initialPriceMin]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (suburb) params.set("suburb", suburb);
    if (typeChip && typeChip !== "Any") params.set("typeChip", typeChip);
    if (area && area !== "All VIC") params.set("area", area);
    params.set("priceMin", String(priceMin));
    params.set("priceMax", String(priceMax));
    if (beds > 0) params.set("beds", String(beds));

    return params.toString();
  }, [area, beds, priceMax, priceMin, suburb, typeChip]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, queryString, router]);

  const summary = `${formatDollars(priceMin)} - ${formatDollars(priceMax)}/wk · ${beds === 0 ? "Any beds" : beds >= 5 ? "5+ beds" : `${beds} beds`}`;

  return (
    <div className="rounded-[1.5rem] border border-[#1F1F1F] bg-[#111111] p-4">
      <div className="mb-4 text-sm font-semibold text-orange-500">{summary}</div>

      <div className="space-y-5">
        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#7A7A7A]">Price range</label>
          <div className="relative h-11">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-[#232323]" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-orange-500"
              style={{
                left: `${((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                right: `${100 - ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
              }}
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={priceMin}
              onChange={(event) => {
                const nextMin = Math.min(Number(event.target.value), priceMax - STEP);
                setPriceMin(nextMin);
              }}
              className="pointer-events-none absolute left-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent accent-orange-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D0D0D] [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0D0D0D] [&::-moz-range-thumb]:bg-orange-500"
            />
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={STEP}
              value={priceMax}
              onChange={(event) => {
                const nextMax = Math.max(Number(event.target.value), priceMin + STEP);
                setPriceMax(nextMax);
              }}
              className="pointer-events-none absolute left-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent accent-orange-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0D0D0D] [&::-webkit-slider-thumb]:bg-orange-500 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0D0D0D] [&::-moz-range-thumb]:bg-orange-500"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-[#8F8F8F]">
            <span>{formatDollars(priceMin)}</span>
            <span>{formatDollars(priceMax)}</span>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#7A7A7A]">Beds</label>
          <div className="flex items-center justify-between rounded-full border border-[#2A2A2A] bg-[#0D0D0D] px-3 py-2">
            <button
              type="button"
              onClick={() => setBeds((currentBeds) => Math.max(0, currentBeds - 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] text-xl text-[#D4D4D4] transition hover:border-orange-500 hover:text-orange-500"
              aria-label="Decrease bedrooms"
            >
              -
            </button>
            <div className="text-sm font-semibold text-white">{beds === 0 ? "Any beds" : beds >= 5 ? "5+ beds" : `${beds} beds`}</div>
            <button
              type="button"
              onClick={() => setBeds((currentBeds) => Math.min(5, currentBeds + 1))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2A2A] text-xl text-[#D4D4D4] transition hover:border-orange-500 hover:text-orange-500"
              aria-label="Increase bedrooms"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDollars(value: number) {
  return `$${value}`;
}
