import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type ApproveRequest from "../../domain/approval/entity/ApproveRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class ApproveRequestUseCase {
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
    payload: ApproveRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "approveRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return this.approvalRepository.approveRequest(payload);
  }
}

export default ApproveRequestUseCase;
