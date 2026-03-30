"use client";

import { useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { formatCurrency } from "@/lib/site";

export function AffordabilityCalculator() {
  const [weeklyIncome, setWeeklyIncome] = useState(1800);
  const maxRent = Math.round(weeklyIncome * 0.3);
  const bond = maxRent * 4;
  const upfront = bond + maxRent * 2;

  return (
    <CalculatorShell
      title="Affordability calculator"
      description="Use the 30% rule to estimate the weekly rent range that keeps your budget stable while still covering bond and upfront costs."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Weekly income</span>
          <input
            type="number"
            min="0"
            step="50"
            value={weeklyIncome}
            onChange={(event) => setWeeklyIncome(Number(event.target.value))}
            className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <ResultCard label="Recommended max rent" value={`${formatCurrency(maxRent)}/week`} />
          <ResultCard label="Bond estimate" value={formatCurrency(bond)} />
          <ResultCard label="Upfront costs" value={formatCurrency(upfront)} />
        </div>
      </div>
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
