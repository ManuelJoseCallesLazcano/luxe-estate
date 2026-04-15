"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  // Build an array of page numbers to display, with ellipsis if needed
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      aria-label="Property listings pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous button */}
      <button
        id="pagination-prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 dark:border-white/10 text-sm font-medium text-nordic-dark dark:text-white bg-white dark:bg-white/5 hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark dark:disabled:hover:text-white transition-all"
      >
        <span className="material-icons text-base">arrow_back</span>
        Prev
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-nordic-muted text-sm"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              id={`pagination-page-${page}`}
              onClick={() => goToPage(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-mosque text-white shadow-sm"
                  : "bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        id="pagination-next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-nordic-dark/10 dark:border-white/10 text-sm font-medium text-nordic-dark dark:text-white bg-white dark:bg-white/5 hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark dark:disabled:hover:text-white transition-all"
      >
        Next
        <span className="material-icons text-base">arrow_forward</span>
      </button>
    </nav>
  );
}
