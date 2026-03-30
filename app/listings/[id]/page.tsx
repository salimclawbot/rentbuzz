import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/listing-card";
import { OfferButton } from "@/components/offer-button";
import { PhotoGallery } from "@/components/photo-gallery";
import { PriceFairness } from "@/components/price-fairness";
import { createMetadata, formatCurrency, formatDate } from "@/lib/site";
import {
  getListingById,
  getNeighbourhoodScores,
  getPropertyRoomDetails,
  getSimilarListings,
  getSuburbAmenities,
  getSuburbByName,
  listings,
} from "@/lib/rent-data";

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }));
}

export async function generateMetadata({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) return {};
  return createMetadata({
    title: `${listing.title} | ${listing.suburb} Rental Listing | RentBuzz`,
    description: `${listing.title} in ${listing.suburb}. Review weekly rent, features, availability, and suburb price context before you enquire.`,
    path: `/listings/${listing.id}`,
  });
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing) notFound();

  const suburb = getSuburbByName(listing.suburb);
  const similarListings = getSimilarListings(listing, 3);
  const amenities = getSuburbAmenities(listing.suburb);
  const roomDetails = getPropertyRoomDetails(listing);
  const scores = getNeighbourhoodScores(listing.suburb);
  const medianPrice = suburb ? (listing.bedrooms <= 1 ? suburb.medianRent["1br"] : listing.bedrooms === 2 ? suburb.medianRent["2br"] : suburb.medianRent["3br"]) : listing.price;
  const photoPool = [
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  ];
  const charCodeSum = Array.from(listing.id).reduce((total, character) => total + character.charCodeAt(0), 0);
  const galleryImages = [
    { src: listing.imageUrl, alt: listing.title },
    ...Array.from({ length: 3 }, (_, index) => ({
      src: photoPool[(charCodeSum + index) % photoPool.length],
      alt: `${listing.title} photo ${index + 2}`,
    })),
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${listing.suburb} Rental Listing`,
    description: listing.description,
    telephone: listing.agentPhone,
    email: listing.agentEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.suburb,
      addressRegion: "VIC",
      addressCountry: "AU",
    },
  };

  return (
    <div className="section-space">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-shell mt-8 space-y-8">
        <PhotoGallery images={galleryImages} />

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div>
              <div className="inline-flex rounded-full bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-500">{formatCurrency(listing.price)}/week</div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                {listing.address}, {listing.suburb}
              </h1>
              <p className="mt-3 text-sm text-[#9A9A9A]">
                {listing.type} · Available {formatDate(listing.available)} · {listing.agentName}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Property Details</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailItem label="Bedroom config" value={roomDetails.bedroomConfig} />
                <DetailItem label="Bathroom types" value={roomDetails.bathroomTypes} />
                <DetailItem label="Parking type" value={roomDetails.parkingType} />
                <DetailItem label="Floor area" value={roomDetails.floorArea} />
                <DetailItem label="Year built" value={roomDetails.yearBuilt} />
                <DetailItem label="Heating / cooling" value={roomDetails.heatingCooling} />
              </div>
              <p className="mt-5 text-sm leading-8 text-[#A5A5A5]">{listing.description}</p>
            </div>

            <PriceFairness askingPrice={listing.price} medianPrice={medianPrice} label={`${listing.suburb} ${listing.bedrooms}-bedroom`} />

            <div className="rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Location &amp; Neighbourhood</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailItem label="Distance to CBD" value={amenities.distanceToCbd} />
                <DetailItem label="Nearest station" value={amenities.station} />
                <DetailItem label="Supermarkets" value={amenities.supermarkets} />
                <DetailItem label="Schools" value={amenities.schools} />
                <DetailItem label="Parks" value={amenities.parks} />
                <DetailItem label="Hospital" value={amenities.hospital} />
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#2A2A2A]">
                <iframe
                  title={`Map of ${listing.address}, ${listing.suburb}`}
                  width="100%"
                  height="300"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${listing.address}, ${listing.suburb}, Victoria, Australia`)}&output=embed&z=15`}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Neighbourhood Scores</h2>
              <p className="mt-3 text-sm leading-7 text-[#999999]">
                Quick suburb signals for renters. Scores are seeded to keep listings consistent across the same neighbourhood.
              </p>
              <div className="mt-4 rounded-2xl border border-[#1F1F1F] bg-[#0D0D0D] px-4 py-3 text-xs text-[#C2C2C2]">
                🟢 8-10 Excellent · 🟡 6-7 Good · 🔴 1-5 Below avg
              </div>
              <div className="mt-5 space-y-4">
                <ScoreBar icon="🏫" label="Schools" score={scores.schools} description="Good school access supports family suitability and everyday convenience." />
                <ScoreBar icon="🛡️" label="Safety" score={scores.safety} description="A stronger safety score usually points to steadier neighbourhood confidence." />
                <ScoreBar icon="🏥" label="Health" score={scores.health} description="Healthcare access matters for urgent care, GPs, and day-to-day resilience." />
                <ScoreBar icon="🚌" label="Transit" score={scores.transit} description="Transit reflects how easy it is to move around without relying on a car." />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Features</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {listing.features.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-[#0D0D0D] px-4 py-3 text-sm font-medium text-[#D2D2D2]">
                    ✓ {feature}
                  </div>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listing.address}, ${listing.suburb}, Victoria`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-xl border border-[#2A2A2A] px-4 py-3 text-sm font-bold text-white"
              >
                Directions
              </a>
            </div>
          </div>

          <div id="enquiry" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-[#1F1F1F] bg-[#111111] p-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">Enquire about this property</h2>
              <form action="https://formsubmit.co/admin+v1@grab3.com" method="POST" className="mt-5 grid gap-3">
                <input type="hidden" name="_subject" value={`Rental Enquiry - ${listing.title}`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://rentbuzz.com.au/thanks" />
                <input type="text" name="name" placeholder="Your name" required className="min-h-11 rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white" />
                <input type="email" name="email" placeholder="Your email" required className="min-h-11 rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white" />
                <textarea name="message" rows={5} placeholder="Tell us your move-in timing and any questions" className="rounded-2xl border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3 text-sm text-white" />
                <button type="submit" className="min-h-11 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-black">Send enquiry</button>
              </form>
              <div className="mt-6 border-t border-[#1F1F1F] pt-5 text-sm leading-7 text-[#BDBDBD]">
                <p><strong>Agent:</strong> {listing.agentName}</p>
                <p><strong>Phone:</strong> {listing.agentPhone}</p>
                <p><strong>Email:</strong> {listing.agentEmail}</p>
                <p><strong>Managed by:</strong> {listing.isPrivateLandlord ? "Private landlord" : "Agency"}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Similar listings in {listing.suburb}</h2>
            <Link href={`/rent/${suburb?.slug ?? ""}`} className="text-sm font-bold text-orange-500">View suburb page</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {similarListings.length > 0 ? similarListings.map((item) => <ListingCard key={item.id} listing={item} />) : <p className="text-sm text-muted">No similar listings yet.</p>}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#1F1F1F] bg-[#0D0D0D]/95 p-3 backdrop-blur md:hidden">
        <a href="#enquiry" className="flex min-h-11 items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-black">
          Enquire
        </a>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#1F1F1F] bg-[#0D0D0D] p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[#7A7A7A]">{label}</div>
      <div className="mt-2 text-base font-bold tracking-tight text-white">{value}</div>
    </div>
  );
}

function ScoreBar({
  icon,
  label,
  score,
  description,
}: {
  icon: string;
  label: string;
  score: number;
  description: string;
}) {
  const colour = score >= 8 ? "bg-emerald-500" : score >= 6 ? "bg-amber-400" : "bg-red-500";
  const textColour = score >= 8 ? "text-emerald-400" : score >= 6 ? "text-amber-300" : "text-red-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">
          {icon} {label}
        </div>
        <div className={`text-sm font-bold ${textColour}`}>{score}/10</div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#232323]">
        <div className={`h-full rounded-full ${colour}`} style={{ width: `${score * 10}%` }} />
      </div>
      <p className="text-sm leading-7 text-[#9A9A9A]">{description}</p>
    </div>
  );
}
