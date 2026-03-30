"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { formatCurrency } from "@/lib/site";

export function BondCalculator() {
  const [weeklyRent, setWeeklyRent] = useState(620);
  const bond = weeklyRent * 4;
  const advanceRent = weeklyRent * 2;
  const total = bond + advanceRent;

  return (
    <CalculatorShell
      title="Bond calculator"
      description="Victoria renters commonly need four weeks of bond and two weeks of advance rent. Use this calculator for a quick upfront cost estimate."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Weekly rent</span>
          <input
            type="number"
            min="0"
            step="10"
            value={weeklyRent}
            onChange={(event) => setWeeklyRent(Number(event.target.value))}
            className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <ResultCard label="Bond amount" value={formatCurrency(bond)} />
          <ResultCard label="Advance rent" value={formatCurrency(advanceRent)} />
          <ResultCard label="Total upfront cost" value={formatCurrency(total)} />
        </div>
      </div>
      <p className="mt-5 text-sm text-muted">Victoria-specific note: this MVP uses a simple four-weeks bond and two-weeks advance rent benchmark for planning purposes.</p>
    </CalculatorShell>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 p-5">
      <div className="text-sm text-muted">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
    </div>
  );
}
