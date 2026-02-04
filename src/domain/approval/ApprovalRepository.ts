/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type InventoryItem from "../inventory/entity/InventoryItem";
import { APPROVAL_REPOSITORY_ERRORS } from "./constants";
import type AddProduct from "./entity/AddProduct";
import type ApprovalRequest from "./entity/ApprovalRequest";

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
}

export default ApprovalRepository;
