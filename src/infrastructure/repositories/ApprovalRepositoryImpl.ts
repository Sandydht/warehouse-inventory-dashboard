import type { AxiosResponse } from "axios";
import ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { privateApi } from "../http/axiosInstance";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import {
  toApprovalRequestDomain,
  toCreateApprovalRequestDto,
  toPageResponseApprovalRequestListDomain,
} from "../mappers/approvalMapper";
import type AddProduct from "../../domain/approval/entity/AddProduct";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalResponseDto } from "../dto/response/CreateApprovalResponseDto";
import type { ApprovalStatus } from "../../domain/approval/types";
import type { GetApprovalListResponseDto } from "../dto/response/GetApprovalListResponseDto";
import type PageResponse from "../../commons/models/PageResponse";

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

  async getApprovalList(params: {
    search?: string;
    status?: ApprovalStatus;
    sortBy?: string;
    order?: "asc" | "desc";
  }): Promise<PageResponse<ApprovalRequest<InventoryItem>>> {
    const { data } = await privateApi.get<
      GetApprovalListResponseDto<ApprovalRequest<InventoryItem>>,
      AxiosResponse<GetApprovalListResponseDto<ApprovalRequest<InventoryItem>>>
    >("/approval/approval-list", { params });

    return toPageResponseApprovalRequestListDomain(data);
  }
}

export default ApprovalRepositoryImpl;
