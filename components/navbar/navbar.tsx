import NavLinks from "@/components/navbar/nav-links"
import HomeLink from "@/components/navbar/home-link"
import Search from "@/components/search"

export default function NavBar() {
    return (
        <div className="navbar bg-orange-600 gap-x-4">
            <HomeLink />
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                    <NavLinks />
                </ul>
            </div>
            <ul className="menu menu-horizontal px-1 hidden lg:flex">
                <NavLinks />
                <li><a>Item 1</a></li>
                <li>
                    <details>
                        <summary>Categorías</summary>
                        <ul className="p-2">
                            <li><a>Caja Navideña</a></li>
                            <li><a>Caja &quot;Arma Tu Casa&quot;</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
            </ul>
            <Search placeholder="Search..."/>
            <a className="btn">Button</a>
        </div>
    )
}
