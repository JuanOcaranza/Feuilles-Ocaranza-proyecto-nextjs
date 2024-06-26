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
import { Category } from "@/lib/definitions"
import { useEffect, useState } from "react"

export default function CategoriesCombobox({ categories, value, setValue}: { categories: Category[], value: number | null, setValue: (itemId: number | null) => void }) {
    const [open, setOpen] = useState(false)
    const [selectedName, setSelectedName] = useState<string | null>(null)

    useEffect(() => {
        if (value) {
            setSelectedName(categories.find((category) => category.id === value)?.name || null)
        }
    }, [])

    useEffect(() => {
        if (selectedName) { 
            setValue(categories.find((category) => category.name === selectedName)?.id || null)
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
                        <p className="overflow-hidden text-ellipsis">{categories.find((category) => category.name === selectedName)?.name}</p>
                    : 
                        `Select category...`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search category...`} />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={(currentName) => {
                                        setSelectedName(currentName === selectedName ? null : currentName)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === category.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <p className="overflow-hidden text-ellipsis">{category.name}</p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}