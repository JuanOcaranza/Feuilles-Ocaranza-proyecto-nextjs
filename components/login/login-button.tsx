"use client"

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in
        </Button>
    );
}