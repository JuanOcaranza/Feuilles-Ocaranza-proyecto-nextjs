import { getGroups } from "@/lib/data/categories";
import CategoryGroupLinkList from "./category-group-link-list";

export default async function CategoriesList({ baseUrl }: { baseUrl: string }) {
    const groups = await getGroups();

    return (
        <div>
            {groups.map((group) => (
                <CategoryGroupLinkList key={group.id} baseUrl={baseUrl} group={group} />
            ))}
        </div>
    )
}