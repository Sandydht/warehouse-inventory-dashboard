import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../../domain/user/types";
import { useAppSelector } from "../store/hooks";

type RoleGuardProps = {
  allowedRoles: UserRole[];
};

function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { loading, data, error } = useAppSelector(
    (state) => state.user.userProfile,
  );

  if (loading || !data || error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data?.role || !allowedRoles.includes(data.role as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleGuard;
