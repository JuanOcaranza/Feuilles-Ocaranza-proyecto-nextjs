import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { getCart } from "@/lib/actions/cookies";
import BoxCartItem from "@/components/cart/box-cart-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                <SheetFooter>
                <SheetClose asChild>
                {cart.boxes.length > 0 ?
                    <Link href="/checkout" className="bg-black hover:bg-green-900 text-white text-center font-bold py-2 w-full rounded-md mt-6">
                        Checkout
                    </Link>
                    :
                    <Button className="bg-black hover:bg-green-900 text-white text-center font-bold py-2 w-full rounded-md mt-6" disabled>
                        Checkout
                    </Button>
                }
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}