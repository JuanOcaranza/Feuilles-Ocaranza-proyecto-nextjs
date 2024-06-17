import CreateBoxForm from "@/components/admin/forms/create-box-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";
import { getItems } from "@/lib/data/items";

export default async function CreateBox() {
    const items = await getItems();

    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Products", url: "/admin/products" }, { name: "Create Box", url: "/admin/products/create" }]} />
            <CreateBoxForm items={items} />
        </div>
    )
}