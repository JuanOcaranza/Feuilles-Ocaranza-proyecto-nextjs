export default function HomeCarouselsSkeleton() {
    return (
        <div className="w-full my-6 relative flex flex-col items-center justify-center">
            <BoxesCarouselSkeleton />
            {Array.from({ length: 1 }).map((_, index) => (
                <BoxesCarouselSkeleton key={index} hasFinishDate={true} />
            ))}
        </div>
    );
}

function BoxesCarouselSkeleton({ hasFinishDate }: { hasFinishDate?: boolean }) {
    return (
        <div className="w-full my-6 relative flex flex-col items-center justify-center container animate-pulse">
            <div className="flex flex-col md:flex-row w-full justify-between items-center mb-4">
                <div className="h-10 bg-gray-300 rounded md:w-1/6 w-1/4"></div>
                {hasFinishDate && <div className="h-8 bg-gray-300 rounded md:w-1/6 w-1/4"></div>}
            </div>
            <div className="relative w-[98%]">
                <div className="flex gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonBoxCard key={index} className="hidden sm:block" />
                    ))}
                    <SkeletonBoxCard className="block sm:hidden" />
                </div>
            </div>
        </div>
    );
}

function SkeletonBoxCard({ className }: { className?: string }) {
    return (
        <div className={`bg-gray-200 rounded shadow-sm w-full ${className}`}>
            <div className="w-full h-64 bg-gray-300 rounded-t"></div>
            <div className="p-4 w-full md:gap-0 gap-y-4">
                <div className="h-10 bg-gray-300 rounded md:w-3/4 mb-2 w-4/5"></div>
                <div className="h-6 bg-gray-300 rounded md:w-1/2 w-3/5"></div>
            </div>
            <div className="p-4">
                <div className="h-10 bg-gray-300 rounded md:w-3/4 sm:h-8 w-4/5"></div>
            </div>
        </div>
    );
}
