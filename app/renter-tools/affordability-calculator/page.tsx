import { EmailOptIn } from "@/components/email-opt-in";
import { AffordabilityCalculator } from "@/components/tools/affordability-calculator";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Affordability Calculator | Weekly Rent Budget Tool | RentBuzz",
  description:
    "Use the RentBuzz affordability calculator to estimate recommended max rent, bond, and upfront costs based on weekly income in Victoria.",
  path: "/renter-tools/affordability-calculator",
});

export default function AffordabilityCalculatorPage() {
  return (
    <div className="container-shell section-space space-y-8">
      <AffordabilityCalculator />
      <EmailOptIn
        title="Get suburbs matching your budget"
        description="Join the budget alert list and we will show you suburbs where your weekly budget goes further."
        subject="Budget Match Signup"
        cta="Get suburb matches"
        variant="lead-magnet"
      />
    </div>
  );
}
