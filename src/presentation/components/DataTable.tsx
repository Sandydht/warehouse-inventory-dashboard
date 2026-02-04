/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  sortKey?: string;
  render?: (row: T) => React.ReactNode;
}

interface SortState {
  key: string;
  direction: "asc" | "desc";
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;

  sort?: SortState;
  onSortChange?: (sort: SortState) => void;

  loading?: boolean;
  emptyText?: string;
}

function DataTable<T>({
  columns,
  data,
  rowKey,
  sort,
  onSortChange,
  loading = false,
  emptyText = "No data available",
}: TableProps<T>) {
  const colSpan = columns.length;

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return;

    const key = column.sortKey ?? column.key;
    const direction =
      sort?.key === key && sort.direction === "asc" ? "desc" : "asc";

    onSortChange({ key, direction });
  };

  return (
    <table className="min-w-full text-sm relative">
      <thead className="bg-gray-100 sticky top-0 z-10 border-b border-gray-200 shadow-md">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col)}
              className={`px-4 py-3 text-left text-[14px] leading-5 font-semibold ${
                col.sortable ? "cursor-pointer select-none" : ""
              }`}
            >
              <div className="flex items-center gap-1">
                {col.header}

                {col.sortable && (
                  <span
                    className={`text-xs transition-opacity ${
                      sort?.key === (col.sortKey ?? col.key)
                        ? "opacity-100"
                        : "opacity-40"
                    }`}
                  >
                    {sort?.key === (col.sortKey ?? col.key)
                      ? sort.direction === "asc"
                        ? "▲"
                        : "▼"
                      : "▲▼"}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td
              colSpan={colSpan}
              className="px-4 py-6 text-center text-gray-500"
            >
              Loading data...
            </td>
          </tr>
        )}

        {!loading && data.length === 0 && (
          <tr>
            <td
              colSpan={colSpan}
              className="px-4 py-6 text-center text-gray-500"
            >
              {emptyText}
            </td>
          </tr>
        )}

        {!loading &&
          data.length > 0 &&
          data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-left text-[14px] leading-5 border-b border-gray-300"
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default DataTable;
