import { describe, expect, it, vi } from "vitest";
import ApprovalRepositoryImpl from "../ApprovalRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/approval/entity/AddProduct";
import type { CreateApprovalResponseDto } from "../../dto/response/CreateApprovalResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import {
  toApprovalRequestDomain,
  toPageResponseApprovalRequestListDomain,
} from "../../mappers/approvalMapper";
import type { ApprovalStatus } from "../../../domain/approval/types";
import type { GetApprovalListResponseDto } from "../../dto/response/GetApprovalListResponseDto";

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
      const mockParams = {
        search: "laptop",
        status: "PENDING" as ApprovalStatus,
        sortBy: "createdAt",
        order: "desc" as const,
      };
      const mockGetApprovalListResponseDto: GetApprovalListResponseDto<
        ApprovalRequest<InventoryItem>
      > = {
        data: [],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 1,
      };

      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetApprovalListResponseDto,
      });

      const result = await approvalRepositoryImpl.getApprovalList(mockParams);

      expect(privateApi.get).toHaveBeenCalledWith("/approval/approval-list", {
        params: mockParams,
      });
      expect(result).toStrictEqual(
        toPageResponseApprovalRequestListDomain(mockGetApprovalListResponseDto),
      );
    });

    it("should handle empty parameters gracefully", async () => {
      const mockParams = {};
      const mockGetApprovalListResponseDto: GetApprovalListResponseDto<
        ApprovalRequest<InventoryItem>
      > = {
        data: [],
        page: 1,
        size: 10,
        totalElements: 0,
        totalPages: 1,
      };

      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetApprovalListResponseDto,
      });

      const result = await approvalRepositoryImpl.getApprovalList(mockParams);

      expect(privateApi.get).toHaveBeenCalledWith("/approval/approval-list", {
        params: mockParams,
      });
      expect(result).toStrictEqual(
        toPageResponseApprovalRequestListDomain(mockGetApprovalListResponseDto),
      );
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
