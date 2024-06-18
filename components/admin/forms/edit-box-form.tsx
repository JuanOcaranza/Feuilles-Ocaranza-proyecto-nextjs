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
import { Box, Item } from "@/lib/definitions"
import AddItemsFormItem from "./add-items-form-item"
import { useState } from "react"

const initialState = {
    errors: {},
    message: ""
}

export default function EditBoxForm({ box, items }: { box: Box, items: Item[] }) {
    const [boxItems, setBoxItems] = useState<{ itemId: number | null, probability: number }[]>(box.items.map((item) => ({ itemId: item.item.id, probability: item.probability })));
    const EditBoxWithIdAndBoxItems = editBox.bind(null, box.id, boxItems);
    const [state, formAction] = useFormState(EditBoxWithIdAndBoxItems, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state.errors?.name} defaultValue={box.name} />
                <DescriptionFormItem errors={state.errors?.description} defaultValue={box.description} />
                <PriceFormItem errors={state.errors?.price} defaultValue={box.price / 100} />
                <ImageFormItem replace />
                <AddItemsFormItem items={items} boxItems={boxItems} setBoxItems={setBoxItems} errors={state.errors?.items} />
                <FormError message={state.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelButton backUrl="/admin/products" />
                <SubmitButton />
            </div>
        </form>
    )
}