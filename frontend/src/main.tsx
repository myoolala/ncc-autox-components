import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./theme.css";

function injectKeyframes() {
  const css = `
@keyframes spin { to { transform: rotate(360deg); } }
`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

injectKeyframes();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
