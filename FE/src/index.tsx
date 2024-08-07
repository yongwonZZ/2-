import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./global.module.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// BrowserRouter를 사용하여 App 컴포넌트에서 라우팅 기능 활성화
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
