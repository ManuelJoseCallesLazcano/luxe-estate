/**
 * Centralized Property type that mirrors the `properties` table in Supabase.
 * The DB uses snake_case columns; we map them to camelCase here.
 */
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  period?: string | null;
  beds: number;
  baths: number;
  area: number;
  /** Maps to `image_url` in the DB */
  image_url: string;
  status: "FOR SALE" | "FOR RENT";
  badges?: string[] | null;
  is_featured: boolean;
  created_at: string;
}
