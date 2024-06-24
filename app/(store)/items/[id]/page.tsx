
import { notFound } from "next/navigation";
import CldImage from "@/components/ui/CldImage";
import Price from "@/components/price";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Metadata } from 'next';
import { getItemById } from "@/lib/data/items";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Item',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const item = await getItemById(id)

    if (!item) {
        notFound();
    }

    return (
        <div className="m-4">
            <div className="flex flex-col items-center gap-4 md:hidden">
                <h1 className="self-start text-3xl">{item.name}</h1>
                <Price basePrice={item.price} discount={0} className="sm:w-2/3" />
                <CldImage src={item.imageUrl} alt={item.name + ' image'} width={500} height={400} sizes="100vw" />
                <p className='whitespace-break-spaces'>{item.description}</p>
                <Link href={`/products?query=${item.name}`} className="bg-black hover:bg-green-900 text-white text-center flex items-center justify-center font-bold py-2 px-4 fixed bottom-0 w-full h-16 z-10">
                    See Products
                </Link>
            </div>
            <div className="hidden md:flex flex-col lg:px-48">
                <div className="flex">
                    <CldImage src={item.imageUrl} alt={item.name + ' image'} width={500} height={400} className="mr-4 lg:mr-16 w-2/3 flex-shrink-0" sizes="(max-width: 1024px) 66vw, 50vw" />
                    <div className="flex flex-col gap-4 justify-between flex-grow">
                        <div>
                            <h1 className="text-3xl mb-4">{item.name}</h1>
                            <ScrollArea className='h-[200px] xl:h-[300px] 2xl:h-[500px] whitespace-break-spaces'>{item.description}</ScrollArea>
                        </div>
                        <Link href={`/products?query=${item.name}`} className="bg-black hover:bg-green-900 text-white text-center rounded-md font-bold py-2 px-4">See Products</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
