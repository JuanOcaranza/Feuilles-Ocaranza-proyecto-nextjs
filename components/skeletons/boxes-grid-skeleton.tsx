import BoxCardSkeleton from "@/components/skeletons/box-card-skeleton";

export default function BoxesGridSkeleton(){
    return (
        <div className="mt-6 flow-root">
            <div className="rounded-lg p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {[1, 2, 3, 4].map((id) => <BoxCardSkeleton key={id} />)}
            </div>
        </div>
    );
}
