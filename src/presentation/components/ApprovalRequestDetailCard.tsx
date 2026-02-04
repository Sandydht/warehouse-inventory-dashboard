import type { ApprovalRequestDto } from "../../infrastructure/dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../infrastructure/dto/common/InventoryItemDto";
import BadgeLabel from "./BadgeLabel";
import DetailItem from "./DetailItem";

interface ApprovalRequestDetailCardProps {
  data: ApprovalRequestDto<InventoryItemDto>;
}

function ApprovalRequestDetailCard({ data }: ApprovalRequestDetailCardProps) {
  return (
    <div className="w-full h-auto rounded-lg bg-white shadow-md border border-gray-200 overflow-hidden">
      <div className="flex flex-col gap-2 border-b border-gray-300 p-6 md:flex-row md:items-center md:justify-between">
        <div className="w-full h-auto flex flex-col items-start justify-start gap-1">
          <h1 className="text-xl font-semibold text-gray-900">
            {data.proposedData?.name}
          </h1>
          <p className="text-sm text-gray-500">SKU: {data.proposedData?.sku}</p>
        </div>

        <div className="w-auto h-auto flex flex-col items-start justify-start gap-1">
          <BadgeLabel type={data.status} value={data.status} />
          <BadgeLabel type={data.type} value={data.type} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <DetailItem
          label="Category"
          value={data.proposedData?.category || "-"}
        />
        <DetailItem
          label="Supplier"
          value={data.proposedData?.supplier || "-"}
        />

        <DetailItem
          label="Price"
          value={`Rp ${data.proposedData?.price.toLocaleString("id-ID")}`}
        />
        <DetailItem
          label="Quantity"
          value={data.proposedData?.quantity.toString() || "-"}
        />

        <DetailItem
          label="Created At"
          value={
            data.proposedData?.createdAt
              ? new Date(data.proposedData.createdAt).toLocaleString()
              : "-"
          }
        />
        <DetailItem
          label="Updated At"
          value={
            data.proposedData?.updatedAt
              ? new Date(data.proposedData.updatedAt).toLocaleString()
              : "-"
          }
        />

        <DetailItem
          label="Deleted At"
          value={
            data.proposedData?.deletedAt
              ? new Date(data.proposedData.deletedAt).toLocaleString()
              : "-"
          }
        />
      </div>
    </div>
  );
}

export default ApprovalRequestDetailCard;
