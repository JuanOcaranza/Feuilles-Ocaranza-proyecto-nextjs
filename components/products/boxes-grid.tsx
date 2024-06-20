import { getFilteredBoxesWithItems } from '@/lib/data/boxes';
import { FaceFrownIcon } from "@heroicons/react/24/outline";

import BoxCard from "@/components/products/box-card";

export default async function BoxesGrid({
    query,
    currentPage,
    category,
    mustBeFeatured,
    mustBeOnOffer,
    categoryName
}: {
    query: string;
    currentPage: number;
    category: string;
    mustBeFeatured: boolean;
    mustBeOnOffer: boolean;
    categoryName: string
}) {
    const boxes = await getFilteredBoxesWithItems(query, currentPage, category, mustBeFeatured, mustBeOnOffer);

    return (
        <div className="mt-6 flow-root">
            {(boxes.length === 0) ?
                <div className="flex flex-col justify-center items-center">
                    <FaceFrownIcon className="w-16 h-16 text-gray-500" />
                    <p>We&apos;re sorry we don&apos;t have {categoryName} {mustBeFeatured && "featured"} boxes{mustBeOnOffer && " on offer"}{query !== "" && <span> for <b>&quot;{query}&quot;</b></span>}.</p>
                </div>
                :
                <div className="rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {boxes?.map((box) => <BoxCard key={box.id} box={box} />)}
                </div>
            }
        </div>
    );
}
