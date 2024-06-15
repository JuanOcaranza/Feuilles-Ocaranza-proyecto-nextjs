import { checkPayment } from "@/lib/actions/checkout";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { lusitana } from "@/lib/fonts";
import ItemQuantityCard from "@/components/item-quantity-card";

export default async function CheckoutSuccess({
    searchParams,
}: {
    searchParams?: {
        payment_id?: string;
    }
}) {
    if (!searchParams?.payment_id) { 
        redirect('/checkout/failed');
    }

    const paymentId = parseInt(searchParams?.payment_id);
    const sale = await checkPayment(paymentId);

    if (sale === null) {
        redirect('/checkout/failed');
    }
    
    return (
        <div className="m-6">
            <h1 className={clsx("text-3xl text-center", lusitana.className)}>Thank you for your purchase!</h1>
            <h2 className="text-2xl my-6">Here are your items:</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {sale.items.map((item) => <ItemQuantityCard key={item.item.id} item={item.item} quantity={item.quantity} />)}
            </div>
        </div>
    );
}
