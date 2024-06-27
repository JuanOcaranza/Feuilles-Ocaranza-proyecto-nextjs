import { getFilteredCategoriesByGroupId } from "@/lib/data/categories";
import { CategoryGroup } from "@/lib/definitions";
import Link from "next/link";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";

export default async function CategoryGroupAccordionItem({ baseUrl, group }: { baseUrl: string, group: CategoryGroup }) {
    const categories = await getFilteredCategoriesByGroupId(group.id, baseUrl);

    return (
        categories.length > 0
            ?
                <AccordionItem value={group.name}>
                    <AccordionTrigger className="hover:no-underline text-base">Shop by {group.name}</AccordionTrigger>
                    <AccordionContent>
                        {categories.map((category) => (
                            <SheetClose key={category.id} asChild>
                                <Link href={`${baseUrl}category=${category.id}`} className="p-2 text-base">{category.name}</Link>
                            </SheetClose>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            :
                null
    )
}