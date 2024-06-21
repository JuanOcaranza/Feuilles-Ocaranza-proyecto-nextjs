import { getRecentSales } from "@/lib/data/sales";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { SaleWithResume } from "@/lib/definitions";
import { formatCurrency } from "@/lib/utils";

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
                        <div className="ml-auto font-medium">+{formatCurrency(sale.boxesAmmount)}</div>
                    </div>
                ))}
            </CardContent>
        </>
    )
}