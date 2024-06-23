"use server"

import { z } from 'zod';
import { deleteBox as deleteBoxFromDB, insertBox, updateBox } from '@/lib/data/boxes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/lib/cloudinary';
import { convertToCents } from '@/lib/utils';

export async function deleteBox(id: number) {
    await deleteBoxFromDB(id);

    revalidatePath('/admin/products');
}

export type State = {
    errors?: {
        name?: string[];
        description?: string[];
        price?: string[];
        image?: string[]
    };
    message?: string;
};

const createFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    price: z.coerce.number().gt(0, { message: "Price must be greater than 0." }).lte(21474836.47, { message: "Price must be less or equal to 21474836.47." }),
    image: z.instanceof(File).refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type), { message: "Image is required. Must be a PNG, JPEG, JPG, or GIF." }),
    items: z.array(z.object({
        itemId: z.coerce.number().int().min(1, { message: "Item must be selected." }),
        probability: z.coerce.number().min(0.01, { message: "Probability must be between 0.01 and 1." }).max(1, { message: "Probability must be between 0.01 and 1." })
    }))
    .refine(items => items.length > 0, { message: "At least one item is required." })
    .refine(items => {
        const totalProbability = items.reduce((acc, item) => acc + item.probability, 0);
        return totalProbability >= 0.999999 && totalProbability <= 1.000001
    }, { message: "Probability must add up to 1." })
    .refine(items => new Set(items.map(item => item.itemId)).size === items.length, { message: "Items must be unique." })
});

export async function createBox(rawItems: Array<{ itemId: number | null, probability: number }>, prevState: State, formData: FormData) {
    const validatedFields = createFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        image: formData.get("image"),
        items: rawItems
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create box."
        };
    }

    const { name, description, price, image, items } = validatedFields.data;
    const priceInCents = convertToCents(price);
    const imageUrl = await uploadImage(image);

    try {
        await insertBox({ name, description, price: priceInCents, imageUrl }, items, []);
    } catch (error) {
        return {
            message: "Database error. Failed to create box."
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

const editFormSchema = createFormSchema.omit({ image: true });

export async function editBox(id: number, rawItems: Array<{ itemId: number | null, probability: number }>, prevState: State, formData: FormData) {
    const validatedFields = editFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        items: rawItems
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to edit box."
        };
    }

    const { name, description, price, items } = validatedFields.data;
    const priceInCents = convertToCents(price);
    const image = formData.get("image");
    const imageUrl = (image === null || (image instanceof File && image.size === 0)) ? undefined : await uploadImage(image as File);

    try {
        await updateBox({
            id,
            name,
            description,
            price: priceInCents,
            imageUrl,
            items,
            categories: []
        })
    } catch (error) {
        return {
            message: "Database error. Failed to edit box."
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}