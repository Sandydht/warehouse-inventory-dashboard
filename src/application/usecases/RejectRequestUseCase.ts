import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type RejectRequest from "../../domain/approval/entity/RejectRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class RejectRequestUseCase {
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
    payload: RejectRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "rejectRequst",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return this.approvalRepository.rejectRequst(payload);
  }
}

export default RejectRequestUseCase;
