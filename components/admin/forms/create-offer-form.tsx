"use client"

import { useFormState } from "react-dom"
import NameFormItem from "@/components/admin/forms/name-form-item"
import FormError from "@/components/admin/forms/form-error"
import CancelButton from "@/components/ui/cancelButton"
import { SubmitButton } from "@/components/ui/submit-button"
import { BoxOnly } from "@/lib/definitions"
import { useState } from "react"
import { createOffer } from "@/lib/actions/offers"
import DateFormItem from "@/components/admin/forms/date-form-item"
import AddBoxesFormItem from "@/components/admin/forms/add-boxes-form-item"

const initialState = {
    errors: {},
    message: ""
}

export default function CreateOfferForm({ boxes }: { boxes: BoxOnly[] }) {
    const [offerBoxes, setOfferBoxes] = useState<{ boxId: number | null, discount: number }[]>([{ boxId: null, discount: 10 }]);
    const createOfferWithOfferBoxes = createOffer.bind(null, offerBoxes)
    const [state, formAction] = useFormState(createOfferWithOfferBoxes, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state.errors?.name} />
                <DateFormItem label="Start Date" id="startsAt" errors={state.errors?.startsAt} />
                <DateFormItem label="End Date" id="expiresAt" errors={state.errors?.expiresAt} />
                <AddBoxesFormItem boxes={boxes} offerBoxes={offerBoxes} setOfferBoxes={setOfferBoxes} errors={state.errors?.boxes} />
                <FormError message={state.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <CancelButton backUrl="/admin/offers" />
                <SubmitButton />
            </div>
        </form>
    )
}