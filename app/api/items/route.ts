import { getItems } from "@/lib/data/items"


export async function GET() {
    const items = await getItems()
    
    return new Response(JSON.stringify({ items }), { status: 200 })
}