import { pgTable, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const households = pgTable("households", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const pantryItems = pgTable("pantry_items", {
    id: text("id").primaryKey(),
    householdId: text("household_id").notNull().references(
        () => households.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    inStock: boolean("in_stock").default(true).notNull(),
    lastUpdatedBy: text("last_updated_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
