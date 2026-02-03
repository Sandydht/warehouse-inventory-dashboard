import type { AxiosResponse } from "axios";
import ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { privateApi } from "../http/axiosInstance";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import {
  toApprovalRequestDomain,
  toCreateApprovalRequestDto,
} from "../mappers/approvalMapper";
import type AddProduct from "../../domain/approval/entity/AddProduct";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalResponseDto } from "../dto/response/CreateApprovalResponseDto";

class ApprovalRepositoryImpl extends ApprovalRepository {
  async createApprovalRequest(
    payload: AddProduct,
  ): Promise<ApprovalRequest<InventoryItem>> {
    const { data } = await privateApi.post<
      CreateApprovalResponseDto<InventoryItem>,
      AxiosResponse<CreateApprovalResponseDto<InventoryItem>>,
      CreateApprovalRequestDto
    >("/approval/create-approval", toCreateApprovalRequestDto(payload));

    return toApprovalRequestDomain(data);
  }
}

export default ApprovalRepositoryImpl;
