import { boxes, boxItems, categories, items, boxCategories, users, sales, saleItems, saleBoxes } from "@/drizzle/schema"

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

export type Sale = typeof sales.$inferSelect & {
    items: Array<{ item: Item, quantity: number }>
}

export type SaleItem = typeof saleItems.$inferSelect

export type SaleBox = typeof saleBoxes.$inferSelect

export type SaleWithRelations = typeof sales.$inferSelect & {
    saleItems: Array<SaleItem & {
        item: Item
    }>
}

export type newSale = typeof sales.$inferInsert