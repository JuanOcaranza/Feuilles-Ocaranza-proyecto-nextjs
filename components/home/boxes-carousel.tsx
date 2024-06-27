import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import BoxCard from "@/components/products/box-card";
import { Box } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";

export default async function BoxesCarousel({ name, boxes, endDate }: { name: string, boxes: Box[], endDate?: Date }) {
return (
        <div className="w-full my-6 relative flex flex-col items-center justify-center container">
            <div className="flex flex-col md:flex-row w-full justify-between items-center mb-4">
                <h1 className="text-3xl">{name}</h1>
                {endDate && <h2 className="text-lg text-orange-500">Until {formatDateToLocal(endDate.toString())}</h2>}
            </div>
            <div className="relative w-[98%]">
                <Carousel className="w-full items-center">
                    <CarouselContent className="-ml-1 gap-4">
                            {boxes.map(box => (
                                <CarouselItem key={box.id} className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <BoxCard box={box} />
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -ml-10" />
                    <CarouselNext className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 -mr-10" />
                </Carousel>
            </div>
        </div>
    )
}