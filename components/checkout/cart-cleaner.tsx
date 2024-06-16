"use client"

import { clearCart } from "@/lib/actions/cart";
import { useEffect } from "react";

export default function CartCleaner() {
    useEffect(() => {
        clearCart();
    }, []);

    return null;
}