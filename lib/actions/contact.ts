"use server"

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import insertMessage from '@/lib/data/messages';

export type State = {
    errors?: {
        email?: string[];
        message?: string[];
    };
    message?: string;
};

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email." }),
    message: z.string().min(1, { message: "Message is required." }),
});

export async function createMessage(prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        email: formData.get("email"),
        message: formData.get("message")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to send message."
        };
    }

    const { email, message } = validatedFields.data;
    
    try {
        await insertMessage({
            email,
            message});
    } catch (error) {
        return {
            message: "Database error. Failed to send message."
        };
    }

    revalidatePath("/contact");
    redirect("/contact");
}
