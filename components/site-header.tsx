import Link from "next/link";
import { SavedCountLink } from "@/components/saved-count-link";

const navItems = [
  { href: "/search", label: "Search" },
  { href: "/list-your-property", label: "List Free" },
  { href: "/guides", label: "Guides" },
  { href: "/renter-tools", label: "Tools" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1F1F1F] bg-[#0D0D0D]/95 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-3 py-2.5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F97316] text-xs font-black text-black">
            R
          </span>
          <div className="font-extrabold tracking-tight text-white leading-none">RentBuzz</div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-[#999999] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <SavedCountLink />
          <Link href="/search" className="rounded-full bg-[#F97316] px-4 py-1.5 text-sm font-bold text-black transition hover:bg-orange-400">
            Find Rentals →
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <SavedCountLink />
          <Link href="/search" className="rounded-full bg-[#F97316] px-3 py-1.5 text-xs font-bold text-black">
            Search
          </Link>
        </div>
      </div>
    </header>
  );
}
