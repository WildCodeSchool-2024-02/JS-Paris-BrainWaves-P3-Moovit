import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DarkModeContextProvider } from "./services/DarkModeContext";

import Training from "./pages/Training/Training";
import App from "./App";
import Journal from "./pages/Journal/Journal";
import Landing from "./pages/Landing/Landing";
import Templates from "./pages/Templates/Templates";
import TemplateDetails from "./pages/TemplateDetails/TemplateDetails"

const api = import.meta.env.VITE_API_URL

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/training/:id",
        element: <Training />,
        loader: ({params}) => fetch(`${api}/api/trainings/${params.id}`)
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
        loader: () => fetch(`${api}/api/templates/1/all`)
      },
      {
        path: "/templates/:id",
        element: <TemplateDetails />,
        loader: ({params}) => fetch(`${api}/api/templates/${params.id}`)
      }
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
