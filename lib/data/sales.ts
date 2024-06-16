import { db } from '@/drizzle/db';
import { saleBoxes, saleItems, sales } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { newSale, Sale, SaleBox, SaleItem, SaleWithRelations } from '@/lib/definitions';

export async function getSaleById(id: number): Promise<Sale | null> {
    const sale = await db.query.sales.findFirst({
        where: eq(sales.id, id),
        with: {
            saleItems: {
                with: {
                    item: true
                }
            }
        }
    });

    if (!sale) {
        return null;
    }

    return mapSale(sale);
}

const mapSale = (sale: SaleWithRelations): Sale => ({
    ...sale,
    items: sale.saleItems.map((saleItem) => ({
        item: saleItem.item,
        quantity: saleItem.quantity
    }))
});

export async function insertSale(sale: newSale, boxes: Array<SaleBox>, items: Array<SaleItem>) {
    await db.insert(sales).values(sale)

    await Promise.all([
        boxes.map((async (saleBox) => await db.insert(saleBoxes).values(saleBox))),
        items.map((async (saleItem) => await db.insert(saleItems).values(saleItem)))
    ])
}
