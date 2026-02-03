import { http, HttpResponse } from "msw";
import UserDummyData from "../json/user.json";
import type { CreateApprovalRequestDto } from "../../dto/request/CreateApprovalRequestDto";
import { IndexedDbCrud } from "../indexeddb/crud";
import type { CreateApprovalResponseDto } from "../../dto/response/CreateApprovalResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import { v4 as uuidv4 } from "uuid";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import { toCreateApprovalResponseDto } from "../../mappers/approvalMapper";

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
];
