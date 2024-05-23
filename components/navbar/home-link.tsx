import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export  default function HomeLink() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="w-6 lg:w-12" />
            <p className="hidden lg:block text-4xl font-bold">RandomBox</p>
        </Link>
    )
}