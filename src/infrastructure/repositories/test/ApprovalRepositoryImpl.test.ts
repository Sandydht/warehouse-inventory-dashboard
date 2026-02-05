import { describe, expect, it, vi } from "vitest";
import ApprovalRepositoryImpl from "../ApprovalRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/approval/entity/AddProduct";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import {
  fromApprovalRequestDtoToApprovalRequestDomain,
  fromEditProductDomainToCreatedEditApprovalRequestDto,
} from "../../mappers/approvalMapper";
import type { GetApprovalListResponseDto } from "../../dto/response/GetApprovalListResponseDto";
import type { ApprovalRequestDto } from "../../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../dto/common/InventoryItemDto";
import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import GetApprovalRequestDetail from "../../../domain/approval/entity/GetApprovalRequestDetail";
import ApproveRequest from "../../../domain/approval/entity/ApproveRequest";
import RejectRequest from "../../../domain/approval/entity/RejectRequest";
import DeleteProduct from "../../../domain/approval/entity/DeleteProduct";
import EditProduct from "../../../domain/approval/entity/EditProduct";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    post: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("ApprovalRepositoryImpl", () => {
  const approvalRepositoryImpl: ApprovalRepositoryImpl =
    new ApprovalRepositoryImpl();

  const now = new Date("2026-03-02").toISOString();
  const mockInventoryItemDto: InventoryItemDto = {
    id: "inv-001",
    sku: "PRODUCT-001",
    name: "Product Name",
    category: "Electronics",
    price: 500000,
    quantity: 10,
    supplier: "Supplier Name",
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  const mockApprovalRequestDto: ApprovalRequestDto<InventoryItemDto> = {
    id: "req-001",
    type: "CREATE",
    status: "PENDING",
    targetId: null,
    originalData: null,
    proposedData: mockInventoryItemDto,
    rejectionReason: null,
    createdBy: "staff-id",
    checkedBy: "officer-id",
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

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
      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.createApprovalRequest(mockProductItem);

      expect(privateApi.post).toHaveBeenCalledWith(
        "/approval/create-approval",
        mockProductItem,
      );
      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
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

  describe("getApprovalRequestDetail function", () => {
    const mockGetApprovalRequestDetail: GetApprovalRequestDetail =
      new GetApprovalRequestDetail("req-001");

    it("should fetch approval details and return mapped domain data", async () => {
      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.getApprovalRequestDetail(
          mockGetApprovalRequestDetail,
        );

      expect(privateApi.get).toHaveBeenCalledWith(
        `/approval/approval-request-detail/${mockGetApprovalRequestDetail.getId()}`,
      );

      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.get).mockRejectedValue(networkError);
      await expect(
        approvalRepositoryImpl.getApprovalRequestDetail(
          mockGetApprovalRequestDetail,
        ),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("approveRequest function", () => {
    const mockApproveRequest: ApproveRequest = new ApproveRequest("req-001");

    it("should successfully approve a request and return the domain model", async () => {
      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.approveRequest(mockApproveRequest);

      expect(privateApi.post).toHaveBeenCalledWith(
        `/approval/${mockApproveRequest.getId()}/approve`,
      );

      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.post).mockRejectedValue(networkError);
      await expect(
        approvalRepositoryImpl.approveRequest(mockApproveRequest),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("rejectRequst function", () => {
    const mockRejectRequest: RejectRequest = new RejectRequest(
      "req-001",
      "Test",
    );

    it("should successfully reject a request and return the domain model", async () => {
      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.rejectRequst(mockRejectRequest);

      expect(privateApi.post).toHaveBeenCalledWith(
        `/approval/${mockRejectRequest.getId()}/reject`,
        { rejectReason: mockRejectRequest.getRejectReason() },
      );

      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.post).mockRejectedValue(networkError);
      await expect(
        approvalRepositoryImpl.rejectRequst(mockRejectRequest),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("deleteProduct function", () => {
    const mockDeleteProduct: DeleteProduct = new DeleteProduct("req-001");

    it("should successfully delete a request and return the domain model", async () => {
      vi.mocked(privateApi.delete).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.deleteProduct(mockDeleteProduct);

      expect(privateApi.delete).toHaveBeenCalledWith(
        `/approval/delete/${mockDeleteProduct.getId()}`,
      );

      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.delete).mockRejectedValue(networkError);
      await expect(
        approvalRepositoryImpl.deleteProduct(mockDeleteProduct),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("editProduct function", () => {
    const mockEditProduct: EditProduct = new EditProduct(
      "env-001",
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
    );

    it("should successfully edit a request and return the domain model", async () => {
      vi.mocked(privateApi.patch).mockResolvedValue({
        data: mockApprovalRequestDto,
      });

      const result: ApprovalRequest<InventoryItem> =
        await approvalRepositoryImpl.editProduct(mockEditProduct);

      expect(privateApi.patch).toHaveBeenCalledWith(
        `/approval/edit/${mockEditProduct.getId()}`,
        fromEditProductDomainToCreatedEditApprovalRequestDto(mockEditProduct),
      );

      expect(result).toStrictEqual(
        fromApprovalRequestDtoToApprovalRequestDomain(mockApprovalRequestDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.patch).mockRejectedValue(networkError);
      await expect(
        approvalRepositoryImpl.editProduct(mockEditProduct),
      ).rejects.toThrow("Network Error");
    });
  });
});
