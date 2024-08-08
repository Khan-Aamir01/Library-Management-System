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

// Home page
import Index from "./components/Index.jsx";

// Admin Components
import App from "./App.jsx";
import Welcome from "./components/Admin/Welcome/Welcome.jsx";
import ProtectedRoute from "./components/Admin/protectedRoutes/ProtectedRoute.jsx";

// Books
import BookInventory from "./components/Admin/Books/BookInventory.jsx";
const AdminAllBooks = withSuspense(
  lazy(() => import("./components/Admin/Books/AllBooks.jsx"))
);
import AddBooks from "./components/Admin/Books/AddBooks.jsx";
import AdminSingleBook from "./components/Admin/Books/SingleBook.jsx";
import UpdateBook from "./components/Admin/Books/UpdateBook.jsx";

// Books Categories
import AdminSchoolInventory from "./components/Admin/Books/School/SchoolInventory.jsx";
import AdminCollegeInventory from "./components/Admin/Books/College/CollegeInventory.jsx";
import AdminHigherEduInventory from "./components/Admin/Books/HigherEdu/HigherEdu.jsx";
const AdminCategorised = withSuspense(
  lazy(() => import("./components/Admin/Books/CategorisedBook.jsx"))
);

// Total members section
import MembersInventory from "./components/Admin/Members/MembersInventory.jsx";
const AllMembers = withSuspense(
  lazy(() => import("./components/Admin/Members/AllMembers.jsx"))
);
import SingleMember from "./components/Admin/Members/SingleMember.jsx";
import UpdateMember from "./components/Admin/Members/UpdateMember.jsx";

// Request for book
import PendingInventory from "./components/Admin/PendingRequest/PendingRequestInventory.jsx";
const AllRequests = withSuspense(
  lazy(() => import("./components/Admin/PendingRequest/AllRequests.jsx"))
);

// Books on loan
import BooksOnLoanInventory from "./components/Admin/bookOnLoan/BookOnLoanInventory.jsx";
const BooksOnLoan = withSuspense(
  lazy(() => import("./components/Admin/bookOnLoan/BookOnLoan.jsx"))
);

// Late fine books
import LateFeesInventory from "./components/Admin/LateFeesBooks/LateFeesInventory.jsx";
const LateFeesBooks = withSuspense(
  lazy(() => import("./components/Admin/LateFeesBooks/AllLateFees.jsx"))
);

//User Components
import Header from "./components/User/FirstPage/Header.jsx";
import Introduction from "./components/User/FirstPage/Introduction.jsx";
import SideBar from "./components/User/FirstPage/SideBar.jsx";

const Latest = withSuspense(
  lazy(() => import("./components/User/Books/Latest.jsx"))
);
const Popular = withSuspense(
  lazy(() => import("./components/User/Books/Popular.jsx"))
);
const UserAllBooks = withSuspense(
  lazy(() => import("./components/User/Books/AllBooks.jsx"))
);
import UserSingleBook from "./components/User/Books/SingleBook.jsx";
import UserSchoolInventory from "./components/User/Books/School/SchoolInventory.jsx";
import UserCollegeInventory from "./components/User/Books/College/CollegeInventory.jsx";
import UserHigherInventory from "./components/User/Books/HigherEdu/HigherInventory.jsx";
const UserCategorised = withSuspense(
  lazy(() => import("./components/User/Books/CategorisedBook.jsx"))
);

// Admin Login
import AdminLogin from "./components/Admin/Login/Login.jsx";

// User Login
import UserLogin from "./components/User/Login-Registration/Login.jsx";
import UserRegistration from "./components/User/Login-Registration/Registration.jsx";

// UserProfile
import UserProfile from "./components/User/UserProfile/UserProfile.jsx";

// Routes
const router = createBrowserRouter([
  // Home Page
  {
    path: "/",
    element: <Index />,
  },
  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<App />} />,
    children: [
      {
        path: "",
        element: <ProtectedRoute element={<Welcome />} />,
      },
      {
        path: "books",
        element: <ProtectedRoute element={<BookInventory />} />,
        children: [
          {
            path: "",
            element: <ProtectedRoute element={<AdminAllBooks />} />,
          },
          {
            path: "add",
            element: <ProtectedRoute element={<AddBooks />} />,
          },
          {
            path: "singlebook/:id",
            element: <ProtectedRoute element={<AdminSingleBook />} />,
          },
          {
            path: "update/:id",
            element: <ProtectedRoute element={<UpdateBook />} />,
          },
          {
            path: "school",
            element: <ProtectedRoute element={<AdminSchoolInventory />} />,
          },
          {
            path: "college",
            element: <ProtectedRoute element={<AdminCollegeInventory />} />,
          },
          {
            path: "highereducation",
            element: <ProtectedRoute element={<AdminHigherEduInventory />} />,
          },
          {
            path: ":categorise/class/:classId",
            element: <ProtectedRoute element={<AdminCategorised />} />,
          },
        ],
      },
      {
        path: "members",
        element: <ProtectedRoute element={<MembersInventory />} />,
        children: [
          {
            path: "",
            element: <ProtectedRoute element={<AllMembers />} />,
          },
          {
            path: "singlemember/:id",
            element: <ProtectedRoute element={<SingleMember />} />,
          },
          {
            path: "update/:id",
            element: <ProtectedRoute element={<UpdateMember />} />,
          },
        ],
      },
      {
        path: "bookrequest",
        element: <ProtectedRoute element={<PendingInventory />} />,
        children: [
          {
            path: "",
            element: <ProtectedRoute element={<AllRequests />} />,
          },
        ],
      },
      {
        path: "borrowed",
        element: <ProtectedRoute element={<BooksOnLoanInventory />} />,
        children: [
          {
            path: "",
            element: <ProtectedRoute element={<BooksOnLoan />} />,
          },
        ],
      },
      {
        path: "fine",
        element: <ProtectedRoute element={<LateFeesInventory />} />,
        children: [
          {
            path: "",
            element: <ProtectedRoute element={<LateFeesBooks />} />,
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
        path: "profile",
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
