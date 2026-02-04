import { describe, expect, it, vi } from "vitest";
import ApprovalRepository from "../ApprovalRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { APPROVAL_REPOSITORY_ERRORS } from "../constants";
import AddProduct from "../entity/AddProduct";

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
  });
});
