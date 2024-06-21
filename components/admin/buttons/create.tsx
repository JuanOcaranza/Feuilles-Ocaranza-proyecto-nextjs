import Link from "next/link";
import { Plus } from "lucide-react";
import { getUrlName } from "@/lib/utils";

export default function Create({ type }: { type: string }) {
    return (
        <Link
            href={`/admin/${getUrlName(type)}/create`}
            className="flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
            <span className="hidden md:block">Create {type}</span>{' '}
            <Plus className="h-5 md:ml-4" />
        </Link>
    );
}