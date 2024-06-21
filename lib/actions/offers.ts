"use server"

import { z } from 'zod';
import { deleteOffer as deleteOfferFromDB, insertOffer, updateOffer } from '@/lib/data/offers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteOffer(id: number) {
    await deleteOfferFromDB(id);

    revalidatePath('/admin/offers');
}

export type State = {
    errors?: {
        name?: string[];
        startDate?: string[];
        expirationDate?: string[];
        boxes?: string[]
    };
    message?: string;
};

const basicFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    startsAt: z.coerce.date({ required_error: "Start date is required." }).min(new Date(Date.now() - (5 * 60 * 1000)), { message: "Start date must be in the future." }),
    expiresAt: z.coerce.date({ required_error: "End date is required." }),
    boxes: z.array(z.object({
        boxId: z.coerce.number().int().min(1, { message: "Box must be selected." }),
        discount: z.coerce.number().min(1, { message: "Discount must be between 0.01 and 1." }).max(99, { message: "Discount must be between 1 and 99." })
    }))
    .refine(boxes => boxes.length > 0, { message: "At least one box is required." })
    .refine(boxes => new Set(boxes.map(box => box.boxId)).size === boxes.length, { message: "Boxes must be unique." })
});

const formSchema = basicFormSchema.refine(({ startsAt: startDate, expiresAt: expirationDate }) => startDate < expirationDate, {
    message: "Start date must be before End date.",
})

export async function createOffer(rawBoxes: Array<{ boxId: number | null, discount: number }>, prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        name: formData.get("name"),
        startsAt: formData.get("startsAt"),
        expiresAt: formData.get("expiresAt"),
        boxes: rawBoxes
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: validatedFields.error.flatten().formErrors[0] || "Missing fields. Failed to create box."
        };
    }

    const { name, startsAt, expiresAt, boxes } = validatedFields.data;

    try {
        await insertOffer({ name, startsAt, expiresAt }, boxes);
    } catch (error) {
        return {
            message: "Database error. Failed to create box."
        };
    }

    revalidatePath("/admin/offers");
    redirect("/admin/offers");
}

export async function editOffer(id: number, rawBoxes: Array<{ boxId: number | null, discount: number }>, prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        name: formData.get("name"),
        startsAt: formData.get("startsAt"),
        expiresAt: formData.get("expiresAt"),
        boxes: rawBoxes
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: validatedFields.error.flatten().formErrors[0] || "Missing fields. Failed to create box."
        };
    }

    const { name, startsAt, expiresAt, boxes } = validatedFields.data;


    try {
        await updateOffer({
            id,
            name,
            startsAt,
            expiresAt,
        }, boxes);
    } catch (error) {
        return {
            message: "Database error. Failed to edit box."
        };
    }

    revalidatePath("/admin/offers");
    redirect("/admin/offers");
}