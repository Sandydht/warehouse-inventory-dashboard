import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import SecureStorageImpl from "../../infrastructure/utils/SecureStorageImpl";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const secureStorage: SecureStorageImpl = new SecureStorageImpl();
  const accessToken = secureStorage.getSecureItem("accessToken");
  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
