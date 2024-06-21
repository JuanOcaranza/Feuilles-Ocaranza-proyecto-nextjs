import CreateOfferForm from "@/components/admin/forms/create-offer-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { getBoxesOnly } from "@/lib/data/boxes";

export default async function CreateOffer() {
    const boxes = await getBoxesOnly();

    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Offers", url: "/admin/offers" }, { name: "Create Offer", url: "/admin/offers/create" }]} />
            <CreateOfferForm boxes={boxes} />
        </div>
    )
}