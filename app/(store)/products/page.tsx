import Pagination from "@/components/pagination";
import clsx from "clsx";
import { lusitana } from "@/lib/fonts";
import BoxesGrid from "@/components/boxes-grid";

export default function Products({
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

    return (
        <div>
            <h1 className={clsx("text-3xl", lusitana.className)}>Products</h1>

            <BoxesGrid query={query} currentPage={page} category={category} />

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={4} />
            </div>
        </div>
    );
}
