import {
  integer,
  pgTable,
  varchar,
  text,
  uuid,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { chatsTable, chatThreadsTable, postsTable } from "./schema";

export const usersTable = pgTable("users", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).default("user"),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  chats: many(chatsTable),
  chatThreads: many(chatThreadsTable),
  posts: many(postsTable),
}));

export const createUserSchema = createInsertSchema(usersTable).omit({
  role: true,
});

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
