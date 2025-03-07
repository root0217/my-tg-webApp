import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // Аналитика
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/my-tg-webApp">
    <App />
  </BrowserRouter>
);

// Отправка данных для аналитики (опционально)
reportWebVitals();