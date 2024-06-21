import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CreditCard,
    DollarSign,
    BoxIcon,
    TagIcon
} from "lucide-react"
import BarChart from "@/components/admin/bar-chart"
import { getResumePerMonth } from "@/lib/data/sales"
import { formatCurrency, calculatePercentageChange } from "@/lib/utils";
import RecentSalesCard from "@/components/admin/recent-sales-card";
import AnalyticCard from "@/components/admin/analytic-card";

export default async function Admin() {
    const response = (await getResumePerMonth()).reverse()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex min-h-screen w-full flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card x-chunk="dashboard-01-chunk-0">
                            <AnalyticCard 
                                title="Total Revenue" 
                                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} 
                                value={formatCurrency(response[0].profit)} 
                                percentage={calculatePercentageChange(response[1].profit, response[0].profit)} 
                            />
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-1">
                            <AnalyticCard 
                                title="Sold Products" 
                                icon={<BoxIcon className="h-4 w-4 text-muted-foreground" />} 
                                value={response[0].productsSold.toString()} 
                                percentage={calculatePercentageChange(response[1].productsSold, response[0].productsSold)} 
                            />
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-2">
                            <AnalyticCard 
                                title="Sales" 
                                icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} 
                                value={response[0].sales.toString()} 
                                percentage={calculatePercentageChange(response[1].sales, response[0].sales)} 
                            />
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-3">
                            <AnalyticCard 
                                title="Active Offers" 
                                icon={<TagIcon className="h-4 w-4 text-muted-foreground" />} 
                                value={"33"} 
                                percentage={"+18%"} 
                            />
                        </Card>
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="hidden md:block xl:col-span-2">
                            <Card x-chunk="dashboard-01-chunk-4">
                                <CardHeader>
                                    <CardTitle>Revenue Per Month</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <BarChart data={response} className="w-full h-80" />
                                </CardContent>
                            </Card>
                        </div>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <RecentSalesCard />
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
