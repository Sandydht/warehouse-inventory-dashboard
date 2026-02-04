import { http, HttpResponse } from "msw";
import UserDummyData from "../json/user.json";
import type { CreateApprovalRequestDto } from "../../dto/request/CreateApprovalRequestDto";
import { IndexedDbCrud } from "../indexeddb/crud";
import { v4 as uuidv4 } from "uuid";
import type { InventoryItemDto } from "../../dto/common/InventoryItemDto";
import type { ApprovalRequestDto } from "../../dto/common/ApprovalRequestDto";
import { paginateArray } from "../utils/paginateArray";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import type { SortOrder } from "../../../commons/models/types";

export const approvalApi = [
  http.post("/api/approval/create-approval", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user || user.role === "OFFICER") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const payload = (await request.json()) as CreateApprovalRequestDto;
    const now = new Date().toISOString();
    const inventoryItemDto: InventoryItemDto = {
      ...payload,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    const approvalRequestDto: ApprovalRequestDto<InventoryItemDto> = {
      id: uuidv4(),
      type: "CREATE",
      status: "PENDING",
      targetId: null,
      originalData: null,
      proposedData: inventoryItemDto,
      rejectionReason: null,
      createdBy: user.fullName,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };

    const approvalDb = new IndexedDbCrud<ApprovalRequestDto<InventoryItemDto>>(
      "approval_requests",
    );
    await approvalDb.create(approvalRequestDto);

    return HttpResponse.json(approvalRequestDto, { status: 201 });
  }),
  http.get("/api/approval/approval-list", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user || user.role !== "OFFICER") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);

    const page = url.searchParams.get("page") ?? 1;
    const limit = url.searchParams.get("limit") ?? 10;
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const status = url.searchParams.get("status");
    const sortBy = url.searchParams.get("sortBy") ?? "updatedAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";

    const approvalDb = new IndexedDbCrud<ApprovalRequestDto<InventoryItemDto>>(
      "approval_requests",
    );
    let approvalList = await approvalDb.getAll();

    if (search) {
      approvalList = approvalList.filter((data) => {
        const name = data?.proposedData?.name.toLowerCase() ?? "";
        const sku = data?.proposedData?.sku.toLowerCase() ?? "";
        const createdBy = data.createdBy.toLowerCase();

        return (
          name.includes(search) ||
          sku.includes(search) ||
          createdBy.includes(search)
        );
      });
    }

    if (status) {
      approvalList = approvalList.filter((data) => data.status === status);
    }

    approvalList.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "type":
          aValue = a.type;
          bValue = b.type;
          break;

        case "createdBy":
          aValue = a.createdBy;
          bValue = b.createdBy;
          break;

        case "createdAt":
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;

      return 0;
    });

    const query: PaginationQuery = {
      page: Number(page),
      limit: Number(limit),
      search,
      sortBy,
      sortOrder: sortOrder as SortOrder,
    };
    const result = paginateArray<ApprovalRequestDto<InventoryItemDto>>(
      approvalList,
      query,
    );

    return HttpResponse.json(result, { status: 200 });
  }),
];
