import Pagination from "@/components/pagination";
import clsx from "clsx";
import { lusitana } from "@/lib/fonts";
import BoxesGrid from "@/components/products/boxes-grid";
import { getFilteredBoxesWithItemsTotalPages } from '@/lib/data/boxes';
import { Suspense } from "react";
import BoxesGridSkeleton from "@/components/skeletons/boxes-grid-skeleton";

export default async function Products({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
    }
}) {
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1;
    const category = searchParams?.category || "";
    const totalPages = await getFilteredBoxesWithItemsTotalPages(query, category);

    return (
        <div className="m-6">
            <h1 className={clsx("text-3xl", lusitana.className)}>Products</h1>

            <Suspense key={query + page + category} fallback={<BoxesGridSkeleton />}>
                <BoxesGrid query={query} currentPage={page} category={category} />
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
