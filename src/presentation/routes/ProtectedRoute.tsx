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
    if (!data && !loading && !error) {
      dispatch(getUserProfile()).unwrap();
    }
  }, [dispatch, data, loading, error]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
