import { describe, expect, it, vi } from "vitest";
import ApprovalRepositoryImpl from "../ApprovalRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/approval/entity/AddProduct";
import type { CreateApprovalResponseDto } from "../../dto/response/CreateApprovalResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import { toApprovalRequestDomain } from "../../mappers/approvalMapper";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    post: vi.fn(),
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
});
