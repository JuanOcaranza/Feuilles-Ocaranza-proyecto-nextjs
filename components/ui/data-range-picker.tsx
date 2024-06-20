"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [date, setDate] = React.useState<DateRange | undefined>(
        searchParams.has("from") && searchParams.has("to") ?
        {
            from: new Date(searchParams.get("from")!.toString()),
            to: new Date(searchParams.get("to")!.toString())
        }
        : undefined
    );

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (date && date.from && date.to) {
            params.set('from', date.from.toDateString())
            params.set('to', date.to.toDateString())
        } else {
            params.delete('from')
            params.delete('to')
        }
        replace(`${pathname}?${params.toString()}`);
    }, [date])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
