import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
  uuid,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { usersTable, chatsTable, personasTable } from "./schema";
import { relations } from "drizzle-orm";

export const postsTable = pgTable("posts", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  content: text().notNull(),
  is_liked: boolean(),
  is_disliked: boolean(),
  is_saved: boolean(),
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id),
  chat_id: uuid().references(() => chatsTable.id),
  persona_id: uuid().references(() => personasTable.id),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export const postsRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.user_id],
    references: [usersTable.id],
  }),
  chat: one(chatsTable, {
    fields: [postsTable.chat_id],
    references: [chatsTable.id],
  }),
  persona: one(personasTable, {
    fields: [postsTable.persona_id],
    references: [personasTable.id],
  }),
}));

export const createPostsSchema = createInsertSchema(postsTable);

export const updatePostsSchema = createUpdateSchema(postsTable);
