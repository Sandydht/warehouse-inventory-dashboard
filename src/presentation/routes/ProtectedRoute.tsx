import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { getUserProfile } from "../store/user/userThunk";

function ProtectedRoute() {
  const dispatch = useAppDispatch();
  const { loading, data, error } = useAppSelector(
    (state) => state.user.userProfile,
  );

  useEffect(() => {
    async function fetchUserProfile() {
      if (!data && !loading) {
        await dispatch(getUserProfile());
      }
    }

    fetchUserProfile();
  }, [dispatch, data, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data && error) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
