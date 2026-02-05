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
import type { RejectApprovalRequestDto } from "../../dto/request/RejectApprovalRequestDto";

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
      updatedAt: null,
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
      createdBy: user.id,
      createdAt: now,
      updatedAt: null,
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
        case "sku":
          aValue = a.originalData?.sku || a.proposedData?.sku || "";
          bValue = a.originalData?.sku || b.proposedData?.sku || "";
          break;

        case "name":
          aValue = a.originalData?.name || a.proposedData?.name || "";
          bValue = a.originalData?.name || b.proposedData?.name || "";
          break;

        case "category":
          aValue = a.originalData?.category || a.proposedData?.category || "";
          bValue = a.originalData?.category || b.proposedData?.category || "";
          break;

        case "price":
          aValue = a.originalData?.price || a.proposedData?.price || "";
          bValue = a.originalData?.price || b.proposedData?.price || "";
          break;

        case "quantity":
          aValue = a.originalData?.quantity || a.proposedData?.quantity || "";
          bValue = a.originalData?.quantity || b.proposedData?.quantity || "";
          break;

        case "supplier":
          aValue = a.originalData?.supplier || a.proposedData?.supplier || "";
          bValue = a.originalData?.supplier || b.proposedData?.supplier || "";
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
  http.get(
    "/api/approval/approval-request-detail/:id",
    async ({ params, request }) => {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.replace("Bearer ", "");
      const user = UserDummyData.find((user) => user.id === token);

      if (!user || user.role !== "OFFICER") {
        return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const { id } = params;
      const approvalDb = new IndexedDbCrud<
        ApprovalRequestDto<InventoryItemDto>
      >("approval_requests");
      const result = await approvalDb.getById(id as string);

      if (!result) {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }

      return HttpResponse.json(result, { status: 200 });
    },
  ),
  http.post("/api/approval/:id/approve", async ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user || user.role !== "OFFICER") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    if (!id) {
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const approvalDb = new IndexedDbCrud<ApprovalRequestDto<InventoryItemDto>>(
      "approval_requests",
    );
    const inventoryDb = new IndexedDbCrud<InventoryItemDto>("inventories");
    const result = await approvalDb.getById(id as string);
    const now = new Date().toISOString();

    if (!result) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (result.status !== "PENDING") {
      return HttpResponse.json(
        { message: "Approval already processed" },
        { status: 400 },
      );
    }

    result.status = "APPROVED";
    await approvalDb.update(result);

    switch (result.type) {
      case "CREATE":
        if (result.proposedData) {
          await inventoryDb.create(result.proposedData);
        }
        break;

      case "DELETE":
        if (result.originalData) {
          result.originalData.deletedAt = now;
          await inventoryDb.update(result.originalData);
        }
        break;
    }

    return HttpResponse.json(result, { status: 200 });
  }),
  http.post("/api/approval/:id/reject", async ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user || user.role !== "OFFICER") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    if (!id) {
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const approvalDb = new IndexedDbCrud<ApprovalRequestDto<InventoryItemDto>>(
      "approval_requests",
    );

    const approvalRequest = await approvalDb.getById(id as string);
    if (!approvalRequest) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (approvalRequest.status !== "PENDING") {
      return HttpResponse.json(
        { message: "Approval already finalized" },
        { status: 409 },
      );
    }

    const payload = (await request.json()) as RejectApprovalRequestDto;
    const now = new Date().toISOString();

    if (!payload.rejectReason?.trim()) {
      return HttpResponse.json(
        { message: "Reject reason is required" },
        { status: 400 },
      );
    }

    approvalRequest.status = "REJECTED";
    approvalRequest.rejectionReason = payload.rejectReason;
    approvalRequest.updatedAt = now;
    await approvalDb.update(approvalRequest);

    return HttpResponse.json(approvalRequest, { status: 200 });
  }),
  http.delete(
    "/api/approval/delete/:inventoryId",
    async ({ params, request }) => {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const token = authHeader.replace("Bearer ", "");
      const user = UserDummyData.find((user) => user.id === token);

      if (!user || user.role === "OFFICER") {
        return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const { inventoryId } = params;

      if (!inventoryId) {
        return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
      }

      const inventoryDb = new IndexedDbCrud<InventoryItemDto>("inventories");
      const inventory = await inventoryDb.getById(inventoryId as string);

      if (!inventory) {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }

      const now = new Date().toISOString();
      const inventoryItemDto: InventoryItemDto = {
        ...inventory,
      };

      const approvalRequestDto: ApprovalRequestDto<InventoryItemDto> = {
        id: uuidv4(),
        type: "DELETE",
        status: "PENDING",
        targetId: inventory.id,
        originalData: inventoryItemDto,
        proposedData: null,
        rejectionReason: null,
        createdBy: user.id,
        createdAt: now,
        updatedAt: null,
        deletedAt: null,
      };

      const approvalDb = new IndexedDbCrud<
        ApprovalRequestDto<InventoryItemDto>
      >("approval_requests");
      await approvalDb.create(approvalRequestDto);

      return HttpResponse.json(approvalRequestDto, { status: 201 });
    },
  ),
  http.patch("/api/approval/edit/:inventoryId", async ({ params, request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user || user.role === "OFFICER") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    if (!id) {
      return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const inventoryDb = new IndexedDbCrud<InventoryItemDto>("inventories");
    const result = await inventoryDb.getById(id as string);

    if (!result) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const inventoryItemDto: InventoryItemDto = {
      ...result,
      deletedAt: now,
    };

    const approvalRequestDto: ApprovalRequestDto<InventoryItemDto> = {
      id: uuidv4(),
      type: "DELETE",
      status: "PENDING",
      targetId: result.id,
      originalData: inventoryItemDto,
      proposedData: null,
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
];
