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
import { personasPostsExamplesTable, postsTable, usersTable } from "./schema";
import { Many, relations } from "drizzle-orm";

// Personas table definition
export const personasTable = pgTable("personas", {
  id: uuid().notNull().defaultRandom().primaryKey(),
  name: text().notNull(), // Persona Name
  description: text(), // Describe Persona
  default_prompt: text(), // Default prompt
  target_audience: text(), // Target Audience
  profession: text(), // Profession
  opinions: text(), // Your opinions
  vocabulary: text(), // Your vocabulary
  forbidden_words: text(), // Words and Phrases to avoid
  end_goal: text(), // What is the end goal?
  custom_hashtag: text(), // Custom hashtag
  fixed_cta: text(), // Fix CTA
  relevant_keywords: text(), // Relevant Keywords
  user_id: uuid()
    .notNull()
    .references(() => usersTable.id), // Foreign key to users table
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

// Relations for personasTable
export const personasRelations = relations(personasTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [personasTable.user_id],
    references: [usersTable.id],
  }),
}));

// Schemas for insert and update operations
export const createPersonasSchema = createInsertSchema(personasTable).omit({
  user_id: true,
});
export const updatePersonasSchema = createUpdateSchema(personasTable);
