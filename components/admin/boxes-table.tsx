import { getFilteredBoxes } from "@/lib/data/boxes";
import Table from "@/components/admin/table";

export default async function BoxesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const boxes = await getFilteredBoxes(query, currentPage);

    return (
        <Table
            data={boxes}
            type="Box"
        />
    );
}