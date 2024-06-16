import { lusitana } from "@/lib/fonts";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function CheckoutFailed() {
    return (
        <div className="flex flex-col m-6 items-center">
            <h1 className={clsx("text-3xl", lusitana.className)}>Checkout Failed</h1>
            <FaceFrownIcon className="h-24 w-24" />
            <div className="mt-8 flex justify-center">
                <Link href="/checkout" className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800">Try again</Link>
            </div>
        </div>
    );
}