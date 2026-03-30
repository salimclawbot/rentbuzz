import Link from "next/link";
import { HeroSearchInput } from "@/components/hero-search-input";
import { HorizontalFilterChips } from "@/components/horizontal-filter-chips";
import { ListingList } from "@/components/listing-list";
import { getFeaturedListings } from "@/lib/rent-data";

const reasons = [
  {
    icon: "🔍",
    title: "Search without the BS",
    description: "No spam emails from agents. No fake listings. Real properties, real prices, real availability.",
    highlight: false,
  },
  {
    icon: "💸",
    title: "Free. Always.",
    description: "We don't charge renters. Ever. You deserve a fair shot at finding a home without paying to look.",
    highlight: true,
  },
  {
    icon: "🔔",
    title: "Get alerts before anyone else",
    description: "Enter your suburb and budget. We'll ping you the moment a matching rental goes live.",
    highlight: false,
  },
];

export default function HomePage() {
  const featuredListings = getFeaturedListings(12);

  return (
    <div className="bg-[#0D0D0D] text-white">
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-5 pb-8 pt-16">
        <div className="absolute left-4 top-1/4 h-32 w-0.5 rounded-full bg-orange-500/40" />
        <div className="container-shell">
          <div className="fade-rise ml-6 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-500">Victoria's cheapest rentals</p>
            <h1 className="mb-3 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Cheaper rentals.
              <br />
              <span className="text-orange-500">All of Victoria.</span>
            </h1>
            <p className="mb-8 text-lg text-gray-400">Find below-market rentals across Victoria. Free. No sign-up.</p>

            <HeroSearchInput />
            <Link href="/search" className="mt-3 block w-full rounded-full border border-[#333] py-4 text-center font-semibold text-white transition hover:border-gray-500">
              Browse by Suburb
            </Link>
            <p className="mt-5 text-xs text-gray-600">300+ suburbs · 250+ listings · Updated daily</p>
          </div>
        </div>
      </section>

      <HorizontalFilterChips />

      <section className="bg-[#0D0D0D] px-4 py-6">
        <div className="container-shell">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Available Now</h2>
            <Link href="/search" className="text-sm font-semibold text-orange-500">
              View all →
            </Link>
          </div>
          <ListingList listings={featuredListings} />
          <Link href="/search" className="mt-4 block w-full rounded-2xl border border-[#2A2A2A] py-4 text-center font-semibold text-orange-500 transition hover:border-orange-500">
            Load more listings →
          </Link>
        </div>
      </section>

      <section className="border-t border-[#1F1F1F] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-500">Why RentBuzz</p>
          <h2 className="mb-16 text-4xl font-black tracking-tight text-white md:text-5xl">
            The rental market is broken.
            <br />
            <span className="text-orange-500">We fixed it.</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.title}
                className={`rounded-2xl border bg-[#111111] p-8 ${reason.highlight ? "border-orange-500/30" : "border-[#2A2A2A]"}`}
              >
                <div className="mb-4 text-3xl">{reason.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{reason.title}</h3>
                <p className="text-base leading-7 text-[#999999]">{reason.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1F1F1F] bg-[#111111] px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-500">Never miss a listing</p>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white">
            Get new rentals before
            <br />
            <span className="text-orange-500">they disappear.</span>
          </h2>
          <p className="mb-8 text-lg leading-8 text-[#999999]">
            The best listings in Victoria go within 24 hours.
            <br />
            Get alerts the moment they list — free, no spam.
          </p>
          <form action="https://formsubmit.co/admin+v1@grab3.com" method="POST" className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="hidden" name="_subject" value="RentBuzz Alert Signup" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://rentbuzz.com.au/thanks" />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-white placeholder:text-[#555555] focus:border-orange-500 focus:outline-none"
            />
            <button type="submit" className="whitespace-nowrap rounded-xl bg-orange-500 px-6 py-3 font-bold text-black transition hover:bg-orange-400">
              Get Free Alerts →
            </button>
          </form>
          <p className="mt-4 text-sm text-[#555555]">Join 2,400+ Victorian renters. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
