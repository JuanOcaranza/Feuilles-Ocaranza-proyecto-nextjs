"use client"

import { useState, useTransition } from "react";
import { IncrementQuantityInCart, DecrementQuantityInCart, removeFromCart } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

export default function BoxCartItemControls({ boxId, quantity }: { boxId: number, quantity: number }) {
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(quantity);

    const onIncrement = () => {
        startTransition(async () => {
            const result = await IncrementQuantityInCart(boxId);
            setValue(result);
        });
    }

    const onDecrement = () => {
        startTransition(async () => {
            const result = await DecrementQuantityInCart(boxId);
            setValue(result);
        });
    }

    const onDelete = () => {
        startTransition(async () => {
            await removeFromCart(boxId);
        });
    }

    return (
        <div className="flex items-center">
            <div className="mr-4">
                <button
                    className={clsx("w-8 h-8 shadow-sm disabled:shadow-none disabled:cursor-pointer rounded-md bg-slate-300", value === 1 && "opacity-50 disabled:cursor-default")}
                    onClick={onDecrement} 
                    disabled={isPending || value === 1}
                >
                    -
                </button>
                <span className="px-1">{value}</span>
                <button 
                    className="w-8 h-8 shadow-sm disabled:shadow-none disabled:cursor-pointer rounded-md bg-slate-300"
                    onClick={onIncrement}
                    disabled={isPending}
                >
                    +
                </button>
            </div>
            <button
                className="w-8 h-8 shadow-sm disabled:shadow-none rounded-md bg-slate-300 flex items-center justify-center hover:bg-red-500"
                onClick={onDelete}
                disabled={isPending}
            >
                <Trash2 />
            </button>
        </div>
    )
}