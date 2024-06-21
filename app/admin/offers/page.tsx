import Pagination from "@/components/pagination";
import { lusitana } from "@/lib/fonts";
import Search from "@/components/search";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import ItemsTable from "@/components/admin/items-table";
import Create from "@/components/admin/buttons/create";
import { getFilteredOffersTotalPages } from "@/lib/data/offers";
import OffersTable from "@/components/admin/offers-table";

export default async function Offers({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await getFilteredOffersTotalPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Offers</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search offers..." />
                <Create type="Offer" />
            </div>
            <Suspense key={query + currentPage} fallback={<TableSkeleton type="Item" />}>
                <OffersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="flex mt-5 w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}