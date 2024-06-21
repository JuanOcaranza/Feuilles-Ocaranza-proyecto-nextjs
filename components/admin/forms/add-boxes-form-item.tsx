import { ComboBoxItem } from "@/lib/definitions"
import ItemErrors from "@/components/admin/forms/item-errors";
import { Button } from "@/components/ui/button";
import { SquarePlusIcon } from "lucide-react";
import AddBoxFormItem from "@/components/admin/forms/add-box-form-item";

export default function AddBoxesFormItem({
    boxes,
    offerBoxes,
    setOfferBoxes,
    errors
}: {
    boxes: ComboBoxItem[],
    offerBoxes: { boxId: number | null, discount: number }[],
    setOfferBoxes: (boxItems: { boxId: number | null, discount: number }[]) => void,
    errors?: string[]
}) {
    const updateBoxId = (index: number, newBoxId: number | null) => {
        const newBoxItems = [...offerBoxes];
        newBoxItems[index] = { ...newBoxItems[index], boxId: newBoxId };
        setOfferBoxes(newBoxItems);
    }

    const updateDiscount = (index: number, newDiscount: number) => {
        const newBoxItems = [...offerBoxes];
        newBoxItems[index] = { ...newBoxItems[index], discount: newDiscount };
        setOfferBoxes(newBoxItems);
    }

    const addItem = (event: any) => {
        event.preventDefault();
        setOfferBoxes([...offerBoxes, { boxId: null, discount: 10 }]);
    }

    const removeItem = (index: number) => {
        const newBoxItems = [...offerBoxes];
        newBoxItems.splice(index, 1);
        setOfferBoxes(newBoxItems);
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl mb-2">Boxes</h3>
            <div>
                {
                    offerBoxes.map((item, index) => (
                        <AddBoxFormItem
                            key={index}
                            boxes={boxes}
                            boxId={item.boxId}
                            setBoxId={(newBoxId) => updateBoxId(index, newBoxId)}
                            discount={item.discount}
                            setDiscount={(newDiscount) => updateDiscount(index, newDiscount)}
                            onRemove={() => removeItem(index)}
                            removable={offerBoxes.length > 1}
                        />
                    ))
                }
            </div>
            <Button onClick={addItem} variant={"outline"} className="mt-4"><SquarePlusIcon className="mr-2" />Add item</Button>
            <div className="mt-4 flex items-center justify-between max-w-[600px]">
                <p>Average discount: {(offerBoxes.reduce((acc, item) => acc + item.discount, 0) / offerBoxes.length).toFixed(2)}</p>
            </div>
            <ItemErrors id="items-error" errors={errors} />
        </div>
    )
}