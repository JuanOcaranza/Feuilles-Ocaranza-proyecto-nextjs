import NavLinks from "@/components/navbar/nav-links"
import HomeLink from "@/components/navbar/home-link"
import Search from "@/components/search"
import Cart from "@/components/cart"
import Categories from "@/components/navbar/categories"

export default function NavBar() {
    return (
        <div className="navbar bg-orange-400 sm:gap-x-4 sm:px-4">
            <HomeLink />
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl rounded-box w-52 bg-white">
                    <NavLinks />
                    <Categories />
                </ul>
            </div>
            <ul className="menu menu-horizontal hidden lg:flex ">
                <NavLinks />
                <Categories className="bg-orange-300"/>
            </ul>
            <div className="flex-grow">
                <Search placeholder="Search..."/>
                <Cart />
            </div>
        </div>
    )
}
