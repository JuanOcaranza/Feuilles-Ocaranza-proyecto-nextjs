import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BarChart from "@/components/admin/bar-chart"
import { getResumePerMonth } from "@/lib/data/sales"
import { formatCurrency, calculatePercentageChange } from "@/lib/utils";
import RecentSalesCard from "@/components/admin/recent-sales-card";
import AnalyticCard from "@/components/admin/analytic-card";
import { Suspense } from 'react';
import AnalyticCardSkeleton from "@/components/skeletons/analytic-card-skeleton";
import BarChartSkeleton from "@/components/skeletons/bar-chart-skeleton";
import { RecentSalesCardSkeleton } from "@/components/skeletons/recent-sales-card-skeleton";
import { getActiveOffersPerMonth } from "@/lib/data/offers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Admin() {
    const [resumeResponse, offersResponse] = await Promise.all([
        getResumePerMonth(),
        getActiveOffersPerMonth()
    ]);

    const response = resumeResponse.reverse();
    const responseOffers = offersResponse.reverse();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex min-h-screen w-full flex-col">
                <main className="flex flex-1 flex-col gap-4 md:gap-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Suspense key="totalRevenueSuspense" fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-0">
                                <AnalyticCard
                                    title="Total Revenue"
                                    type={"revenue"}
                                    value={response[0]?.profit ? formatCurrency(response[0].profit) : '0'}
                                    percentage={response[0]?.profit && response[1].profit ? calculatePercentageChange(response[1].profit, response[0].profit) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key="productsSoldSuspense" fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-1">
                                <AnalyticCard
                                    title="Sold Products"
                                    type={"productsSold"}
                                    value={response[0]?.productsSold ? response[0].productsSold.toString() : '0'}
                                    percentage={response[0]?.productsSold && response[1].productsSold ? calculatePercentageChange(response[1].productsSold, response[0].productsSold) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key="salesSuspense" fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-2">
                                <AnalyticCard
                                    title="Sales"
                                    type={"sales"}
                                    value={response[0]?.sales ? response[0]?.sales.toString() : '0'}
                                    percentage={response[1]?.sales && response[0]?.sales ? calculatePercentageChange(response[1].sales, response[0].sales) : '0'}
                                />
                            </Card>
                        </Suspense>
                        <Suspense key="offersSuspense" fallback={<AnalyticCardSkeleton />}>
                            <Card x-chunk="dashboard-01-chunk-3">
                                <AnalyticCard
                                    title="Active Offers"
                                    type={"offers"}
                                    value={responseOffers[0]?.count ? responseOffers[0].count.toString() : '0'}
                                    percentage={responseOffers[1]?.count && responseOffers[0]?.count ? calculatePercentageChange(responseOffers[1].count, responseOffers[0].count) : '0'}
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
                                    <Suspense key="barChartSuspense" fallback={<BarChartSkeleton />}>
                                        <BarChart data={response} className="w-full h-full" />
                                    </Suspense>
                                </CardContent>
                            </Card>
                        </div>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <Suspense key="recentSalesCardSuspense" fallback={<RecentSalesCardSkeleton />}>
                                <RecentSalesCard />
                            </Suspense>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
