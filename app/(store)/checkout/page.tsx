import BoxQuantityCard from "@/components/checkout/box-quantity-card";
import Checkout from "@/components/checkout/checkout";
import { checkout } from "@/lib/actions/checkout";
import { lusitana } from "@/lib/fonts";
import clsx from "clsx";

export default async function CheckoutPage(){
    const { preferenceId, boxes } = await checkout();

    if (!preferenceId) {
        return (
            <div>
                <h1>Checkout failed</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col m-6">
            <h1 className={clsx("text-3xl mb-8", lusitana.className)}>Checkout</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {boxes?.map((box) => <BoxQuantityCard key={box.id} box={box} finalPrice={box.finalPrice} quantity={box.quantity} />)}
            </div>
            <Checkout preferendeId={preferenceId} />
        </div>
    )
}