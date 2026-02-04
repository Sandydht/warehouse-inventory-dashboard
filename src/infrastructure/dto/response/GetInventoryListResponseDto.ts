import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";

export interface GetInventoryListResponseDto<T> {
  data: T[];
  meta: PaginationMeta;
  query: Omit<PaginationQuery, "page" | "limit">;
}
