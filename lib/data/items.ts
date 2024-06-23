import { db } from "@/drizzle/db";
import { items, saleItems } from "@/drizzle/schema";
import { count, ilike, eq, and, desc } from "drizzle-orm";
import { Item, NewItem, UpdateItem, TableItem } from "@/lib/definitions";
import { deleteImage } from "../cloudinary";

const ITEMS_PER_PAGE = 12;

export async function getFilteredItems(query: string, currentPage: number): Promise<Array<TableItem>> {
    const response = await db.query.items.findMany({
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        where: and(ilike(items.name, `%${query}%`), items.active),
        with: {
            boxItems: true
        },
        orderBy: desc(items.createdAt)
    });

    return response.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt,
        isDeletable: item.boxItems.length == 0
    }));
}

export async function getFilteredItemsTotalPages(query: string): Promise<number> {
    const response = await db
        .select({ value: count(items.id) })
        .from(items)
        .where(and(ilike(items.name, `%${query}%`), items.active));

    return Math.ceil(response[0].value / ITEMS_PER_PAGE);
}

export async function getItems(): Promise<Array<Item>> {
    return await db.query.items.findMany({
        where: (items, { eq }) => eq(items.active, true),
        orderBy: desc(items.createdAt)
    });
}

export async function getItemById(id: number): Promise<Item | null> {
    const item = await db.query.items.findFirst({
        where: (items, { eq }) => eq(items.id, id)
    })

    if (!item)
        return null
    return item
}

export async function insertItem(newItem: NewItem) {
    await db.insert(items).values(newItem);
}

export async function updateItem(item: UpdateItem) {
    await db
    .update(items)
    .set(item)
    .where(eq(items.id, item.id))
}

export async function deleteItem(id: number) {
    if (await isDeletableItem(id)) {
        const response = await db
            .delete(items)
            .where(eq(items.id, id))
            .returning();

        response.forEach((box) => { deleteImage(box.imageUrl) });
    }
    else {
        await db
            .update(items)
            .set({ active: false })
            .where(eq(items.id, id));
    }
}

async function isDeletableItem(id: number) {
    const response = await db
        .select({ value: count(saleItems.itemId) })
        .from(saleItems)
        .where(eq(saleItems.itemId, id));

    return response[0].value === 0;
}