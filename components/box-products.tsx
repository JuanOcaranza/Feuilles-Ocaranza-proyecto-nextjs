import { Product } from "@/lib/definitions";
import { ScrollArea } from "@/components/scroll-area";
import ProductHover from "@/components/product-hover";

export default function BoxProducts({ products } : { products: Array<Product> }) {
    return (
        <ScrollArea className="lg:w-[800px] lg:h-[800px] ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {products.map(product => (
                <>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                <div key={product.id} className="w-full">
                    <ProductHover product={product} />
                </div>
                </>
            ))}
            </div>
        </ScrollArea>
    )
}