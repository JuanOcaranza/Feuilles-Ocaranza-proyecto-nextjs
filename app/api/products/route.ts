import { getBoxes } from "@/lib/data/boxes";

export async function GET() {
    const products = await getBoxes()

    return Response.json({ products })
}