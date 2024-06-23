import { Category} from "@/lib/definitions";
import { SquareMinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoriesCombobox from "./categories-combobox";

export default function AddCategoryFormItem({
    categories: categories,
    categoryId: categoryId,
    setCategoryId: setCategoryId,
    onRemove,
}: {
    categories: Category[],
    categoryId: number | null,
    setCategoryId: (itemId: number | null) => void,
    onRemove: () => void,
}) {
    return (
        <div>
            <CategoriesCombobox categories={categories} value={categoryId} setValue={setCategoryId} />
            <Button onClick={onRemove} variant={"ghost"} className="hover:bg-transparent">
                <p className="sr-only">Remove</p>
                <SquareMinusIcon color="#b83d3d" />
            </Button>
        </div>
    )
}