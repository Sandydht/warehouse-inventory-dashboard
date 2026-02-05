import type { ApprovalRequestDto } from "../../infrastructure/dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../infrastructure/dto/common/InventoryItemDto";
import BadgeLabel from "./BadgeLabel";

interface ApprovalRequestDetailCardProps {
  data: ApprovalRequestDto<InventoryItemDto>;
}

function ApprovalRequestDetailCard({ data }: ApprovalRequestDetailCardProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start rounded-lg bg-white shadow-md border border-gray-200">
      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            SKU
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.sku || "-"
              : data.proposedData?.sku || "-"}
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start gap-1 md:w-auto">
          <BadgeLabel type={data.status} value={data.status} />
          <BadgeLabel type={data.type} value={data.type} />
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Name
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.name || "-"
              : data.proposedData?.name || "-"}
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Category
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.category || "-"
              : data.proposedData?.category || "-"}
          </p>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Price
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? `Rp ${data.originalData?.price || "-"}`
              : `Rp ${data.proposedData?.price || "-"}`}
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Quantity
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.quantity || "-"
              : data.proposedData?.quantity || "-"}
          </p>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Supplier
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.supplier || "-"
              : data.proposedData?.supplier || "-"}
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Created At
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.createdAt || "-"
              : data.proposedData?.createdAt || "-"}
          </p>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Updated At
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.type === "DELETE"
              ? data.originalData?.updatedAt || "-"
              : data.proposedData?.updatedAt || "-"}
          </p>
        </div>

        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Created By
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.createdBy || "-"}
          </p>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-4 md:flex-row p-4 border-b border-gray-300">
        <div className="w-full h-auto flex flex-col items-start justify-start">
          <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
            Checked By
          </p>
          <p className="text-left text-[16px] leading-6 text-black">
            {data.checkedBy || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApprovalRequestDetailCard;
