import { relations } from "drizzle-orm";
import { pgTable, real, serial, text, timestamp, integer, primaryKey, uuid } from "drizzle-orm/pg-core";

export const boxes = pgTable("boxes", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const boxesRelations = relations(boxes, ({ many }) => ({
    boxItems: many(boxItems),
    boxOffers: many(boxOffers),
    boxCategories: many(boxCategories)
}));

export const items = pgTable("items", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
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

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    gruopId: serial("group_id").references(() => groups.id)
})

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    group: one(groups, {
        fields: [categories.gruopId],
        references: [groups.id],
    }),
    boxCategories: many(boxCategories),
}))

export const boxCategories = pgTable("box_categories", {
    boxId: serial("box_id").references(() => boxes.id),
    categoryId: serial("category_id").references(() => categories.id)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.boxId, table.categoryId] }),
    }
})

export const boxCategoriesRelations = relations(boxCategories, ({ one }) => ({
    box: one(boxes, {
        fields: [boxCategories.boxId],
        references: [boxes.id],
    }),
    category: one(categories, {
        fields: [boxCategories.categoryId],
        references: [categories.id],
    }),
}))

export const groups = pgTable("groups", {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
})

export const groupsRelations = relations(groups, ({ many }) => ({
    categories: many(categories),
}))

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
})

export const sales = pgTable("sales", {
    id: integer("id").primaryKey(),
    created_at: timestamp("created_at").defaultNow().notNull(),
})

export const salesRelations = relations(sales, ({ many }) => ({
    saleBoxes: many(saleBoxes),
    saleItems: many(saleItems),
}))

export const saleBoxes = pgTable("sale_boxes", {
    saleId: integer("sale_id").notNull().references(() => sales.id),
    boxId: serial("box_id").references(() => boxes.id),
    quantity: integer("quantity").notNull(),
    price: real("price").notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.saleId, table.boxId] }),
    }
})

export const saleBoxesRelations = relations(saleBoxes, ({ one }) => ({
    sale: one(sales, {
        fields: [saleBoxes.saleId],
        references: [sales.id],
    }),
    box: one(boxes, {
        fields: [saleBoxes.boxId],
        references: [boxes.id],
    }),
}))

export const saleItems = pgTable("sale_items", {
    saleId: integer("sale_id").notNull().references(() => sales.id),
    itemId: serial("item_id").references(() => items.id),
    quantity: integer("quantity").notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.saleId, table.itemId] }),
    }
})

export const saleItemsRelations = relations(saleItems, ({ one }) => ({
    sale: one(sales, {
        fields: [saleItems.saleId],
        references: [sales.id],
    }),
    item: one(items, {
        fields: [saleItems.itemId],
        references: [items.id],
    }),
}))