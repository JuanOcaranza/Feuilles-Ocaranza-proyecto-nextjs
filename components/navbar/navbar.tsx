import NavLinks from "@/components/navbar/nav-links";
import HomeLink from "@/components/navbar/home-link";
import Search from "@/components/navbar/search";
import Cart from "@/components/cart/cart";
import Categories from "@/components/navbar/categories";
import { Suspense } from "react";
import SearchSkeleton from "@/components/skeletons/search-skeleton";

export default function NavBar() {
    return (
        <div className="navbar bg-gray-100 sm:gap-x-4 sm:px-4 flex justify-between items-center">
            <div className="flex items-center">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl rounded-box w-52 bg-white">
                        <NavLinks />
                        <Categories />
                    </ul>
                </div>
                <HomeLink />
            </div>
            <ul className="menu menu-horizontal hidden lg:flex flex-1 justify-center space-x-4">
                <NavLinks />
                <Categories className="bg-gray-100 " />
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
