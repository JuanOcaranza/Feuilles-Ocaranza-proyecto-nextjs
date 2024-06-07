"use client"

import { addToCart } from "@/lib/actions"
import clsx from "clsx"

export default function BuyButton({ boxId, quantity, className }: { boxId: number, quantity?: number, className?: string }) {
    return (
        <button className={clsx("bg-black hover:bg-green-900 text-white text-center font-bold py-2 px-4", className)} onClick={() => addToCart(boxId, quantity ?? 1)}>
            Add to Cart
        </button>
    )
}