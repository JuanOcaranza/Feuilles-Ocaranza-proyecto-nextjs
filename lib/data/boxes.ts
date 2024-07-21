import { db } from '@/drizzle/db';
import { BoxWithRelations, Box, SaleBox, BoxOnly, NewBox, newBoxItem, NewBoxCategory, UpdatedBox } from '@/lib/definitions';
import { boxCategories, boxItems, items, boxes, boxOffers, offers, saleBoxes } from '@/drizzle/schema';
import { sql, eq, ilike, and, or, inArray, count, sum, gte, notInArray, desc, exists } from 'drizzle-orm';
import { deleteImage } from '@/lib/cloudinary';

export const BOXES_PER_PAGE = 12;

const mapBox = (box: BoxWithRelations): Box => ({
    ...box,
    items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })),
    categories: box.boxCategories.map((boxCategory) => boxCategory.category),
});

export async function getBoxes(): Promise<Array<Box>> {
    const response = await db.query.boxes.findMany({
        with: {
            boxItems: {
                with: {
                    item: true
                }
            },
            boxCategories: {
                with: {
                    category: true
                }
            }
        },
        orderBy: desc(boxes.createdAt)
    });

    return response.map((box) => mapBox(box));
}

export async function getBoxById(id: number): Promise<Box | null> {
    const box = await db.query.boxes.findFirst({
        where: (boxes, { eq }) => eq(boxes.id, id),
        with: {
            boxItems: {
                with: {
                    item: true
                }
            },
            boxCategories: {
                with: {
                    category: true
                }
            }
        }
    });

    if (!box)
        return null;

    return mapBox(box);
}

export async function getFilteredBoxesWithItems(query: string, currentPage: number, category: string, mustBeFeatured: boolean, mustBeOnOffer: boolean): Promise<Array<Box>> {
    const idsInCategory = category !== "" ? await getIdsByCategory(category) : [];
    const idsCotainingSearchedItem = query !== "" ? await getIdsContainingSearchedItem(query) : [];
    const featuredBoxes = mustBeFeatured ? await getFeaturedBoxes() : [];
    const idsOnOffer = mustBeOnOffer ? await getIdsOnOffer() : [];

    const response = await db.query.boxes.findMany({
        offset: (currentPage - 1) * BOXES_PER_PAGE,
        limit: BOXES_PER_PAGE,
        where: and(
            or(
                query === "" ? sql`true` : sql`false`,
                ilike(boxes.name, `%${query}%`),
                idsCotainingSearchedItem.length === 0 ? sql`false` : inArray(boxes.id, idsCotainingSearchedItem.map((boxItem) => boxItem.boxId))
            ),
            or(
                category === "" ? sql`true` : sql`false`,
                idsInCategory.length === 0 ? sql`false` : inArray(boxes.id, idsInCategory.map((boxCategory) => boxCategory.boxId)),
            ),
            or(
                mustBeFeatured ? sql`false` : sql`true`,
                featuredBoxes.length === 0 ? sql`false` : inArray(boxes.id, featuredBoxes.map((featuredBox) => featuredBox.id)),
            ),
            or(
                mustBeOnOffer ? sql`false` : sql`true`,
                idsOnOffer.length === 0 ? sql`false` : inArray(boxes.id, idsOnOffer.map((boxOnOffer) => boxOnOffer.boxId)),
            ),
            boxes.active
        ),
        with: {
            boxItems: {
                with: {
                    item: true
                }
            },
            boxCategories: {
                with: {
                    category: true
                }
            }
        },
        orderBy: desc(boxes.createdAt)
    });

    return response.map((box) => mapBox(box));
}

async function getIdsByCategory(category: string) {
    return await db
        .selectDistinct({ boxId: boxCategories.boxId })
        .from(boxCategories)
        .where(category === "" ? sql`true` : eq(boxCategories.categoryId, parseInt(category)));
}

async function getIdsContainingSearchedItem(query: string) {
    return await db
        .selectDistinct({ boxId: boxItems.boxId })
        .from(boxItems)
        .leftJoin(items, eq(boxItems.itemId, items.id))
        .where(ilike(items.name, `%${query}%`));
}

async function getIdsOnOffer() {
    return await db
        .selectDistinct({ boxId: boxOffers.boxId })
        .from(boxOffers)
        .leftJoin(offers, eq(boxOffers.offerId, offers.id))
        .where(sql`NOW() BETWEEN ${offers.startsAt} AND ${offers.expiresAt}`)
}

export async function countFilteredBoxes(query: string, category: string, mustBeFeatured: boolean, mustBeOnOffer: boolean): Promise<{ count: number, pages: number }> {
    const idsInCategory = category !== "" ? await getIdsByCategory(category) : [];
    const idsCotainingSearchedItem = query !== "" ? await getIdsContainingSearchedItem(query) : [];
    const featuredBoxes = mustBeFeatured ? await getFeaturedBoxes() : [];
    const idsOnOffer = mustBeOnOffer ? await getIdsOnOffer() : [];

    const response = await db
        .select({ value: count(boxes.id) })
        .from(boxes)
        .where(and(
            or(
                query === "" ? sql`true` : sql`false`,
                ilike(boxes.name, `%${query}%`),
                idsCotainingSearchedItem.length === 0 ? sql`false` : inArray(boxes.id, idsCotainingSearchedItem.map((boxItem) => boxItem.boxId))
            ),
            or(
                category === "" ? sql`true` : sql`false`,
                idsInCategory.length === 0 ? sql`false` : inArray(boxes.id, idsInCategory.map((boxCategory) => boxCategory.boxId)),
            ),
            or(
                mustBeFeatured ? sql`false` : sql`true`,
                featuredBoxes.length === 0 ? sql`false` : inArray(boxes.id, featuredBoxes.map((featuredBox) => featuredBox.id)),
            ),
            or(
                mustBeOnOffer ? sql`false` : sql`true`,
                idsOnOffer.length === 0 ? sql`false` : inArray(boxes.id, idsOnOffer.map((boxOnOffer) => boxOnOffer.boxId)),
            ),
            boxes.active
        ));

    return { count: response[0].value, pages: Math.ceil(response[0].value / BOXES_PER_PAGE) };
}

