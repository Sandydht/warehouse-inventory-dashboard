import { describe, expect, it } from "vitest";
import { PAGED_SEARCH_RESULT_ERRORS } from "../constants";
import PageResponse from "../PageResponse";

describe("PageResponse entity", () => {
  const validPayload = {
    data: [],
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 1,
  };

  it("should throw error when page is not a positive number", () => {
    expect(
      () =>
        new PageResponse<unknown>(
          validPayload.data,
          -100,
          validPayload.size,
          validPayload.totalElements,
          validPayload.totalPages,
        ),
    ).toThrowError(PAGED_SEARCH_RESULT_ERRORS.PAGE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when size is not a positive number", () => {
    expect(
      () =>
        new PageResponse<unknown>(
          validPayload.data,
          validPayload.page,
          -100,
          validPayload.totalElements,
          validPayload.totalPages,
        ),
    ).toThrowError(PAGED_SEARCH_RESULT_ERRORS.SIZE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when totalElements is not a positive number", () => {
    expect(
      () =>
        new PageResponse<unknown>(
          validPayload.data,
          validPayload.page,
          validPayload.size,
          -10,
          validPayload.totalPages,
        ),
    ).toThrowError(
      PAGED_SEARCH_RESULT_ERRORS.TOTAL_ELEMENTS_MUST_BE_POSITIVE_NUMBER,
    );
  });

  it("should throw error when totalPages is not a positive number", () => {
    expect(
      () =>
        new PageResponse<unknown>(
          validPayload.data,
          validPayload.page,
          validPayload.size,
          validPayload.totalElements,
          -10,
        ),
    ).toThrowError(
      PAGED_SEARCH_RESULT_ERRORS.TOTAL_PAGES_MUST_BE_POSITIVE_NUMBER,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const pageResponse: PageResponse<unknown> = new PageResponse<unknown>(
      validPayload.data,
      validPayload.page,
      validPayload.size,
      validPayload.totalElements,
      validPayload.totalPages,
    );

    expect(pageResponse).toBeInstanceOf(PageResponse);
    expect(pageResponse.getData()).toBe(validPayload.data);
    expect(pageResponse.getPage()).toBe(validPayload.page);
    expect(pageResponse.getSize()).toBe(validPayload.size);
    expect(pageResponse.getTotalElements()).toBe(validPayload.totalElements);
    expect(pageResponse.getTotalPages()).toBe(validPayload.totalPages);
  });
});
