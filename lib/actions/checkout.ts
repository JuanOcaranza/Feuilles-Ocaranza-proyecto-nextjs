"use server"

import { getCart } from "@/lib/actions/cookies";
import { getActiveDiscountByBoxId, getBoxById, getBoxesFromSaleBoxes } from '@/lib/data/boxes';
import { Box, Item, Sale } from "@/lib/definitions";
import { getSaleById, insertSale } from "@/lib/data/sales";
import { createPreference, getBoxesFromPayment } from "@/lib/mercado-pago";


export async function checkout(): Promise<{ preferenceId: string | undefined, boxes: Array<Box & { quantity: number, finalPrice: number } | null> }> {
    const cart = await getCart();

    const boxes = (
        await Promise.all(cart.boxes.map(async (box) => {
            const [boxData, discount] = await Promise.all([
                getBoxById(box.boxId),
                getActiveDiscountByBoxId(box.boxId)
            ])
            if (!boxData)
                return null;
            return { ...boxData, quantity: box.quantity, finalPrice: boxData.price - (boxData.price * (discount / 100)) };
        }))
    ).filter((box) => box !== null);

    const preference = await createPreference(
        boxes.map((box) => (box !== null ? { id: box.id.toString(), title: box.name, unit_price: box.finalPrice, quantity: box.quantity } : { id: '', title: '', unit_price: 0, quantity: 0 }))
    )

    return { preferenceId: preference.id, boxes: boxes };

} export async function checkPayment(paymentId: number): Promise<Sale | null> {
    const sale = await getSaleById(paymentId);

    if (sale !== null) {
        return sale;
    }

    const saleBoxes = await getBoxesFromPayment(paymentId);

    if (saleBoxes === null) {
        return null;
    }

    const boxes = await getBoxesFromSaleBoxes(saleBoxes);
    const items = openBoxes(boxes);
    const saleItems = items.map((item) => ({ saleId: paymentId, itemId: item.item.id, quantity: item.quantity }));
    const now = new Date();

    insertSale({ id: paymentId, created_at: now }, saleBoxes, saleItems);

    return {
        id: paymentId,
        created_at: now,
        items: items
    };
}

function openBoxes(boxes: Array<Box & { quantity: number } | null>): Array<{ item: Item, quantity: number }> {
    const itemsMap: { [key: number]: { item: Item, quantity: number } } = {};

    for (const box of boxes) {
        if (box !== null) {
            for (let i = 0; i < box.quantity; i++) {
                const item = openBox(box);

                if (!itemsMap[item.id]) {
                    itemsMap[item.id] = { item, quantity: 1 };
                } else {
                    itemsMap[item.id].quantity++;
                }
            }
        }
    }

    return Object.values(itemsMap);
}

function openBox(box: Box): Item {
    const random = Math.random();

    let sum = 0;
    for (const item of box.items) {
        sum += item.probability;
        if (random <= sum) {
            return item.item;
        }
    }

    return box.items[0].item; // should never happen
}