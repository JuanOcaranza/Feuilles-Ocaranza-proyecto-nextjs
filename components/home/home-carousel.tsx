import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import BoxCard from "@/components/products/box-card";
import { getFeaturedBoxes } from '@/lib/data/boxes';

export default async function HomeCarousel() {
    const featuredBoxes = await getFeaturedBoxes();

    return (
        <div className="w-full my-6">
            <h1 className="text-3xl mb-4 hidden md:block">Featured</h1>
            <Carousel className="w-full items-center">
                <CarouselContent className="-ml-1 gap-4">
                        {featuredBoxes.map(box => (
                            <CarouselItem key={box.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                                <BoxCard box={box} />
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}