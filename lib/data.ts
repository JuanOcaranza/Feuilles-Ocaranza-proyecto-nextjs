import { Box } from '@/lib/definitions';
import { db } from '@/drizzle/db';
import { count, like, sum, eq, sql } from 'drizzle-orm';
import { boxes, boxOffers, offers} from '@/drizzle/schema';
import { BoxWithRelations } from '@/lib/definitions';

export const BOXES_PER_PAGE = 12;

export const mapBox: (box: BoxWithRelations) => Box = (box: BoxWithRelations) => ({
    ...box,
    items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })),
    categories: box.boxCategories.map((boxCategory) => boxCategory.category),
})

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
    })

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
    })

    if (!box)
        return null

    return mapBox(box);
}

export async function getFilteredBoxes(query: string, currentPage: number, category: string): Promise<Array<Box>> {
    const boxes = await db.query.boxes.findMany({
        offset: (currentPage - 1) * BOXES_PER_PAGE,
        limit: BOXES_PER_PAGE,
        where: (boxes, { like }) => like(boxes.name, `%${query}%`),
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
    })

    return boxes.map((box) => mapBox(box));
}

export async function getFilteredBoxesTotalPages(query: string, category: string): Promise<number> {
    const response = await db.select({ value: count(like(boxes.name, `%${query}%`)) }).from(boxes);

    return Math.ceil(response[0].value / BOXES_PER_PAGE);
}

export async function getActiveDiscountByBoxId(boxId: number): Promise<number> {
    const response = await db
        .select({ value: sum(boxOffers.discount) })
        .from(boxOffers)
        .leftJoin(offers, eq(boxOffers.offerId, offers.id))
        .where(sql`${boxOffers.boxId} = ${boxId} AND NOW() BETWEEN ${offers.startsAt} AND ${offers.expiresAt}`)
    
    return parseInt(response[0].value ?? "0")
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
    })

    return response.map((box) => mapBox(box));
}