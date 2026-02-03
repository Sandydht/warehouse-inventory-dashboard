import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ContentContainer from "../layouts/ContentContainer";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<ContentContainer />} path="/">
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
