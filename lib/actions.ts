"use server"

import { getCart, setCart } from "@/lib/cookies";

export async function addToCart(boxId: number, quantity: number) {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);

    if (index !== -1)
        cart.boxes[index].quantity += quantity;
    else 
        cart.boxes.push({ boxId, quantity });

    setCart(cart);
}

export async function removeFromCart(boxId: number) {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);

    if (index !== -1) {
        cart.boxes.splice(index, 1);
        setCart(cart);
    }
}

export async function IncrementQuantityInCart(boxId: number) : Promise<number> {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);
    let result = 0;

    if (index !== -1){
        result = ++cart.boxes[index].quantity;
        setCart(cart);
    }

    return result;
}

export async function DecrementQuantityInCart(boxId: number) : Promise<number> {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);
    let result = 0;

    if (index !== -1 && cart.boxes[index].quantity > 1) {
        result = --cart.boxes[index].quantity;
        setCart(cart);
    }

    return result;
}

export async function Checkout() {
    const cart = await getCart();
    setCart({ boxes: [] });
    return cart;
}