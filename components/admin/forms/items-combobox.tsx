"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ComboBoxItem } from "@/lib/definitions"
import { useEffect, useState } from "react"
import CldImage from "@/components/ui/CldImage"

export default function ItemsCombobox({ items, value, setValue, itemName }: { items: ComboBoxItem[], value: number | null, setValue: (itemId: number | null) => void, itemName: string }) {
    const [open, setOpen] = useState(false)
    const [selectedName, setSelectedName] = useState<string | null>(null)

    useEffect(() => {
        if (value) {
            setSelectedName(items.find((item) => item.id === value)?.name || null)
        }
    }, [])

    useEffect(() => {
        if (selectedName) {
            setValue(items.find((item) => item.name === selectedName)?.id || null)
        }
        else {
            setValue(null)
        }
    }, [selectedName])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedName
                    ?
                        <ImageAndName item={items.find((item) => item.name === selectedName)!} />
                    : 
                        `Select ${itemName}...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${itemName}...`} />
                    <CommandList>
                        <CommandEmpty>No {itemName} found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.id}
                                    value={item.name}
                                    onSelect={(currentName) => {
                                        setSelectedName(currentName === selectedName ? null : currentName)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <ImageAndName item={item} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

function ImageAndName({ item }: { item: ComboBoxItem }) {
    return (
        <div className="flex gap-2 items-center overflow-hidden text-ellipsis">
            <CldImage className="flex-shrink-0" src={item.imageUrl} alt={item.name} width={24} height={24} />
            {item.name}
        </div>
    )
}