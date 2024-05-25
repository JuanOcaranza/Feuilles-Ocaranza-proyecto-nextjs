import { Box } from '@/lib/definitions';

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
    .then(data => Array.isArray(data) ? data.map((item : apiBox) => ({...item, products: generateRandomProducts(), categories: generateRandomCategories()})) : []);
}

export async function getFilteredBoxes(query: string, currentPage: number, category: string) : Promise<Array<Box>> {
    return await fetch(`https://6633d985f7d50bbd9b4ae178.mockapi.io/api/boxes?search=${query}&page=${currentPage}&limit=12`)
    .then(res => res.json())
    .then(data => Array.isArray(data) ? data.map((item : apiBox) => ({...item, products: generateRandomProducts(), categories: generateRandomCategories()})).filter((box) => category === '' || box.categories.includes(category)) : []);
}
    

function generateRandomProducts() : Array<{id: string, probability: number}> {
    return Array.from({length: 10}, () => ({id: Math.round(Math.random() * 50).toString(), probability: Math.random()}));
}

function generateRandomCategories() : Array<string> {
    return Array.from({length: 3}, () => Math.round(Math.random() * 10).toString());
}