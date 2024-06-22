import { db } from "@/drizzle/db";
import { boxOffers, offers } from "@/drizzle/schema";
import { newOffer, NewOfferBox, Offer, OfferWithRelations, OfferWithResume, DataOffer } from "@/lib/definitions";
import { and, count, desc, eq, ilike, notInArray, sql } from "drizzle-orm";

const OFFERS_PER_PAGE = 12;

export async function getFilteredOffers(query: string, currentPage: number): Promise<Array<OfferWithResume>> {
    const response = await db.query.offers.findMany({
        offset: (currentPage - 1) * OFFERS_PER_PAGE,
        limit: OFFERS_PER_PAGE,
        where: ilike(offers.name, `%${query}%`),
        with: {
            boxOffers: true
        },
        orderBy: desc(offers.startsAt)
    })

    return response.map((offer) => mapOffer(offer));
}

function mapOffer(offer: OfferWithRelations): OfferWithResume {
    return {
        ...offer,
        quantity: offer.boxOffers.length,
        averageDiscount: offer.boxOffers.reduce((acc, boxOffer) => acc + boxOffer.discount, 0) / offer.boxOffers.length,
        status: determineStatus(offer.startsAt, offer.expiresAt)
    }
}

function determineStatus(startDate: Date, endDate: Date): 'incoming' | 'active' | 'expired' {
    if (startDate > new Date())
        return 'incoming';
    if (endDate < new Date())
        return 'expired';
    return 'active';
}

export async function getFilteredOffersTotalPages(query: string): Promise<number> {
    const response = await db
        .select({ value: count(offers.id) })
        .from(offers)
        .where(ilike(offers.name, `%${query}%`));

    return Math.ceil(response[0].value / OFFERS_PER_PAGE);
}

export async function deleteOffer(id: number): Promise<void> {
    await db.delete(offers).where(eq(offers.id, id));
}

export async function insertOffer(newOffer: newOffer, items: Array<NewOfferBox>) {
    const response = await db.insert(offers).values(newOffer).returning();
    const id = response[0].id;

    await Promise.all([
        items.map((async (offerBox) => await db.insert(boxOffers).values({ ...offerBox, offerId: id })))
    ])
}

export async function updateOffer(offer: Offer, boxes: Array<NewOfferBox>) {
    await Promise.all([
        db
            .update(offers)
            .set(offer)
            .where(eq(offers.id, offer.id)),

        boxes.map((async (offerBox) => await db
            .insert(boxOffers)
            .values({ ...offerBox, offerId: offer.id }).
            onConflictDoUpdate({
                target: [boxOffers.offerId, boxOffers.boxId],
                set: { discount: offerBox.discount }
            }))),

        db
            .delete(boxOffers)
            .where(
                and(
                    eq(boxOffers.offerId, offer.id),
                    boxes.length === 0 ? sql`true` : notInArray(boxOffers.boxId, boxes.map((offerBox) => offerBox.boxId))
                )),
    ])
}

export async function getOfferById(id: number): Promise<OfferWithRelations | null> {
    const offer = await db.query.offers.findFirst({
        where: eq(offers.id, id),
        with: {
            boxOffers: true
        }
    })

    if (!offer)
        return null;

    return offer;
}

export async function getActiveOffersPerMonth(): Promise<Array<DataOffer>> {
    const response = await db
        .select({
            month: sql<string>`month`,
            count: sql<number>`COUNT(offers.id)`
        })
        .from(sql`(
            SELECT generate_series(
                date_trunc('month', MIN(offers."starts_at") - interval '1 month'), 
                date_trunc('month', MAX(offers."expires_at")), 
                interval '1 month'
            )::date AS month
            FROM offers
            WHERE offers."expires_at" >= NOW()
        ) AS months`)
        .leftJoin(offers, sql`months.month BETWEEN date_trunc('month', offers."starts_at") AND date_trunc('month', offers."expires_at")`)
        .where(sql`months.month <= date_trunc('month', NOW())`)
        .groupBy(sql`months.month`)
        .orderBy(sql`months.month`);

    return response.map((row) => ({ month: row.month, count: row.count }));
}