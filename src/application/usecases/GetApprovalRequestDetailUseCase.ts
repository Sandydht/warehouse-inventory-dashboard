import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type GetApprovalRequestDetail from "../../domain/approval/entity/GetApprovalRequestDetail";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class GetApprovalRequestDetailUseCase {
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
    payload: GetApprovalRequestDetail,
  ): Promise<ApprovalRequest<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "getApprovalRequestDetail",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return this.approvalRepository.getApprovalRequestDetail(payload);
  }
}

export default GetApprovalRequestDetailUseCase;
