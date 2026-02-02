import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  responseText: text("response_text").notNull(),
  tone: text("tone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewSchema = createInsertSchema(reviews).omit({ 
  id: true, 
  createdAt: true 
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export const generateResponseSchema = z.object({
  text: z.string().min(1, "Review text is required").max(2000, "Review text must be under 2000 characters"),
  tone: z.enum(["Professional", "Apologetic", "Witty", "Firm but Fair"]),
});

export type GenerateResponseRequest = z.infer<typeof generateResponseSchema>;
