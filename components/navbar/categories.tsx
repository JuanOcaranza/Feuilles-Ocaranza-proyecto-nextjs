import Link from "next/link";

const links = [
    { name: 'Surprise', href: '/products?category=0' },
    { name: 'Premium', href: '/products?category=1' },
    { name: 'Sport', href: '/products?category=2' },
    { name: 'Food', href: '/products?category=3' },
    { name: 'Electronics', href: '/products?category=4' },
    { name: 'Home', href: '/products?category=5' },
    { name: 'Jewelery', href: '/products?category=6' },
    { name: 'Tools', href: '/products?category=7' },
    { name: 'Garden', href: '/products?category=8' },
    { name: 'Toys', href: '/products?category=9' },
    { name: 'Music', href: '/products?category=10' },
]

export default function Categories() {
    return (
        <li>
            <details className="">
                <summary className="text-base hover:bg-orange-500">Categorías</summary>
                <ul className="p-2 z-50 bg-slate-800 text-white">
                    { 
                        links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </details>
        </li>
    );
}