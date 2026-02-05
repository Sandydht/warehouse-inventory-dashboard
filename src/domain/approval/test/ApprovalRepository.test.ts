import { describe, expect, it, vi } from "vitest";
import ApprovalRepository from "../ApprovalRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { APPROVAL_REPOSITORY_ERRORS } from "../constants";
import AddProduct from "../entity/AddProduct";
import GetApprovalRequestDetail from "../entity/GetApprovalRequestDetail";
import ApproveRequest from "../entity/ApproveRequest";
import RejectRequest from "../entity/RejectRequest";
import DeleteProduct from "../entity/DeleteProduct";
import EditProduct from "../entity/EditProduct";

describe("ApprovalRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const approvalRepository: ApprovalRepository = new ApprovalRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "createApprovalRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "getApprovalList",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "getApprovalRequestDetail",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "approveRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "rejectRequst",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "deleteProduct",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      approvalRepository,
      "editProduct",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(approvalRepository).toBeInstanceOf(ApprovalRepository);
    await expect(
      approvalRepository.createApprovalRequest(
        new AddProduct(
          "PRODUCT-001",
          "Product Name",
          "Electronics",
          500000,
          10,
          "Supplier Name",
        ),
      ),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(approvalRepository.getApprovalList({})).rejects.toThrowError(
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    await expect(
      approvalRepository.getApprovalRequestDetail(
        new GetApprovalRequestDetail("req-001"),
      ),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(
      approvalRepository.approveRequest(new ApproveRequest("req-001")),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(
      approvalRepository.rejectRequst(new RejectRequest("req-001", "Test")),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(
      approvalRepository.deleteProduct(new DeleteProduct("req-001")),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(
      approvalRepository.editProduct(
        new EditProduct(
          "env-001",
          "PRODUCT-001",
          "Product Name",
          "Electronics",
          500000,
          10,
          "Supplier Name",
        ),
      ),
    ).rejects.toThrowError(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
