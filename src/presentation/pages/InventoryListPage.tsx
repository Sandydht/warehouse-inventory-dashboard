import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import SearchInput from "../components/SearchInput";
import DataTable from "../components/DataTable";
import type { InventoryItemDto } from "../../infrastructure/dto/common/InventoryItemDto";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getInventoryList } from "../store/inventory/inventoryThunk";
import ElipsisPagination from "../components/ElipsisPagination";
import { Link } from "react-router-dom";

function InventoryListPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.inventory.inventoryList,
  );

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "createdAt",
    direction: "desc",
  });

  useEffect(() => {
    const mockParams: PaginationQuery = {
      page,
      limit: 10,
      search: debouncedSearch,
      sortBy: sort.key,
      sortOrder: sort.direction,
    };

    dispatch(getInventoryList(mockParams));
  }, [sort, page, debouncedSearch, dispatch]);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex flex-col items-start justify-start">
        <p className="text-left text-[22px] leading-7 font-bold">
          Inventory List
        </p>
        <p className="text-left text-[16px] leading-6">
          View and manage the complete list of items currently in stock.
        </p>
      </div>

      <div className="w-full h-auto">
        <p>Action button</p>
      </div>

      <div className="w-full h-auto rounded-2xl border-gray-200 border bg-white overflow-hidden shadow-sm flex flex-col items-start justify-start gap-2">
        <div className="w-full h-auto p-4 flex items-center justify-start gap-4">
          <div className="w-full h-auto max-w-125">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <div className="w-full h-auto overflow-auto bg-white border-b border-gray-500 max-h-[calc(100vh-315px)]">
            <DataTable
              columns={[
                {
                  key: "sku",
                  header: "SKU",
                  sortable: true,
                  sortKey: "sku",
                  render: (row: InventoryItemDto) => row.sku,
                },
                {
                  key: "name",
                  header: "Name",
                  sortable: true,
                  sortKey: "name",
                  render: (row: InventoryItemDto) => row.name,
                },
                {
                  key: "category",
                  header: "Category",
                  sortable: true,
                  sortKey: "category",
                  render: (row: InventoryItemDto) => row.category,
                },
                {
                  key: "price",
                  header: "Price",
                  sortable: true,
                  sortKey: "price",
                  render: (row: InventoryItemDto) =>
                    `Rp ${row.price.toLocaleString()}`,
                },
                {
                  key: "quantity",
                  header: "Quantity",
                  sortable: true,
                  sortKey: "quantity",
                  render: (row: InventoryItemDto) => row.quantity,
                },
                {
                  key: "supplier",
                  header: "Supplier",
                  sortable: true,
                  sortKey: "supplier",
                  render: (row: InventoryItemDto) => row.supplier,
                },
                {
                  key: "action",
                  header: "Action",
                  render: (row: InventoryItemDto) => (
                    <div className="w-full h-auto flex items-center justify-start gap-2">
                      <Link
                        to={`/inventory-list/${row.id}/edit`}
                        className="text-blue-500 cursor-pointer hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="text-red-500 cursor-pointer hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
              data={data?.data ?? []}
              rowKey={(row) => row.id}
              sort={sort}
              onSortChange={setSort}
              loading={loading}
            />
          </div>

          <div className="w-full h-auto flex items-center justify-end p-4">
            {data?.meta && (
              <ElipsisPagination
                meta={data?.meta}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryListPage;
