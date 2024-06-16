import Pagination from "@/components/pagination";
import { lusitana } from "@/lib/fonts";
import Search from "@/components/search";
import { Suspense } from "react";
import { getFilteredBoxesTotalPages } from "@/lib/data/boxes";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import BoxesTable from "@/components/admin/boxes-table";

export default async function Products({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await getFilteredBoxesTotalPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Products</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search boxes..." />
                {/* <CreateInvoice /> */}
            </div>
            <Suspense key={query + currentPage} fallback={<TableSkeleton type="Box" />}>
                <BoxesTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 felx w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}