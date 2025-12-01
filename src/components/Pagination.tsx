// React not needed 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Logic to show limited page numbers if many pages (e.g. 1, 2, ..., 10)
  // For simplicity in this iteration, we show all if < 7, otherwise simplified logic or full list for now.
  // Given the scale, a simple map is usually fine, but let's make it safe.
  const renderPageNumbers = () => {
    const pages = [];
    // If total pages is small, show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first, last, and current +/- 1
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === -1) {
        return <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-slate-400">...</span>;
      }
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`
                    h-10 w-10 rounded-xl text-sm font-bold shadow-sm transition-all
                    ${currentPage === page
          ? 'scale-110 bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'}
                `}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className={`mt-12 flex items-center justify-center gap-2 md:gap-4 ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex flex-wrap justify-center gap-2">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label="Next Page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
