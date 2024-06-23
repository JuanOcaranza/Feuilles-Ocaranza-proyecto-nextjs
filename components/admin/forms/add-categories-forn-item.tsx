import { Category } from "@/lib/definitions"
import ItemErrors from "@/components/admin/forms/item-errors";
import { Button } from "@/components/ui/button";
import { SquarePlusIcon } from "lucide-react";
import AddCategoryFormItem from "./add-category-form-item";

export default function AddCategoriesFormItem({
    categories,
    boxCategories,
    setBoxCategories,
    errors
}: {
    categories: Category[],
    boxCategories: { categoryId: number | null }[],
    setBoxCategories: (selectedCategories: { categoryId: number | null }[]) => void,
    errors?: string[]
}) {
    const updateCategoryId = (index: number, newCategoryId: number | null) => {
        const newBoxCategories = [...boxCategories];
        newBoxCategories[index] = { categoryId: newCategoryId };
        setBoxCategories(newBoxCategories);
    }

    const addCategory = (event: any) => {
        event.preventDefault();
        setBoxCategories([...boxCategories, { categoryId: null }]);
    }

    const removeCategory = (index: number) => {
        const newBoxCategories = [...boxCategories];
        newBoxCategories.splice(index, 1);
        setBoxCategories(newBoxCategories);
    }

    return (
        <div className="mt-8">
            <h3 className="text-xl mb-2">Categories</h3>
            <div>
                {
                    boxCategories.map((category, index) => (
                        <AddCategoryFormItem
                            key={index}
                            categories={categories}
                            categoryId={category.categoryId}
                            setCategoryId={(newCategoryId) => updateCategoryId(index, newCategoryId)}
                            onRemove={() => removeCategory(index)}
                        />
                    ))
                }
            </div>
            <Button onClick={addCategory} variant={"outline"} className="mt-4"><SquarePlusIcon className="mr-2" />Add category</Button>
            <ItemErrors id="items-error" errors={errors} />
        </div>
    )
}