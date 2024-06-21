import EditBoxForm from "@/components/admin/forms/edit-box-form";
import EditOfferForm from "@/components/admin/forms/edit-offer-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { getBoxesOnly } from "@/lib/data/boxes";
import { getOfferById } from "@/lib/data/offers";
import { notFound } from "next/navigation";

export default async function EditOfffer({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const [offer, boxes] = await Promise.all([
        getOfferById(id),
        getBoxesOnly()
    ])

    if (!offer) {
        notFound();
    }

    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Offers", url: "/admin/offers" }, { name: "Edit Offer", url: `/admin/offers/${id}/edit` }]} />
            <EditOfferForm offer={offer} boxes={boxes} />
        </div>
    )
}