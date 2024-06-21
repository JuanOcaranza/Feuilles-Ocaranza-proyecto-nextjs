import { CardContent, CardHeader, CardTitle } from "../ui/card";

export function RecentSalesCardSkeleton() {
    return (
        <>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="grid gap-1">
                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="ml-auto w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </CardContent>
        </>
    );
}