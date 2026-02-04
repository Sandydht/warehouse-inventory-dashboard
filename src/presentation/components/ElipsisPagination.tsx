import type { PaginationMeta } from "../../commons/models/PaginationMeta";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

type PageItem = number | "...";

function generatePages(current: number, total: number): PageItem[] {
  const pages: PageItem[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 4) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 3) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

function ElipsisPagination({ meta, onPageChange }: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPrevPage } = meta;
  const pages = generatePages(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Prev */}
      <button
        disabled={!hasPrevPage}
        onClick={() => onPageChange(page - 1)}
        className={`
          px-3 py-1 rounded-md border text-sm
          ${
            hasPrevPage
              ? "hover:bg-gray-100 text-gray-700"
              : "text-gray-400 cursor-not-allowed"
          }
        `}
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gray-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`
              px-3 py-1 rounded-md border text-sm
              ${
                item === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 text-gray-700"
              }
            `}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
        className={`
          px-3 py-1 rounded-md border text-sm
          ${
            hasNextPage
              ? "hover:bg-gray-100 text-gray-700"
              : "text-gray-400 cursor-not-allowed"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}

export default ElipsisPagination;
