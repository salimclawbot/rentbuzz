"use client";

import { useEffect, useState } from "react";

export type ListingViewMode = "line" | "card" | "large";

type ViewToggleProps = {
  value?: ListingViewMode;
  onChange: (view: ListingViewMode) => void;
};

const STORAGE_KEY = "rentvic-view";

const viewOptions: Array<{ value: ListingViewMode; icon: string; label: string }> = [
  { value: "line", icon: "≡", label: "Line" },
  { value: "card", icon: "⊟", label: "Card" },
  { value: "large", icon: "⊞", label: "Large" },
];

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  const [activeView, setActiveView] = useState<ListingViewMode>(value ?? "card");

  useEffect(() => {
    const storedView = window.localStorage.getItem(STORAGE_KEY);
    const initialView = storedView === "line" || storedView === "card" || storedView === "large" ? storedView : "card";

    setActiveView(initialView);
    onChange(initialView);
  }, [onChange]);

  useEffect(() => {
    if (!value) return;
    setActiveView(value);
  }, [value]);

  const setView = (nextView: ListingViewMode) => {
    setActiveView(nextView);
    window.localStorage.setItem(STORAGE_KEY, nextView);
    onChange(nextView);
  };

  return (
    <div className="inline-flex rounded-full border border-[#2A2A2A] bg-[#111111] p-1">
      {viewOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setView(option.value)}
          className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeView === option.value ? "bg-orange-500 text-black" : "text-[#A3A3A3] hover:text-white"
          }`}
          aria-pressed={activeView === option.value}
        >
          <span className="text-base leading-none">{option.icon}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
