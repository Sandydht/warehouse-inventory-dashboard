import AppRoutes from "./presentation/routes";
import Snackbar from "./presentation/components/Snackbar";
import ConfirmationModalBox from "./presentation/components/modal/ConfirmationModalBox";
import RejectApprovalRequestModalBox from "./presentation/components/modal/RejectApprovalRequestModalBox";

function App() {
  return (
    <>
      <ConfirmationModalBox />
      <RejectApprovalRequestModalBox />
      <Snackbar />
      <AppRoutes />
    </>
  );
}

export default App;
