import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TicketPercentIcon } from "lucide-react";

export default function DiscountFormItem({ discount, setDiscount }: { discount: number, setDiscount: (discount: number) => void }) {
    const handleKeydown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    return (
        <div className="self-end mt-1 sm:mt-0">
            <Label htmlFor="discount" className="sr-only">
                Discount
            </Label>
            <div className="relative rounded-md">
                <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    onKeyDown={handleKeydown}
                    required
                />
                <TicketPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
    )
}