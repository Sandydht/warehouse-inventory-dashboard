import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { getUserProfile } from "../store/user/userThunk";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUserProfile() {
      await dispatch(getUserProfile()).unwrap();
    }

    fetchUserProfile();
  }, [dispatch]);

  return (
    <>
      <p>Home page</p>
    </>
  );
}

export default Home;
