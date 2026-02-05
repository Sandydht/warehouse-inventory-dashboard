import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import { safePositiveNumber } from "./safePositiveNumber";

export function paginateArray<T>(
  items: T[],
  query: PaginationQuery = {},
): PaginatedResult<T> {
  const totalItems = safePositiveNumber(items.length, 0, 0);

  const limit = safePositiveNumber(query.limit, 10, 1);
  const requestedPage = safePositiveNumber(query.page, 1, 1);

  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

  const page = Math.min(requestedPage, totalPages);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = items.slice(startIndex, endIndex);

  return {
    data,
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    query: {
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    },
  };
}
