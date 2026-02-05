import { http, HttpResponse } from "msw";
import UserDummyData from "../json/user.json";
import { IndexedDbCrud } from "../indexeddb/crud";
import type { StockHistoryItemDto } from "../../dto/common/StockHistoryItemDto";

export const stockHistoryApi = [
  http.get("/api/stock-history/last-30-days-list", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = UserDummyData.find((user) => user.id === token);

    if (!user) {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const stockHistoryDb = new IndexedDbCrud<StockHistoryItemDto>(
      "stock_histories",
    );

    const allHistories = await stockHistoryDb.getAll();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last30Days = allHistories.filter((item) => {
      return new Date(item.createdAt) >= thirtyDaysAgo;
    });

    last30Days.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return HttpResponse.json(last30Days, { status: 200 });
  }),
];
