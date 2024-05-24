import { Sheet, SheetTrigger, SheetContent } from "@/components/sheet";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Cart(){
    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingCartIcon className="w-6 lg:w-9" />
            </SheetTrigger>
            <SheetContent />
        </Sheet>
    );
}