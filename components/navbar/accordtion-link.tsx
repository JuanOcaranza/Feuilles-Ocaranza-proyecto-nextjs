import Link from "next/link";
import CategoriesAccordion from "@/components/navbar/categories-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";

export default function AccordionLink({ href, baseUrl, name }: { href: string, baseUrl: string, name: string}) {
    return (
        <AccordionItem value={name}>
            <AccordionTrigger className="text-2xl hover:no-underline">
                {name}
            </AccordionTrigger>
            <AccordionContent>
                <SheetClose asChild>
                    <Link className="text-lg" href={href}>
                        All {name}
                    </Link>
                </SheetClose>
                <CategoriesAccordion baseUrl={baseUrl} />
            </AccordionContent>
        </AccordionItem>
    )
}