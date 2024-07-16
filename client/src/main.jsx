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
import TrainingDetails from "./pages/TrainingDetails/Training";
import App from "./App";
import Journal from "./pages/Journal/Journal";
import Landing from "./pages/Landing/Landing";
import Templates from "./pages/Templates/Templates";
import TemplateDetails from "./pages/TemplateDetails/TemplateDetails";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import FeedbackDetails from "./pages/FeedbackDetails/FeedbackDetails";
import Profile from "./pages/Profile/Profile";
import NamePage from "./pages/NamePage/NamePage";
import SportPage from "./pages/SportPage/SportPage";
import LevelPage from "./pages/LevelPage/LevelPage";

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

const PublicRoute = ({ children }) => {
  const { user } = useUser();
  const { isLoading } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) navigate("/journal");
    }
  }, [user, isLoading, navigate]);

  if (!isLoading && !user) return children;
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
        element: <Landing />,
      },
      {
        path: "/profile/name",
        element: <NamePage />,
      },
      {
        path: "/profile/sport",
        element: <SportPage />,
      },
      {
        path: "/profile/level",
        element: <LevelPage />,
      },
      {
        path: "/training/:id",
        element: (
          <PrivateRoute>
            <TrainingDetails />
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
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
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
