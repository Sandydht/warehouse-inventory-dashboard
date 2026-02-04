import type { AxiosResponse } from "axios";
import ApprovalRepository from "../../domain/approval/ApprovalRepository";
import { privateApi } from "../http/axiosInstance";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import {
  fromAddProductDomainToCreateApprovalRequestDto,
  fromGetApprovalListResponseDtoToPaginatedResultDomain,
  fromApprovalRequestDtoToApprovalRequestDomain,
} from "../mappers/approvalMapper";
import type AddProduct from "../../domain/approval/entity/AddProduct";
import type ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { GetApprovalListResponseDto } from "../dto/response/GetApprovalListResponseDto";
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type { ApprovalRequestDto } from "../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";
import type GetApprovalRequestDetail from "../../domain/approval/entity/GetApprovalRequestDetail";
import type ApproveRequest from "../../domain/approval/entity/ApproveRequest";
import type RejectRequest from "../../domain/approval/entity/RejectRequest";

class ApprovalRepositoryImpl extends ApprovalRepository {
  async createApprovalRequest(
    payload: AddProduct,
  ): Promise<ApprovalRequest<InventoryItem>> {
    const { data } = await privateApi.post<
      ApprovalRequestDto<InventoryItemDto>,
      AxiosResponse<ApprovalRequestDto<InventoryItemDto>>,
      CreateApprovalRequestDto
    >(
      "/approval/create-approval",
      fromAddProductDomainToCreateApprovalRequestDto(payload),
    );

    return fromApprovalRequestDtoToApprovalRequestDomain(data);
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

    return fromGetApprovalListResponseDtoToPaginatedResultDomain(data);
  }

  async getApprovalRequestDetail(
    payload: GetApprovalRequestDetail,
  ): Promise<ApprovalRequest<InventoryItem>> {
    const { data } = await privateApi.get<
      ApprovalRequestDto<InventoryItemDto>,
      AxiosResponse<ApprovalRequestDto<InventoryItemDto>>
    >(`/approval/approval-request-detail/${payload.getId()}`);

    return fromApprovalRequestDtoToApprovalRequestDomain(data);
  }

  async approveRequest(
    payload: ApproveRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    const { data } = await privateApi.post<
      ApprovalRequestDto<InventoryItemDto>,
      AxiosResponse<ApprovalRequestDto<InventoryItemDto>>
    >(`/approval/${payload.getId()}/approve`);

    return fromApprovalRequestDtoToApprovalRequestDomain(data);
  }

  async rejectRequst(
    payload: RejectRequest,
  ): Promise<ApprovalRequest<InventoryItem>> {
    const { data } = await privateApi.post<
      ApprovalRequestDto<InventoryItemDto>,
      AxiosResponse<ApprovalRequestDto<InventoryItemDto>>
    >(`/approval/${payload.getId()}/reject`, {
      rejectReason: payload.getRejectReason(),
    });

    return fromApprovalRequestDtoToApprovalRequestDomain(data);
  }
}

export default ApprovalRepositoryImpl;
