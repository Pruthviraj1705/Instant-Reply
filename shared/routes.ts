import { z } from "zod";
import { reviews, generateResponseSchema } from "./schema";

export const api = {
  reviews: {
    generate: {
      method: "POST" as const,
      path: "/api/reviews/generate",
      input: generateResponseSchema,
      responses: {
        201: z.custom<typeof reviews.$inferSelect>(),
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
    list: {
      method: "GET" as const,
      path: "/api/reviews",
      responses: {
        200: z.array(z.custom<typeof reviews.$inferSelect>()),
      },
    },
  },
};
