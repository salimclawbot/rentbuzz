import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "List Your Rental Property — Free | RentBuzz",
  description:
    "List your Victorian rental property for free on RentBuzz. Submit address, rent, details, and contact information for review within 24 hours.",
  path: "/list-your-property",
});

export default function ListYourPropertyPage() {
  return (
    <div className="container-shell section-space space-y-8">
      <div className="space-y-4">
        <div className="eyebrow">Landlord sign-up</div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">List Your Rental Property — Free</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Publish your rental on RentBuzz without the marketplace price tag. We review submissions and publish within 24 hours.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card-surface rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold text-primary">RentBuzz</div>
          <div className="mt-2 text-3xl font-extrabold text-emerald-600">Free</div>
        </div>
        <div className="card-surface rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold text-primary">Gumtree</div>
          <div className="mt-2 text-3xl font-extrabold">$99</div>
        </div>
        <div className="card-surface rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold text-primary">Domain / major portals</div>
          <div className="mt-2 text-3xl font-extrabold">$200+</div>
        </div>
      </div>

      <section className="card-surface rounded-[2rem] p-6 md:p-8">
        <form action="https://formsubmit.co/admin+v1@grab3.com" method="POST" className="grid gap-4 md:grid-cols-2">
          <input type="hidden" name="_subject" value="New Property Listing Submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://rentbuzz.com.au/thanks" />
          <input type="text" name="address" placeholder="Property address" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm md:col-span-2" />
          <select name="propertyType" className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm">
            <option>Apartment</option>
            <option>House</option>
            <option>Unit</option>
            <option>Townhouse</option>
          </select>
          <input type="number" name="bedrooms" placeholder="Bedrooms" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="number" name="price" placeholder="Weekly price" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="date" name="availableDate" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <textarea name="description" rows={6} placeholder="Describe the property" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm md:col-span-2" />
          <input type="text" name="contactName" placeholder="Contact name" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="email" name="contactEmail" placeholder="Contact email" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="tel" name="contactPhone" placeholder="Contact phone" required className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm md:col-span-2" />
          <button type="submit" className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white md:col-span-2">Submit property</button>
        </form>
        <p className="mt-4 text-sm text-muted">We&apos;ll review and publish within 24 hours.</p>
      </section>
    </div>
  );
}
