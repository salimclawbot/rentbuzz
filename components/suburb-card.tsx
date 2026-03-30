import Link from "next/link";
import { type Suburb } from "@/data/suburbs";
import { formatCurrency } from "@/lib/site";

export function SuburbCard({ suburb, listingCount }: { suburb: Suburb; listingCount: number }) {
  return (
    <article className="card-surface rounded-[1.5rem] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight">{suburb.name}</h3>
          <p className="text-sm text-muted">{suburb.region} · {suburb.postcode}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{listingCount} listings</div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">
        Median 2-bedroom rent is {formatCurrency(suburb.medianRent["2br"])}/week with strong local demand from Victorian renters.
      </p>
      <Link href={`/rent/${suburb.slug}`} className="mt-5 inline-flex text-sm font-bold text-primary">
        View suburb hub
      </Link>
    </article>
  );
}
