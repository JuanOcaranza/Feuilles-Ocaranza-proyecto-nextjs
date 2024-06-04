import Link from "next/link";
import { Box } from "@/lib/definitions";
import Image from "next/image";

export default function BoxCard({ box } : { box: Box }) {
    return (
        <Link
            href={`/products/${box.id}`}
        >
            <div className="card h-full card-normal bg-orange-200 m-2 shadow-md">
                <figure><Image src={box.image} alt={box.name + ' image'} width={600} height={600} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{box.name}</h2>
                    <p>{box.description}</p>
                    <div className="card-actions justify-end">
                        <p className="text-xl font-bold">${box.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}