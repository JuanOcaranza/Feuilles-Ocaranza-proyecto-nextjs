import Link from "next/link";
import { Box } from "@/lib/definitions";
import { getActiveDiscountByBoxId } from '@/lib/data/boxes';
import { Card } from "@/components/ui/card";
import BoxCardContent from "@/components/box-card-content";

export default async function BoxCard({ box } : { box: Box }) {
    const discount = await getActiveDiscountByBoxId(box.id);

    return (
        <Link
            href={`/products/${box.id}`}
        >
            <Card className="group h-full border-0 shadow-md rounded">
                <BoxCardContent box={box} discount={discount} />
            </Card>
        </Link>
    )
}