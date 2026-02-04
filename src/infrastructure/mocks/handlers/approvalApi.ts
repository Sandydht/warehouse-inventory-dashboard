import { http, HttpResponse } from "msw";
import UserDummyData from "../json/user.json";
import type { CreateApprovalRequestDto } from "../../dto/request/CreateApprovalRequestDto";
import { IndexedDbCrud } from "../indexeddb/crud";
import type { CreateApprovalResponseDto } from "../../dto/response/CreateApprovalResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import { v4 as uuidv4 } from "uuid";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import { toCreateApprovalResponseDto } from "../../mappers/approvalMapper";
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

    const inventoryItem: InventoryItem = new InventoryItem(
      uuidv4(),
      payload.sku,
      payload.name,
      payload.category,
      payload.price,
      payload.quantity,
      payload.supplier,
      now,
      now,
      null,
    );

    const approvalRequest: ApprovalRequest<InventoryItem> =
      new ApprovalRequest<InventoryItem>(
        uuidv4(),
        "CREATE",
        "PENDING",
        null,
        null,
        inventoryItem,
        null,
        user.fullName,
        now,
        now,
        null,
      );

    const mapDtoData: CreateApprovalResponseDto<InventoryItem> =
      toCreateApprovalResponseDto(approvalRequest);
    const approvalDb = new IndexedDbCrud<
      CreateApprovalResponseDto<InventoryItem>
    >("approval_requests");
    await approvalDb.create(mapDtoData);

    return HttpResponse.json(mapDtoData, { status: 201 });
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
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const order = url.searchParams.get("order") ?? "desc";

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

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;

      return 0;
    });

    const query: PaginationQuery = {
      page: Number(page),
      limit: Number(limit),
      search,
      sortBy,
      sortOrder: order as SortOrder,
    };
    const result = paginateArray<ApprovalRequestDto<InventoryItemDto>>(
      approvalList,
      query,
    );

    return HttpResponse.json(result, { status: 200 });
  }),
];
