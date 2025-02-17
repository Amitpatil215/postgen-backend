import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { usersTable } from "./schema";
import { relations } from "drizzle-orm";

export const chatThreadsTable = pgTable("chat_threads", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const chatThreadsRelations = relations(chatThreadsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [chatThreadsTable.user_id],
    references: [usersTable.id],
  }),
}));

export const createChatThreadsSchema = createInsertSchema(chatThreadsTable);

export const updateChatThreadsSchema = createUpdateSchema(chatThreadsTable);
