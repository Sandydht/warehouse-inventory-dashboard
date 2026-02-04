import type { PaginationMeta } from "./PaginationMeta";
import type { PaginationQuery } from "./PaginationQuery";

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
  query: Omit<PaginationQuery, "page" | "limit">;
}
