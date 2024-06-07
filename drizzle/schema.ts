import { relations } from "drizzle-orm";
import { pgTable, real, serial, text, timestamp } from "drizzle-orm/pg-core";

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
});

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