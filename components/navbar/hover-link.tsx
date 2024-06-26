import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import CategoriesList from "@/components/navbar/categories-list";

export default function HoverLink({ href, baseUrl, name }: { href: string, baseUrl: string, name: string }) {
    return (
        <HoverCard openDelay={300}>
            <HoverCardTrigger asChild>
                <Link href={href} className="hover:underline underline-offset-8 text-lg font-medium p-2 transition-all">
                    {name}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-full">
                <CategoriesList baseUrl={baseUrl} />
            </HoverCardContent>
        </HoverCard>
    )
}