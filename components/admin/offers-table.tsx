import { formatDateToLocal } from "@/lib/utils";
import { getFilteredOffers } from "@/lib/data/offers";
import { deleteOffer } from "@/lib/actions/offers";
import OfferStatus from "@/components/admin/offer-status";
import Update from "./buttons/update";
import Delete from "./buttons/delete";

export default async function OffersTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const offers = await getFilteredOffers(query, currentPage)

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="lg:hidden">
                        {offers?.map((offer) => (
                            <div
                                key={offer.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p className="text-xl font-medium">{offer.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{formatDateToLocal(offer.startsAt.toString())}-{formatDateToLocal(offer.expiresAt.toString())}</p>
                                    </div>
                                    <OfferStatus status={offer.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <p className="text-xl font-semibold">
                                        ~{offer.averageDiscount.toFixed(2)}%
                                    </p>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <div>
                                        <p className="text-sm font-normal">
                                            {offer.quantity} Box{offer.quantity > 1 && <span>es</span>}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Update type="Offer" id={offer.id || 0} />
                                        <Delete id={offer.id || 0} itemName={"offer"} active={true} action={deleteOffer} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 lg:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Start Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Expiration Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Average Discount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {offers?.map((offer) => (
                                <tr
                                    key={offer.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {offer.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(offer.startsAt.toString())}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(offer.expiresAt.toString())}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {offer.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        ~{offer.averageDiscount.toFixed(2)}%
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <OfferStatus status={offer.status} />
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <Update type="Offer" id={offer.id || 0} />
                                            <Delete id={offer.id || 0} itemName={"offer"} active={true} action={deleteOffer} />
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