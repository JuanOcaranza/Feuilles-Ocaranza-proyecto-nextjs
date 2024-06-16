"use server"

import { z } from 'zod';
import { deleteBox as deleteBoxFromDB, insertBox } from '@/lib/data/boxes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteBox(id: number) {
    await deleteBoxFromDB(id);
}

export type State = {
    errors?: {
        name?: string[];
        description?: string[];
        price?: string[];
    };
    message?: string;
};

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    price: z.coerce.number().gt(0, { message: "Price must be greater than 0." }),
});

export async function createBox(prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create box."
        };
    }

    const { name, description, price } = validatedFields.data;
    const priceInCents = price * 100;
    const defaultImageUrl = "diamond-box_mxz0dp"

    try {
        insertBox({ name, description, price: priceInCents, imageUrl: defaultImageUrl }, [], []);
    } catch (error) {
        return {
            message: "Database error. Failed to create box."
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}