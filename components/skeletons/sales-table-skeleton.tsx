import React from 'react';
import clsx from 'clsx';

export function SalesTableSkeleton() {
    const skeletonItems = Array.from({ length: 6 });

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="lg:hidden">
                        {skeletonItems.map((_, index) => (
                            <div
                                key={index}
                                className="mb-2 w-full rounded-md bg-white p-4 animate-pulse"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 h-6 w-32 bg-gray-300 rounded"></div>
                                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div className="h-8 w-36 bg-gray-300 rounded"></div>
                                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                </div>
                                <div className="flex w-full items-center justify-between">
                                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                    <div className="flex justify-end gap-2">
                                        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 lg:table">
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
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Profit
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    <span className="sr-only">Show Details</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {skeletonItems.map((_, index) => (
                                <tr
                                    key={index}
                                    className="w-full border-b py-3 text-sm animate-pulse last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="h-6 w-24 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="h-6 w-28 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="h-6 w-12 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
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

export function TotalSkeleton() {
    return (
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between gap-2 md:mt-8 animate-pulse">
            <div className="h-10 w-48 bg-gray-300 rounded"></div>
            <div className="flex justify-between lg:justify-end w-full p-3">
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
                <div className="flex flex-col items-end lg:flex-row gap-1 lg:gap-4">
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}