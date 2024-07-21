'use client';

import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import { BadgePercent, Home, Layers, Package, ShoppingCart } from "lucide-react";


function renderLink({link, className, pathname} : {link: {name: string, href: string, icon: any}, className?: string, pathname: string}) {
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
}

export default function NavLinks({ className, isSheet }: { className?: string, isSheet?: boolean }) {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Items', href: '/admin/items', icon: Layers },
        { name: 'Offers', href: '/admin/offers', icon: BadgePercent },
        { name: 'Sales', href: '/admin/sales', icon: ShoppingCart },
    ];    

    return (
        <>
            {links.map((link) => (
                isSheet ? (
                    <SheetClose asChild key={link.name}>
                        {renderLink({link, className, pathname})}
                    </SheetClose>
                ) : (
                    renderLink({link, className, pathname})
                )
            ))}
        </>
    );
}
