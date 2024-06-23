import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import BoxCard from "@/components/products/box-card";
import { getFeaturedBoxes } from '@/lib/data/boxes';

export default async function HomeCarousel() {
    const featuredBoxes = await getFeaturedBoxes();

    return (
        <div className="w-full my-6 relative flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-4 hidden md:block w-full text-left">Featured</h1>
            <div className="relative w-[98%]">
                <Carousel className="w-full items-center">
                    <CarouselContent className="-ml-1 gap-4">
                            {featuredBoxes.map(box => (
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