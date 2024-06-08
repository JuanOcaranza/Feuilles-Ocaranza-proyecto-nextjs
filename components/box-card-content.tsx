"use client"

import { useState } from "react"
import CldImage from "@/components/ui/CldImage";
import Price from "@/components/price";
import { CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Box } from "@/lib/definitions";

export default function BoxCardContent({ box, discount }: { box: Box, discount: number }) {
    const [mainImage, setMainImage] = useState(box.imageUrl);

    const maxVisibleProducts = 3;
    const products = box.items.map(product => product.item);
    const visibleProducts = products.slice(0, maxVisibleProducts);
    const remainingProducts = products.length - maxVisibleProducts;

    return (
        <>
            <CldImage src={mainImage} alt={box.name + ' image'} width={500} height={400}/>
            <div className=" h-24 py-4">
                <div className="group-hover:hidden px-4">
                    <CardTitle className="py-2">
                        {box.name}
                    </CardTitle>
                    <CardDescription>
                        {box.categories.map(category => category.name).join(', ')}
                    </CardDescription>
                </div>
                <CardContent className="hidden group-hover:flex gap-2 px-2" onMouseLeave={() => setMainImage(box.imageUrl)}>
                    {visibleProducts.map(product => (
                        <CldImage
                            key={product.id}
                            src={product.imageUrl}
                            alt={product.name + ' image'}
                            width={56}height={56}
                            onMouseEnter={() => setMainImage(product.imageUrl)}
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