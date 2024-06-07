import { boxes, boxItems, items } from "@/drizzle/schema"

export type Box = typeof boxes.$inferSelect & {
    items: Array<{ item: Item, probability: number }>
}

export type BoxWithRelations = typeof boxes.$inferSelect & {
    boxItems: Array<typeof boxItems.$inferSelect & {
        item: typeof items.$inferSelect
    }>
}

export type Item = typeof items.$inferSelect;