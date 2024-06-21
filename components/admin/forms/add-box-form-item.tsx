import { ComboBoxItem } from "@/lib/definitions";
import ItemsCombobox from "@/components/admin/forms/items-combobox";
import { SquareMinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiscountFormItem from "@/components/admin/forms/discount-form-item";

export default function AddBoxFormItem({
    boxes,
    boxId,
    setBoxId,
    discount,
    setDiscount,
    onRemove,
    removable
}: {
    boxes: ComboBoxItem[],
    boxId: number | null,
    setBoxId: (boxId: number | null) => void,
    discount: number,
    setDiscount: (discount: number) => void,
    onRemove: () => void,
    removable: boolean
}) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-[600px] mt-2">
            <div className="flex items-center gap-2">
                <ItemsCombobox items={boxes} value={boxId} setValue={setBoxId} itemName="box" />
                <Button disabled={!removable} aria-disabled={!removable} onClick={onRemove} variant={"ghost"} className="hover:bg-transparent">
                    <p className="sr-only">Remove</p>
                    <SquareMinusIcon color="#b83d3d" />
                </Button>
            </div>
            <DiscountFormItem discount={discount} setDiscount={setDiscount} />
        </div>
    )
}