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
import { chatThreadsTable, usersTable } from "./schema";
import { relations } from "drizzle-orm";

export const chatsTable = pgTable("chats", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  message: text().notNull(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id),
  thread_id: uuid()
    .notNull()
    .references(() => chatThreadsTable.id),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const chatsRelations = relations(chatsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [chatsTable.user_id],
    references: [usersTable.id],
  }),
  thread: one(chatThreadsTable, {
    fields: [chatsTable.thread_id],
    references: [chatThreadsTable.id],
  }),
}));

export const createChatSchema = createInsertSchema(chatsTable);

export const updateChatSchema = createUpdateSchema(chatsTable);
