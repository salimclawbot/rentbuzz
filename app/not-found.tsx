import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell section-space">
      <div className="card-surface rounded-[2rem] p-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-700">The route you requested does not exist. Try searching rentals or browsing suburb pages instead.</p>
        <Link href="/" className="mt-5 inline-flex rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white">
          Go home
        </Link>
      </div>
    </div>
  );
}
