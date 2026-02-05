import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import GetApprovalListUseCase from "../GetApprovalListUseCase";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";
import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";

describe("Get approval list use case", () => {
  it("should orchestrating the get approval list action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockParams: PaginationQuery = {
      search: "laptop",
      status: "PENDING",
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    const now = new Date("2026-03-02").toISOString();
    const mockInventoryItem: InventoryItem = new InventoryItem(
      "inv-001",
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
      now,
      now,
      null,
    );

    const mockApprovalRequest: ApprovalRequest<InventoryItem> =
      new ApprovalRequest<InventoryItem>(
        "req-001",
        "CREATE",
        "PENDING",
        null,
        null,
        mockInventoryItem,
        null,
        "staff-id",
        "officer-id",
        now,
        now,
        null,
      );

    const mockPaginationMeta: PaginationMeta = {
      page: 1,
      limit: 10,
      totalItems: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const mockPaginatedResult: PaginatedResult<ApprovalRequest<InventoryItem>> =
      {
        data: [mockApprovalRequest],
        meta: mockPaginationMeta,
        query: mockParams,
      };

    const mockApprovalRepository: ApprovalRepository = {
      getApprovalList: vi.fn().mockResolvedValue(mockPaginatedResult),
    };

    const getApprovalListUseCase: GetApprovalListUseCase =
      new GetApprovalListUseCase(mockMethodAssertion, mockApprovalRepository);

    const result: PaginatedResult<ApprovalRequest<InventoryItem>> =
      await getApprovalListUseCase.execute(mockParams);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "getApprovalList",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.getApprovalList).toHaveBeenCalledWith(
      mockParams,
    );
    expect(result).toStrictEqual(mockPaginatedResult);
  });
});
