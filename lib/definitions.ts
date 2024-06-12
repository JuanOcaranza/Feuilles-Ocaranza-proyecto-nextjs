import { boxes, boxItems, categories, items, boxCategories } from "@/drizzle/schema"

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

export type boxCategory = typeof boxCategories.$inferSelect

export type Cart = {
    boxes: Array<{ boxId: number, quantity: number }>
}