import { boxes, boxItems, categories, items, boxCategories, users, sales, saleItems, saleBoxes, groups, offers, boxOffers, messages } from "@/drizzle/schema"

export type BoxOnly = typeof boxes.$inferSelect

export type Box = typeof boxes.$inferSelect & {
    items: Array<{ item: Item, probability: number }>
    categories: Array<Category>
}

export type BoxWithRelations = typeof boxes.$inferSelect & {
    boxItems: Array<BoxItem & {
        item: Item
    }>
} & {
    boxCategories: Array<BoxCategory & {
        category: Category
    }>
}

export type NewBox = typeof boxes.$inferInsert

export type UpdatedBox = {
    id: number
    name: string
    description: string
    price: number
    imageUrl?: string
    items: newBoxItem[]
    categories: NewBoxCategory[]
}

export type BoxItem = typeof boxItems.$inferSelect;

export type newBoxItem = {
    itemId: number
    probability: number
}

export type BoxCategory = typeof boxCategories.$inferSelect;

export type NewBoxCategory = {
    categoryId: number
}

export type Item = typeof items.$inferSelect;

export type NewItem = typeof items.$inferInsert

export type UpdateItem = {
    id: number
    name: string
    description: string
    price: number
    imageUrl?: string
}

export interface TableItem {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    createdAt: Date
    isDeletable?: boolean
}

export interface ComboBoxItem {
    id: number
    name: string
    price: number
    imageUrl: string
}

export type Category = typeof categories.$inferSelect;

export type CategoryGroup = typeof groups.$inferSelect

export type SaleOnly = typeof sales.$inferSelect;

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


export type SaleWithResume = SaleOnly & {
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

export type Offer = typeof offers.$inferSelect

export type OfferWithResume = Offer & {
    quantity: number,
    averageDiscount: number,
    status: 'incoming' | 'active' | 'expired'
}

export type OfferWithRelations = Offer & {
    boxOffers: Array<boxOffer>
}

export type newOffer = typeof offers.$inferInsert

export type NewOfferBox = {
    boxId: number
    discount: number
}

export type boxOffer = typeof boxOffers.$inferSelect

export type Cart = {
    boxes: Array<{ boxId: number, quantity: number }>
}

export type User = typeof users.$inferSelect;

export type DataResume = { month: string, profit: number, productsSold: number, sales: number }

export type DataOffer = { month: string, count: number }

export type NewMessage = typeof messages.$inferInsert;