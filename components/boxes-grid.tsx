import { getFilteredBoxes } from "@/lib/data";

import BoxCard from "@/components/box-card";

export default async function BoxesGrid({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const boxes = await getFilteredBoxes(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="rounded-lg bg-gray-50 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {boxes?.map((box) => <BoxCard key={box.id} box={box} />)}
            </div>
        </div>
    );
}