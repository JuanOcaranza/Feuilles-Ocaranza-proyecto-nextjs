import { getFilteredBoxes } from '@/lib/data/boxes';
import { FaceFrownIcon } from "@heroicons/react/24/outline";

import BoxCard from "@/components/box-card";

export default async function BoxesGrid({
    query,
    currentPage,
    category,
}: {
    query: string;
    currentPage: number;
    category: string;
}) {
    const boxes = await getFilteredBoxes(query, currentPage, category);

    return (
        <div className="mt-6 flow-root">
            {(boxes.length === 0) ?
                <div className="flex flex-col justify-center items-center">
                    <FaceFrownIcon className="w-16 h-16 text-gray-500" />
                    <p>We&apos;re sorry we don&apos;t have boxes for <b>&quot;{query}&quot;</b></p>
                </div>
                :
                <div className="rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {boxes?.map((box) => <BoxCard key={box.id} box={box} />)}
                </div>
            }
        </div>
    );
}
