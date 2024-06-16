"use client"

import { addToCart } from "@/lib/actions/cart"
import clsx from "clsx"
import { useTransition } from "react"

export default function BuyButton({ boxId, quantity, className }: { boxId: number, quantity?: number, className?: string }) {
    const [isPending, startTransition] = useTransition()

    const onClick = () => {
        startTransition(async () => addToCart(boxId, quantity ?? 1))
    }

    return (
        <button className={clsx("bg-black hover:bg-green-900 text-white text-center font-bold py-2 px-4", className)} onClick={onClick} disabled={isPending}>
            Add to Cart
        </button>
    )
}