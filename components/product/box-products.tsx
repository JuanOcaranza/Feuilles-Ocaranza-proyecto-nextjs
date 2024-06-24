
import { Item } from "@/lib/definitions";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import CldImage from "../ui/CldImage";

export default function BoxProducts({ products }: { products: Array<Item> }) {
    return (
        <div className="w-full">
            <h1 className="text-xl mb-2">Possible rewards:</h1>
            <Carousel className="w-full items-center">
                <CarouselContent className="-ml-1 gap-4">
                    {products.map(product => (
                        <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <Link key={product.id} href={`/items/${product.id}`}>
                                <CldImage src={product.imageUrl} alt={product.name + ' image'} width={400} height={400} crop={"fill"} />
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext className="hidden md:flex"/>
            </Carousel>
        </div>
    )
}