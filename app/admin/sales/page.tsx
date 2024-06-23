import { lusitana } from "@/lib/fonts";
import Pagination from "@/components/pagination";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { getFilteredSalesResume, getSalesResume } from "@/lib/data/sales";
import SalesTable from "@/components/admin/sales-table";
import { DatePickerWithRange } from "@/components/ui/data-range-picker";
import { addDays } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import clsx from "clsx";
import { Metadata } from "next";
import { SalesTableSkeleton, TotalSkeleton } from "@/components/skeletons/sales-table-skeleton";

export const metadata: Metadata = {
    title: 'Sales',
};

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

    const { pages, boxes, total, profit } = searchParams?.from && searchParams?.to ?
        await getFilteredSalesResume(new Date(searchParams.from), addDays(new Date(searchParams.to), 1))
        : await getSalesResume();

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Sales</h1>
            </div>
            <Suspense key={total} fallback={<TotalSkeleton />}>
                <div className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-2 md:mt-8">
                    <DatePickerWithRange />
                    <div className="flex justify-between lg:justify-end w-full p-3">
                        <p className="text-xl font-semibold lg:pr-6">Total:</p>
                        <div className="flex flex-col items-end lg:flex-row gap-1 lg:gap-4">
                            <p className="text-xl font-semibold">{formatCurrency(total)}</p>
                            <p className={clsx("text-xl font-semibold", { "text-red-500": profit < 0, "text-green-500": profit > 0 })}>{profit > 0 && <span>+</span>}{formatCurrency(profit)}</p>
                            <p className="text-xl font-semibold">{boxes} Boxes</p>
                        </div>
                    </div>
                </div>
            </Suspense>
            <Suspense key={currentPage} fallback={<SalesTableSkeleton />}>
                <SalesTable startDate={searchParams?.from} endDate={searchParams?.to} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={pages} />
            </div>
        </div>
    );
}