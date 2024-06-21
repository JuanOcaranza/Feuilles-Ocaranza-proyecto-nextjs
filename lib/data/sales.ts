import { db } from '@/drizzle/db';
import { saleBoxes, saleItems, sales } from '@/drizzle/schema';
import { eq, count, gte, and, lte, sum, sql } from 'drizzle-orm';
import { NewSale, Sale, SaleBox, SaleItem, SaleWithRelations, SaleWithSaleBoxesAndItems, SaleWithResume, DataResume } from '@/lib/definitions';

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
        quantity: saleItem.quantity,
        price: saleItem.price
    })),
    boxes: sale.saleBoxes.map((saleBox) => ({
        box: saleBox.box,
        price: saleBox.price,
        quantity: saleBox.quantity
    }))
});

const boxesAmmount = (sale: SaleWithSaleBoxesAndItems): number => sale.saleBoxes.reduce((acc, box) => acc + box.price * box.quantity, 0);
const itemsAmmount = (sale: SaleWithSaleBoxesAndItems): number => sale.saleItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const quantitySale = (sale: SaleWithSaleBoxesAndItems): number => sale.saleBoxes.reduce((acc, box) => acc + box.quantity, 0);

const mapSaleWithBoxes = (sale: SaleWithSaleBoxesAndItems): SaleWithResume => {
    const boxesAmmountResult = boxesAmmount(sale);

    return {
        ...sale,
        boxesAmmount: boxesAmmountResult,
        quantity: quantitySale(sale),
        profit: boxesAmmountResult - itemsAmmount(sale)
    }
};

export async function insertSale(sale: NewSale, boxes: Array<SaleBox>, items: Array<SaleItem>) {
    await db.insert(sales).values(sale)

    await Promise.all([
        boxes.map((async (saleBox) => await db.insert(saleBoxes).values(saleBox))),
        items.map((async (saleItem) => await db.insert(saleItems).values(saleItem)))
    ])
}

export async function getSalesResume(): Promise<{
    pages: number,
    boxes: number,
    total: number,
    profit: number
}> {
    const responseBoxes = await db
        .select({ 
            count: count(sales.id),
            boxes: sum(saleBoxes.quantity),
            total: sql<number>`sum(${saleBoxes.price} * ${saleBoxes.quantity})`,
        })
        .from(sales)
        .leftJoin(saleBoxes, eq(sales.id, saleBoxes.saleId));
    
    const responseItems = await db
        .select({ 
            total: sql<number>`sum(${saleItems.price} * ${saleItems.quantity})`,
        })
        .from(sales)
        .leftJoin(saleItems, eq(sales.id, saleItems.saleId));

    return {
        pages: Math.ceil(responseBoxes[0].count / SALES_PER_PAGE),
        boxes: parseInt(responseBoxes[0].boxes ?? "0"),
        total: responseBoxes[0].total ?? 0,
        profit: (responseBoxes[0].total - responseItems[0].total) ?? 0
    }

}

export async function getFilteredSalesResume(startDate: Date, endDate: Date): Promise<{
    pages: number,
    boxes: number,
    total: number,
    profit: number
}> {
    const responseBoxes = await db
        .select({ 
            count: count(sales.id),
            boxes: sum(saleBoxes.quantity),
            total: sql<number>`sum(${saleBoxes.price} * ${saleBoxes.quantity})`,
        })
        .from(sales)
        .leftJoin(saleBoxes, eq(sales.id, saleBoxes.saleId))
        .where(and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate)));
    
    const responseItems = await db
        .select({ 
            total: sql<number>`sum(${saleItems.price} * ${saleItems.quantity})`,
        })
        .from(sales)
        .leftJoin(saleItems, eq(sales.id, saleItems.saleId))
        .where(and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate)));

    return {
        pages: Math.ceil(responseBoxes[0].count / SALES_PER_PAGE),
        boxes: parseInt(responseBoxes[0].boxes ?? "0"),
        total: responseBoxes[0].total ?? 0,
        profit: (responseBoxes[0].total - responseItems[0].total) ?? 0
    }
}

export async function getSales(currentPage: number): Promise<Array<SaleWithResume>> {
    const response = await db.query.sales.findMany({
        offset: (currentPage - 1) * SALES_PER_PAGE,
        limit: SALES_PER_PAGE,
        with: {
            saleBoxes: true,
            saleItems: true
        }
    });

    return response.map((saleBox) => mapSaleWithBoxes(saleBox));
}

export async function getFilteredSales(currentPage: number, startDate: Date, endDate: Date): Promise<Array<SaleWithResume>> {
    const response = await db.query.sales.findMany({
        offset: (currentPage - 1) * SALES_PER_PAGE,
        limit: SALES_PER_PAGE,
        where: and(gte(sales.createdAt, startDate), lte(sales.createdAt, endDate)),
        with: {
            saleBoxes: true,
            saleItems: true
        }
    });

    return response.map((saleBox) => mapSaleWithBoxes(saleBox));
}

export async function getResumePerMonth(): Promise<Array<DataResume>> {
    const response = await db
        .select({
            month: sql<string>`to_char(${sales.createdAt}, 'YYYY-MM')`,
            boxProfit: sql<number>`sum(${saleBoxes.price} * ${saleBoxes.quantity})`,
            itemCost: sql<number>`sum(${saleItems.price} * ${saleItems.quantity})`,
            products: sql<number>`sum(${saleBoxes.quantity})`,
            sales: sql<number>`count(${sales.id})`
        })
        .from(sales)
        .leftJoin(saleBoxes, eq(sales.id, saleBoxes.saleId))
        .leftJoin(saleItems, eq(sales.id, saleItems.saleId))
        .groupBy(sql`to_char(${sales.createdAt}, 'YYYY-MM')`);

    const profitByMonth = response.map(row => ({
        month: row.month,
        profit: row.boxProfit - row.itemCost,
        productsSold: row.products ?? 0,
        sales: row.sales
    }));

    return profitByMonth;
}

export async function getRecentSales({ limit = 5 }: { limit?: number } = {}): Promise<Array<SaleWithResume>> {
    const response = await db.query.sales.findMany({
        limit: limit,
        with: {
            saleBoxes: true,
            saleItems: true
        }
    });
    return response.map((sale) => mapSaleWithBoxes(sale));    
}