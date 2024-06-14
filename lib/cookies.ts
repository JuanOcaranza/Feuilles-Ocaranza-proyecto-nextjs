"use server"

import { Cart } from "@/lib/definitions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCart(): Promise<Cart> {
    const cookieStore = cookies();
    const cartCookie = cookieStore.get("cart");
    if (!cartCookie) {
        return {
            boxes: []
        }
    }
    return JSON.parse(cartCookie.value);
}

export async function setCart(cart: Cart) {
    const cookieStore = cookies();
    cookieStore.set("cart", JSON.stringify(cart));
    revalidatePath("/")
}