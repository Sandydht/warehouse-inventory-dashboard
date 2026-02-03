import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import ContentContainer from "../layouts/ContentContainer";
import InventoryList from "../pages/InventoryListPage";
import MyTaskPage from "../pages/MyTaskPage";
import RoleGuard from "./RoleGuard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ContentContainer />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
            <Route path="my-task" element={<MyTaskPage />} />
          </Route>
          <Route path="/inventory-list" element={<InventoryList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
