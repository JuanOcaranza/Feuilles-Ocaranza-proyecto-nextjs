import EditItemForm from "@/components/admin/forms/edit-item-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { getItemById } from "@/lib/data/items";
import { notFound } from "next/navigation";

export default async function EditItem({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const item = await getItemById(id)

    if (!item) {
        notFound();
    }

    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Items", url: "/admin/items" }, { name: "Edit Items", url: `/admin/items/${id}/edit` }]} />
            <EditItemForm item={item} />
        </div>
    )
}