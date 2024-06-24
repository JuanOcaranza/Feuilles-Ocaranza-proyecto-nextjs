import { getCategories } from "@/lib/data/categories"


export async function GET() {
    const categories = await getCategories()
    return new Response(JSON.stringify({ categories }), { status: 200 })
}