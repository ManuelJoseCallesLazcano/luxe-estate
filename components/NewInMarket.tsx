import { Property } from "../lib/types";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import { Suspense } from "react";

interface NewInMarketProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
}

export default function NewInMarket({
  properties,
  currentPage,
  totalPages,
}: NewInMarketProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark dark:text-white">
            New in Market
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Fresh opportunities added this week.
          </p>
        </div>
        <div className="hidden md:flex bg-white dark:bg-white/5 p-1 rounded-lg">
          <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
            All
          </button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white">
            Buy
          </button>
          <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white">
            Rent
          </button>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="py-20 text-center text-nordic-muted">
          No properties found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination is a Client Component; wrap in Suspense as required by Next.js */}
      <Suspense fallback={null}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </section>
  );
}
