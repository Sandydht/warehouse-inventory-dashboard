import { http, HttpResponse } from "msw";
import UserDummyData from "../json/user.json";
import { IndexedDbCrud } from "../indexeddb/crud";
import type { InventoryItemDto } from "../../dto/common/InventoryItemDto";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import type { SortOrder } from "../../../commons/models/types";
import { paginateArray } from "../utils/paginateArray";

export const inventoryApi = [
  http.get("/api/inventory/inventory-list", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user) {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);

    const page = url.searchParams.get("page") ?? 1;
    const limit = url.searchParams.get("limit") ?? 10;
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const sortBy = url.searchParams.get("sortBy") ?? "updatedAt";
    const sortOrder = url.searchParams.get("sortOrder") ?? "desc";

    const inventoryDb = new IndexedDbCrud<InventoryItemDto>("inventories");
    let inventoryList = await inventoryDb.getAll();
    inventoryList = inventoryList.filter((data) => data.deletedAt === null);

    if (search) {
      inventoryList = inventoryList.filter((data) => {
        const name = data.name.toLowerCase() ?? "";
        const sku = data.sku.toLowerCase() ?? "";

        return name.includes(search) || sku.includes(search);
      });
    }

    inventoryList.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case "sku":
          aValue = a.sku;
          bValue = b.sku;
          break;

        case "name":
          aValue = a.name;
          bValue = b.name;
          break;

        case "category":
          aValue = a.category;
          bValue = b.category;
          break;

        case "price":
          aValue = a.price;
          bValue = b.price;
          break;

        case "quantity":
          aValue = a.quantity;
          bValue = b.quantity;
          break;

        case "supplier":
          aValue = a.supplier;
          bValue = b.supplier;
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
    const result = paginateArray<InventoryItemDto>(inventoryList, query);

    return HttpResponse.json(result, { status: 200 });
  }),
  http.get(
    "/api/inventory/inventory-detail/:id",
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

      const { id } = params;

      if (!id) {
        return HttpResponse.json({ message: "Invalid id" }, { status: 400 });
      }

      const inventoryDb = new IndexedDbCrud<InventoryItemDto>("inventories");
      const inventory = await inventoryDb.getById(String(id));

      if (!inventory) {
        return HttpResponse.json({ message: "Not Found" }, { status: 404 });
      }

      return HttpResponse.json(inventory, { status: 200 });
    },
  ),
];
