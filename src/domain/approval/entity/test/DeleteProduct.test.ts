import { describe, expect, it } from "vitest";
import { DELETE_PRODUCT_ERRORS } from "../../constants";
import DeleteProduct from "../DeleteProduct";

describe("DeleteProduct entity", () => {
  const validPayload = {
    id: "env-001",
  };

  it("should throw error when id is empty", () => {
    expect(() => new DeleteProduct("")).toThrowError(
      DELETE_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const deleteProduct: DeleteProduct = new DeleteProduct(validPayload.id);

    expect(deleteProduct).toBeInstanceOf(DeleteProduct);
    expect(deleteProduct.getId()).toBe(validPayload.id);
  });
});
