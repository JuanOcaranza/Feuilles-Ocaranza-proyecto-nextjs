"use client"

import { useFormState } from "react-dom"
import { createBox } from "@/lib/actions/boxes"
import NameFormItem from "@/components/admin/forms/name-form-item"
import DescriptionFormItem from "@/components/admin/forms/description-form-item"
import PriceFormItem from "@/components/admin/forms/price-form-item"
import FormError from "@/components/admin/forms/form-error"
import CancelButton from "@/components/ui/cancelButton"
import { SubmitButton } from "@/components/ui/submit-button"

const initialState = {
    errors: {},
    message: ""
}

export default function CreateBoxForm() {
    const [state, formAction] = useFormState(createBox, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state.errors?.name} />
                <DescriptionFormItem errors={state.errors?.description} />
                <PriceFormItem errors={state.errors?.price} />
                <FormError message={state.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelButton backUrl="/admin/boxes" />
                <SubmitButton />
            </div>
        </form>
    )
}