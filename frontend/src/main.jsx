import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import "./index.css";
import withSuspense from "./components/Suspense-Loader/WithSuspense.jsx";

// Check if logged in
const isLoggedInAdmin = !!localStorage.getItem("adminToken");
const isLoggedInUser = !!localStorage.getItem("userToken");

// Lazy loading Admin Components
const App = withSuspense(lazy(() => import("./App.jsx")));
const Welcome = withSuspense(
  lazy(() => import("./components/Admin/Welcome/Welcome.jsx"))
);

// Books
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

// Books Categories
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

// Total members section
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

// Request for book
const PendingInventory = withSuspense(
  lazy(() =>
    import("./components/Admin/PendingRequest/PendingRequestInventory.jsx")
  )
);
const AllRequests = withSuspense(
  lazy(() => import("./components/Admin/PendingRequest/AllRequests.jsx"))
);

// Books on loan
const BooksOnLoanInventory = withSuspense(
  lazy(() => import("./components/Admin/bookOnLoan/BookOnLoanInventory.jsx"))
);
const BooksOnLoan = withSuspense(
  lazy(() => import("./components/Admin/bookOnLoan/BookOnLoan.jsx"))
);

// Late fine books
const LateFeesInventory = withSuspense(
  lazy(() => import("./components/Admin/LateFeesBooks/LateFeesInventory.jsx"))
);
const LateFeesBooks = withSuspense(
  lazy(() => import("./components/Admin/LateFeesBooks/AllLateFees.jsx"))
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

// Lazy Registration/Login Components
// const AdminLogin = require("./components/Admin/Login-Registration/Login.jsx");
import AdminLogin from "./components/Admin/Login-Registration/Login.jsx";
const UserLogin = withSuspense(
  lazy(() => import("./components/Login-Registration/Login.jsx"))
);
const UserRegistration = withSuspense(
  lazy(() => import("./components/Login-Registration/Registration.jsx"))
);

// Lazy UserProfile
const UserProfile = withSuspense(
  lazy(() => import("./components/User/UserProfile/UserProfile.jsx"))
);

const router = createBrowserRouter([
  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: isLoggedInAdmin ? <App /> : <Navigate to={"/admin/login"} />,
    children: [
      {
        path: "",
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
      {
        path: "borrowed",
        element: <BooksOnLoanInventory />,
        children: [
          {
            path: "",
            element: <BooksOnLoan />,
          },
        ],
      },
      {
        path: "fine",
        element: <LateFeesInventory />,
        children: [
          {
            path: "",
            element: <LateFeesBooks />,
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
        element: <UserLogin />,
      },
      {
        path: "registration",
        element: <UserRegistration />,
      },
      {
        path: "profile/:id",
        element: <UserProfile />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
