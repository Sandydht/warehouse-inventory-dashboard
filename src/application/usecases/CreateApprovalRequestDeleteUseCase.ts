import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type DeleteProduct from "../../domain/approval/entity/DeleteProduct";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class CreateApprovalRequestDeleteUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly approvalRepository: ApprovalRepository;

  constructor(
    methodAssertion: MethodAssertion,
    approvalRepository: ApprovalRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.approvalRepository = approvalRepository;
  }

  async execute(
    payload: DeleteProduct,
  ): Promise<ApprovalRequest<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "deleteProduct",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.approvalRepository.deleteProduct(payload);
  }
}

export default CreateApprovalRequestDeleteUseCase;
