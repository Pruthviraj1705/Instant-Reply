import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GenerateResponseRequest, Review } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "/api/reviews";

export function useReviews() {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
  });
}

export function useGenerateResponse() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: GenerateResponseRequest) => {
      const response = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate response");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast({
        title: "Success!",
        description: "AI response generated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
