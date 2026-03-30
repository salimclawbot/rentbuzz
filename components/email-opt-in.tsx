import clsx from "clsx";
import { absoluteUrl, siteConfig } from "@/lib/site";

type EmailOptInProps = {
  title: string;
  description: string;
  subject: string;
  cta: string;
  variant?: "banner" | "inline" | "lead-magnet" | "footer";
  suburbField?: boolean;
};

const variants = {
  banner: "rounded-[2rem] border border-blue-100 bg-[#EFF6FF] text-foreground",
  inline: "rounded-[1.75rem] bg-white text-foreground card-surface",
  "lead-magnet": "rounded-[2rem] bg-white text-foreground border border-amber-200 shadow-[0_16px_40px_rgba(245,158,11,0.12)]",
  footer: "rounded-[2rem] border border-white/10 bg-white/5 text-white",
};

export function EmailOptIn({
  title,
  description,
  subject,
  cta,
  variant = "inline",
  suburbField = false,
}: EmailOptInProps) {
  return (
    <section className={clsx("p-6 md:p-8", variants[variant])}>
      <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
          <p className={clsx("mt-2 text-sm leading-7", variant === "footer" ? "text-white/80" : "text-muted")}>
            {description}
          </p>
          {variant === "banner" ? <p className="mt-3 text-xs font-medium text-slate-500">Join 2,400+ Victorian renters. Unsubscribe anytime.</p> : null}
        </div>
        <form action={`https://formsubmit.co/${siteConfig.email}`} method="POST" className="grid gap-3">
          <input type="hidden" name="_subject" value={subject} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={absoluteUrl("/thanks")} />
          {suburbField ? (
            <input
              type="text"
              name="suburb"
              placeholder="Your suburb"
              className="min-h-11 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none ring-0"
            />
          ) : null}
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="min-h-11 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none ring-0"
            />
            <button
              type="submit"
              className={clsx(
                "min-h-11 rounded-2xl px-5 py-3 text-sm font-bold",
                variant === "banner"
                  ? "bg-emerald-500 text-white"
                  : variant === "footer"
                    ? "bg-white text-primary"
                    : "bg-primary text-white",
              )}
            >
              {cta}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
