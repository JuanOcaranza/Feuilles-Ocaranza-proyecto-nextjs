"use server"

import { db } from '@/drizzle/db';
import { boxes } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function deleteBox(id: number) {
    await db
        .delete(boxes)
        .where(eq(boxes.id, id));
}