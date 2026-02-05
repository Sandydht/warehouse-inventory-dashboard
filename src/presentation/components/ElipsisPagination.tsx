import type { PaginationMeta } from "../../commons/models/PaginationMeta";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
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

function ElipsisPagination({
  meta,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
}: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPrevPage, limit } = meta;
  const pages = generatePages(page, totalPages);

  return (
    <div className="flex items-center justify-between gap-4">
      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Show</span>

          <div className="relative">
            <select
              value={limit}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="appearance-none px-3 py-1 rounded-md border text-sm pr-10 cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Dropdown Icon */}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              ▼
            </span>
          </div>

          <span className="text-gray-600">items</span>
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center gap-2">
        {/* Prev */}
        <button
          disabled={!hasPrevPage}
          onClick={() => onPageChange(page - 1)}
          className={`
            px-3 py-1 rounded-md border text-sm
            ${
              hasPrevPage
                ? "hover:bg-gray-100 text-gray-700 cursor-pointer"
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
                px-3 py-1 rounded-md border text-sm cursor-pointer
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
                ? "hover:bg-gray-100 text-gray-700 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ElipsisPagination;
