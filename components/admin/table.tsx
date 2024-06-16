import CldImage from '@/components/ui/CldImage';
import Update from '@/components/admin/buttons/update';
import Delete from '@/components/admin/buttons/delete';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
import { tableItem } from '@/lib/definitions';
import { deleteBox } from '@/lib/actions/boxes';
import { deleteItem } from '@/lib/actions/items';

export default async function Table({
  data,
  type
}: {
  data: tableItem[],
  type: string
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((dataItem) => (
              <div
                key={dataItem.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <CldImage
                        src={dataItem.imageUrl}
                        className="mr-2 rounded-sm"
                        width={28}
                        height={28}
                        alt={`${dataItem.name}'s product image`}
                      />
                      <p>{dataItem.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{dataItem.description}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(dataItem.price)}
                    </p>
                    <p>{formatDateToLocal(dataItem.createdAt.toString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Update type={type} id={dataItem.id} />
                    <Delete type={type} id={dataItem.id} action={type === 'Item' ? deleteItem : deleteBox} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {type}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created at
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((dataItem) => (
                <tr
                  key={dataItem.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <CldImage
                        src={dataItem.imageUrl}
                        className="rounded-sm"
                        width={28}
                        height={28}
                        alt={`${dataItem.name}'s profile picture`}
                      />
                      <p>{dataItem.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dataItem.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(dataItem.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(dataItem.createdAt.toString())}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                        <Update type={type} id={dataItem.id} />
                        <Delete type={type} id={dataItem.id} action={type === 'Item' ? deleteItem : deleteBox} />
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