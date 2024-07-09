import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Style Component
import "./index.css";

// Admin Components
// App Component
import App from "./App.jsx";

// Welcome Component
import { Welcome } from "./components/Admin/Welcome/Welcome.jsx";

// Books Component
import { BookInventory } from "./components/Admin/Books/BookInventory.jsx";
import { AllBooks } from "./components/Admin/Books/AllBooks.jsx";
import { AddBooks } from "./components/Admin/Books/AddBooks.jsx";
import { SingleBook } from "./components/Admin/Books/SingleBook.jsx";
import { UpdateBook } from "./components/Admin/Books/UpdateBook.jsx";

// Members/Users Component
import { MembersInventory } from "./components/Admin/Members/MembersInventory.jsx";
import { AllMembers } from "./components/Admin/Members/AllMembers.jsx";
import { SingleMember } from "./components/Admin/Members/SingleMember.jsx";
import { UpdateMember } from "./components/Admin/Members/UpdateMember.jsx";

// Pending Request Components
import { PendingInventory } from "./components/Admin/Pending Request/PendingRequestInventory.jsx";
import { AllRequests } from "./components/Admin/Pending Request/AllRequests.jsx";

// Users Components
// First Page
import { Header } from "./components/User/Header.jsx";
import { Introduction } from "./components/User/Introduction.jsx";
import { SideBar } from "./components/User/SideBar.jsx";

const router = createBrowserRouter([
  {
    // Admin Routes
    path: "/admin",
    element: <App />,
    children: [
      // Routes For WelcomePage
      {
        path: "/admin",
        element: <Welcome />,
      },
      // Routes For Books
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
          {
            path: "singlebook/:id",
            element: <SingleBook />,
          },
          {
            path: "update/:id",
            element: <UpdateBook />,
          },
        ],
      },
      // Routes For Members/User handle page
      {
        path: "members",
        element: <MembersInventory />,
        children: [
          {
            path: "",
            element: <AllMembers />,
          },
          {
            path: "singlemember/:id",
            element: <SingleMember />,
          },
          {
            path: "update/:id",
            element: <UpdateMember />,
          },
        ],
      },
      // Routes for Pending Request
      {
        path: "bookrequest",
        element: <PendingInventory />,
        children: [
          {
            path: "",
            element: <AllRequests />,
          },
        ],
      },
    ],
  },
  // Users Routes
  {
    path: "/lms",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Introduction />,
        children: [
          {
            path: "",
            element: <SideBar />,
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
