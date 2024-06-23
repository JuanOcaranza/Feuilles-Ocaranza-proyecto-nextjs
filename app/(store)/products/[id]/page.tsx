import { getActiveDiscountByBoxId } from '@/lib/data/boxes';
import { getBoxById } from '@/lib/data/boxes';
import { notFound } from "next/navigation";
import CldImage from "@/components/ui/CldImage";
import BoxProducts from "@/components/product/box-products";
import Price from "@/components/price";
import BuyButton from "@/components/product/buy-button";
import BuyQuantity from "@/components/product/buy-quantity";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Box',
  };

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const [box, discount] = await Promise.all([
        getBoxById(id),
        getActiveDiscountByBoxId(id),
    ])

    if (!box) {
        console.log('Box not found');
        notFound();
    }

    const products = box.items.map((boxItem) => boxItem.item);

    return (
        <div className="m-6">
            <div className="flex flex-col items-center gap-8 md:hidden">
                <h1 className="text-3xl">{box.name}</h1>
                <Price basePrice={box.price} discount={discount} className="sm:w-2/3" />
                <CldImage src={box.imageUrl} alt={box.name + ' image'} width={500} height={400} sizes="100vw" />
                <BoxProducts products={products} />
                <p className='whitespace-break-spaces'>{box.description}</p>
                <BuyButton boxId={id} className="fixed bottom-0 w-full h-16" />
            </div>
            <div className="hidden md:flex flex-col lg:px-48">
                <div className="flex">
                    <CldImage src={box.imageUrl} alt={box.name + ' image'} width={500} height={400} className="mr-4 lg:mr-16 w-2/3 flex-shrink-0" sizes="(max-width: 1024px) 66vw, 50vw" />
                    <div className="flex flex-col gap-4 justify-between flex-grow">
                        <div>
                            <h1 className="text-3xl mb-4">{box.name}</h1>
                            <ScrollArea className='h-[200px] xl:h-[300px] 2xl:h-[500px] whitespace-break-spaces'>{box.description}</ScrollArea>
                        </div>
                        <BuyQuantity BoxId={id} basePrice={box.price} discount={discount} />
                    </div>
                </div>
                <div className="mt-8">
                    <BoxProducts products={products} />
                </div>
            </div>
        </div>
    )
}