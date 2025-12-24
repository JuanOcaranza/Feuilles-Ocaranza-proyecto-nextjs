import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "@/app/globals.css";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: {
        template: '%s | Surprise Box Store',
        default: 'Surprise Box Store',
    },
    description: "Find unique and exciting mystery boxes filled with a variety of items.",
    metadataBase: new URL("https://feuilles-ocaranza-proyecto-nextjs-update.vercel.app")
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full" lang="en">
            <body className={clsx("h-full antialiased", inter.className)}>
                {children}
                <Toaster /> 
            </body>
        </html>
    );
}
