import Link from "next/link";
import Image from "next/image";

export default function HomeLink() {
    return (
      <Link href="/" className="flex">
        <Image src="/images/logo.svg" alt="Logo" className="w-12 pr-1 pb-1 lg:pb-3 lg:w-12 h-auto" width={48} height={48} />
        <h1 className="hidden lg:block text-4xl p-2 font-semibold">Surprise Boxes</h1>
      </Link>
    );
}
