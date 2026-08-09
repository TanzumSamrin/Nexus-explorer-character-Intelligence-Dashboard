import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./app/router";

import App from "./App";
import AppProviders from "./app/AppProviders";

import ErrorBoundary from "./components/error/ErrorBoundary";
import {
  logError,
} from "./utils/logger";

import "./index.css";


window.onerror = (
  message,
  source,
  lineno,
  colno,
  error
) => {
  logError(
    String(message),
    "window.onerror",
    error
  );
};


window.addEventListener(
  "unhandledrejection",
  (event) => {
    logError(
      "Unhandled promise rejection.",
      "unhandledrejection",
      event.reason
    );
  }
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
  <ErrorBoundary>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </ErrorBoundary>
  </React.StrictMode>
);
