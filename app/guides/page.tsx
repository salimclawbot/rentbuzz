import Link from "next/link";
import { createMetadata } from "@/lib/site";
import { guides } from "@/lib/rent-data";

export const metadata = createMetadata({
  title: "Renter Guides | RentBuzz",
  description: "Browse RentBuzz renter guides for Victoria-focused suburb research, pricing context, budgeting, and rental applications.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <div className="container-shell section-space space-y-8">
      <div className="space-y-4">
        <div className="eyebrow">Guides</div>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Advice for renters who want clarity</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {guides.slice(0, 12).map((guide) => (
          <article key={guide.slug} className="card-surface rounded-[1.5rem] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{guide.category}</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">{guide.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#999999]">{guide.excerpt}</p>
            <Link href={`/guides/${guide.slug}`} className="mt-4 inline-flex text-sm font-bold text-primary">
              Read guide
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
