import type { AxiosResponse } from "axios";
import ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { privateApi } from "../http/axiosInstance";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import {
  toApprovalRequestDomain,
  toCreateApprovalRequestDto,
  toPaginatedResultDomain,
} from "../mappers/approvalMapper";
import type AddProduct from "../../domain/approval/entity/AddProduct";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalResponseDto } from "../dto/response/CreateApprovalResponseDto";
import type { GetApprovalListResponseDto } from "../dto/response/GetApprovalListResponseDto";
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type { ApprovalRequestDto } from "../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";

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

  async getApprovalList(
    params: PaginationQuery,
  ): Promise<PaginatedResult<ApprovalRequest<InventoryItem>>> {
    const { data } = await privateApi.get<
      GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>,
      AxiosResponse<
        GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>
      >
    >("/approval/approval-list", { params });

    return toPaginatedResultDomain(data);
  }
}

export default ApprovalRepositoryImpl;
