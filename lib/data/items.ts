import { db } from "@/drizzle/db";
import { items } from "@/drizzle/schema";
import { count, ilike } from "drizzle-orm";
import { Item } from "@/lib/definitions";

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