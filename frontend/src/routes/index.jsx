// import { createHashRouter } from "react-router-dom";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layouts/UserLayout";
import { Dashboard } from "../views/Dashboard";
import Categories from "../views/Categories";
import Posts from "../views/Posts";
import PostsCreate from "../views/PostsCreate";
import ViewPost from "../views/ViewPost";
import EditPostForm from "../components/posts/EditPostForm ";
import Login from "../views/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
          index: true,
          element: <Dashboard />, 
          },
          {
            path: "posts",
            element: <Posts />,
          },  
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "posts/create",
            element: <PostsCreate />,
          },
          {
            path: "posts/edit/:slug",
            element: <EditPostForm />,
          },
          {
            path: "posts/:slug",
            element: <ViewPost />,
          },
          {
            path: "*",
            element: <Navigate to="/app" replace />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
export default router;
