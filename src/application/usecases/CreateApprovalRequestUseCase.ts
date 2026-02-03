import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type AddProduct from "../../domain/approval/entity/AddProduct";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class CreateApprovalRequestUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly approvalRepository: ApprovalRepository;

  constructor(
    methodAssertion: MethodAssertion,
    approvalRepository: ApprovalRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.approvalRepository = approvalRepository;
  }

  async execute(payload: AddProduct): Promise<ApprovalRequest<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "createApprovalRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.approvalRepository.createApprovalRequest(payload);
  }
}

export default CreateApprovalRequestUseCase;
