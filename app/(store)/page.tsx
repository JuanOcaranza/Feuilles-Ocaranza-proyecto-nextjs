import HomeCarousels from "@/components/home/home-carousels";
import CldImage from "@/components/ui/CldImage";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Home',
};

export default function Home() {
    return (
        <div>
            <div className="relative w-full h-screen">
                <CldImage src="slsx5xvcbib7rhouofab" alt="Main Banner" className="w-full h-full object-cover" height={500} width={400} sizes="100vw" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="bg-black bg-opacity-75 p-4 mb-4 rounded">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white text-center">
                            Welcome to Surprise Boxes!
                        </h1>
                    </div>
                    <Link href="/products" className="bg-white text-black font-semibold hover:bg-black hover:text-white py-2 px-4 text-lg rounded-lg border-2 border-black mt-4">
                        SHOP NOW
                    </Link>
                </div>
            </div>
            <HomeCarousels />
        </div>
    );
}
