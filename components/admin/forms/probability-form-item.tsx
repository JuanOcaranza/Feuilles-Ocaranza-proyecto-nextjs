import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DicesIcon } from "lucide-react";

export default function ProbabilityFormItem({ probability, setProbability }: { probability: number, setProbability: (probability: number) => void }) {
    const handleKeydown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    return (
        <div className="self-end mt-1 sm:mt-0">
            <Label htmlFor="probability" className="sr-only">
                Probability
            </Label>
            <div className="relative rounded-md">
                <Input
                    id="probability"
                    name="probability"
                    type="number"
                    min="0.01"
                    max="1"
                    step="0.01"
                    value={probability}
                    onChange={(e) => setProbability(Number(e.target.value))}
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    onKeyDown={handleKeydown}
                    required
                />
                <DicesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>
    )
}