import CreateBoxForm from "@/components/admin/forms/create-box-form";
import BreadcrumbFromList from "@/components/ui/breadcrumb-from-list";

export default function CreateBox() {
    return (
        <div>
            <BreadcrumbFromList className="mb-6" items={[{ name: "Products", url: "/admin/products" }, { name: "Create Box", url: "/admin/products/create" }]} />
            <CreateBoxForm />
        </div>
    )
}