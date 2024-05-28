"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
    { name: 'Productos', href: '/products' },
    { name: 'Ofertas', href: '/offerts' },
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
                        "text-base ml-2 mr-2 items-center justify-center rounded-md p-2 hover:bg-orange-500 transition-all",
                        {"bg-orange-500 font-semibold" : pathname === link.href}
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
}