"use server"

import { getCart, setCart } from "@/lib/cookies";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { getBoxById } from "@/lib/data";

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

export async function incrementQuantityInCart(boxId: number) : Promise<number> {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);
    let result = 0;

    if (index !== -1){
        result = ++cart.boxes[index].quantity;
        setCart(cart);
    }

    return result;
}

export async function decrementQuantityInCart(boxId: number) : Promise<number> {
    const cart = await getCart();
    const index = cart.boxes.findIndex((box) => box.boxId === boxId);
    let result = 0;

    if (index !== -1 && cart.boxes[index].quantity > 1) {
        result = --cart.boxes[index].quantity;
        setCart(cart);
    }

    return result;
}

export async function checkout() : Promise<string | undefined> {
    const cart = await getCart();

    const boxes = (
        await Promise.all(cart.boxes.map(async (box) => {
            const boxData = await getBoxById(box.boxId);
            if (!boxData)
                return null;
            return { ...boxData, quantity: box.quantity };
        }))
    ).filter((box) => box !== null);

    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN! });

    const preference = new Preference(client);

    const result = await preference.create({
        body: {
            items: boxes.map((box) => ({ id: box.id?.toString() , title: box.name, unit_price: box.price, quantity: box.quantity })),
            back_urls: {
                success: "http://localhost:3000/checkout/success",
                failure: "http://localhost:3000/checkout/failure",
                pending: "http://localhost:3000/checkout/pending",
            }
        }
    })

    return result.id;
}