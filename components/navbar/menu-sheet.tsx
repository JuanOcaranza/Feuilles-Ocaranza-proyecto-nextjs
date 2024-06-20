import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import AccordionLink from "@/components/navbar/accordtion-link";
import { Accordion } from "@/components/ui/accordion";

export default async function MenuSheet(){
    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="mr-2 ml-2" size={28} />
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <Accordion className="mt-6" type="single" collapsible>
                    <AccordionLink baseUrl="/products?featured=true&" name="Featured" href="/products?featured=true" />
                    <AccordionLink baseUrl="/products?" name="Products" href="/products" />
                    <AccordionLink baseUrl="/products?onOffer=true&" name="On Offer" href="/products?onOffer=true" />
                </Accordion>
            </SheetContent>
        </Sheet>
    );
}