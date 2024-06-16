import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoxIcon } from "lucide-react";
import ItemErrors from "@/components//admin/forms/item-errors";

export default function NameFormItem({ errors }: { errors?: string[] }) {
    return (
        <div className="mb-4">
            <Label htmlFor="name">
                Name
            </Label>
            <div className="relative mt-2 rounded-md">
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="name-error"
                    required
                >
                </Input>
                <BoxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ItemErrors id="name-error" errors={errors} />
        </div>
    )
}