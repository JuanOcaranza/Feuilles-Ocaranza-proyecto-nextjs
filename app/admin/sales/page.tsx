import { lusitana } from "@/lib/fonts";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { getFilteredSalesTotalPages, getSalesTotalPages } from "@/lib/data/sales";
import SalesTable from "@/components/admin/sales-table";
import { DatePickerWithRange } from "@/components/ui/data-range-picker";
import { addDays } from "date-fns";


export default async function Sales({
    searchParams,
}: {
    searchParams?: {
        page?: string;
        from?: string;
        to?: string;
    }
}) {

    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = searchParams?.from && searchParams?.to ?
        await getFilteredSalesTotalPages(new Date(searchParams.from), addDays(new Date(searchParams.to), 1)) 
        : await getSalesTotalPages();
    
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Sales</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <DatePickerWithRange />
            </div>
            <Suspense key={currentPage} fallback={<TableSkeleton type="Item" />}>
                <SalesTable startDate={searchParams?.from} endDate={searchParams?.to} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 felx w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}