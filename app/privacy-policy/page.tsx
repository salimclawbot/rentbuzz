import { createMetadata } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy | RentBuzz",
  description: "Read the RentBuzz privacy policy covering enquiries, email alerts, and data submitted through listing and renter forms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container-shell section-space">
      <article className="card-surface rounded-[2rem] p-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <div className="prose-rentbuzz mt-6 max-w-none">
          <p>RentBuzz collects contact details you submit through alert, enquiry, and property listing forms so we can respond to your request and send the updates you opted into.</p>
          <p>We do not sell submitted information. Form submissions are routed through FormSubmit and stored by the recipient email inbox used for this MVP.</p>
          <p>You can contact us to request removal from future email updates or to ask about information submitted through the site.</p>
        </div>
      </article>
    </div>
  );
}
