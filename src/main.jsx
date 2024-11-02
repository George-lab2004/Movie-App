import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TokenContextProvider from "./Context/TokenContext.jsx";
import { WatchlistProvider } from "./Context/WatchlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <WatchlistProvider>
    <TokenContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TokenContextProvider>
  </WatchlistProvider>
);
