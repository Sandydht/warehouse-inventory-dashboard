/* eslint-disable @typescript-eslint/no-unused-vars */
import type PageResponse from "../../commons/models/PageResponse";
import type InventoryItem from "../inventory/entity/InventoryItem";
import { APPROVAL_REPOSITORY_ERRORS } from "./constants";
import type AddProduct from "./entity/AddProduct";
import type ApprovalRequest from "./entity/ApprovalRequest";
import type { ApprovalStatus } from "./types";

class ApprovalRepository {
  async createApprovalRequest?(
    _payload: AddProduct,
  ): Promise<ApprovalRequest<InventoryItem>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async getApprovalList?(_params: {
    search?: string;
    status?: ApprovalStatus;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<PageResponse<ApprovalRequest<InventoryItem>>> {
    throw new Error(APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default ApprovalRepository;
