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
    const shippingCost = 25
    const tax = total * 0.16
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
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Shipping Information</div>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        <span>Liam Johnson</span>
                                        <span>1234 Main St.</span>
                                        <span>Anytown, CA 12345</span>
                                    </address>
                                </div>
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">Billing Information</div>
                                    <div className="text-muted-foreground">
                                        Same as shipping address
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Customer Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Customer</dt>
                                        <dd>Liam Johnson</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Email</dt>
                                        <dd>
                                            <a href="mailto:">liam@acme.com</a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Phone</dt>
                                        <dd>
                                            <a href="tel:">+1 234 567 890</a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Payment Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="flex items-center gap-1 text-muted-foreground">
                                            <CreditCard className="h-4 w-4" />
                                            Visa
                                        </dt>
                                        <dd>**** **** **** 4532</dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}