import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Item } from "@/lib/definitions";
import CldImage from "@/components/ui/CldImage";

export default function ItemQuantityCard({ item, quantity }: { item: Item, quantity: number }) {
    return (
        <Card className="h-full border-0 shadow-md rounded">
            <CldImage src={item.imageUrl} alt={item.name + ' image'} width={500} height={400} />
            <CardTitle className="p-4">{item.name}</CardTitle>
            <CardFooter className="flex flex-row-reverse">
                <p className="text-gray-600">x{quantity}</p>
            </CardFooter>
        </Card>
    )
}