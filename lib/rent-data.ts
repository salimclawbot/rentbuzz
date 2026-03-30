import { guides, type GuideStub } from "@/data/guides";
import { listings, type Listing } from "@/data/listings";
import { suburbs, type Suburb } from "@/data/suburbs";

export { guides, listings, suburbs };

export type ListingFilters = {
  suburb?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  type?: string;
  available?: string;
  area?: string;
};

export function getSuburbBySlug(slug: string) {
  return suburbs.find((suburb) => suburb.slug === slug);
}

export function getSuburbByName(name: string) {
  return suburbs.find((suburb) => suburb.name.toLowerCase() === name.toLowerCase());
}

export function getListingById(id: string) {
  return listings.find((listing) => listing.id === id);
}

export function getListingsForSuburb(suburbName: string) {
  return listings.filter((listing) => listing.suburb === suburbName);
}

export function getFeaturedListings(limit = 6) {
  return listings.filter((listing) => listing.featured).slice(0, limit);
}

export function getRelatedGuides(slug: string, category?: string, limit = 3) {
  return guides
    .filter((guide) => guide.slug !== slug && (!category || guide.category === category))
    .slice(0, limit);
}

export function filterListings(filters: ListingFilters) {
  return listings.filter((listing) => {
    if (filters.suburb && listing.suburb.toLowerCase() !== filters.suburb.toLowerCase()) return false;
    if (typeof filters.minPrice === "number" && listing.price < filters.minPrice) return false;
    if (typeof filters.maxPrice === "number" && listing.price > filters.maxPrice) return false;
    if (typeof filters.bedrooms === "number" && (filters.bedrooms >= 5 ? listing.bedrooms < 5 : listing.bedrooms !== filters.bedrooms)) return false;
    if (filters.type && listing.type !== filters.type) return false;
    if (filters.available && listing.available < filters.available) return false;
    if (filters.area && filters.area !== "All VIC" && getAreaForSuburb(listing.suburb) !== filters.area) return false;
    return true;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage,
  };
}

export function getRegionGroups() {
  return ["CBD", "North", "East", "South East", "South", "West", "Geelong", "Regional"].map(
    (region) => ({
      region,
      suburbs: suburbs.filter((suburb) => suburb.region === region),
      listings: listings.filter((listing) =>
        suburbs.some((suburb) => suburb.region === region && suburb.name === listing.suburb),
      ),
    }),
  );
}

export function getSuburbMedianForBedrooms(suburb: Suburb, bedrooms: number) {
  if (bedrooms <= 1) return suburb.medianRent["1br"];
  if (bedrooms === 2) return suburb.medianRent["2br"];
  return suburb.medianRent["3br"];
}

export function getGuideStub(slug: string): GuideStub | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getSimilarListings(listing: Listing, limit = 3) {
  return listings.filter((item) => item.id !== listing.id && item.suburb === listing.suburb).slice(0, limit);
}

export function seededScore(seed: string, min = 5, max = 10) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }
  return min + (Math.abs(hash) % (max - min + 1));
}

export function getNeighbourhoodScores(suburbName: string) {
  return {
    schools: seededScore(`${suburbName}-schools`),
    safety: seededScore(`${suburbName}-safety`),
    health: seededScore(`${suburbName}-health`),
    transit: seededScore(`${suburbName}-transit`),
  };
}

export function getSuburbAmenities(suburbName: string) {
  const suburb = getSuburbByName(suburbName);
  const seed = Math.max(1, seededScore(`${suburbName}-amenities`, 1, 9));

  return {
    distanceToCbd: `${suburb?.region === "CBD" ? 1 + (seed % 3) : 6 + seed} km`,
    station: `${400 + seed * 120} m`,
    supermarkets: `${350 + seed * 90} m`,
    schools: `${600 + seed * 140} m`,
    parks: `${250 + seed * 110} m`,
    hospital: `${1.5 + seed * 0.25} km`,
  };
}

export function getPropertyRoomDetails(listing: Listing) {
  const seed = seededScore(`${listing.id}-rooms`, 1, 9);
  const ensuiteCount = listing.bathrooms > 1 ? 1 : 0;
  const standardBathrooms = Math.max(1, listing.bathrooms - ensuiteCount);

  return {
    bedroomConfig:
      listing.bedrooms <= 1
        ? "1 main bedroom with built-in storage"
        : `${listing.bedrooms} bedrooms including ${Math.max(1, listing.bedrooms - 1)} secondary room${listing.bedrooms > 2 ? "s" : ""}`,
    bathroomTypes: `${standardBathrooms} bathroom${standardBathrooms > 1 ? "s" : ""}${ensuiteCount ? " + 1 ensuite" : ""}`,
    parkingType: listing.parking === 0 ? "Street permit / no dedicated parking" : listing.parking === 1 ? "1 off-street car space" : `${listing.parking} off-street spaces`,
    floorArea: `${listing.bedrooms * 28 + listing.bathrooms * 10 + listing.parking * 12 + seed * 3} m²`,
    yearBuilt: String(1998 + seed * 2),
    heatingCooling: listing.features.some((feature) => feature.toLowerCase().includes("split-system"))
      ? "Split-system heating and cooling"
      : seed % 2 === 0
        ? "Ducted heating with ceiling fans"
        : "Panel heating with natural ventilation",
  };
}

export function getAreaForSuburb(suburbName: string) {
  const suburb = getSuburbByName(suburbName);
  if (!suburb) return "All VIC";

  const map: Record<string, string> = {
    CBD: "CBD",
    East: "Inner East",
    North: "Inner North",
    "South East": "South East",
    West: "West",
    Geelong: "Geelong",
  };

  return map[suburb.region] ?? "All VIC";
}
