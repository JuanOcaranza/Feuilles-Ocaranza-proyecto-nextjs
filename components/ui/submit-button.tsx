"use client"

import { useFormStatus } from "react-dom"
import clsx from "clsx"

export function SubmitButton({ className } : { className?: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className={clsx("px-4 py-2 rounded-lg text-sm font-medium bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black", className)}
            aria-disabled={pending}
        >
            {pending ? "Submitting..." : "Submit"}
        </button>
    )
}