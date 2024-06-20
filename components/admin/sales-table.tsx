import { getFilteredSales, getSales } from "@/lib/data/sales";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";
import { addDays } from "date-fns";
import ShowDetails from "@/components/admin/buttons/show-details";

export default async function SalesTable({
    startDate,
    endDate,
    currentPage,
}: {
    startDate?: string;
    endDate?: string;
    currentPage: number;
}) {
    const sales = startDate && endDate ?
        await getFilteredSales(currentPage, new Date(startDate), addDays(new Date(endDate), 1))
        : await getSales(currentPage)

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {sales?.map((sale) => (
                            <div
                                key={sale.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>Id: {sale.id}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{formatDateToLocal(sale.created_at.toString())}</p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p className="text-xl font-semibold">
                                            Total: {formatCurrency(sale.ammount)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <div>
                                        <p className="text-sm font-normal">
                                            {sale.quantity} Box{sale.quantity > 1 && <span>es</span>}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <ShowDetails id={sale.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Id
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Ammount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    <span className="sr-only">Show Details</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {sales?.map((sale) => (
                                <tr
                                    key={sale.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {sale.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(sale.created_at.toString())}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {sale.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatCurrency(sale.ammount)}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <ShowDetails id={sale.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}