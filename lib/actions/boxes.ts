"use server"

import { z } from 'zod';
import { deleteBox as deleteBoxFromDB, insertBox } from '@/lib/data/boxes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/lib/cloudinary';
import { newBoxItem } from '@/lib/definitions';

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

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    price: z.coerce.number().gt(0, { message: "Price must be greater than 0." }),
    image: z.instanceof(File).refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type), { message: "Image is required. Must be a PNG, JPEG, JPG, or GIF." }),
    items: z.array(z.object({
        itemId: z.coerce.number().int().min(1, { message: "Item must be selected." }),
        probability: z.coerce.number().min(0.01, { message: "Probability must be between 0 and 1." }).max(1, { message: "Probability must be between 0 and 1." })
    }))
    .refine(items => items.length > 0, { message: "At least one item is required." })
    .refine(items => items.reduce((acc, item) => acc + item.probability, 0) === 1, { message: "Probability must add up to 1." })
    .refine(items => new Set(items.map(item => item.itemId)).size === items.length, { message: "Items must be unique." })
});

export async function createBox(rawItems: Array<{ itemId: number | null, probability: number }>, prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
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
    const priceInCents = price * 100;
    const imageUrl = await uploadImage(image);

    try {
        insertBox({ name, description, price: priceInCents, imageUrl }, items, []);
    } catch (error) {
        return {
            message: "Database error. Failed to create box."
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}