import { useForm } from "react-hook-form";
import Button from "../Button";
import TextareaInputField from "../TextareaInputField";
import { useAppDispatch } from "../../store/hooks";
import { showSnackbar } from "../../store/snackbar/snackbarSlice";
import { closeModal } from "../../store/modal/rejectApprovalRequestModalSlice";
import {
  getApprovalRequestDetail,
  rejectRequest,
} from "../../store/approval/approvalThunk";
import {
  toGetApprovalRequestDetailDomain,
  toRejectRequestDomain,
} from "../../../infrastructure/mappers/approvalMapper";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

type RejectApprovalRequestForm = {
  rejectReason: string;
};

function RejectApprovalRequestModalBox() {
  const { isOpen, payload } = useSelector(
    (state: RootState) => state.rejectApprovalRequestModal,
  );
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RejectApprovalRequestForm>();
  const payloadWithId = payload as { id: string };

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const rejectReasonRegister = register("rejectReason", {
    required: "Reject reason is required",
  });

  const onSubmit = async (formData: RejectApprovalRequestForm) => {
    try {
      await dispatch(
        rejectRequest(
          toRejectRequestDomain(payloadWithId.id, formData.rejectReason),
        ),
      );
      await dispatch(
        getApprovalRequestDetail(
          toGetApprovalRequestDetailDomain(payloadWithId.id),
        ),
      );

      reset();
      dispatch(closeModal());
      dispatch(
        showSnackbar({
          message: "The request has been rejected successfully.",
          type: "error",
        }),
      );
    } catch (error) {
      dispatch(showSnackbar({ message: error as string, type: "error" }));
    }
  };

  return (
    <div className="w-full h-full fixed left-0 top-0 right-0 bottom-0 z-50 inset-0">
      <div className="absolute inset-0 bg-black/50" />

      <div className="w-full h-full relative z-10 left-0 top-0 right-0 bottom-0 flex items-center justify-center p-4">
        <form
          className="w-full h-auto bg-white rounded-2xl shadow-xl max-w-lg flex flex-col items-start justify-start overflow-hidden"
          onSubmit={(e) => handleSubmit(onSubmit)(e)}
        >
          <div className="w-full h-auto px-6 py-4 border-b-2 border-gray-300">
            <p className="text-left text-[22px] leading-7 font-semibold">
              Reject Approval Request
            </p>
          </div>

          <div className="w-full h-auto px-6 py-4">
            <TextareaInputField
              id="rejectReason"
              label="Are you sure you want to reject this approval request? Please provide a clear reason for rejection to help the requester understand the decision."
              register={rejectReasonRegister}
              placeholder="Your reject reason..."
              required={true}
              error={errors.rejectReason}
            />
          </div>

          <div className="w-full h-auto px-6 py-4 border-t-2 border-gray-300 flex items-center justify-end">
            <div className="w-auto h-auto flex items-center justify-end gap-2">
              <Button
                type="gray"
                id="cancelButton"
                buttonType="button"
                label={"Cancel"}
                disabled={false}
                onClick={handleClose}
              />
              <Button
                type="secondary"
                id="confirmButton"
                buttonType="submit"
                label={isSubmitting ? "Loading..." : "Submit"}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RejectApprovalRequestModalBox;
