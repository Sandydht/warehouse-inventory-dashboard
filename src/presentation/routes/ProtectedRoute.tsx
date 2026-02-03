import { Navigate, Outlet } from "react-router-dom";
import SecureStorageImpl from "../../infrastructure/utils/SecureStorageImpl";

function ProtectedRoute() {
  const secureStorage: SecureStorageImpl = new SecureStorageImpl();
  const accessToken = secureStorage.getSecureItem("accessToken");
  if (!accessToken) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoute;
