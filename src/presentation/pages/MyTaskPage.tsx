import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getApprovalList } from "../store/approval/approvalThunk";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import ElipsisPagination from "../components/ElipsisPagination";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Dropdown from "../components/Dropdown";
import type { ApprovalStatus } from "../../domain/approval/types";
import DataTable from "../components/DataTable";
import type { ApprovalRequestDto } from "../../infrastructure/dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../infrastructure/dto/common/InventoryItemDto";

function MyTaskPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.approval.approvalList,
  );

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "createdAt",
    direction: "desc",
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const mockParams: PaginationQuery = {
      page,
      limit: 10,
      search: debouncedSearch,
      status: statusFilter as ApprovalStatus,
      sortBy: sort.key,
      sortOrder: sort.direction,
    };

    dispatch(getApprovalList(mockParams));
  }, [dispatch, sort, page, debouncedSearch, statusFilter]);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex flex-col items-start justify-start">
        <p className="text-left text-[22px] leading-7 font-bold">My Task</p>
        <p className="text-left text-[16px] leading-6">
          View and process inventory-related requests that are pending your
          approval.
        </p>
      </div>

      <div className="w-full h-auto rounded-2xl border-gray-200 border bg-white overflow-hidden shadow-sm flex flex-col items-start justify-start gap-2">
        <div className="w-full h-auto p-4 flex items-center justify-start gap-4">
          <div className="w-full h-auto max-w-125">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full h-auto max-w-37.5">
            <Dropdown
              value={statusFilter}
              onChange={(item) => setStatusFilter(String(item.value))}
              items={[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Pending",
                  value: "PENDING",
                },
                {
                  label: "Approved",
                  value: "APPROVED",
                },
                {
                  label: "Rejected",
                  value: "REJECTED",
                },
              ]}
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
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.proposedData?.sku,
                },
                {
                  key: "name",
                  header: "Name",
                  sortable: true,
                  sortKey: "name",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.proposedData?.name,
                },
                {
                  key: "category",
                  header: "Category",
                  sortable: true,
                  sortKey: "category",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.proposedData?.category,
                },
                {
                  key: "price",
                  header: "Price",
                  sortable: true,
                  sortKey: "price",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    `Rp ${row.proposedData?.price.toLocaleString()}`,
                },
                {
                  key: "quantity",
                  header: "Quantity",
                  sortable: true,
                  sortKey: "quantity",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.proposedData?.quantity,
                },
                {
                  key: "supplier",
                  header: "Supplier",
                  sortable: true,
                  sortKey: "supplier",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.proposedData?.supplier,
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) => (
                    <span className="rounded-full px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600">
                      {row.status}
                    </span>
                  ),
                },
                {
                  key: "type",
                  header: "Type",
                  render: (row: ApprovalRequestDto<InventoryItemDto>) =>
                    row.type,
                },
                {
                  key: "action",
                  header: "Action",
                  render: () => (
                    <>
                      <button className="mr-2 text-blue-600 cursor-pointer hover:underline">
                        Approve
                      </button>
                      <button className="text-red-600 cursor-pointer hover:underline">
                        Reject
                      </button>
                    </>
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

export default MyTaskPage;
