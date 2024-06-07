import { boxes, items } from "@/drizzle/schema"

export type Box = typeof boxes.$inferSelect & {
    items: Array<{ item: Item, probability: number}>
}

export type Item = typeof items.$inferSelect;