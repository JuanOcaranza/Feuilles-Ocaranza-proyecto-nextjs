import { formatCurrency } from "@/lib/utils";
import clsx from "clsx";

export default function Price({ basePrice, discount, className }: { basePrice: number, discount: number, className?: string }) {
    const price = basePrice - (basePrice * (discount / 100));

    return (
        <div className={clsx("flex justify-between w-full", className)}>
            <div className="flex space-x-2">
                <p className="text-2xl font-semibold">{formatCurrency(price)}</p>
                {discount > 0 && <p className="text-sm text-gray-500 line-through">{formatCurrency(basePrice)}</p>}
            </div>
            {discount > 0 && <p className= "text-green-500 ">{discount}% OFF</p>}
        </div>
    )
}