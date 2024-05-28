import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export  default function HomeLink() {
    return (
        <Link href="/" className="flex items-center">
            {/* <HomeIcon className="w-6 lg:w-12" /> */}
            <h1 className="hidden lg:block text-4xl p-2 font-semibold">RandomBox</h1>
        </Link>
    )
}