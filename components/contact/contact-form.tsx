"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useFormState } from "react-dom";
import { createMessage } from "@/lib/actions/contact";
import ItemErrors from "../admin/forms/item-errors";
import FormError from "@/components/admin/forms/form-error"
import { useEffect } from "react";

const initialState = {
    errors: {},
    message: ""
}

export default function ContactForm() {
    const [state, formAction] = useFormState(createMessage, initialState);

    return (
        <Card className="md:mx-auto w-full max-w-[700px] p-6 my-14 mx-1 rounded-md md:shadow-md border-2">
            <CardHeader>
                <CardTitle className="text-2xl mb-4">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                <div className="grid gap-4">
                    <div className="grid gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="mail@example.com"
                            className="w-full"
                            aria-describedby="email-error"
                        />
                        <ItemErrors id="email-error" errors={state?.errors?.email} />
                    </div>
                    <div className="grid gap-4 mt-4">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" name="message" className="w-full h-40" aria-describedby="message-error"/>
                        <ItemErrors id="message-error" errors={state?.errors?.message} />
                    </div>
                    <FormError message={state?.message} />
                    <Button type="submit" className="w-full h-10 mt-4">
                        Send
                    </Button>
                </div>
                </form>
            </CardContent>
        </Card>
    )
}
