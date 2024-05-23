"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const links = [
    { name: 'Products', href: '/products' }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <li>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        "text-xl hover:bg-orange-500 transition-all",
                        {"bg-orange-500" : pathname === link.href}
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </li>
    );
}