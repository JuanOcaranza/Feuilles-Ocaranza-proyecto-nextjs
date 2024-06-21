export default function BarChartSkeleton() {
    return (
        <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="flex space-x-2">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="h-6 bg-gray-200 rounded w-1/12"></div>
                ))}
            </div>
        </div>
    );
}