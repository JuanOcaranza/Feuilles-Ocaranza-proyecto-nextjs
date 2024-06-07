import { getBoxById, getActiveDiscountByBoxId } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import BoxProducts from "@/components/box-products";
import Price from "@/components/price";
import BuyButton from "@/components/buy-button";
import BuyQuantity from "@/components/buy-quantity";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [box, discount] = await Promise.all([
        getBoxById(id),
        getActiveDiscountByBoxId(id)
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
                <Image src={box.imageUrl} alt={box.name + ' image'} width={500} height={400} />
                <BoxProducts products={products} />
                <p>{box.description}</p>
                <BuyButton boxId={id} className="fixed bottom-0 w-full h-16" />
            </div>
            <div className="hidden md:flex flex-col lg:px-48">
                <div className="flex">
                    <Image src={box.imageUrl} alt={box.name + ' image'} width={500} height={400} className="mr-4 lg:mr-16 w-2/3" />
                    <div className="flex flex-col gap-4 justify-between flex-grow">
                        <div>
                            <h1 className="text-3xl mb-4">{box.name}</h1>
                            <p>{box.description}</p>
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