import { EmailOptIn } from "@/components/email-opt-in";
import { SuburbComparisonTool } from "@/components/tools/suburb-comparison-tool";
import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Suburb Comparison Tool | Compare Victorian Rental Suburbs | RentBuzz",
  description:
    "Compare two Victorian suburbs side by side by median rent, transport score, and walkability to shortlist the right rental area.",
  path: "/renter-tools/suburb-comparison",
});

export default function SuburbComparisonPage() {
  return (
    <div className="container-shell section-space space-y-8">
      <SuburbComparisonTool />
      <EmailOptIn
        title="Get rental alerts for your preferred suburb"
        description="Choose the suburb you prefer and get listing alerts and pricing updates in your inbox."
        subject="Preferred Suburb Alert"
        cta="Track preferred suburb"
        suburbField
      />
    </div>
  );
}
