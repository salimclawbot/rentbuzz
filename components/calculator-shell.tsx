import { ReactNode } from "react";

export function CalculatorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="card-surface rounded-[2rem] p-6 md:p-8">
      <div className="max-w-2xl">
        <div className="eyebrow">Calculator</div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
