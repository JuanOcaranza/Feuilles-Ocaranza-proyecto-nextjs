"use server"

import { db } from '@/drizzle/db';
import { items } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function deleteItem(id: number) {
    await db
        .delete(items)
        .where(eq(items.id, id));
}