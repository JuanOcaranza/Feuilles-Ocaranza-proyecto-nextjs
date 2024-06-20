import HomeLink from "@/components/navbar/home-link";
import Search from "@/components/search";
import Cart from "@/components/cart/cart";
import { Suspense } from "react";
import SearchSkeleton from "@/components/skeletons/search-skeleton";
import HoverLink from "@/components/navbar/hover-link";
import MenuSheet from "@/components/navbar/menu-sheet";

export default function NavBar() {
    return (
        <div className="navbar bg-gray-100 sm:gap-x-4 sm:px-4 flex justify-between items-center">
            <div className="flex items-center">
                <div className="lg:hidden">
                    <MenuSheet />
                </div>
                <HomeLink />
            </div>
            <ul className="menu menu-horizontal hidden lg:flex flex-1 justify-center space-x-4">
                <HoverLink baseUrl="/products?featured=true&" name="Featured" href="/products?featured=true" />
                <HoverLink baseUrl="/products?" name="Products" href="/products" />
                <HoverLink baseUrl="/products?onOffer=true&" name="Sale" href="/products?onOffer=true" />
            </ul>
            <div className="flex space-x-4">
                <Suspense key="search" fallback={<SearchSkeleton placeholder="Search..." />}>
                    <Search placeholder="Search..." />
                </Suspense>
                <Cart />
            </div>
        </div>
    );
}