export async function getActiveDiscountByBoxId(boxId: number): Promise<number> {
    const response = await db
        .select({ value: sum(boxOffers.discount) })
        .from(boxOffers)
        .leftJoin(offers, eq(boxOffers.offerId, offers.id))
        .where(sql`${boxOffers.boxId} = ${boxId} AND NOW() BETWEEN ${offers.startsAt} AND ${offers.expiresAt}`);

    return parseInt(response[0].value ?? "0");
}

export async function getFeaturedBoxes(): Promise<Array<Box>> {
    const thirtyDaysAgo = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000));

    const response = await db.query.boxes.findMany({
        where: (and(gte(boxes.createdAt, thirtyDaysAgo), boxes.active)),
        with: {
            boxItems: {
                with: {
                    item: true
                }
            },
            boxCategories: {
                with: {
                    category: true
                }
            }
        }
    });

    return response.map((box) => mapBox(box));
}

export async function getBoxesByOfferId(offerId: number): Promise<Array<Box>> {
    const response = await db.query.boxes.findMany({
        where: and(
            exists(db.select().from(boxOffers).where(and(eq(boxOffers.offerId, offerId), eq(boxOffers.boxId, boxes.id)))),
            boxes.active
        ),
        with: {
            boxItems: {
                with: {
                    item: true
                }
            },
            boxCategories: {
                with: {
                    category: true
                }
            }
        }
    });

    return response.map((box) => mapBox(box));
}

export async function getBoxesFromSaleBoxes(saleBoxes: Array<SaleBox>): Promise<Array<Box & { quantity: number } | null>> {
    return await Promise.all(
        saleBoxes.map((saleBox) => getBoxById(saleBox.boxId).then((box) => (box !== null ? { ...box, quantity: saleBox.quantity } : null)))
    ).then((boxes) => boxes.filter((box) => box !== null));
}

export async function getFilteredBoxes(query: string, currentPage: number): Promise<Array<BoxOnly>> {
    const response = await db.query.boxes.findMany({
        offset: (currentPage - 1) * BOXES_PER_PAGE,
        limit: BOXES_PER_PAGE,
        where: and(ilike(boxes.name, `%${query}%`), boxes.active),
        orderBy: desc(boxes.createdAt),
    });

    return response;
}

export async function getFilteredBoxesTotalPages(query: string): Promise<number> {
    const response = await db
        .select({ value: count(boxes.id) })
        .from(boxes)
        .where(and(ilike(boxes.name, `%${query}%`), boxes.active));

    return Math.ceil(response[0].value / BOXES_PER_PAGE);
}

export async function deleteBox(id: number) {
    if (await isDeletableBox(id)) {
        const response = await db
            .delete(boxes)
            .where(eq(boxes.id, id))
            .returning();

        response.forEach((box) => { deleteImage(box.imageUrl) });
    }
    else {
        await db
            .update(boxes)
            .set({ active: false })
            .where(eq(boxes.id, id));
    }
}

async function isDeletableBox(id: number) {
    const response = await db
        .select({ value: count(saleBoxes.boxId) })
        .from(saleBoxes)
        .where(eq(saleBoxes.boxId, id));

    return response[0].value === 0;
}

export async function insertBox(newBox: NewBox, items: Array<newBoxItem>, categories: Array<NewBoxCategory>) {
    const response = await db.insert(boxes).values(newBox).returning();
    const id = response[0].id;

    await Promise.all([
        items.map((async (boxItem) => await db.insert(boxItems).values({ ...boxItem, boxId: id }))),
        categories.map((async (boxCategory) => await db.insert(boxCategories).values({ ...boxCategory, boxId: id })))
    ])
}

export async function updateBox(box: UpdatedBox) {
    await Promise.all([
        db
            .update(boxes)
            .set(box)
            .where(eq(boxes.id, box.id)),

        box.items.map((async (boxItem) => await db
            .insert(boxItems)
            .values({ ...boxItem, boxId: box.id }).
            onConflictDoUpdate({
                target: [boxItems.boxId, boxItems.itemId],
                set: { probability: boxItem.probability }
            }))),

        box.categories.map((async (boxCategory) => await db
            .insert(boxCategories)
            .values({ ...boxCategory, boxId: box.id })
            .onConflictDoNothing())),

        db
            .delete(boxItems)
            .where(
                and(
                    eq(boxItems.boxId, box.id),
                    box.items.length === 0 ? sql`true` : notInArray(boxItems.itemId, box.items.map((boxItem) => boxItem.itemId))
                )),

        db
            .delete(boxCategories)
            .where(
                and(
                    eq(boxCategories.boxId, box.id),
                    box.categories.length === 0 ? sql`true` : notInArray(boxCategories.categoryId, box.categories.map((boxCategory) => boxCategory.categoryId))))
    ])
}

export async function getBoxesOnly(): Promise<Array<BoxOnly>> {
    return await db.query.boxes.findMany({
        where: eq(boxes.active, true)
    })
}