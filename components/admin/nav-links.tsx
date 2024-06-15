'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Home, Package, ShoppingCart } from "lucide-react"

const links = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Sales', href: '/admin/sales', icon: ShoppingCart },
];

export default function NavLinks({ className }: { className?: string }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            className,
                            {
                                'bg-gray-100 font-semibold': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-5" />
                        <p>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
