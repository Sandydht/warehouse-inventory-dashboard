import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { getUserProfile } from "../store/user/userThunk";

function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUserProfile() {
      await dispatch(getUserProfile()).unwrap();
    }

    fetchUserProfile();
  }, [dispatch]);

  return (
    <>
      <p>Dashboard Page</p>
    </>
  );
}

export default Dashboard;
