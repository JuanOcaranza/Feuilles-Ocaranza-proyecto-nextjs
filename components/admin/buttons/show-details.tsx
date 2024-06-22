import { InfoIcon } from "lucide-react"
import Link from "next/link";

export default function ShowDetails({ id }: { id: number }) {
  return (
    <Link
      href={`/admin/sales/${id}`}
      className="rounded-full p-1 hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        <InfoIcon size={24} strokeWidth={1.35} />
        <p className="sr-only">
          More Details
        </p>
      </div>
    </Link>
  );
}