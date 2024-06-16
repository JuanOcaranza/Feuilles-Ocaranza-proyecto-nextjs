import { Box } from "@/lib/definitions";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import CldImage from "@/components/ui/CldImage";
import Price from "@/components/price";

export default function BoxQuantityCard({ box, quantity, finalPrice }: { box: Box, quantity: number, finalPrice: number }) {
    return (
        <Card className="h-full border-0 shadow-md rounded">
            <CldImage src={box.imageUrl} alt={box.name + ' image'} width={500} height={400}/>
            <div className="h-24 py-4">
                <div className="flex px-4 justify-between items-baseline">
                    <CardTitle className="py-2">
                        {box.name}
                    </CardTitle>
                    <p className="text-gray-600">x{quantity}</p>
                </div>
            </div>
            <CardFooter>
                <Price basePrice={box.price * quantity} discount={(box.price - finalPrice) / box.price * 100 } />
            </CardFooter>
        </Card>
    )
}