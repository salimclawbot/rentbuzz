import type { MetadataRoute } from "next";
import { guides, listings, suburbs } from "@/lib/rent-data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/list-your-property",
    "/renter-tools",
    "/renter-tools/affordability-calculator",
    "/renter-tools/bond-calculator",
    "/renter-tools/suburb-comparison",
    "/thanks",
    "/privacy-policy",
    "/contact",
  ].map((path) => ({
    url: `${siteConfig.baseUrl}${path || "/"}`,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const suburbRoutes = suburbs.map((suburb) => ({
    url: `${siteConfig.baseUrl}/rent/${suburb.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const listingRoutes = listings.map((listing) => ({
    url: `${siteConfig.baseUrl}/listings/${listing.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${siteConfig.baseUrl}/guides/${guide.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...suburbRoutes, ...listingRoutes, ...guideRoutes];
}
