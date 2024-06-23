import CreateItemForm from "@/components/admin/forms/create-item-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Item',
};

export default async function CreateItem() {
    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Items", url: "/admin/items" }, { name: "Create Item", url: "/admin/items/create" }]} />
            <CreateItemForm />
        </div>
    )
}