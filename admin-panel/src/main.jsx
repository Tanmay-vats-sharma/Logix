import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Import Redux Provider & Store
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ Wrap App inside Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
