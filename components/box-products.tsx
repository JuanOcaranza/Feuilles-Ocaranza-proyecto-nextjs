import { Item } from "@/lib/definitions";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import ProductHover from "@/components/product-hover";

export default function BoxProducts({ products } : { products: Array<Item> }) {
    return (
        <div className="w-full">
            <h1 className="text-3xl mb-4 hidden md:block">Possible rewards</h1>
            <Carousel>
                <CarouselContent>
                {products.map(product => (
                    <CarouselItem key={product.id} className="basis-1/3 md:basis-1/5">
                        <ProductHover product={product} />
                    </CarouselItem>
                ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:block" />
                <CarouselNext className="hidden md:block" />
            </Carousel>
        </div>
    )
}