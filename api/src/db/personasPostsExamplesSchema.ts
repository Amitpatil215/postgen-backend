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
import { personasTable, postsTable, usersTable } from "./schema";
import { Many, relations } from "drizzle-orm";

// Personas table definition
export const personasPostsExamplesTable = pgTable("persona_posts_examples", {
  name: text().notNull(),
  persona_id: uuid()
    .notNull()
    .references(() => personasTable.id),
  post_id: uuid()
    .notNull()
    .references(() => postsTable.id),
});

export const personasPostsExamplesRelations = relations(
  personasPostsExamplesTable,
  ({ one }) => ({
    persona: one(personasTable, {
      fields: [personasPostsExamplesTable.persona_id],
      references: [personasTable.id],
    }),
    post: one(postsTable, {
      fields: [personasPostsExamplesTable.post_id],
      references: [postsTable.id],
    }),
  })
);

// Schemas for insert and update operations
export const createPersonasPostsExampleSchema = createInsertSchema(
  personasPostsExamplesTable
);
export const updatePersonasPostsExampleSchema = createUpdateSchema(
  personasPostsExamplesTable
);
