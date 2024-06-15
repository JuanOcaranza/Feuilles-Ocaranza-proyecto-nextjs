import Link from "next/link"
import Image from "next/image";
import NavLinks from "./nav-links";

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
                    <nav className="grid items-start px-2 text-md font-medium lg:px-4 mt-3">
                        <NavLinks className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary" />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidenav
