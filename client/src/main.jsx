import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeContextProvider } from "./services/DarkModeContext";
import { UserProvider } from "./contexts/User/User";
import Training from "./pages/Training/Training";
import App from "./App";
import Journal from "./pages/Journal/Journal";
import Landing from "./pages/Landing/Landing";
import Templates from "./pages/Templates/Templates";
import TemplateDetails from "./pages/TemplateDetails/TemplateDetails";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import FeedbackDetails from "./pages/FeedbackDetails/FeedbackDetails";

const api = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch(`${api}/api/sports`),
    children: [
      {
        path: "/training/:id",
        element: <Training />,
      },
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/journal",
        element: <Journal />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/templates/:id",
        element: <TemplateDetails />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/feedback/:id",
        element: <FeedbackDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <DarkModeContextProvider>
        <RouterProvider router={router} />
      </DarkModeContextProvider>
    </UserProvider>
  </React.StrictMode>
);
