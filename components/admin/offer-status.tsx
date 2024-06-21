import { CircleCheckBigIcon, ChevronsUpIcon } from 'lucide-react';
import { FireIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function OfferStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full py-1 text-xs w-24 h-8',
        {
          'bg-gray-100 text-gray-500 px-4': status === 'expired',
          'bg-green-500 text-white px-3': status === 'incoming',
          'bg-orange-500 text-white px-5': status === 'active',
        },
      )}
    >
      {status === 'expired' ? (
        <>
          Expired
          <CircleCheckBigIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'incoming' ? (
        <>
          Incoming
          <ChevronsUpIcon className="ml-1 w-4 text-White" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <FireIcon className="ml-1 w-4 text-red-700" />
        </>
      ) : null}
    </span>
  );
}
