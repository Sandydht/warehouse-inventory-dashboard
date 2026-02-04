import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { getApprovalList } from "../store/approval/approvalThunk";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";

function MyTaskPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mockParams: PaginationQuery = {
      page: 4,
      limit: 5,
      search: "",
      status: "PENDING",
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    dispatch(getApprovalList(mockParams)).unwrap();
  }, [dispatch]);

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4">
      <p>My Task Page</p>
    </div>
  );
}

export default MyTaskPage;
