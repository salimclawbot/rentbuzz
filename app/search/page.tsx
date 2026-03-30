import Link from "next/link";
import { EmailOptIn } from "@/components/email-opt-in";
import { HorizontalFilterChips } from "@/components/horizontal-filter-chips";
import { ListingList } from "@/components/listing-list";
import { createMetadata } from "@/lib/site";
import { filterListings, paginate } from "@/lib/rent-data";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createMetadata({
  title: "Rental Search Results | Find Melbourne & Victoria Rentals | RentBuzz",
  description:
    "Search Victorian rentals by suburb, price, bedrooms, property type, and availability using RentBuzz's suburb-aware rental search.",
  path: "/search",
});

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const suburb = typeof params.suburb === "string" ? params.suburb : "";
  const bedsValue = typeof params.beds === "string" ? Number(params.beds) : 0;
  const priceMinValue = typeof params.priceMin === "string" ? Number(params.priceMin) : 350;
  const priceMaxValue = typeof params.priceMax === "string" ? Number(params.priceMax) : 800;
  const beds = Number.isFinite(bedsValue) ? bedsValue : 0;
  const priceMin = Number.isFinite(priceMinValue) ? priceMinValue : 350;
  const priceMax = Number.isFinite(priceMaxValue) ? priceMaxValue : 800;
  const typeChip = typeof params.typeChip === "string" ? params.typeChip : "Any";
  const area = typeof params.area === "string" ? params.area : "All VIC";
  const type =
    typeChip === "🏠 House"
      ? "house"
      : typeChip === "🏢 Apartment"
        ? "apartment"
        : typeChip === "🏘 Unit"
          ? "unit"
          : typeChip === "🏡 Townhouse"
            ? "townhouse"
            : undefined;

  const filtered = filterListings({ suburb, minPrice: priceMin, maxPrice: priceMax, bedrooms: beds > 0 ? beds : undefined, type, area });
  const { items, totalPages, currentPage } = paginate(filtered, page, 20);
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries({ suburb, beds: beds > 0 ? String(beds) : "", priceMin: String(priceMin), priceMax: String(priceMax), typeChip: typeChip !== "Any" ? typeChip : "", area: area !== "All VIC" ? area : "" })) {
    if (value) query.set(key, String(value));
  }

  return (
    <div className="bg-[#0D0D0D] pb-10 text-white">
      <div className="container-shell space-y-6 pt-8">
        <div className="space-y-4">
          <div className="eyebrow">Search Rentals</div>
          <h1 className="text-4xl font-extrabold tracking-tight">Rental search, refined</h1>
        </div>
      </div>

      <HorizontalFilterChips current={{ beds: String(beds), priceMin, priceMax, type: typeChip, area, suburb }} />

      <div className="container-shell space-y-6 pt-6">
        <form action="/search" className="relative">
          <input type="hidden" name="beds" value={beds > 0 ? String(beds) : ""} />
          <input type="hidden" name="priceMin" value={priceMin} />
          <input type="hidden" name="priceMax" value={priceMax} />
          <input type="hidden" name="typeChip" value={typeChip !== "Any" ? typeChip : ""} />
          <input type="hidden" name="area" value={area !== "All VIC" ? area : ""} />
          <input
            type="text"
            name="suburb"
            defaultValue={suburb}
            placeholder="Search suburb"
            className="w-full rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-4 pr-12 text-base text-white placeholder:text-gray-600 focus:border-orange-500 focus:outline-none"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500">🔍</button>
        </form>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[#999999]">
            {filtered.length} listings found{`${suburb ? ` in ${suburb}` : " across Victoria"}`}
          </p>
        </div>

        {items.length > 0 ? (
          <ListingList listings={items} />
        ) : (
          <div className="space-y-6">
            <div className="card-surface soft-grid rounded-[2rem] p-8 text-center">
              <div className="text-5xl">🏠</div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Nothing matches yet</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
                Broaden the filters or set a suburb alert and we will let you know when a new rental hits your search.
              </p>
            </div>
            <EmailOptIn
              title="Be the first to know"
              description="Set a suburb alert and get new rentals as soon as they appear."
              subject="Search No Results Alert"
              cta="Get alerts"
              suburbField
            />
          </div>
        )}

        {currentPage < totalPages ? (
          <Link
            href={`/search?${new URLSearchParams({ ...Object.fromEntries(query.entries()), page: String(currentPage + 1) }).toString()}`}
            className="block w-full rounded-2xl border border-[#2A2A2A] py-4 text-center font-semibold text-orange-500 transition hover:border-orange-500"
          >
            Load more listings →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
