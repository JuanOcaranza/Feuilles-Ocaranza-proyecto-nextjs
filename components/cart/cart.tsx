import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose} from "@/components/ui/sheet";
import {  ShoppingCart } from "lucide-react"
import { getCart } from "@/lib/actions/cookies";
import BoxCartItem from "@/components/cart/box-cart-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default async function Cart(){
    const cart = await getCart();
    const elements = cart.boxes.reduce((acc, box) => acc + box.quantity, 0);

    return (
        <Sheet>
            <SheetTrigger>
                <div className="relative">
                    <ShoppingCart className="mr-2 ml-2" size={28} />
                    {cart.boxes.length > 0 && (
                        <span className={clsx("absolute bottom-[14px] right-0 bg-black text-white rounded-full text-xs flex items-center justify-center", elements > 99 ? "w-6 h-6" : "w-5 h-5")}>
                            {elements}
                        </span>
                    )}
                </div>
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