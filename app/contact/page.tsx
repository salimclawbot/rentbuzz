import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact RentBuzz | Rental Alerts, Listings & Support",
  description: "Contact RentBuzz for rental alerts, listing support, or questions about Victorian suburb pages, guides, and renter tools.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-shell section-space">
      <section className="card-surface rounded-[2rem] p-8">
        <div className="eyebrow">Contact</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Speak with the RentBuzz team</h1>
        <form action="https://formsubmit.co/admin+v1@grab3.com" method="POST" className="mt-6 grid gap-4 md:grid-cols-2">
          <input type="hidden" name="_subject" value="Contact Form Submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://rentbuzz.com.au/thanks" />
          <input type="text" name="name" required placeholder="Your name" className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="email" name="email" required placeholder="Your email" className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm" />
          <input type="text" name="topic" placeholder="What do you need help with?" className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm md:col-span-2" />
          <textarea name="message" rows={6} required placeholder="Message" className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm md:col-span-2" />
          <button type="submit" className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white md:col-span-2">Send message</button>
        </form>
      </section>
    </div>
  );
}
