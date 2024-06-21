import { getUrlName } from "@/lib/utils";
import {  PencilIcon } from "lucide-react"
import Link from "next/link";

export default function Update({ type, id }: { type: string, id: number }) {
  return (
    <Link
      href={`/admin/${getUrlName(type)}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}