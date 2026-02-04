import type { ApprovalStatus } from "../../domain/approval/types";
import type { SortOrder } from "./types";

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ApprovalStatus;
  sortBy?: string;
  sortOrder?: SortOrder;
}
