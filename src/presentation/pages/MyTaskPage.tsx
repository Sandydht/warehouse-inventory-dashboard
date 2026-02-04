/* eslint-disable react-hooks/static-components */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getApprovalList } from "../store/approval/approvalThunk";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type { InventoryItemDto } from "../../infrastructure/dto/common/InventoryItemDto";
import ElipsisPagination from "../components/ElipsisPagination";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import Dropdown from "../components/Dropdown";
import type { ApprovalStatus } from "../../domain/approval/types";
import type { SortOrder } from "../../commons/models/types";

function MyTaskPage() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.approval.approvalList);

  const [page, setPage] = useState(1);

  const [sortKey, setSortKey] = useState<keyof InventoryItemDto>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    const mockParams: PaginationQuery = {
      page,
      limit: 10,
      search: debouncedSearch,
      status: statusFilter as ApprovalStatus,
      sortBy: sortKey,
      sortOrder: sortOrder,
    };

    dispatch(getApprovalList(mockParams));
  }, [dispatch, sortOrder, sortKey, page, debouncedSearch, statusFilter]);

  const handleSort = (key: keyof InventoryItemDto) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const Th = ({
    label,
    columnKey,
  }: {
    label: string;
    columnKey: keyof InventoryItemDto;
  }) => {
    const isActive = sortKey === columnKey;

    return (
      <th
        onClick={() => handleSort(columnKey)}
        className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 select-none"
      >
        <div className="flex items-center gap-1">
          {label}
          <span
            className={`text-xs transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`}
          >
            {isActive ? (sortOrder === "asc" ? "▲" : "▼") : "▲▼"}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto">
        <p>My Task</p>
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
              ]}
            />
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <div className="w-full h-auto overflow-auto bg-white border-b">
            <table className="min-w-full text-sm relative">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <Th label="SKU" columnKey="sku" />
                  <Th label="Name" columnKey="name" />
                  <Th label="Category" columnKey="category" />
                  <Th label="Price" columnKey="price" />
                  <Th label="Quantity" columnKey="quantity" />
                  <Th label="Supplier" columnKey="supplier" />
                  <th className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 select-none">
                    <div className="flex items-center gap-1">Status</div>
                  </th>
                  <th className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 select-none">
                    <div className="flex items-center gap-1">Type</div>
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{item.proposedData?.sku}</td>
                    <td className="px-4 py-3">{item.proposedData?.name}</td>
                    <td className="px-4 py-3">{item.proposedData?.category}</td>
                    <td className="px-4 py-3">
                      Rp {item.proposedData?.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{item.proposedData?.quantity}</td>
                    <td className="px-4 py-3">{item.proposedData?.supplier}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === "PENDING"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize">{item.type}</td>
                    <td className="px-4 py-3">
                      <button className="mr-2 text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
