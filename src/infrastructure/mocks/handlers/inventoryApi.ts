import { http, HttpResponse } from "msw";
import type { AddProductRequestDto } from "../../dto/request/AddProductRequestDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import { v4 as uuidv4 } from "uuid";
import ApprovalRequest from "../../../domain/inventory/entity/ApprovalRequest";
import UserDummyData from "../json/user.json";
import { toAddProductResponseDto } from "../../mappers/inventoryMapper";
import type { AddProductResponseDto } from "../../dto/response/AddProductResponseDto";
import { IndexedDbCrud } from "../indexeddb/crud";

export const inventoryApi = [
  http.post("/api/inventory/add-product", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role == "OFFICER") {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = (await request.json()) as AddProductRequestDto;

    const inventoryItem: InventoryItem = new InventoryItem(
      uuidv4(),
      payload.sku,
      payload.name,
      payload.category,
      payload.price,
      payload.quantity,
      payload.supplier,
      new Date(Date.now()).toISOString(),
      new Date(Date.now()).toISOString(),
      null,
    );

    const approvalRequest: ApprovalRequest = new ApprovalRequest(
      uuidv4(),
      "CREATE",
      "PENDING",
      null,
      null,
      inventoryItem,
      null,
      user.fullName,
      new Date(Date.now()).toISOString(),
      new Date(Date.now()).toISOString(),
      null,
    );

    const jsonData = toAddProductResponseDto(approvalRequest);
    const approvalDb = new IndexedDbCrud<AddProductResponseDto>(
      "approval_requests",
    );
    await approvalDb.create(jsonData);

    return HttpResponse.json(jsonData, { status: 200 });
  }),
];
