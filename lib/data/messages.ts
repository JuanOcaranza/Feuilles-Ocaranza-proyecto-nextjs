import { db } from "@/drizzle/db";
import { NewMessage } from "../definitions";
import { messages } from "@/drizzle/schema";

export default async function insertMessage(message: NewMessage) {
    await db.insert(messages).values(message);
}