"use client"

import { useFormState } from "react-dom"
import { editBox } from "@/lib/actions/boxes"
import NameFormItem from "@/components/admin/forms/name-form-item"
import DescriptionFormItem from "@/components/admin/forms/description-form-item"
import PriceFormItem from "@/components/admin/forms/price-form-item"
import FormError from "@/components/admin/forms/form-error"
import CancelButton from "@/components/ui/cancelButton"
import { SubmitButton } from "@/components/ui/submit-button"
import ImageFormItem from "@/components/admin/forms/image-form-item"
import { Box, Category, Item } from "@/lib/definitions"
import AddItemsFormItem from "./add-items-form-item"
import { useState } from "react"
import AddCategoriesFormItem from "./add-categories-forn-item"

const initialState = {
    errors: {},
    message: ""
}

export default function EditBoxForm({ box, items, categories }: { box: Box, items: Item[], categories: Category[] }) {
    const [boxItems, setBoxItems] = useState<{ itemId: number | null, probability: number }[]>(box.items.map((item) => ({ itemId: item.item.id, probability: item.probability })));
    const [boxCategories, setBoxCategories] = useState<{ categoryId: number | null }[]>(box.categories.map((category) => ({ categoryId: category.id })));
    const EditBoxWithIdBoxItemsAndBoxCategories = editBox.bind(null, box.id, boxItems, boxCategories);
    const [state, formAction] = useFormState(EditBoxWithIdBoxItemsAndBoxCategories, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state?.errors?.name} defaultValue={box.name} />
                <DescriptionFormItem errors={state?.errors?.description} defaultValue={box.description} />
                <PriceFormItem errors={state?.errors?.price} defaultValue={box.price / 100} />
                <ImageFormItem replace />
                <div className="flex flex-col xl:flex-row xl:justify-around">
                    <AddItemsFormItem className="max-w-[450px] xl:w-1/2" items={items} boxItems={boxItems} setBoxItems={setBoxItems} errors={state?.errors?.items} />
                    <AddCategoriesFormItem categories={categories} boxCategories={boxCategories} setBoxCategories={setBoxCategories} errors={state?.errors?.categories} />
                </div>
                <FormError message={state?.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelButton backUrl="/admin/products" />
                <SubmitButton />
            </div>
        </form>
    )
}