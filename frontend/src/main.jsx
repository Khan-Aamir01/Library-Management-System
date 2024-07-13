import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import "./index.css";
import withSuspense from "./components/Suspense-Loader/WithSuspense.jsx";

// Lazy loading Admin Components
const App = withSuspense(lazy(() => import("./App.jsx")));
const Welcome = withSuspense(
  lazy(() => import("./components/Admin/Welcome/Welcome.jsx"))
);
const BookInventory = withSuspense(
  lazy(() => import("./components/Admin/Books/BookInventory.jsx"))
);
const AdminAllBooks = withSuspense(
  lazy(() => import("./components/Admin/Books/AllBooks.jsx"))
);
const AddBooks = withSuspense(
  lazy(() => import("./components/Admin/Books/AddBooks.jsx"))
);
const AdminSingleBook = withSuspense(
  lazy(() => import("./components/Admin/Books/SingleBook.jsx"))
);
const UpdateBook = withSuspense(
  lazy(() => import("./components/Admin/Books/UpdateBook.jsx"))
);
const AdminSchoolInventory = withSuspense(
  lazy(() => import("./components/Admin/Books/School/SchoolInventory.jsx"))
);
const AdminCollegeInventory = withSuspense(
  lazy(() => import("./components/Admin/Books/College/CollegeInventory.jsx"))
);
const AdminHigherEduInventory = withSuspense(
  lazy(() => import("./components/Admin/Books/HigherEdu/HigherEdu.jsx"))
);
const AdminCategorised = withSuspense(
  lazy(() => import("./components/Admin/Books/CategorisedBook.jsx"))
);
const MembersInventory = withSuspense(
  lazy(() => import("./components/Admin/Members/MembersInventory.jsx"))
);
const AllMembers = withSuspense(
  lazy(() => import("./components/Admin/Members/AllMembers.jsx"))
);
const SingleMember = withSuspense(
  lazy(() => import("./components/Admin/Members/SingleMember.jsx"))
);
const UpdateMember = withSuspense(
  lazy(() => import("./components/Admin/Members/UpdateMember.jsx"))
);
const PendingInventory = withSuspense(
  lazy(() =>
    import("./components/Admin/PendingRequest/PendingRequestInventory.jsx")
  )
);
const AllRequests = withSuspense(
  lazy(() => import("./components/Admin/PendingRequest/AllRequests.jsx"))
);

// Lazy loading User Components
const Header = withSuspense(
  lazy(() => import("./components/User/FirstPage/Header.jsx"))
);
const Introduction = withSuspense(
  lazy(() => import("./components/User/FirstPage/Introduction.jsx"))
);
const SideBar = withSuspense(
  lazy(() => import("./components/User/FirstPage/SideBar.jsx"))
);
const Latest = withSuspense(
  lazy(() => import("./components/User/Books/Latest.jsx"))
);
const Popular = withSuspense(
  lazy(() => import("./components/User/Books/Popular.jsx"))
);
const UserAllBooks = withSuspense(
  lazy(() => import("./components/User/Books/AllBooks.jsx"))
);
const UserSingleBook = withSuspense(
  lazy(() => import("./components/User/Books/SingleBook.jsx"))
);
const UserSchoolInventory = withSuspense(
  lazy(() => import("./components/User/Books/School/SchoolInventory.jsx"))
);
const UserCollegeInventory = withSuspense(
  lazy(() => import("./components/User/Books/College/CollegeInventory.jsx"))
);
const UserHigherInventory = withSuspense(
  lazy(() => import("./components/User/Books/HigherEdu/HigherInventory.jsx"))
);
const UserCategorised = withSuspense(
  lazy(() => import("./components/User/Books/CategorisedBook.jsx"))
);
const Login = withSuspense(
  lazy(() => import("./components/User/Login/Login.jsx"))
);
const Registration = withSuspense(
  lazy(() => import("./components/User/Registration/Registration.jsx"))
);

const router = createBrowserRouter([
  // Admin Routes
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <Welcome />,
      },
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

  // User Routes
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
                element: <UserSchoolInventory />,
              },
              {
                path: "college",
                element: <UserCollegeInventory />,
              },
              {
                path: "highereducation",
                element: <UserHigherInventory />,
              },
            ],
          },
        ],
      },
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
