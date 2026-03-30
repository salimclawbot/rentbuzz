import { BondCalculator } from "@/components/tools/bond-calculator";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Bond Calculator | Victoria Rental Bond & Upfront Costs | RentBuzz",
  description:
    "Calculate four weeks of bond, two weeks of advance rent, and total upfront rental costs using RentBuzz's Victoria-focused bond calculator.",
  path: "/renter-tools/bond-calculator",
});

export default function BondCalculatorPage() {
  return (
    <div className="container-shell section-space">
      <BondCalculator />
    </div>
  );
}
