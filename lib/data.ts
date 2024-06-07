import { Box } from '@/lib/definitions';
import { randomInt } from 'crypto';
import { db } from '@/drizzle/db';
import { count, like } from 'drizzle-orm';
import { boxes } from '@/drizzle/schema';

export const BOXES_PER_PAGE = 12;

export async function getBoxes() : Promise<Array<Box>> {
    const boxes = await db.query.boxes.findMany({
        with: {
            boxItems: {
                with: {
                    item: true
                }
            }
        }
    })

    return boxes.map((box) => ({ ...box, items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })) }));
}

export async function getBoxById(id: string) : Promise<Box | null> {
    const box = await db.query.boxes.findFirst({
        where: (boxes, { eq }) => eq(boxes.id, parseInt(id)),
        with: {
            boxItems: {
                with: {
                    item: true
                }
            }
        }
    })

    if (!box)
        return null

    return { ...box, items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })) };
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
            }
        }
    })

    return boxes.map((box) => ({ ...box, items: box.boxItems.map((boxItem) => ({ item: boxItem.item, probability: boxItem.probability })) }));
}

export async function getFilteredBoxesTotalPages(query: string, category: string): Promise<number> {
    const response = await db.select({ value: count(like(boxes.name, `%${query}%`)) }).from(boxes);

    return Math.ceil(response[0].value / BOXES_PER_PAGE);
}

export async function getActiveDiscountByBoxId(boxId: string | number): Promise<number> {
    return randomInt(0, 100);
}