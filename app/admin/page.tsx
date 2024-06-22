import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Suspense } from 'react';
import AnalyticCardSkeleton from "@/components/skeletons/analytic-card-skeleton";
import BarChartSkeleton from "@/components/skeletons/bar-chart-skeleton";
import { RecentSalesCardSkeleton } from "@/components/skeletons/recent-sales-card-skeleton";

export default async function Admin() {
    const response = (await getResumePerMonth()).reverse()

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex min-h-screen w-full flex-col">
                <main className="flex flex-1 flex-col gap-4 md:gap-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Suspense key={ response.length } fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-0">
                                <AnalyticCard
                                    title="Total Revenue"
                                    type={"revenue"}
                                    value={response[0]?.profit ? formatCurrency(response[0].profit) : '0'}
                                    percentage={response[0]?.profit && response[1].profit ? calculatePercentageChange(response[1].profit, response[0].profit) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key={ response.length } fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-1">
                                <AnalyticCard
                                    title="Sold Products"
                                    type={"productsSold"}
                                    value={response[0]?.productsSold ? response[0].productsSold.toString() : '0'}
                                    percentage={response[0]?.productsSold && response[1].productsSold ? calculatePercentageChange(response[1].productsSold, response[0].productsSold) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key={ response.length} fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-2">
                                <AnalyticCard
                                    title="Sales"
                                    type={"sales"}
                                    value={response[0]?.sales ? response[0]?.sales.toString() : '0'}
                                    percentage={response[1]?.sales && response[0]?.sales ? calculatePercentageChange(response[1].sales, response[0].sales) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key={null} fallback={<AnalyticCardSkeleton />}> {/* TODO: Recordar cambiar la key */}
                            <Card x-chunk="dashboard-01-chunk-3">
                                <AnalyticCard
                                    title="Active Offers"
                                    type={"offers"}
                                    value={"33"}
                                    percentage={"+18%"}
                                />
                            </Card>
                        </Suspense>
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="hidden md:block xl:col-span-2">
                            <Card x-chunk="dashboard-01-chunk-4">
                                <CardHeader>
                                    <CardTitle>Revenue Per Month</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Suspense key={response.length} fallback={<BarChartSkeleton />}>
                                        <BarChart data={response} className="w-full h-full" />
                                    </Suspense>
                                </CardContent>
                            </Card>
                        </div>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <Suspense fallback={<RecentSalesCardSkeleton />}>
                                <RecentSalesCard />
                            </Suspense>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
