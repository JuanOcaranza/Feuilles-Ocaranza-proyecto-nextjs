import { Box } from '@/lib/definitions';
import { Product } from '@/lib/definitions';
import { randomInt } from 'crypto';

type apiBox = {
    id: string,
    name: string,
    description: string,
    image: string,
    price: number
}

export async function getBoxes() : Promise<Array<Box>> {
    return await fetch('https://6633d985f7d50bbd9b4ae178.mockapi.io/api/boxes')
        .then(res => res.json())
        .then(data => Array.isArray(data) ? data.map((item : apiBox) => ({...item, categories: generateRandomCategories()})) : []);
}

export async function getFilteredBoxes(query: string, currentPage: number, category: string) : Promise<Array<Box>> {
    return await fetch(`https://6633d985f7d50bbd9b4ae178.mockapi.io/api/boxes?search=${query}&page=${currentPage}&limit=12`)
        .then(res => res.json())
        .then(data => Array.isArray(data) ? data.map((item : apiBox) => ({...item, categories: generateRandomCategories()})).filter((box) => category === '' || box.categories.includes(category)) : []);
}

function generateRandomCategories() : Array<string> {
    return Array.from({length: 3}, () => Math.round(Math.random() * 10).toString());
}

export async function getBoxById(id: string) : Promise<Box> {
    return await fetch(`https://6633d985f7d50bbd9b4ae178.mockapi.io/api/boxes/${id}`)
        .then(res => res.json())
        .then(data => data === "Not found" ? null : data);
}

export async function getProductsByBoxId(boxId: string) : Promise<Array<{product: Product, probability: number}>> {
    return await fetch(`https://6633d985f7d50bbd9b4ae178.mockapi.io/api/boxes/${boxId}/products`)
        .then(res => res.json())
        .then(data => Array.isArray(data) ? data.concat(data).concat(data).concat(data).concat(data) : []) // Simular muchos productos
        .then(data => Array.isArray(data) ? data.map((item : Product) => ({product: item, probability: Math.random()})) : []);
}

export async function getActiveDiscountByBoxId(boxId: string) : Promise<number> {
    return randomInt(0, 100);
}