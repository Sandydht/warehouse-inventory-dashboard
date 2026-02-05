import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./presentation/store/index.ts";
import { BrowserRouter } from "react-router-dom";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./infrastructure/mocks/browser.ts");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

function renderApp() {
  createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
}

enableMocking().then(() => {
  renderApp();
});
