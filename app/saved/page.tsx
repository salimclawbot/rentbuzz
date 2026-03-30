import { SavedListingsPage } from "@/components/saved-listings-page";
import { listings } from "@/lib/rent-data";

export default function SavedPage() {
  return <SavedListingsPage listings={listings} />;
}
