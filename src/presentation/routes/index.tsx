import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import ContentContainer from "../layouts/ContentContainer";
import InventoryList from "../pages/InventoryListPage";
import MyTaskPage from "../pages/MyTaskPage";
import RoleGuard from "./RoleGuard";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import AddProductInventoryListPage from "../pages/AddProductInventoryListPage";
import ApprovalRequestDetailPage from "../pages/ApprovalRequestDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditInventoryPage from "../pages/EditInventoryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ContentContainer />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route element={<RoleGuard allowedRoles={["OFFICER", "STAFF"]} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={["OFFICER"]} />}>
            <Route path="/my-task" element={<MyTaskPage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={["OFFICER"]} />}>
            <Route
              path="/my-task/approval-request-detail/:id"
              element={<ApprovalRequestDetailPage />}
            />
          </Route>

          <Route element={<RoleGuard allowedRoles={["OFFICER", "STAFF"]} />}>
            <Route path="/inventory-list" element={<InventoryList />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
            <Route
              path="/inventory-list/add-product"
              element={<AddProductInventoryListPage />}
            />
          </Route>

          <Route element={<RoleGuard allowedRoles={["STAFF"]} />}>
            <Route
              path="/inventory-list/:id/edit"
              element={<EditInventoryPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
