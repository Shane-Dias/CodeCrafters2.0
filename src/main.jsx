import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WatchlistProvider } from "./Context/WatchlistContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WatchlistProvider>
    <App />
  </WatchlistProvider>
);
