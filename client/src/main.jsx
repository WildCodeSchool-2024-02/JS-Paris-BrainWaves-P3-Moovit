import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { DarkModeContextProvider } from "./services/DarkModeContext";
import { UserProvider, useUser } from "./contexts/User/User";
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

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  const { isLoading } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (!isLoading && user) return children;
  return "...loading";
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => fetch(`${api}/api/sports`),
    children: [
      {
        path: "/",
        element: (
          <Landing />
        ),
      },
      {
        path: "/training/:id",
        element: (
          <PrivateRoute>
            <Training />
          </PrivateRoute>
        ),
      },
      {
        path: "/journal",
        element: (
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        ),
      },
      {
        path: "/templates",
        element: (
          <PrivateRoute>
            <Templates />
          </PrivateRoute>
        ),
      },
      {
        path: "/templates/:id",
        element: (
          <PrivateRoute>
            <TemplateDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/feedback/:id",
        element: (
          <PrivateRoute>
            <FeedbackDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
