import { FaceFrownIcon } from "@heroicons/react/24/outline"

export default function SomethingWrong({ onClick }: { onClick: () => void }) {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-center">Something went wrong!</h2>
            <button className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600" onClick={onClick}>Try again</button>
        </div>
    )
}