import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailOptIn } from "@/components/email-opt-in";
import { GuideMarkdown } from "@/components/guide-markdown";
import { createMetadata, formatDate } from "@/lib/site";
import { getAllGuideSlugs, getGuideBySlug } from "@/lib/guides";
import { getRelatedGuides } from "@/lib/rent-data";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return createMetadata({
    title: `${guide.title} | Victorian Rental Guide | RentBuzz`,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = getRelatedGuides(guide.slug, guide.category, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.datePublished,
    author: { "@type": "Person", name: guide.author },
  };

  return (
    <div className="container-shell section-space space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-8">
          <header className="space-y-5">
            <div className="eyebrow">{guide.category}</div>
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-5xl">{guide.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span>By {guide.author}</span>
              <span>{formatDate(guide.datePublished)}</span>
            </div>
            <EmailOptIn
              title="Get suburb rental alerts before your next inspection"
              description="Join the list for new rental alerts, suburb medians, and practical renter updates."
              subject={`Guide Opt-In - ${guide.title}`}
              cta="Join alerts"
              suburbField
              variant="banner"
            />
          </header>

          <GuideMarkdown content={guide.content} />

          <EmailOptIn
            title="Keep your shortlist moving"
            description="Get suburb-specific rental updates once you have narrowed your target areas."
            subject={`Mid Guide Opt-In - ${guide.title}`}
            cta="Stay updated"
            suburbField
          />

          <section className="card-surface rounded-[1.75rem] p-6">
            <h2 className="text-2xl font-extrabold tracking-tight">FAQ</h2>
            <div className="mt-5 space-y-4">
              {guide.faq.map((item) => (
                <div key={item.question} className="rounded-[1.5rem] bg-slate-50 p-5">
                  <h3 className="text-lg font-bold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <EmailOptIn
            title="Get RentBuzz's weekly market update"
            description="Suburb medians, sample listings, and strategy notes for Victorian renters."
            subject={`Lead Magnet - ${guide.title}`}
            cta="Get weekly update"
            variant="lead-magnet"
          />

          <section className="card-surface rounded-[1.75rem] p-6">
            <h2 className="text-2xl font-extrabold tracking-tight">About the author</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              RentBuzz Editorial Team writes practical Victoria-first rental guides focused on suburb pricing, application readiness, and renter decision-making.
            </p>
          </section>

          <EmailOptIn
            title="Want more Victorian rental advice?"
            description="Join our footer list for new guides, calculators, and suburb pricing movement."
            subject={`Footer Guide Opt-In - ${guide.title}`}
            cta="Subscribe"
            variant="footer"
          />
        </article>

        <aside className="space-y-6">
          <div className="card-surface sticky top-24 rounded-[1.75rem] p-6">
            <h2 className="text-xl font-extrabold tracking-tight">Table of contents</h2>
            <nav className="mt-4 space-y-3 text-sm text-slate-700">
              {guide.headings.map((heading) => (
                <a key={heading.id} href={`#${heading.id}`} className={heading.depth === 3 ? "ml-4 block" : "block font-semibold"}>
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      <section className="space-y-5">
        <h2 className="text-3xl font-extrabold tracking-tight">Related guides</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {relatedGuides.map((item) => (
            <article key={item.slug} className="card-surface rounded-[1.5rem] p-5">
              <div className="text-sm font-semibold text-primary">{item.category}</div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.excerpt}</p>
              <Link href={`/guides/${item.slug}`} className="mt-4 inline-flex text-sm font-bold text-primary">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
