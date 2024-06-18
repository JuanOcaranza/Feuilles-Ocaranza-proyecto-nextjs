import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleDollarSignIcon } from "lucide-react";
import ItemErrors from "@/components/admin/forms/item-errors";

export default function PriceFormItem({ errors, defaultValue }: { errors?: string[], defaultValue?: number }) {
    return (
        <div className="mb-4">
            <Label htmlFor="price">
                Price
            </Label>
            <div className="relative mt-2 rounded-md">
                <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    max="21474836.47"
                    placeholder="Enter price"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="price-error"
                    required
                    defaultValue={defaultValue}
                >
                </Input>
                <CircleDollarSignIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ItemErrors id="price-error" errors={errors} />
        </div>
    )
}