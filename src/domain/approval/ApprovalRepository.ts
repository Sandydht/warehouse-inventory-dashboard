/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type InventoryItem from "../inventory/entity/InventoryItem";
import { APPROVAL_REPOSITORY_ERRORS } from "./constants";
import type AddProduct from "./entity/AddProduct";
import type ApprovalRequest from "./entity/ApprovalRequest";
import type ApproveRequest from "./entity/ApproveRequest";
import type GetApprovalRequestDetail from "./entity/GetApprovalRequestDetail";
import type RejectRequest from "./entity/RejectRequest";

class ApprovalRepository {
  async createApprovalRequest?(
    _payload: AddProduct,
  ): Promise<ApprovalRequest<InventoryItem>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async getApprovalList?(
    _params: PaginationQuery,
  ): Promise<PaginatedResult<ApprovalRequest<InventoryItem>>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async getApprovalRequestDetail?(
    _payload: GetApprovalRequestDetail,
  ): Promise<ApprovalRequest<InventoryItem>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async approveRequest?(
    _payload: ApproveRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async rejectRequst?(
    _payload: RejectRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default ApprovalRepository;
