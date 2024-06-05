import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Cart(){
    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingCartIcon className="w-6 lg:w-9 mr-2 ml-2" />
            </SheetTrigger>
            <SheetContent />
        </Sheet>
    );
}