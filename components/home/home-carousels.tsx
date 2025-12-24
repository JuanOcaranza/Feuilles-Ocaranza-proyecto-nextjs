import { getBoxesByOfferId, getFeaturedBoxes } from "@/lib/data/boxes";
import BoxesCarousel from "./boxes-carousel";
import { getActiveOffers } from "@/lib/data/offers";

export default async function HomeCarousels() {
    const [featuredBoxes, offers] = await Promise.all([
        getFeaturedBoxes(),
        getActiveOffers()
            .then(async (offers) => {
                const offersWithBoxes = await Promise.all(offers.map(async (offer) => {
                    const boxes = await getBoxesByOfferId(offer.id);
                    return { id: offer.id, name: offer.name, endDate : offer.expiresAt, boxes };
                }));
                return offersWithBoxes;
            })
    ]);

    if (featuredBoxes.length === 0 && offers.length === 0) return null;

    return (
        <div className="w-full my-6 relative flex flex-col items-center justify-center">
            {featuredBoxes.length > 0 && <BoxesCarousel name="Featured Boxes" boxes={featuredBoxes} />}
            {offers.map((offer) => <BoxesCarousel key={offer.id} name={offer.name} endDate={offer.endDate} boxes={offer.boxes} />)}
        </div>
    )
}