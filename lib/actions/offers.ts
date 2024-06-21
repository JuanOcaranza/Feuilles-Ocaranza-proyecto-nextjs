"use server"
import { db } from "@/drizzle/db";
import { offers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";


export async function deleteOffer(id: number): Promise<void> {
    await db.delete(offers).where(eq(offers.id, id));
}
