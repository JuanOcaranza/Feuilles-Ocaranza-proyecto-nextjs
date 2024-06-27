import { db } from "@/drizzle/db";
import { boxCategories, boxes, boxOffers, categories, groups, offers } from "@/drizzle/schema";
import { and, eq, exists, gte, sql } from "drizzle-orm";

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

export async function getFilteredCategoriesByGroupId(groupId: number, baseUrl: string) {
    const thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));

    return await db
    .select()
    .from(categories)
    .where(
        and(
            eq(categories.gruopId, groupId),
            exists(
                db
                    .select()
                    .from(boxCategories)
                    .innerJoin(boxes, eq(boxes.id, boxCategories.boxId))
                    .where(
                        and(
                            eq(boxCategories.categoryId, categories.id),
                            boxes.active,
                            baseUrl.includes("featured=true") ? gte(boxes.createdAt, thirtyDaysAgo) : sql`true`
                        )
                    )
            ),
            baseUrl.includes("onOffer=true")
                  ? exists(
                      db
                        .select()
                        .from(boxCategories)
                        .innerJoin(boxes, eq(boxes.id, boxCategories.boxId))
                        .innerJoin(boxOffers, eq(boxOffers.boxId, boxes.id))
                        .innerJoin(offers, eq(boxOffers.offerId, offers.id))
                        .where(
                            and(
                                eq(boxCategories.categoryId, categories.id),
                                boxes.active,
                                sql`NOW() BETWEEN ${offers.startsAt} AND ${offers.expiresAt}`
                            )
                        )
                  )
                  : sql`true`
        )
    );
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