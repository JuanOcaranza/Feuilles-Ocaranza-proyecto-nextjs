import Table from "@/components/admin/table";
import { getFilteredItems } from "@/lib/data/items";

export default async function ItemsTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const items = await getFilteredItems(query, currentPage);

    return (
        <Table
            data={items}
            type="Item"
        />
    );
}