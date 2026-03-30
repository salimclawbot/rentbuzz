import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#1A1A1A] bg-[#0A0A0A] text-white">
      <div className="container-shell py-12">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xl font-extrabold">RentBuzz</div>
            <p className="mt-2 max-w-xs text-sm text-[#666666]">
              Victoria&apos;s rental search platform. Free for renters. Always.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#555555]">Browse</p>
              <div className="flex flex-col gap-2 text-sm text-[#999999]">
                <Link href="/search">Search Rentals</Link>
                <Link href="/rent/melbourne-cbd">Melbourne CBD</Link>
                <Link href="/rent/richmond">Richmond</Link>
                <Link href="/rent/doncaster">Doncaster</Link>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#555555]">Resources</p>
              <div className="flex flex-col gap-2 text-sm text-[#999999]">
                <Link href="/guides">Renter Guides</Link>
                <Link href="/renter-tools">Calculators</Link>
                <Link href="/list-your-property">List Free</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#1A1A1A] pt-6 text-xs text-[#666666] md:flex-row md:items-center md:justify-between">
          <p>© 2026 RentBuzz. For Victorian renters.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
