import { Product } from "@/lib/definitions"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card"
import { Card, CardDescription, CardTitle } from "@/components/card"
import Image from "next/image"

export default function ProductHover({ product} : {product: Product}) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Image src={product.image} alt={product.name + ' image'} width={400} height={400} />
            </HoverCardTrigger>
            <HoverCardContent>
                <Card>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                </Card>
            </HoverCardContent>
        </HoverCard>
    )
}