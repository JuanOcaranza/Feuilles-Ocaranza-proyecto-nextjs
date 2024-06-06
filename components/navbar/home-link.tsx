import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function HomeLink() {
    return (
      <Link href="/" className="flex">
        <img src="/images/logo.svg" alt="Logo" className="w-10 p-1 lg:w-12 h-auto" />
        <h1 className="hidden lg:block text-4xl p-2 font-semibold">Surprise Boxes</h1>
      </Link>
    );
}
