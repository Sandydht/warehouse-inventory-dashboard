import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBack24pxBlack from "../assets/images/svg/arrow_back_24px_black.svg";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showSnackbar } from "../store/snackbar/snackbarSlice";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useEffect } from "react";
import { getInventoryDetail } from "../store/inventory/inventoryThunk";
import { toGetInventoryDetailDomain } from "../../infrastructure/mappers/inventoryMapper";
import { createApprovalRequestEdit } from "../store/approval/approvalThunk";
import { fromCreateEditApprovalRequestDtoToEditProductDomain } from "../../infrastructure/mappers/approvalMapper";

type EditProductForm = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  supplier: string;
};

function EditInventoryPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProductForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useAppSelector(
    (state) => state.inventory.inventoryDetail,
  );

  const skuRegister = register("sku", {
    required: "SKU is required",
    pattern: {
      value: /^[A-Z0-9-]{6,12}$/,
      message: "SKU is invalid",
    },
  });

  const nameRegister = register("name", {
    required: "Name is required",
  });

  const categoryRegister = register("category", {
    required: "Category is required",
  });

  const priceRegister = register("price", {
    required: "Price is required",
    pattern: {
      value: /^[0-9]\d*$/,
      message: "Product price must be positive number",
    },
  });

  const quantityRegister = register("quantity", {
    required: "Quantity is required",
    pattern: {
      value: /^[0-9]\d*$/,
      message: "Product quantity must be positive number",
    },
  });

  const supplierRegister = register("supplier", {
    required: "Supplier is required",
  });

  const onSubmit = async (formData: EditProductForm) => {
    try {
      if (id) {
        await dispatch(
          createApprovalRequestEdit(
            fromCreateEditApprovalRequestDtoToEditProductDomain(id, formData),
          ),
        ).unwrap();
        reset();
        navigate("/inventory-list");
      }
    } catch (error) {
      dispatch(showSnackbar({ message: error as string, type: "error" }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getInventoryDetail(toGetInventoryDetailDomain(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!loading && data) {
      reset({
        sku: data.sku,
        name: data.name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        supplier: data.supplier,
      });
    }
  }, [data, loading, reset]);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex items-center justify-start gap-2">
        <Link
          to={`/inventory-list/detail/${data?.id}`}
          className="text-left p-2 rounded cursor-pointer"
        >
          <img
            src={ArrowBack24pxBlack}
            alt="Arrow back icon"
            className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
          />
        </Link>
        <p className="text-left text-[22px] leading-7 font-bold">
          Edit Product
        </p>
      </div>

      <form
        className="w-full h-auto flex flex-col items-start justify-start gap-4 rounded-lg bg-white shadow-md border border-gray-200 p-4"
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
      >
        <InputField
          id="sku"
          label="SKU"
          type="text"
          required={true}
          placeholder="SKU"
          register={skuRegister}
          error={errors.sku}
        />

        <InputField
          id="name"
          label="Name"
          type="text"
          required={true}
          placeholder="Name"
          register={nameRegister}
          error={errors.name}
        />

        <InputField
          id="category"
          label="Category"
          type="text"
          required={true}
          placeholder="Category"
          register={categoryRegister}
          error={errors.category}
        />

        <InputField
          id="price"
          label="Price"
          type="number"
          required={true}
          placeholder="Price"
          register={priceRegister}
          error={errors.price}
        />

        <InputField
          id="quantity"
          label="Quantity"
          type="number"
          required={true}
          placeholder="Quantity"
          register={quantityRegister}
          error={errors.quantity}
        />

        <InputField
          id="supplier"
          label="Supplier"
          type="text"
          required={true}
          placeholder="Supplier"
          register={supplierRegister}
          error={errors.supplier}
        />

        <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
          <Button
            type="secondary"
            id="editProductToInventorySubmitButton"
            buttonType="submit"
            label={isSubmitting && !isDirty ? "Loading..." : "Submit"}
            disabled={isSubmitting || !isDirty}
          />
        </div>
      </form>
    </div>
  );
}

export default EditInventoryPage;
