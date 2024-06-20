import { boxes, boxItems, categories, items, boxCategories, users, sales, saleItems, saleBoxes, groups } from "@/drizzle/schema"

export type Box = typeof boxes.$inferSelect & {
    items: Array<{ item: Item, probability: number }>
    categories: Array<Category>
}

export type BoxWithRelations = typeof boxes.$inferSelect & {
    boxItems: Array<BoxItem & {
        item: Item
    }>
} & {
    boxCategories: Array<boxCategory & {
        category: Category
    }>
}

export type Item = typeof items.$inferSelect;

export type BoxItem = typeof boxItems.$inferSelect;

export type Category = typeof categories.$inferSelect;

export type boxCategory = typeof boxCategories.$inferSelect;

export type Cart = {
    boxes: Array<{ boxId: number, quantity: number }>
}

export type User = typeof users.$inferSelect;

export type Sale = SaleOnly & {
    items: Array<{ item: Item, quantity: number }>,
    boxes: Array<{ box: BoxOnly, price: number, quantity: number }>
}

export type SaleWithSaleBoxesAndItems = SaleOnly & {
    saleBoxes: Array<SaleBox>,
    saleItems: Array<SaleItem>
}

export type SaleWithItems = SaleOnly & {
    items: Array<{ item: Item, quantity: number }>,
}

export type SaleOnly = typeof sales.$inferSelect;

export type SaleWithAmmountAndQuantity = SaleOnly & {
    boxesAmmount: number,
    quantity: number,
    profit: number
}

export type SaleItem = typeof saleItems.$inferSelect

export type SaleBox = typeof saleBoxes.$inferSelect

export type SaleWithRelations = typeof sales.$inferSelect & {
    saleItems: Array<SaleItem & {
        item: Item
    }>,
    saleBoxes: Array<SaleBox & {
        box: BoxOnly
    }>
}

export type NewSale = typeof sales.$inferInsert

export interface TableItem {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    createdAt: Date
    isDeletable?: boolean
}

export type BoxOnly = typeof boxes.$inferSelect

export type NewBox = typeof boxes.$inferInsert

export type NewItem = typeof items.$inferInsert

export type newBoxItem = {
    itemId: number
    probability: number
}

export type newBoxCategory = {
    categoryId: number
}

export type UpdatedBox = {
    id: number
    name: string
    description: string
    price: number
    imageUrl?: string
    items: newBoxItem[]
    categories: newBoxCategory[]
}

export type UpdateItem = {
    id: number
    name: string
    description: string
    price: number
    imageUrl?: string
}

export type CategoryGroup = typeof groups.$inferSelect