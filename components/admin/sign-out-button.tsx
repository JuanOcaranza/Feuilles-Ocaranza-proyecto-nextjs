"use client"

import { logOut } from "@/lib/actions/authentication";
import { useTransition } from "react";


export default function SignOutButton() {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(async () => {
            await logOut();
        });
    };

    return (
        <button onClick={onClick} disabled={isPending}>
            Sign Out
        </button>
    );
}
