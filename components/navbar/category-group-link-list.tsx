import { getCategoriesByGroupId } from "@/lib/data/categories";
import { CategoryGroup } from "@/lib/definitions";
import Link from "next/link";

export default async function CategoryGroupLinkList({ baseUrl, group }: { baseUrl: string, group: CategoryGroup }) {
    const categories = await getCategoriesByGroupId(group.id);

    return (
        <div className="p-4">
            <h2 className="text-base font-bold pb-1">Shop by {group.name}</h2>
            <div>
                {categories.map((category) => (
                    <Link href={`${baseUrl}category=${category.id}`} key={category.id} className="p-2 hover:font-semibold">{category.name}</Link>
                ))}
            </div>
        </div>
    )
}