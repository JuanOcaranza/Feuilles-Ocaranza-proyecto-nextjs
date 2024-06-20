import { db } from "@/drizzle/db";
import { items } from "@/drizzle/schema";
import { count, ilike, eq } from "drizzle-orm";
import { Item, NewItem, UpdateItem } from "@/lib/definitions";

const ITEMS_PER_PAGE = 12;

export async function getFilteredItems(query: string, currentPage: number): Promise<Array<Item>> {
    const response = await db.query.items.findMany({
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        where: ilike(items.name, `%${query}%`),
    });
    return response;
}

export async function getFilteredItemsTotalPages(query: string): Promise<number> {
    const response = await db
        .select({ value: count(items.id) })
        .from(items)
        .where(ilike(items.name, `%${query}%`));

    return Math.ceil(response[0].value / ITEMS_PER_PAGE);
}

export async function getItems(): Promise<Array<Item>> {
    return await db.query.items.findMany();
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