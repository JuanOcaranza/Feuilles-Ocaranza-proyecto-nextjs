import { lusitana } from "@/lib/fonts";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function CheckoutFailed() {
    return (
        <div className="flex flex-col m-6 items-center">
            <h1 className={clsx("text-3xl", lusitana.className)}>Checkout Failed</h1>
            <FaceFrownIcon className="h-24 w-24" />
        </div>
    );
}