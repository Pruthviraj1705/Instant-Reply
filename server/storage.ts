import { reviews, type Review, type InsertReview } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createReview(review: InsertReview): Promise<Review>;
  getReviews(): Promise<Review[]>;
}

export class DatabaseStorage implements IStorage {
  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }
}

export const storage = new DatabaseStorage();
