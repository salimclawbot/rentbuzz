import Link from "next/link";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Thanks | RentBuzz",
  description: "Thanks for contacting RentBuzz or joining a rental alert. You can continue browsing listings, suburbs, and renter tools.",
  path: "/thanks",
});

export default function ThanksPage() {
  return (
    <div className="container-shell section-space">
      <div className="card-surface rounded-[2rem] p-8">
        <div className="eyebrow">Thank you</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Your submission has been received</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
          We have your details and will use them for alerts, enquiries, or listing review. Keep browsing suburbs, sample rentals, and renter tools while you wait.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/search" className="rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white">Search rentals</Link>
          <Link href="/renter-tools" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-800">Open renter tools</Link>
        </div>
      </div>
    </div>
  );
}
