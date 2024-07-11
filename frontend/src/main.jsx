import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

// ----------------------------------------------------------------------------------------
// Admin Components
// ----------------------------------------------------------------------------------------
import App from "./App.jsx";

// Welcome Component
import { Welcome } from "./components/Admin/Welcome/Welcome.jsx";

// Books Component
import { BookInventory } from "./components/Admin/Books/BookInventory.jsx";
import { AllBooks as AdminAllBooks } from "./components/Admin/Books/AllBooks.jsx";
import { AddBooks } from "./components/Admin/Books/AddBooks.jsx";
import { SingleBook as AdminSingleBook } from "./components/Admin/Books/SingleBook.jsx";
import { UpdateBook } from "./components/Admin/Books/UpdateBook.jsx";

// School Books || College Book || Higher Education Admin
import { SchoolInventory as AdminSchoolInventory } from "./components/Admin/Books/School/SchoolInventory.jsx";
import { CollegeInventory as AdminCollegeInventory } from "./components/Admin/Books/College/CollegeInventory.jsx";
import { HigherEduInventory as AdminHigherEduInventory } from "./components/Admin/Books/HigherEdu/HigherEdu.jsx";
// All Categories Books Show in this component
import { Categorised as AdminCategorised } from "./components/Admin/Books/CategorisedBook.jsx";

// Members/Users Component
import { MembersInventory } from "./components/Admin/Members/MembersInventory.jsx";
import { AllMembers } from "./components/Admin/Members/AllMembers.jsx";
import { SingleMember } from "./components/Admin/Members/SingleMember.jsx";
import { UpdateMember } from "./components/Admin/Members/UpdateMember.jsx";

// Pending Request Components
import { PendingInventory } from "./components/Admin/Pending Request/PendingRequestInventory.jsx";
import { AllRequests } from "./components/Admin/Pending Request/AllRequests.jsx";

// ----------------------------------------------------------------------------------------
// Users Components
// ----------------------------------------------------------------------------------------
// First Page
import { Header } from "./components/User/FirstPage/Header.jsx";
import { Introduction } from "./components/User/FirstPage/Introduction.jsx";
import { SideBar } from "./components/User/FirstPage/SideBar.jsx";

// Books
import { Latest } from "./components/User/Books/Latest.jsx";
import { Popular } from "./components/User/Books/Popular.jsx";
import { AllBooks as UserAllBooks } from "./components/User/Books/AllBooks.jsx";

// Single Book Components with all details and borrow and downloads
import { SingleBook as UserSingleBook } from "./components/User/Books/SingleBook.jsx";

// School Books || College Book || Higher Education User
import { SchoolInventory as UserSchoolInventroy } from "./components/User/Books/School/SchoolInventory.jsx";
import { CollegeInventory as UserCollegeInventroy } from "./components/User/Books/College/CollegeInventory.jsx";
import { HigherInventory as UserHigherInventory } from "./components/User/Books/HigherEdu/HigherInventory.jsx";

// All Categories Books Show in this component
import { Categorised as UserCategorised } from "./components/User/Books/CategorisedBook.jsx";

// Login/Registration
import { Login } from "./components/User/Login/Login.jsx";
import { Registration } from "./components/User/Registration/Registration.jsx";

// ----------------------------------------------------------------------------------------

const router = createBrowserRouter([
  {
    // ----------------------------------------------------------------------------------------
    // Admin Routes
    // ----------------------------------------------------------------------------------------
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
            element: <AdminAllBooks />,
          },
          {
            path: "add",
            element: <AddBooks />,
          },
          {
            path: "singlebook/:id",
            element: <AdminSingleBook />,
          },
          {
            path: "update/:id",
            element: <UpdateBook />,
          },
          {
            path: "school",
            element: <AdminSchoolInventory />,
          },
          {
            path: "college",
            element: <AdminCollegeInventory />,
          },
          {
            path: "highereducation",
            element: <AdminHigherEduInventory />,
          },
          {
            path: ":categorise/class/:classId",
            element: <AdminCategorised />,
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

  // ----------------------------------------------------------------------------------------
  // Users Routes
  // ----------------------------------------------------------------------------------------
  // Into Page
  {
    path: "/lms",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Introduction />,
        // SideBar Routes
        children: [
          {
            path: "",
            element: <SideBar />,
            // SideBar Components/Navigation Routes - this routes will show some books on the home page
            children: [
              {
                path: "",
                element: <Latest />,
              },
              {
                path: "popular",
                element: <Popular />,
              },
              {
                path: "school",
                element: <UserSchoolInventroy />,
              },
              {
                path: "college",
                element: <UserCollegeInventroy />,
              },
              {
                path: "highereducation",
                element: <UserHigherInventory />,
              },
            ],
          },
        ],
      },
      // Books Routes - this routes will show books on the new page with header
      {
        path: "allbooks",
        element: <UserAllBooks />,
      },
      {
        path: ":bookname/:id",
        element: <UserSingleBook />,
      },
      {
        path: ":categorise/class/:classId",
        element: <UserCategorised />,
      },
      // Login/Registration Routes
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
