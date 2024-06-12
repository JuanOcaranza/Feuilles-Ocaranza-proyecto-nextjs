import { getBoxById } from "@/lib/data";
import CldImage from "@/components/ui/CldImage";
import BoxCartItemControls from "@/components/box-cart-item-controls";

export default async function BoxCartItem({ boxId, quantity }: { boxId: number, quantity: number }) {
    const box = await getBoxById(boxId);

    if (!box)
        return (
            <span>Box not found</span>
        )
        
    return (
        <>
            <div className="flex flex-col gap-2 sm:flex-row items-center justify-between py-4">
                <div className="flex gap-x-2 items-center">
                    <CldImage src={box.imageUrl} alt={box.name} width={64} height={64} />
                    <p className="text-xl truncate">{box.name}</p>
                </div>
                <BoxCartItemControls boxId={boxId} quantity={quantity} />
            </div>
            <hr />
        </>
    )
}