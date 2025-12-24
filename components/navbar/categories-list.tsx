import { getGroups } from "@/lib/data/categories";
import CategoryGroupLinkList from "@/components/navbar/category-group-link-list";

export default async function CategoriesList({ baseUrl }: { baseUrl: string }) {
    const groups = await getGroups();

    return (
        <div className="grid grid-cols-2 gap-2 p-2">
            {groups.map((group) => (
                <CategoryGroupLinkList key={group.id} baseUrl={baseUrl} group={group} />
            ))}
        </div>
    );
}