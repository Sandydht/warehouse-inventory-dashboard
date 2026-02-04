import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import Button from "../Button";
import { closeModal } from "../../store/modal/confirmationModalSlice";
import { logoutAccount } from "../../store/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import {
  approveRequest,
  createApprovalRequestDelete,
} from "../../store/approval/approvalThunk";
import {
  toApproveRequestDomain,
  toDeleteProductDomain,
} from "../../../infrastructure/mappers/approvalMapper";

function ConfirmationModalBox() {
  const { isOpen, title, body, confirmType, payload } = useSelector(
    (state: RootState) => state.confirmationModal,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const payloadWithId = payload as { id: string };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    switch (confirmType) {
      case "LOGOUT_ACCOUNT":
        handleLogout();
        break;
      case "APPROVE_REQUEST":
        handleApproveRequest();
        break;
      case "DELETE_PRODUCT_FROM_INVENTORY":
        handleDeleteProductFromInventory();
        break;
      default:
        dispatch(closeModal());
        break;
    }

    dispatch(closeModal());
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutAccount()).unwrap();
      dispatch(closeModal());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleApproveRequest = async () => {
    try {
      await dispatch(
        approveRequest(toApproveRequestDomain(payloadWithId.id)),
      ).unwrap();
      dispatch(closeModal());
      navigate("/my-task");
    } catch (error) {
      console.error("Approve request failed:", error);
    }
  };

  const handleDeleteProductFromInventory = async () => {
    try {
      await dispatch(
        createApprovalRequestDelete(toDeleteProductDomain(payloadWithId.id)),
      ).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.error(
        "Create approval request delete product from inventory failed:",
        error,
      );
    }
  };

  return (
    <div className="w-full h-full fixed left-0 top-0 right-0 bottom-0 z-50 inset-0">
      <div className="absolute inset-0 bg-black/50" />

      <div className="w-full h-full relative z-10 left-0 top-0 right-0 bottom-0 flex items-center justify-center p-4">
        <div className="w-full h-auto bg-white rounded-2xl shadow-xl max-w-lg flex flex-col items-start justify-start overflow-hidden">
          <div className="w-full h-auto px-6 py-4 border-b-2 border-gray-300">
            <p className="text-left text-[22px] leading-7 font-semibold">
              {title}
            </p>
          </div>
          <div className="w-full h-auto px-6 py-4">
            <p className="text-left text-[16px] leading-6">{body}</p>
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
                buttonType="button"
                label={"Confirm"}
                disabled={false}
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModalBox;
