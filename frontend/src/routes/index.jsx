// import { createHashRouter } from "react-router-dom";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/layouts/UserLayout";
import { Dashboard } from "../views/Dashboard";
import Categories from "../views/Categories";
import Posts from "../views/Posts";
import PostsCreate from "../views/PostsCreate";
import ViewPost from "../views/ViewPost";
import EditPostForm from "../components/posts/EditPostForm";
import Login from "../views/Auth/Login";
import Authors from "../views/Authors";
import ProtectedRoute from "./ProtectedRoute";
import Links from "../views/Links"
import LinksCreate from "../views/LinksCreate";
import LinksEdit from "../views/LinksEdit";
import Linksdisplay from "../views/Linksdisplay";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
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
            path: "authors",
            element: <Authors />,
          },
          {
            path: "links",
            element: <Links />,
          },
          {
            path: "links/create",
            element: <LinksCreate />,
          },
          {
            path: "links/edit/:id",
            element: <LinksEdit />,
          },
          {
            path: "links/:id",
            element: <Linksdisplay />,
          },
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },

        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
