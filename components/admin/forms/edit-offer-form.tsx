"use client"

import { useFormState } from "react-dom"
import NameFormItem from "@/components/admin/forms/name-form-item"
import FormError from "@/components/admin/forms/form-error"
import CancelButton from "@/components/ui/cancelButton"
import { SubmitButton } from "@/components/ui/submit-button"
import { Box, BoxOnly, Item, Offer, OfferWithRelations } from "@/lib/definitions"
import { useState } from "react"
import { editOffer } from "@/lib/actions/offers"
import DateFormItem from "@/components/admin/forms/date-form-item"
import AddBoxesFormItem from "@/components/admin/forms/add-boxes-form-item"

const initialState = {
    errors: {},
    message: ""
}

export default function EditOfferForm({ offer, boxes }: { offer: OfferWithRelations, boxes: BoxOnly[] }) {
    const [offerBoxes, setOfferBoxes] = useState<{ boxId: number | null, discount: number }[]>(offer.boxOffers.map((boxOffer) => ({ boxId: boxOffer.boxId, discount: boxOffer.discount })));
    const EditOfferWithIdAndOfferBoxes = editOffer.bind(null, offer.id, offerBoxes);
    const [state, formAction] = useFormState(EditOfferWithIdAndOfferBoxes, initialState); 

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <NameFormItem errors={state.errors?.name} defaultValue={offer.name} />
                <DateFormItem label="Start Date" id="startsAt" errors={state.errors?.startsAt} defaultValue={offer.startsAt} />
                <DateFormItem label="End Date" id="expiresAt" errors={state.errors?.expiresAt} defaultValue={offer.expiresAt} />
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