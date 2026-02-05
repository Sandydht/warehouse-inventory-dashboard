import { Link, useParams } from "react-router-dom";
import ArrowBack24pxBlack from "../assets/images/svg/arrow_back_24px_black.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { getInventoryDetail } from "../store/inventory/inventoryThunk";
import { toGetInventoryDetailDomain } from "../../infrastructure/mappers/inventoryMapper";
import Button from "../components/Button";
import { openModal } from "../store/modal/confirmationModalSlice";

function InventoryDetailPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data } = useAppSelector((state) => state.inventory.inventoryDetail);

  useEffect(() => {
    if (id) {
      dispatch(getInventoryDetail(toGetInventoryDetailDomain(id)));
    }
  }, [id, dispatch]);

  const handleOpenConfirmationModalForDeleteInventory = (id: string) => {
    dispatch(
      openModal({
        title: "Delete Product from Inventory",
        body: "Are you sure you want to delete product from inventory?",
        confirmType: "DELETE_PRODUCT_FROM_INVENTORY",
        payload: { id },
      }),
    );
  };

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
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
        <p className="text-left text-[22px] leading-7 font-bold">
          Inventory Detail
        </p>
      </div>

      <div className="w-full h-auto min-h-[calc(100vh-205px)] flex flex-col items-start justify-start gap-4">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-4 rounded-lg bg-white shadow-md border border-gray-200 overflow-hidden">
          <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                SKU
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.sku || "-"}
              </p>
            </div>

            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Name
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.name || "-"}
              </p>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Category
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.category || "-"}
              </p>
            </div>

            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Price
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                Rp {data?.price || "-"}
              </p>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Quantity
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.quantity || "-"}
              </p>
            </div>

            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Supplier
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.supplier || "-"}
              </p>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Created At
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.createdAt || "-"}
              </p>
            </div>

            <div className="w-full h-auto flex flex-col items-start justify-start">
              <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
                Updated At
              </p>
              <p className="text-left text-[16px] leading-6 text-black">
                {data?.updatedAt || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto flex items-center justify-center gap-4">
        <Link
          to={`/inventory-list/${data?.id}/edit`}
          className="w-full h-auto px-4 py-2 text-center text-[14px] leading-5 font-bold rounded-lg focus:border-blue-500 text-white min-h-9 max-h-9 bg-sky-500 hover:bg-sky-600 cursor-pointer"
        >
          Edit
        </Link>
        <Button
          type="danger"
          id="deleteButton"
          buttonType="button"
          label={"Delete"}
          disabled={false}
          onClick={() =>
            handleOpenConfirmationModalForDeleteInventory(data?.id as string)
          }
        />
      </div>
    </div>
  );
}

export default InventoryDetailPage;
