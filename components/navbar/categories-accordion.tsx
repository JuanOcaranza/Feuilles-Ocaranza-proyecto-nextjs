import { getGroups } from "@/lib/data/categories";
import CategoryGroupAccordionItem from "@/components/navbar/category-group-accordion-item";
import { Accordion } from "../ui/accordion";

export default async function CategoriesAccordion({ baseUrl }: { baseUrl: string }) {
    const groups = await getGroups();

    return (
        <Accordion type="single" collapsible>
            {groups.map((group) => (
                <CategoryGroupAccordionItem key={group.id} baseUrl={baseUrl} group={group} />
            ))}
        </Accordion>
    )
}