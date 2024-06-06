"use client"

import { useEffect, useState } from "react"
import Image from "next/image";
import Price from "@/components/price";
import { CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Box, Product } from "@/lib/definitions";

export default function BoxCardContent({ box, products, discount }: { box: Box, products: Array<Product>, discount: number }) {
    const [mainImage, setMainImage] = useState(box.image);
    const prod = [
        {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            image: "https://img.freepik.com/vector-gratis/personaje-dibujos-animados-gatito-ojos-dulces_1308-135596.jpg",
            price: 10
        },
        {
            id: "2",
            name: "Product 2",
            description: "Description 2",
            image: "https://img.freepik.com/vector-gratis/ilustracion-icono-vector-dibujos-animados-lindo-gato-sentado-concepto-icono-naturaleza-animal-aislado-premium-vector-estilo-dibujos-animados-plana_138676-4148.jpg",
            price: 11
        },
        {
            id: "3",
            name: "Product 3",
            description: "Description 3",
            image: "https://www.shutterstock.com/image-vector/anime-cartoon-characters-cute-cats-600nw-2418102205.jpg",
            price: 12
        }
    ]

    const maxVisibleProducts = 3;

    const visibleProducts = prod.slice(0, maxVisibleProducts);
    const remainingProducts = prod.length - maxVisibleProducts;

    return (
        <>
            <Image src={mainImage} alt={box.name + ' image'} width={600} height={600} className="h-96"/>
            <div className=" h-24 py-4">
                <div className="group-hover:hidden px-4">
                    <CardTitle className="py-2">
                        {box.name}
                    </CardTitle>
                    <CardDescription>
                        {box.categories[0]}
                    </CardDescription>
                </div>
                <CardContent className="hidden group-hover:flex gap-2 px-2" onMouseLeave={() => setMainImage(box.image)}>
                    {visibleProducts.map(product => (
                        <Image
                            key={product.id}
                            src={product.image}
                            alt={product.name + ' image'}
                            width={56}height={56}
                            onMouseEnter={() => setMainImage(product.image)}
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