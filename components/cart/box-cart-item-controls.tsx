"use client"

import { useState, useTransition } from "react";
import { decrementQuantityInCart } from "@/lib/actions/cart";
import { incrementQuantityInCart } from "@/lib/actions/cart";
import { removeFromCart } from "@/lib/actions/cart";
import { Trash2 } from "lucide-react";
import clsx from "clsx";

export default function BoxCartItemControls({ boxId, quantity }: { boxId: number, quantity: number }) {
    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(quantity);

    const onIncrement = () => {
        startTransition(async () => {
            const result = await incrementQuantityInCart(boxId);
            setValue(result);
        });
    }

    const onDecrement = () => {
        startTransition(async () => {
            const result = await decrementQuantityInCart(boxId);
            setValue(result);
        });
    }

    const onDelete = () => {
        startTransition(async () => {
            await removeFromCart(boxId);
        });
    }

    return (
        <div className="self-end flex items-center">
            <div className="flex items-center mr-4 space-x-1">
                <button
                    className={clsx(
                        "w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200",
                        value === 1 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={onDecrement} 
                    disabled={isPending || value === 1}
                >
                    -
                </button>
                <span className="px-2 text-lg font-semibold">{value}</span>
                <button 
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-200"
                    onClick={onIncrement}
                    disabled={isPending}
                >
                    +
                </button>
            </div>
            <button
                className="w-8 h-8 flex items-center ml-2 justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200"
                onClick={onDelete}
                disabled={isPending}
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
    
}