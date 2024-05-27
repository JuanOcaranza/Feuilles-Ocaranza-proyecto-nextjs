export type Box = {
    id: string
    name: string
    description: string
    image: string
    price: number
    categories: Array<string>
}

export type Product = {
    id: string
    name: string
    description: string
    image: string
    price: number
}

export type User = {
    id: string
    name: string
    email: string
    password: string
}