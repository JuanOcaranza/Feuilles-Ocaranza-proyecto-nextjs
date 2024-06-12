import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { getCart } from "@/lib/cookies";
import BoxCartItem from "@/components/box-cart-item";

export default async function Cart(){
    const cart = await getCart();

    return (
        <Sheet>
            <SheetTrigger>
                <ShoppingCartIcon className="w-6 lg:w-9 mr-2 ml-2" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-2xl lg:text-3xl mb-8">Cart</SheetTitle>
                </SheetHeader>
                {cart.boxes.length > 0 ?
                    cart.boxes.map((box) => <BoxCartItem key={box.boxId} boxId={box.boxId} quantity={box.quantity} />)
                    :
                    <p className="text-center text-gray-500">Cart is empty</p>
                }
            </SheetContent>
        </Sheet>
    );
}