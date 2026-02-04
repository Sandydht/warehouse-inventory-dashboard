import AppRoutes from "./presentation/routes";
import Snackbar from "./presentation/components/Snackbar";
import ConfirmationModalBox from "./presentation/components/modal/ConfirmationModalBox";

function App() {
  return (
    <>
      <ConfirmationModalBox />
      <Snackbar />
      <AppRoutes />
    </>
  );
}

export default App;
