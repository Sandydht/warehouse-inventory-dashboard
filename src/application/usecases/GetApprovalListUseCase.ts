import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../domain/approval/constants";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type { ApprovalStatus } from "../../domain/approval/types";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type MethodAssertion from "../utils/MethodAssertion";

class GetApprovalListUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly approvalRepository: ApprovalRepository;

  constructor(
    methodAssertion: MethodAssertion,
    approvalRepository: ApprovalRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.approvalRepository = approvalRepository;
  }

  async execute(params: {
    search?: string;
    status?: ApprovalStatus;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<PaginatedResult<ApprovalRequest<InventoryItem>>> {
    this.methodAssertion.assertImplemented(
      this.approvalRepository,
      "getApprovalList",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.approvalRepository.getApprovalList(params);
  }
}

export default GetApprovalListUseCase;
