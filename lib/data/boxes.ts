import { db } from '@/drizzle/db';
import { BoxWithRelations, Box, SaleBox } from '@/lib/definitions';
import { boxCategories, boxItems, items, boxes, boxOffers, offers } from '@/drizzle/schema';
import { sql, eq, ilike, and, or, inArray, count, sum } from 'drizzle-orm';

const BOXES_PER_PAGE = 12;

const mapBox = (box: BoxWithRelations): Box => ({
    ...box,
    items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })),
    categories: box.boxCategories.map((boxCategory) => boxCategory.category),
});

export async function getBoxes(): Promise<Array<Box>> {
    const boxes = await db.query.boxes.findMany({
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

    return boxes.map((box) => mapBox(box));
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

export async function getFilteredBoxes(query: string, currentPage: number, category: string): Promise<Array<Box>> {
    const idsInCategory = await db
        .select({ boxId: boxCategories.boxId })
        .from(boxCategories)
        .where(category === "" ? sql`true` : eq(boxCategories.categoryId, parseInt(category)));

    const idsCotainingSearchedItem = await db
        .select({ boxId: boxItems.boxId })
        .from(boxItems)
        .leftJoin(items, eq(boxItems.itemId, items.id))
        .where(ilike(items.name, `%${query}%`));

    const response = await db.query.boxes.findMany({
        offset: (currentPage - 1) * BOXES_PER_PAGE,
        limit: BOXES_PER_PAGE,
        where: and(
            or(
                ilike(boxes.name, `%${query}%`),
                idsCotainingSearchedItem.length === 0 ? sql`false` : inArray(boxes.id, idsCotainingSearchedItem.map((boxItem) => boxItem.boxId))
            ),
            idsInCategory.length === 0 ? sql`false` : inArray(boxes.id, idsInCategory.map((boxCategory) => boxCategory.boxId))
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

export async function getFilteredBoxesTotalPages(query: string, category: string): Promise<number> {
    const idsInCategory = await db
        .select({ boxId: boxCategories.boxId })
        .from(boxCategories)
        .where(category === "" ? sql`true` : eq(boxCategories.categoryId, parseInt(category)));

    const idsCotainingSearchedItem = await db
        .select({ boxId: boxItems.boxId })
        .from(boxItems)
        .leftJoin(items, eq(boxItems.itemId, items.id))
        .where(ilike(items.name, `%${query}%`));

    const response = await db
        .select({ value: count(boxes.id) })
        .from(boxes)
        .where(and(
            or(
                ilike(boxes.name, `%${query}%`),
                idsCotainingSearchedItem.length === 0 ? sql`false` : inArray(boxes.id, idsCotainingSearchedItem.map((boxItem) => boxItem.boxId))
            ),
            idsInCategory.length === 0 ? sql`false` : inArray(boxes.id, idsInCategory.map((boxCategory) => boxCategory.boxId))
        ));

    return Math.ceil(response[0].value / BOXES_PER_PAGE);
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
        where: (boxes, { gte }) => gte(boxes.createdAt, thirtyDaysAgo),
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

export async function getBoxesFromSaleBoxes(saleBoxes: Array<SaleBox>): Promise<Array<Box & { quantity: number }>> {
    return await Promise.all(
        saleBoxes.map((saleBox) => getBoxById(saleBox.boxId).then((box) => ( box !== null ? { ...box, quantity: saleBox.quantity } : null)))
    ).then((boxes) => boxes.filter((box) => box !== null));
}