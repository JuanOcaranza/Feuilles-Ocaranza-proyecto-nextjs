import { ComboBoxItem } from "@/lib/definitions"
import AddItemFormItem from "@/components/admin/forms/add-item-form-item";
import ItemErrors from "@/components/admin/forms/item-errors";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SquarePlusIcon } from "lucide-react";

export default function AddItemsFormItem({
    items,
    boxItems,
    setBoxItems,
    errors
}: {
    items: ComboBoxItem[],
    boxItems: { itemId: number | null, probability: number }[],
    setBoxItems: (boxItems: { itemId: number | null, probability: number }[]) => void,
    errors?: string[]
}) {
    const updateItemId = (index: number, newItemId: number | null) => {
        const newBoxItems = [...boxItems];
        newBoxItems[index] = { ...newBoxItems[index], itemId: newItemId };
        setBoxItems(newBoxItems);
    }

    const updateProbability = (index: number, newProbability: number) => {
        const newBoxItems = [...boxItems];
        newBoxItems[index] = { ...newBoxItems[index], probability: newProbability };
        setBoxItems(newBoxItems);
    }

    const getValue = () => {
        const selectedItems = boxItems.map((boxItem) => ({ price: items.find((item) => (item.id === boxItem.itemId))?.price || 0, probability: boxItem.probability }));
        const value = selectedItems.reduce((acc, item) => acc + item.price * item.probability, 0);
        return formatCurrency(value);
    }

    const addItem = (event: any) => {
        event.preventDefault();
        setBoxItems([...boxItems, { itemId: null, probability: 0.5 }]);
    }

    const removeItem = (index: number) => {
        const newBoxItems = [...boxItems];
        newBoxItems.splice(index, 1);
        setBoxItems(newBoxItems);
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl mb-2">Items</h3>
            <div>
                {
                    boxItems.map((item, index) => (
                        <AddItemFormItem
                            key={index}
                            items={items}
                            itemId={item.itemId}
                            setItemId={(newItemId) => updateItemId(index, newItemId)}
                            probability={item.probability}
                            setProbability={(newProbability) => updateProbability(index, newProbability)}
                            onRemove={() => removeItem(index)}
                            removable={boxItems.length > 1}
                        />
                    ))
                }
            </div>
            <Button onClick={addItem} variant={"outline"} className="mt-4"><SquarePlusIcon className="mr-2" />Add item</Button>
            <div className="mt-4 flex items-center justify-between max-w-[600px]">
                <p>Total value: {getValue()}</p>
                <p>Total probability: {boxItems.reduce((acc, item) => acc + item.probability, 0).toFixed(2)}</p>
            </div>
            <ItemErrors id="items-error" errors={errors} />
        </div>
    )
}