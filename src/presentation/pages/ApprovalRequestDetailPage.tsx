import { Link, useParams } from "react-router-dom";
import ArrowBack24pxBlack from "../assets/images/svg/arrow_back_24px_black.svg";
import DiffPreview from "../components/DiffPreview";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getApprovalRequestDetail } from "../store/approval/approvalThunk";
import GetApprovalRequestDetail from "../../domain/approval/entity/GetApprovalRequestDetail";
import ApprovalRequestDetailCard from "../components/ApprovalRequestDetailCard";

function ApprovalRequestDetailPage() {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(
    (state) => state.approval.approvalRequestDetail,
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getApprovalRequestDetail(new GetApprovalRequestDetail(id)));
    }
  }, [id, dispatch]);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <div className="w-full h-auto flex items-center justify-start gap-2">
        <Link to={"/my-task"} className="text-left p-2 rounded cursor-pointer">
          <img
            src={ArrowBack24pxBlack}
            alt="Arrow back icon"
            className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
          />
        </Link>
        <p className="text-left text-[22px] leading-7 font-bold">
          Approval Request Detail
        </p>
      </div>

      <div className="w-full h-auto flex flex-col items-start justify-start gap-2">
        {!loading && data && data.type === "CREATE" && (
          <>
            <ApprovalRequestDetailCard data={data} />
          </>
        )}

        {!loading && data && data.type === "UPDATE" && (
          <>
            <DiffPreview
              diffs={[
                {
                  field: "SKU",
                  before: data?.originalData?.sku,
                  after: data?.proposedData?.sku,
                  type: "modified",
                },
                {
                  field: "Name",
                  before: data?.originalData?.name,
                  after: data?.proposedData?.name,
                  type: "modified",
                },
                {
                  field: "Category",
                  before: data?.originalData?.category,
                  after: data?.proposedData?.category,
                  type: "modified",
                },
                {
                  field: "Price",
                  before: data?.originalData?.price,
                  after: data?.proposedData?.price,
                  type: "modified",
                },
                {
                  field: "Quantity",
                  before: data?.originalData?.quantity,
                  after: data?.proposedData?.quantity,
                  type: "modified",
                },
                {
                  field: "Supplier",
                  before: data?.originalData?.supplier,
                  after: data?.proposedData?.supplier,
                  type: "modified",
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ApprovalRequestDetailPage;
