import { db } from "@/drizzle/db";
import { categories, groups } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getGroups() {
    return await db
        .select()
        .from(groups);
}

export async function getCategoriesByGroupId(groupId: number) {
    return await db
        .select()
        .from(categories)
        .where(eq(categories.gruopId, groupId));
}

export async function getCategoryById(id: number) {
    return await db.query.categories.findFirst({
        where: (eq(categories.id, id))
    });
}

export async function getCategories() {
    return await db
        .select()
        .from(categories)
}