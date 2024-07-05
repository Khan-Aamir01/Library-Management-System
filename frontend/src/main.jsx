import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { Welcome } from "./components/Welcome.jsx";
import { BookInventory } from "./components/BookInventory.jsx";
import { AllBooks } from "./components/AllBooks.jsx";
import { AddBooks } from "./components/AddBooks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "books",
        element: <BookInventory />,
        children: [
          {
            path: "",
            element: <AllBooks />,
          },
          {
            path: "add",
            element: <AddBooks />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
