import { db } from '@/drizzle/db';
import { saleBoxes, saleItems, sales } from '@/drizzle/schema';
import { eq, count, gte, and, lte } from 'drizzle-orm';
import { NewSale, Sale, SaleBox, SaleItem, SaleWithRelations, SaleWithBoxes, SaleWithAmmountAndQuantity } from '@/lib/definitions';

const SALES_PER_PAGE = 12;

export async function getSaleById(id: number): Promise<Sale | null> {
    const sale = await db.query.sales.findFirst({
        where: eq(sales.id, id),
        with: {
            saleItems: {
                with: {
                    item: true
                }
            },
            saleBoxes: {
                with: {
                    box: true
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
    })),
    boxes: sale.saleBoxes.map((saleBox) => ({
        box: saleBox.box,
        price: saleBox.price,
        quantity: saleBox.quantity
    }))
});

const amountSale = (sale: SaleWithBoxes): number => sale.saleBoxes.reduce((acc, box) => acc + box.price * box.quantity, 0);
const quantitySale = (sale: SaleWithBoxes): number => sale.saleBoxes.reduce((acc, box) => acc + box.quantity, 0);

const mapSaleWithBoxes = (sale: SaleWithBoxes): SaleWithAmmountAndQuantity => ({
    ...sale,
    ammount: amountSale(sale),
    quantity: quantitySale(sale)
});

export async function insertSale(sale: NewSale, boxes: Array<SaleBox>, items: Array<SaleItem>) {
    await db.insert(sales).values(sale)

    await Promise.all([
        boxes.map((async (saleBox) => await db.insert(saleBoxes).values(saleBox))),
        items.map((async (saleItem) => await db.insert(saleItems).values(saleItem)))
    ])
}

export async function getSalesTotalPages(): Promise<number> {
    const response = await db
        .select({ value: count(sales.id) })
        .from(sales);

    return Math.ceil(response[0].value / SALES_PER_PAGE);
}

export async function getFilteredSalesTotalPages(startDate: Date, endDate: Date): Promise<number> {
    const response = await db
        .select({ value: count(sales.id) })
        .from(sales)
        .where(and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate)));

    return Math.ceil(response[0].value / SALES_PER_PAGE);
}

export async function getSales(currentPage: number): Promise<Array<SaleWithAmmountAndQuantity>> {
    const response = await db.query.sales.findMany({
        offset: (currentPage - 1) * SALES_PER_PAGE,
        limit: SALES_PER_PAGE,
        with: {
            saleBoxes: true
        }
    });

    return response.map((saleBox) => mapSaleWithBoxes(saleBox));
}

export async function getFilteredSales(currentPage: number, startDate: Date, endDate: Date): Promise<Array<SaleWithAmmountAndQuantity>> {
    const response = await db.query.sales.findMany({
        offset: (currentPage - 1) * SALES_PER_PAGE,
        limit: SALES_PER_PAGE,
        where: and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate)),
        with: {
            saleBoxes: true
        }
    });

    return response.map((saleBox) => mapSaleWithBoxes(saleBox));
}