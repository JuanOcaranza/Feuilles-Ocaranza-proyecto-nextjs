import { CardContent, CardHeader } from "../ui/card";

export default function AnalyticCardSkeleton() {
    return (
        <div className=" rounded-lg border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
                <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
        </div>
    );
}