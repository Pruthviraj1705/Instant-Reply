import { Header } from "@/components/Header";
import { ReviewForm } from "@/components/ReviewForm";
import { HistoryList } from "@/components/HistoryList";
import { useReviews } from "@/hooks/use-reviews";

export default function Home() {
  useReviews();
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="container mx-auto px-4 pb-20 max-w-6xl">
        <Header />
        <main className="space-y-8">
          <ReviewForm />
          <HistoryList />
        </main>
      </div>
    </div>
  );
}
