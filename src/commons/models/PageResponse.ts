import InputValidator from "../../domain/utils/InputValidator.util";
import { PAGED_SEARCH_RESULT_ERRORS } from "./constants";

class PageResponse<T> {
  private readonly data: T[];
  private readonly page: number;
  private readonly size: number;
  private readonly totalElements: number;
  private readonly totalPages: number;

  constructor(
    data: T[],
    page: number,
    size: number,
    totalElements: number,
    totalPages: number,
  ) {
    this._verifyPayload(page, size, totalElements, totalPages);

    this.data = data;
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }

  private _verifyPayload(
    page: number,
    size: number,
    totalElements: number,
    totalPages: number,
  ) {
    InputValidator.positiveNumberValidFormat(
      page,
      PAGED_SEARCH_RESULT_ERRORS.PAGE_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      size,
      PAGED_SEARCH_RESULT_ERRORS.SIZE_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      totalElements,
      PAGED_SEARCH_RESULT_ERRORS.TOTAL_ELEMENTS_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      totalPages,
      PAGED_SEARCH_RESULT_ERRORS.TOTAL_PAGES_MUST_BE_POSITIVE_NUMBER,
    );
  }

  getData(): T[] {
    return this.data;
  }

  getPage(): number {
    return this.page;
  }

  getSize(): number {
    return this.size;
  }

  getTotalElements(): number {
    return this.totalElements;
  }

  getTotalPages(): number {
    return this.totalPages;
  }
}

export default PageResponse;
