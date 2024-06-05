"use client"

import { useState } from "react"
import Image from "next/image";
import Price from "@/components/price";
import { CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Box, Product } from "@/lib/definitions";

export default function BoxCardContent({ box, products, discount }: { box: Box, products: Array<Product>, discount: number }) {
    const [mainImage, setMainImage] = useState(box.image);

    const maxVisibleProducts = 3;

    const visibleProducts = products.slice(0, maxVisibleProducts);
    const remainingProducts = products.length - maxVisibleProducts;

    return (
        <>
            <Image src={mainImage} alt={box.name + ' image'} width={600} height={600} />
            <div className=" h-24 py-4">
                <div className="group-hover:hidden px-4">
                    <CardTitle className="py-2">
                        {box.name}
                    </CardTitle>
                    <CardDescription>
                        {box.categories[0]}
                    </CardDescription>
                </div>
                <CardContent className="hidden group-hover:flex gap-2 px-2">
                    {visibleProducts.map(product => (
                        <Image
                            key={product.id}
                            src={product.image}
                            alt={product.name + ' image'}
                            width={96}height={96}
                            onMouseEnter={() => setMainImage(product.image)}
                            onMouseLeave={() => setMainImage(box.image)}
                        />
                    ))}
                    {remainingProducts > 0 && (
                        <div className="flex items-center text-gray-600 pl-6">
                            +{remainingProducts}
                        </div>
                    )}
                </CardContent>
            </div>
            <CardFooter>
                <Price basePrice={box.price} discount={discount} />
            </CardFooter>
        </>
    )
}