export interface GetApprovalListResponseDto<T> {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
