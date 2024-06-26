import { getRecentSales } from "@/lib/data/sales";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { SaleWithResume } from "@/lib/definitions";
import { formatCurrency } from "@/lib/utils";
import clsx from "clsx";

export default async function RecentSalesCard() {
    const sales: Array<SaleWithResume> = await getRecentSales();

    return (
        <>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {sales.map((sale, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                ID: {sale.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Quantity: {sale.quantity}
                            </p>
                        </div>
                        <div className={clsx("whitespace-nowrap px-3 py-3", { "text-red-500": sale.profit < 0, "text-green-500": sale.profit > 0 })}>
                            {sale.profit > 0 && <span>+</span>}{formatCurrency(sale.profit)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </>
    )
}