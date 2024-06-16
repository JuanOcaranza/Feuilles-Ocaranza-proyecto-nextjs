import { FaceFrownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Missing({ missingThing, backLink }: { missingThing: string, backLink: string }) {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">Not found</h2>
            <p>Could not find the requested {missingThing}.</p>
            <Link href={backLink} className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600>">
                Go Back
            </Link>
        </div>
    )
}