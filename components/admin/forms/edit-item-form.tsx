"use client"

import { useFormState } from "react-dom"
import { editItem } from "@/lib/actions/items"
import NameFormItem from "@/components/admin/forms/name-form-item"
import DescriptionFormItem from "@/components/admin/forms/description-form-item"
import PriceFormItem from "@/components/admin/forms/price-form-item"
import FormError from "@/components/admin/forms/form-error"
import CancelButton from "@/components/ui/cancelButton"
import { SubmitButton } from "@/components/ui/submit-button"
import ImageFormItem from "@/components/admin/forms/image-form-item"
import { Item } from "@/lib/definitions"

const initialState = {
    errors: {},
    message: ""
}

export default function EditItemForm({ item }: { item: Item }) {
    const EditItemWithId = editItem.bind(null, item.id);
    const [state, formAction] = useFormState(EditItemWithId, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state?.errors?.name} defaultValue={item.name} />
                <DescriptionFormItem errors={state?.errors?.description} defaultValue={item.description} />
                <PriceFormItem errors={state?.errors?.price} defaultValue={item.price / 100} />
                <ImageFormItem replace />
                <FormError message={state?.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelButton backUrl="/admin/items" />
                <SubmitButton />
            </div>
        </form>
    )
}