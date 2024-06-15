import Link from "next/link"
import { Home, Package, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

const Sidenav = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold mt-3">
                        <Image src="/images/logo.svg" alt="Logo" className="w-8 pb-3 h-auto" width={24} height={24} />
                        <span className="text-xl">Surprise Boxes</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Package className="h-4 w-4" />
                            Products
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidenav
