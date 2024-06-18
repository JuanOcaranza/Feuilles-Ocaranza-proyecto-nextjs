import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ItemErrors from "@/components/admin/forms/item-errors";

export default function DescriptionFormItem({ errors, defaultValue }: { errors?: string[], defaultValue?: string }) {
    return (
        <div className="mb-4">
            <Label htmlFor="description">
                Description
            </Label>
            <Textarea
                id="description"
                name="description"
                placeholder="Enter description"
                className="mt-2 w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
                required
                defaultValue={defaultValue}
            />
            <ItemErrors id="description-error" errors={errors} />
        </div>
    )
}