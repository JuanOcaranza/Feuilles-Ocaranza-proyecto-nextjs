"use server"

import { getCart, setCart } from "@/lib/cookies";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { getBoxById } from "@/lib/data";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Box } from "@/lib/definitions";

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
            items: boxes.map((box) => (box !== null ? { id: box.id.toString() , title: box.name, unit_price: box.price, quantity: box.quantity } : { id: '', title: '', unit_price: 0, quantity: 0 })),
            back_urls: {
                success: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/success",
                failure: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/failure",
                pending: "https://feuilles-ocaranza-proyecto-nextjs.vercel.app/checkout/pending",
            }
        }
    })

    return result.id;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Invalid credentials.';
        }
        throw error;
    }
}