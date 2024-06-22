import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import BoxCard from "@/components/products/box-card";
import { getFeaturedBoxes } from '@/lib/data/boxes';

export default async function HomeCarousel() {
    const featuredBoxes = await getFeaturedBoxes();

    return (
        <div className="w-full">
            <h1 className="text-3xl mb-4 hidden md:block">Featured</h1>
            <Carousel>
                <CarouselContent>
                    {featuredBoxes.map(box => (
                        <CarouselItem key={box.id} className=" basis-full md:basis-1/2 lg:basis-1/4">
                            <BoxCard box={box} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:block" />
                <CarouselNext className="hidden md:block" />
            </Carousel>
        </div>
    )
}