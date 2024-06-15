import Checkout from "@/components/checkout";
import { checkout } from "@/lib/actions/checkout";

export default async function CheckoutPage(){
    const preferendeId = await checkout();

    if (!preferendeId) {
        return (
            <div>
                <h1>Checkout failed</h1>
            </div>
        )
    }

    return (
        <Checkout preferendeId={preferendeId} />
    )
}