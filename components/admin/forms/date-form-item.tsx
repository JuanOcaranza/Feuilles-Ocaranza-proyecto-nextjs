import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDaysIcon } from "lucide-react";
import ItemErrors from "@/components//admin/forms/item-errors";
import { formatDateToLocalInputString } from "@/lib/utils";

export default function DateFormItem({ label, id, errors, defaultValue }: { label: string, id: string, errors?: string[], defaultValue?: Date }) {
    const handleKeydown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    return (
        <div className="mb-4">
            <Label htmlFor="name">
                {label}
            </Label>
            <div className="relative mt-2 rounded-md">
                <Input
                    id={id}
                    name={id}
                    type="datetime-local"
                    className="peer block w-[250px] rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby={`${id}-error`}
                    required
                    defaultValue={formatDateToLocalInputString(defaultValue)}
                    onKeyDown={handleKeydown}
                >
                </Input>
                <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ItemErrors id={`${id}-error`} errors={errors} />
        </div>
    )
}