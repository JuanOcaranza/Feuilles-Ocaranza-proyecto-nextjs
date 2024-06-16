import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { lusitana } from "@/lib/fonts";
import clsx from "clsx";

export default function BreadcrumbFromList({ items, className, itemsClassName }: { items: Array<{ name: string, url: string }>, className?: string, itemsClassName?: string }) {
    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <div className="flex items-center gap-2" key={item.name}>
                        {index !== 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className={clsx(lusitana.className, "text-3xl text-black hove:text-gray-800", itemsClassName)} href={item.url}>{item.name}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}