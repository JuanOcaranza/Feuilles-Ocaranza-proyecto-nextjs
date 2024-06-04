"use client"

import { useState } from "react";
import Price from "@/components/price";
import BuyButton from "@/components/buy-button";

export default function BuyQuantity({ BoxId, basePrice, discount }: { BoxId: string, basePrice: number, discount: number }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex justify-between items-center gap-x-3">
                <label className=" text-xl mr-8" htmlFor="quantity">Quantity:</label>
                <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="p-2 border border-black rounded-lg flex-grow mt-1 pl-4"
                >
                    {
                        Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
                    }
                </select>
            </div>
            <Price basePrice={basePrice * quantity} discount={discount} />
            <BuyButton boxId={BoxId} quantity={quantity} className="rounded-lg" />
        </div>
    )
}