import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateResponseSchema, type GenerateResponseRequest } from "@shared/schema";
import { useGenerateResponse } from "@/hooks/use-reviews";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, MessageSquare, AlignLeft } from "lucide-react";
import { motion } from "framer-motion";

export function ReviewForm() {
  const [charCount, setCharCount] = useState(0);
  const generate = useGenerateResponse();
  
  const form = useForm<GenerateResponseRequest>({
    resolver: zodResolver(generateResponseSchema),
    defaultValues: { text: "", tone: "Professional" },
  });

  const onSubmit = (data: GenerateResponseRequest) => {
    generate.mutate(data, {
      onSuccess: () => {
        form.reset({ text: "", tone: data.tone });
        setCharCount(0);
      },
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-6 md:p-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Negative Review
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste the angry review here..."
                        className="glass-input min-h-[200px] resize-none" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          setCharCount(e.target.value.length);
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <div className={`text-xs ${charCount > 2000 ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
                        {charCount}/2000
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <AlignLeft className="h-4 w-4" />
                      Response Tone
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="glass-input">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Professional", "Apologetic", "Witty", "Firm but Fair"].map(tone => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={generate.isPending} 
                className="w-full mt-6 bg-primary hover:bg-primary/90"
                size="lg"
              >
                {generate.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Response
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
