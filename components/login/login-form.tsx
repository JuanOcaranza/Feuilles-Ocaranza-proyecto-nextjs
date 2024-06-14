"use client"

import { useFormState } from "react-dom";
import LoginButton from "@/components/login/login-button";
import { authenticate } from '@/lib/actions';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return <form action={dispatch}>
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            required />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" name="password" minLength={5} required />
                    </div>
                    <LoginButton />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </form>;
}