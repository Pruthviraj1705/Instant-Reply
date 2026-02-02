import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY || "dummy",
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Generate AI response endpoint
  app.post(api.reviews.generate.path, async (req, res) => {
    try {
      const { text, tone } = api.reviews.generate.input.parse(req.body);
      
      const systemPrompt = "You are an expert customer service manager. Your goal is to de-escalate angry customers and protect the brand's reputation. Keep responses under 100 words.";
      
      const userPrompt = `Write a response to this review: '${text}'. Use a ${tone} tone. Do not include placeholders like [Your Name]—sign it as 'The Management Team'.`;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 300,
        });

        const generatedText = response.choices[0].message.content?.trim() || "Could not generate response.";

        const review = await storage.createReview({
          originalText: text,
          responseText: generatedText,
          tone: tone,
        });

        res.status(201).json(review);
      } catch (openaiError: any) {
        console.error("OpenAI API Error:", openaiError);
        res.status(500).json({ message: "Failed to generate response from AI service." });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get review history endpoint
  app.get(api.reviews.list.path, async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  return httpServer;
}
