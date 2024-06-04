import clsx from "clsx";

export default function Price({ basePrice, discount, className }: { basePrice: number, discount: number, className?: string }) {
    const price = basePrice - (basePrice * (discount / 100));

    return (
        <div className={clsx("flex justify-between w-full", className)}>
            <div className="flex space-x-2">
                <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">${basePrice}</p>
            </div>
            <p className= "text-green-500 ">{discount}% OFF</p>
        </div>
    )
}