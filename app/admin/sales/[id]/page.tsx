import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getSaleById } from "@/lib/data/sales"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    MoreVertical,
    TicketIcon,
    Truck,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sale',
};


export default async function Page({ params }: { params: { id: number } }) {
    const data = await getSaleById(params.id)

    const total = data ? data?.boxes.map((box) => box.price * box.quantity).reduce((a, b) => a + b, 0) : 0
    const shippingCost = 0
    const tax = 0
    const grandTotal = total + shippingCost + tax

    return (
        <>
            <main>
                <div>
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-01-chunk-0"
                    >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    Sale {params.id}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only">Copy Sale ID</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription> Date: {data ? data.createdAt.toDateString() : ""} </CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <TicketIcon size={24} strokeWidth={1.5} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">Sale Details</div>
                                <ul key={data?.id} className="grid gap-3">
                                    {data?.boxes.map((box) => (
                                        <li key={box.box.id} className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                {box.box.name}<span> x {box.quantity}</span>
                                            </span>
                                            <span>{formatCurrency(box.price * box.quantity)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{data ? formatCurrency(total) : ""}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{formatCurrency(shippingCost)}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>{formatCurrency(tax)}</span>
                                    </li>
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">Total</span>
                                        <span>{formatCurrency(grandTotal)}</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}