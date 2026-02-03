import { Link } from "react-router-dom";
import ArrowBack24pxBlack from "../assets/images/svg/arrow_back_24px_black.svg";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { useAppDispatch } from "../store/hooks";
import { showSnackbar } from "../store/snackbar/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { createApprovalRequest } from "../store/approval/approvalThunk";
import { toAddProductDomain } from "../../infrastructure/mappers/approvalMapper";
import type { CreateApprovalRequestDto } from "../../infrastructure/dto/request/CreateApprovalRequestDto";

type AddProductToInventoryForm = {
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  supplier: string;
};

function AddProductInventoryListPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductToInventoryForm>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async (formData: AddProductToInventoryForm) => {
    try {
      const payload: CreateApprovalRequestDto = {
        sku: formData.sku,
        name: formData.name,
        category: formData.category,
        price: formData.price,
        quantity: formData.quantity,
        supplier: formData.supplier,
      };
      await dispatch(createApprovalRequest(toAddProductDomain(payload)));

      reset();
      navigate("/inventory-list");
    } catch (error) {
      dispatch(showSnackbar({ message: error as string, type: "error" }));
    }
  };

  return (
    <form
      className="w-full h-auto flex flex-col items-start justify-start gap-4"
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
    >
      <div className="w-full h-auto flex items-center justify-start gap-2">
        <Link
          to={"/inventory-list"}
          className="text-left p-2 rounded cursor-pointer"
        >
          <img
            src={ArrowBack24pxBlack}
            alt="Arrow back icon"
            className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
          />
        </Link>

        <p className="text-left text-[22px] text-black leading-7">
          Add Product To Inventory
        </p>
      </div>

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
        <button
          className={`w-full h-auto text-white font-bold py-2 px-4 rounded-lg text-center text-[14px] leading-5 focus:border-blue-500 ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default AddProductInventoryListPage;
