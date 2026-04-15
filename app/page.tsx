import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedCollections from "../components/FeaturedCollections";
import NewInMarket from "../components/NewInMarket";
import { supabase } from "../lib/supabase/client";
import { Property } from "../lib/types";

const PAGE_SIZE = 8;

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("is_featured", false)
    .range(from, to)
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  if (error) {
    console.error("Failed to fetch properties:", error.message);
  }

  const properties = data ?? [];
  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  // Guard against out-of-range page in the URL
  const safePage = Math.min(currentPage, totalPages);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Hero />
        <FeaturedCollections />
        <NewInMarket
          properties={properties}
          currentPage={safePage}
          totalPages={totalPages}
        />
      </main>
    </>
  );
}
