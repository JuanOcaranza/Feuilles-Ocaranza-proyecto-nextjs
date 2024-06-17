import { Item } from "@/lib/definitions";
import ItemsCombobox from "@/components/admin/forms/items-combobox";
import ProbabilityFormItem from "@/components/admin/forms/probability-form-item";
import { SquareMinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddItemFormItem({
    items,
    itemId,
    setItemId,
    probability,
    setProbability,
    onRemove,
    removable
}: {
    items: Item[],
    itemId: number | null,
    setItemId: (itemId: number | null) => void,
    probability: number,
    setProbability: (probability: number) => void,
    onRemove: () => void,
    removable: boolean
}) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-[600px] mt-2">
            <div className="flex items-center gap-2">
                <ItemsCombobox items={items} value={itemId} setValue={setItemId} />
                <Button disabled={!removable} aria-disabled={!removable} onClick={onRemove} variant={"ghost"} className="hover:bg-transparent">
                    <p className="sr-only">Remove</p>
                    <SquareMinusIcon color="#b83d3d" />
                </Button>
            </div>
            <ProbabilityFormItem probability={probability} setProbability={setProbability} />
        </div>
    )
}