'use client'

import { useSelectedLayoutSegments } from "next/navigation"
import LinkSearch from "./link-search";
import Search from "../search";

export default function NavbarSearch({ placeholder }: { placeholder: string }) {
    const segments = useSelectedLayoutSegments();

    return (
        segments.length > 0 && segments[0] === 'products' ? <Search placeholder={placeholder} /> : <LinkSearch placeholder={placeholder} />
    )
}