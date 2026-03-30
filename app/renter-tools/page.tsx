import Link from "next/link";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Renter Tools | Affordability, Bond & Suburb Comparison | RentBuzz",
  description:
    "Use RentBuzz renter tools to calculate affordable rent, estimate bond and upfront costs, and compare Victorian suburbs side by side.",
  path: "/renter-tools",
});

const tools = [
  {
    href: "/renter-tools/affordability-calculator",
    title: "Affordability Calculator",
    description: "Turn weekly income into a realistic max rent, bond estimate, and upfront move-in budget.",
  },
  {
    href: "/renter-tools/bond-calculator",
    title: "Bond Calculator",
    description: "Estimate four weeks of bond, advance rent, and the total cash required before moving in.",
  },
  {
    href: "/renter-tools/suburb-comparison",
    title: "Suburb Comparison",
    description: "Compare two Victorian suburbs by median rent, transport score, and walkability before you inspect.",
  },
];

export default function RenterToolsHubPage() {
  return (
    <div className="container-shell section-space space-y-8">
      <div className="space-y-4">
        <div className="eyebrow">Renter Tools</div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Budget and compare before you apply</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-700">
          These tools are designed for Victorian renters who want fast numbers before committing to inspections, applications, or suburb changes.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.href} className="card-surface rounded-[1.75rem] p-6">
            <h2 className="text-2xl font-extrabold tracking-tight">{tool.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{tool.description}</p>
            <Link href={tool.href} className="mt-5 inline-flex rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white">
              Open tool
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
