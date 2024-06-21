import { db } from "@/drizzle/db";
import { offers } from "@/drizzle/schema";
import { Offer, OfferWithRelations, OfferWithResume } from "@/lib/definitions";
import { count, desc, ilike } from "drizzle-orm";

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