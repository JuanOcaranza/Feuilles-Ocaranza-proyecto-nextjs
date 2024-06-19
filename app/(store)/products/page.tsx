import Pagination from "@/components/pagination";
import clsx from "clsx";
import { lusitana } from "@/lib/fonts";
import BoxesGrid from "@/components/products/boxes-grid";
import { countFilteredBoxes } from '@/lib/data/boxes';
import { Suspense } from "react";
import BoxesGridSkeleton from "@/components/skeletons/boxes-grid-skeleton";
import { getCategoryById } from "@/lib/data/categories";

export default async function Products({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
        featured?: string;
        onOffer?: string;
    }
}) {
    const query = searchParams?.query || "";
    const page = Number(searchParams?.page) || 1;
    const categoryId = searchParams?.category || "";
    const mustBeFeatured = searchParams?.featured === 'true';
    const mustBeOnOffer = searchParams?.onOffer === 'true';

    const [ category, { count, pages } ] = await Promise.all([
        categoryId === "" ? null : getCategoryById(parseInt(categoryId)),
        countFilteredBoxes(query, categoryId, mustBeFeatured, mustBeOnOffer)
    ]);

    return (
        <div className="m-6">
            <h1 className={clsx("text-3xl", lusitana.className)}>
                {category?.name || "All"} {mustBeFeatured && "Featured"} Products {mustBeOnOffer && "On Offer"} {query !== "" && <span>matching <b>&quot;{query}&quot;</b></span>} ({count})
            </h1>

            <Suspense key={query + page + categoryId} fallback={<BoxesGridSkeleton />}>
                <BoxesGrid
                    query={query}
                    currentPage={page}
                    category={categoryId}
                    mustBeFeatured={mustBeFeatured}
                    mustBeOnOffer={mustBeOnOffer}
                    categoryName={category?.name || "any"}
                />
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={pages} />
            </div>
        </div>
    );
}
