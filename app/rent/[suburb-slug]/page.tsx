import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailOptIn } from "@/components/email-opt-in";
import { ListingCard } from "@/components/listing-card";
import { createMetadata, formatCurrency } from "@/lib/site";
import { getListingsForSuburb, getSuburbByName, getSuburbBySlug, suburbs } from "@/lib/rent-data";

type SuburbPageProps = {
  params: Promise<{ "suburb-slug": string }>;
};

export async function generateStaticParams() {
  return suburbs.map((suburb) => ({ "suburb-slug": suburb.slug }));
}

export async function generateMetadata({ params }: SuburbPageProps) {
  const { "suburb-slug": slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) return {};

  return createMetadata({
    title: `Rentals in ${suburb.name} | Current Listings & Prices | RentBuzz`,
    description: `Rentals in ${suburb.name}, Victoria. Compare local rental prices, browse current sample listings, and track weekly rent medians before you apply.`,
    path: `/rent/${suburb.slug}`,
  });
}

export default async function SuburbPage({ params }: SuburbPageProps) {
  const { "suburb-slug": slug } = await params;
  const suburb = getSuburbBySlug(slug);
  if (!suburb) notFound();

  const suburbListings = getListingsForSuburb(suburb.name);
  const nearbySuburbs = suburb.nearbySuburbs.map((name) => getSuburbByName(name)).filter(Boolean);
  const faq = [
    {
      question: `How much does it cost to rent in ${suburb.name}?`,
      answer: `Median weekly rent in ${suburb.name} starts around ${formatCurrency(suburb.medianRent["1br"])} for a 1-bedroom and ${formatCurrency(suburb.medianRent["2br"])} for a 2-bedroom property.`,
    },
    {
      question: `Are there rentals available in ${suburb.name} right now?`,
      answer: suburbListings.length > 0 ? `Yes. RentBuzz currently shows ${suburbListings.length} sample listings in ${suburb.name}.` : `There are no current sample listings in ${suburb.name} yet, but you can join an alert to hear when new rentals appear.`,
    },
    {
      question: `Is ${suburb.name} a good suburb for renters?`,
      answer: `${suburb.name} appeals to renters for its ${suburb.region.toLowerCase()} location, suburb amenities, and pricing relative to neighbouring Victorian rental markets.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://rentbuzz.com.au/" },
          { "@type": "ListItem", position: 2, name: "Rent", item: "https://rentbuzz.com.au/search" },
          { "@type": "ListItem", position: 3, name: suburb.name, item: `https://rentbuzz.com.au/rent/${suburb.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "LocalBusiness",
        name: `RentBuzz ${suburb.name} Rentals`,
        areaServed: suburb.name,
        address: { "@type": "PostalAddress", addressLocality: suburb.name, postalCode: suburb.postcode, addressRegion: "VIC", addressCountry: "AU" },
        description: suburb.description,
      },
    ],
  };

  return (
    <div className="section-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="header-band border-b border-blue-100">
        <div className="container-shell py-12">
          <div className="text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-primary">Home</Link> / <span>{suburb.name}</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Rentals in {suburb.name}, Victoria</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">{suburb.description}</p>
        </div>
      </div>

      <div className="container-shell mt-8 space-y-8">
        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Avg 1br rent" value={`${formatCurrency(suburb.medianRent["1br"])}/wk`} />
          <StatCard label="Avg 2br rent" value={`${formatCurrency(suburb.medianRent["2br"])}/wk`} />
          <StatCard label="Active listings" value={String(suburbListings.length)} />
          <StatCard label="Postcode" value={suburb.postcode} />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Listings in {suburb.name}</h2>
              <p className="mt-2 text-sm text-slate-600">Compare price, availability, and property type before you book inspections.</p>
            </div>
            {suburbListings.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {suburbListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="card-surface rounded-[1.75rem] p-8">
                <h3 className="text-2xl font-extrabold tracking-tight">No listings yet</h3>
                <p className="mt-3 text-sm leading-7 text-muted">No listings yet — be the first to list or join alerts for this suburb.</p>
                <Link href="/list-your-property" className="mt-4 inline-flex rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white">
                  Be the first to list
                </Link>
              </div>
            )}

            <section className="card-surface rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight">Nearby suburbs</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {nearbySuburbs.map((nearby) =>
                  nearby ? (
                    <Link key={nearby.slug} href={`/rent/${nearby.slug}`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
                      {nearby.name}
                    </Link>
                  ) : null,
                )}
              </div>
            </section>

            <section className="card-surface rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight">FAQ</h2>
              <div className="mt-5 space-y-3">
                {faq.map((item) => (
                  <details key={item.question} className="rounded-[1.25rem] bg-slate-50 p-4">
                    <summary className="cursor-pointer list-none font-semibold text-slate-900">{item.question}</summary>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <EmailOptIn
              title={`Get notified when new rentals list in ${suburb.name}`}
              description="Free suburb alerts, pricing context, and new listing updates."
              subject={`Suburb Alert - ${suburb.name}`}
              cta="Get free alerts"
              suburbField
              variant="banner"
            />
            <section className="card-surface rounded-[1.75rem] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight">Local snapshot</h2>
              <div className="mt-5 grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-slate-50 p-4">3-bedroom median: {formatCurrency(suburb.medianRent["3br"])}/week</div>
                <div className="rounded-2xl bg-slate-50 p-4">Transport score: {suburb.transportScore}/100</div>
                <div className="rounded-2xl bg-slate-50 p-4">Walkability: {suburb.walkability}/100</div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-surface rounded-[1.5rem] p-5">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
    </div>
  );
}
