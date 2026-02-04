import { describe, expect, it, vi } from "vitest";
import ApprovalRepositoryImpl from "../ApprovalRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/approval/entity/AddProduct";
import type { CreateApprovalResponseDto } from "../../dto/response/CreateApprovalResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import { toApprovalRequestDomain } from "../../mappers/approvalMapper";
import type { GetApprovalListResponseDto } from "../../dto/response/GetApprovalListResponseDto";
import type { ApprovalRequestDto } from "../../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../dto/common/InventoryItemDto";
import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("ApprovalRepositoryImpl", () => {
  const approvalRepositoryImpl: ApprovalRepositoryImpl =
    new ApprovalRepositoryImpl();

  describe("createApprovalRequest function", () => {
    const mockProductItem: AddProduct = new AddProduct(
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
    );

    it("should create approval request correctly", async () => {
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

      const mockCreateApprovalResponseDto: CreateApprovalResponseDto<InventoryItem> =
        {
          id: "req-001",
          type: "CREATE",
          status: "PENDING",
          targetId: null,
          originalData: null,
          proposedData: mockInventoryItem,
          rejectionReason: null,
          createdBy: "user",
          createdAt: now,
          updatedAt: now,
          deletedAt: null,
        };

      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockCreateApprovalResponseDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.createApprovalRequest(mockProductItem);

      expect(privateApi.post).toHaveBeenCalledWith(
        "/approval/create-approval",
        mockProductItem,
      );
      expect(result).toStrictEqual(
        toApprovalRequestDomain(mockCreateApprovalResponseDto),
      );
    });

    it("should throw error when create approvel request fails", async () => {
      vi.mocked(privateApi.post).mockRejectedValue(
        new Error("Failed to create approval request"),
      );

      await expect(
        approvalRepositoryImpl.createApprovalRequest(mockProductItem),
      ).rejects.toThrowError("Failed to create approval request");
    });
  });

  describe("getApprovalList function", () => {
    it("should fetch approval list with correct parameters and return mapped domain data", async () => {
      const mockParams: PaginationQuery = {
        page: 1,
        limit: 10,
        search: "",
        status: "PENDING",
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      const mockPaginationMeta: PaginationMeta = {
        page: 1,
        limit: 10,
        totalItems: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      };

      const mockGetApprovalListResponseDto: GetApprovalListResponseDto<
        ApprovalRequestDto<InventoryItemDto>
      > = {
        data: [],
        meta: mockPaginationMeta,
        query: mockParams,
      };

      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetApprovalListResponseDto,
      });

      const result: PaginatedResult<ApprovalRequest<InventoryItem>> =
        await approvalRepositoryImpl.getApprovalList(mockParams);

      expect(privateApi.get).toHaveBeenCalledWith("/approval/approval-list", {
        params: mockParams,
      });

      expect(result.data).toBe(mockGetApprovalListResponseDto.data);
      expect(result.meta).toBe(mockGetApprovalListResponseDto.meta);
      expect(result.query).toBe(mockGetApprovalListResponseDto.query);
    });

    it("should handle empty parameters gracefully", async () => {
      const mockParams: PaginationQuery = {};
      const mockPaginationMeta: PaginationMeta = {
        page: 1,
        limit: 10,
        totalItems: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      };

      const mockGetApprovalListResponseDto: GetApprovalListResponseDto<
        ApprovalRequestDto<InventoryItemDto>
      > = {
        data: [],
        meta: mockPaginationMeta,
        query: mockParams,
      };

      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetApprovalListResponseDto,
      });

      const result: PaginatedResult<ApprovalRequest<InventoryItem>> =
        await approvalRepositoryImpl.getApprovalList(mockParams);

      expect(privateApi.get).toHaveBeenCalledWith("/approval/approval-list", {
        params: mockParams,
      });

      expect(result.data).toBe(mockGetApprovalListResponseDto.data);
      expect(result.meta).toBe(mockGetApprovalListResponseDto.meta);
      expect(result.query).toBe(mockGetApprovalListResponseDto.query);
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.get).mockRejectedValue(networkError);
      await expect(approvalRepositoryImpl.getApprovalList({})).rejects.toThrow(
        "Network Error",
      );
    });
  });
});
