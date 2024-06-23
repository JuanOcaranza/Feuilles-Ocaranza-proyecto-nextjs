import EditBoxForm from "@/components/admin/forms/edit-box-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { getBoxById } from "@/lib/data/boxes";
import { getItems } from "@/lib/data/items";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Edit Box',
};

export default async function EditBox({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const [box, items] = await Promise.all([
        getBoxById(id),
        getItems()
    ])

    if (!box) {
        notFound();
    }

    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Products", url: "/admin/products" }, { name: "Edit Box", url: `/admin/products/${id}/edit` }]} />
            <EditBoxForm box={box} items={items} />
        </div>
    )
}