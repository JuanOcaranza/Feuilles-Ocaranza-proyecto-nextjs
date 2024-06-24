import { getBoxesOnly } from "@/lib/data/boxes";

export async function GET() {
    const products = await getBoxesOnly()

    return new Response(JSON.stringify({ products }), { status: 200 })
}