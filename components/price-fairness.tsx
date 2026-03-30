import { formatCurrency } from "@/lib/site";

type PriceFairnessProps = {
  askingPrice: number;
  medianPrice: number;
  label: string;
};

export function PriceFairness({ askingPrice, medianPrice, label }: PriceFairnessProps) {
  const difference = askingPrice - medianPrice;
  const direction =
    difference === 0 ? "in line with" : difference > 0 ? `${formatCurrency(Math.abs(difference))} above` : `${formatCurrency(Math.abs(difference))} below`;
  const tone =
    difference > 80 ? "bg-amber-50 text-amber-900 border-amber-200" : difference < -80 ? "bg-emerald-50 text-emerald-900 border-emerald-200" : "bg-sky-50 text-sky-900 border-sky-200";

  return (
    <section className={`rounded-[1.75rem] border p-6 ${tone}`}>
      <div className="eyebrow">Is this price fair?</div>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
        {formatCurrency(askingPrice)}/week is {direction} the {label} median
      </h2>
      <p className="mt-3 text-sm leading-7">
        Use this as a pricing benchmark, not a substitute for inspection quality, layout, building condition, and exact location.
      </p>
    </section>
  );
}
