import { relations } from "drizzle-orm";
import { pgTable, real, serial, text, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";

export const boxes = pgTable("boxes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const boxesRelations = relations(boxes, ({ many }) => ({
    boxItems: many(boxItems),
    boxOffers: many(boxOffers)
}));

export const items = pgTable("items", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: real("price").notNull(),
    imageUrl: text("image_url").notNull(),
});

export const itemsRelations = relations(items, ({ many }) => ({
    boxItems: many(boxItems),
}));

export const boxItems = pgTable("box_items", {
    boxId: serial("box_id").references(() => boxes.id),
    itemId: serial("item_id").references(() => items.id),
    probability: real("probability").notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.boxId, table.itemId] }),
    }
}
);

export const boxItemsRelations = relations(boxItems, ({ one }) => ({
    box: one(boxes, {
        fields: [boxItems.boxId],
        references: [boxes.id],
    }),
    item: one(items, {
        fields: [boxItems.itemId],
        references: [items.id],
    }),
}));

export const offers = pgTable("offers", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    startsAt: timestamp("starts_at").notNull(),
    expiresAt: timestamp("expires_at").notNull()
});

export const offersRelations = relations(offers, ({ many }) => ({
    boxOffers: many(boxOffers),
}));

export const boxOffers = pgTable("box_offers", {
    boxId: serial("box_id").references(() => boxes.id),
    offerId: serial("offer_id").references(() => offers.id),
    discount: integer("discount").notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.boxId, table.offerId] }),
    }
}
);

export const boxOffersRelations = relations(boxOffers, ({ one }) => ({
    box: one(boxes, {
        fields: [boxOffers.boxId],
        references: [boxes.id],
    }),
    offer: one(offers, {
        fields: [boxOffers.offerId],
        references: [offers.id],
    }),
}))