import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeContextProvider } from "./services/DarkModeContext";
import { UserProvider, useUser } from "./contexts/User/User";
import Training from "./pages/Training/Training";
import App from "./App";
import Journal from "./pages/Journal/Journal";
import Landing from "./pages/Landing/Landing";
import Templates from "./pages/Templates/Templates";
import TemplateDetails from "./pages/TemplateDetails/TemplateDetails";
import FeedbackDetails from "./pages/FeedbackDetails/FeedbackDetails";

const api = import.meta.env.VITE_API_URL;

function AppRouter() {
  const { user } = useUser();

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
          path: "/training/:id",
          element: <Training />,
          loader: ({ params }) => fetch(`${api}/api/trainings/${params.id}`),
        },
        {
          path: "/journal",
          element: <Journal />,
        },
        {
          path: "/templates",
          element: <Templates />,
          loader: () => fetch(`${api}/api/templates/${user.id}/all`),
        },
        {
          path: "/templates/:id",
          element: <TemplateDetails />,
          loader: ({ params }) => fetch(`${api}/api/templates/${params.id}`),
        },
        {
          path: "/feedback/:id",
          element: <FeedbackDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <DarkModeContextProvider>
        <AppRouter />
      </DarkModeContextProvider>
    </UserProvider>
  </React.StrictMode>
);
