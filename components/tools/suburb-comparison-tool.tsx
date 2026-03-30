"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculator-shell";
import { suburbs } from "@/data/suburbs";
import { formatCurrency } from "@/lib/site";

export function SuburbComparisonTool() {
  const [leftSlug, setLeftSlug] = useState("richmond");
  const [rightSlug, setRightSlug] = useState("brunswick");

  const [left, right] = useMemo(
    () => [suburbs.find((suburb) => suburb.slug === leftSlug), suburbs.find((suburb) => suburb.slug === rightSlug)],
    [leftSlug, rightSlug],
  );

  return (
    <CalculatorShell
      title="Suburb comparison"
      description="Compare two Victorian suburbs side by side to balance rent, walkability, and transport access before your next inspection run."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <SelectSuburb label="Suburb one" value={leftSlug} onChange={setLeftSlug} />
        <SelectSuburb label="Suburb two" value={rightSlug} onChange={setRightSlug} />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[left, right].map((suburb) =>
          suburb ? (
            <div key={suburb.slug} className="rounded-[1.75rem] bg-slate-50 p-6">
              <h3 className="text-2xl font-extrabold tracking-tight">{suburb.name}</h3>
              <div className="mt-5 grid gap-3 text-sm text-slate-700">
                <div>Median 1-bedroom rent: {formatCurrency(suburb.medianRent["1br"])}</div>
                <div>Median 2-bedroom rent: {formatCurrency(suburb.medianRent["2br"])}</div>
                <div>Median 3-bedroom rent: {formatCurrency(suburb.medianRent["3br"])}</div>
                <div>Transport score: {suburb.transportScore}/100</div>
                <div>Walkability: {suburb.walkability}/100</div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </CalculatorShell>
  );
}

function SelectSuburb({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm">
        {suburbs.map((suburb) => (
          <option key={suburb.slug} value={suburb.slug}>
            {suburb.name}
          </option>
        ))}
      </select>
    </label>
  );
}
