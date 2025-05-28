'use client';

import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// -----------------------

const NAV_BUTTON_CLASSES = 'flex justify-center items-center text-gray-600 px-3 py-2 text-xl hover:bg-gray-200';
const DISABLED_CLASSES = 'bg-gray-200 *:text-gray-300 cursor-not-allowed';
const ACTIVE_PAGE_CLASSES = 'bg-gray-500 text-white font-bold hover:bg-gray-500';
const PAGE_CLASSES = 'px-3 py-2 text-center hover:bg-gray-200 text-black';

interface PaginationProps {
  baseUrl: string;
  currentPage: number;
  totalPages: number;
  limit: number;
  className?: string;
}

function getPageLinks(current: number, total: number, neighbors = 2) {
  const range: (number | string)[] = [];

  for (let i = 1; i <= total; i++) {
    // First and last page always show
    // Current page and neighbors always show
    if (
      i === 1 ||
      i === total ||
      (i >= current - neighbors && i <= current + neighbors)
    ) {
      range.push(i);
    } else if (
      range[range.length - 1] !== "..."
    ) {
      range.push("...");
    }
  }
  return range;
}

const Pagination = ({
  baseUrl,
  currentPage,
  totalPages,
  limit,
  className = ""
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pageLinks = getPageLinks(currentPage, totalPages, 2);

  return (
    <div className={`pagination flex items-stretch *:border *:min-w-12 ${className}`}>
      {/* Previous */}
      <Link
        href={`${baseUrl}?page=${Math.max(1, currentPage - 1)}&limit=${limit}`}
        className={`${NAV_BUTTON_CLASSES} ${currentPage === 1 && DISABLED_CLASSES}`}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <FaChevronLeft />
      </Link>

      {/* Page numbers */}
      {pageLinks.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-3 py-2 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}&limit=${limit}`}
            className={`${PAGE_CLASSES} ${currentPage === page && ACTIVE_PAGE_CLASSES}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={`${baseUrl}?page=${Math.min(totalPages, currentPage + 1)}&limit=${limit}`}
        className={`${NAV_BUTTON_CLASSES} rounded-r ${currentPage === totalPages && DISABLED_CLASSES}`}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        <FaChevronRight />
      </Link>
    </div>
  );
};

export default Pagination;