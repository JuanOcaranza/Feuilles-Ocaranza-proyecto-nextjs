"use server"

import { insertItem, updateItem, deleteItem as deleteItemsFromDB } from '@/lib/data/items';
import { z } from 'zod';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteItem(id: number) {
    await deleteItemsFromDB(id);

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
    price: z.coerce.number().gt(0, { message: "Price must be greater than 0." }).lte(21474836.47, { message: "Price must be less than 21474836.47." }),
    image: z.instanceof(File).refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type), { message: "Image is required. Must be a PNG, JPEG, JPG, or GIF." })
});

export async function createItem(prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        image: formData.get("image")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create box."
        };
    }

    const { name, description, price, image} = validatedFields.data;
    const priceInCents = price * 100;
    const imageUrl = await uploadImage(image);

    try {
        insertItem({ name, description, price: priceInCents, imageUrl });
    } catch (error) {
        return {
            message: "Database error. Failed to create box."
        };
    }

    revalidatePath("/admin/items");
    redirect("/admin/items");
}

const editFormSchema = formSchema.omit({ image: true });

export async function editItem(id: number, prevState: State, formData: FormData) {
    const validatedFields = editFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to edit item."
        };
    }

    const { name, description, price } = validatedFields.data;
    const priceInCents = price * 100;
    const image = formData.get("image");
    const imageUrl = (image === null || (image instanceof File && image.size === 0)) ? undefined : await uploadImage(image as File);

    try {
        await updateItem({
            id,
            name,
            description,
            price: priceInCents,
            imageUrl
        })
    } catch (error) {
        return {
            message: "Database error. Failed to edit item."
        };
    }

    revalidatePath("/admin/items");
    redirect("/admin/items");
}