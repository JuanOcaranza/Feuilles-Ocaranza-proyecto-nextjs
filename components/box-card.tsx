import Link from "next/link";
import { Box } from "@/lib/definitions";
import { getActiveDiscountByBoxId, getProductsByBoxId } from "@/lib/data";
import { Card } from "@/components/ui/card";
import BoxCardContent from "./box-card-content";

export default async function BoxCard({ box } : { box: Box }) {
    const discount = await getActiveDiscountByBoxId(box.id);
    const products = await getProductsByBoxId(box.id)

    return (
        <Link
            href={`/products/${box.id}`}
        >
            <Card className="group h-full border-0 shadow-md rounded">
                <BoxCardContent box={box} products={products.map((item) => item.product)} discount={discount} />
            </Card>
        </Link>
    )
}