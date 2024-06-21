import Pagination from "@/components/pagination";
import { lusitana } from "@/lib/fonts";
import Search from "@/components/search";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import ItemsTable from "@/components/admin/items-table";
import { getFilteredItemsTotalPages } from "@/lib/data/items";
import Create from "@/components/admin/buttons/create";

export default async function Items({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await getFilteredItemsTotalPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Items</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search items..." />
                <Create type="Item" />
            </div>
            <Suspense key={query + currentPage} fallback={<TableSkeleton type="Item" />}>
                <ItemsTable query={query} currentPage={currentPage} />
            </Suspense>
            {/* Message: Items in a box cannot be deleted*/}
            <p className=" text-gray-500 mt-3 text-right">Items in a box cannot be deleted, edit or delete box first.</p>
            <div className="felx w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}