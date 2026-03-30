import type { Metadata } from "next";

export const siteConfig = {
  name: "RentBuzz",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rentbuzz.com.au",
  email: "admin+v1@grab3.com",
  defaultImage: "/og-rentbuzz.png",
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function createMetadata({ title, description, path }: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function median(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? Math.round((sorted[mid - 1] + sorted[mid]) / 2) : sorted[mid];
}
