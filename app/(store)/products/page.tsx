"use client"
import { useState } from 'react';
import Pagination from '../../ui/pagination';

const products = [
    {
        id: 1,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 2,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 3,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 4,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 5,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 6,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 7,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 8,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 9,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 10,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 11,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
    {
        id: 12,
        name: "Shoes",
        description: "If a dog chews shoes whose shoes does he choose?",
        image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    },
];

export default function Products() {
    const [selectedPage, setSelectedPage] = useState(1);

    const handlePageChange = (page: number) => {
        setSelectedPage(page);
        //TODO: Agregar lógica para cargar los productos correspondientes a la página seleccionada
        console.log(`Page changed to: ${page}`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <h1>Products</h1>
            <div className="grid m-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 flex-grow">
                {products.map((product) => (
                    <div key={product.id} className="card w-full bg-base-100 shadow-xl">
                        <figure>
                            <img src={product.image} alt={product.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>{product.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination totalPages={4} currentPage={selectedPage} onPageChange={handlePageChange} />
        </div>
    );
}
