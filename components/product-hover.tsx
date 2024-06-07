import { Item } from "@/lib/definitions"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import CldImage from "./ui/CldImage"

export default function ProductHover({ product} : {product: Item}) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <CldImage src={product.imageUrl} alt={product.name + ' image'} width={400} height={400} />
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