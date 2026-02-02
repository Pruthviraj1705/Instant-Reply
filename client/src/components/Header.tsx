import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="pt-12 pb-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Review Response</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
          InstantReply
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-light">
          Turn Haters into Fans Instantly
        </p>
        
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
          Generate professional, empathetic responses to negative reviews in seconds using advanced AI
        </p>
      </motion.div>
    </header>
  );
}
