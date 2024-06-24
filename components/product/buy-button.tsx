"use client"

import { addToCart } from "@/lib/actions/cart"
import clsx from "clsx"
import { useTransition } from "react"
import { useToast } from "../ui/use-toast"

export default function BuyButton({ boxId, quantity, className }: { boxId: number, quantity?: number, className?: string }) {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const onClick = () => {
        startTransition(async () => {
            addToCart(boxId, quantity ?? 1);
            toast({
                title: "Added to cart",
                description: "The product has been added to the cart"
            })
        })
    }

    return (
        <button className={clsx("bg-black hover:bg-green-900 text-white text-center font-bold py-2 px-4", className)} onClick={onClick} disabled={isPending}>
            Add to Cart
        </button>
    )
}