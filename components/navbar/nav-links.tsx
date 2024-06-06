"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
    { name: 'Products', href: '/products' },
    { name: 'Offerts', href: '/offerts' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        "text-base items-center justify-center rounded-md p-2 pr-3 pl-3 ml-2 mr-2 hover:bg-gray-300 transition-all",
                        {"bg-gray-300 font-semibold " : pathname === link.href}
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}