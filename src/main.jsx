import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./Pages/Navbar";
import NotFoundPage from "./Pages/NotFoundPage";
import SearchBar from "./Pages/SearchBar";
import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "search",
        element: <SearchBar />,
      },
      {
        path: "search/:keyword",
        element: <HomePage />,
      },
    ],
    errorElement: <NotFoundPage msg="404! This page doesn't exist" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
