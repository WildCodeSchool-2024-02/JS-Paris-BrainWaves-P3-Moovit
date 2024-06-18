import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeContextProvider } from "./services/DarkModeContext";

import App from "./App";
import Journal from "./pages/Journal/Journal";
import Landing from "./pages/Landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/journal",
        element: <Journal />,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/trainings/today/1`),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <RouterProvider router={router} />
    </DarkModeContextProvider>
  </React.StrictMode>
);
