import { getBoxById, getProductsByBoxId } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import BoxProducts from "@/components/box-products";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [box, products] = await Promise.all([
        getBoxById(id),
        getProductsByBoxId(id)
    ])

    if (!box) {
        console.log('Box not found');
        notFound();
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-3xl">{box.name}</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <Image src={box.image} alt={box.name + ' image'} width={800} height={800} />
                <BoxProducts products={products.map((item) => item.product)} />
            </div>
            <p>{box.description}</p>
            <button className="btn">${box.price}</button>
        </div>
    )
}