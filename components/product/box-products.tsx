import { Item } from "@/lib/definitions";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import ProductHover from "@/components/product/product-hover";

export default function BoxProducts({ products }: { products: Array<Item> }) {
    return (
        <div className="w-full">
            <h1 className="text-xl mb-2">Possible rewards:</h1>
            <Carousel className="w-full items-center">
                <CarouselContent className="-ml-1 gap-4">
                    {products.map(product => (
                        <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <ProductHover product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        </div>
    )
}