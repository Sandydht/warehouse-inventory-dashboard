import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";

export interface GetApprovalListResponseDto<T> {
  data: T[];
  meta: PaginationMeta;
  query: Omit<PaginationQuery, "page" | "limit">;
}
