// import { createHashRouter } from "react-router-dom";
import { createBrowserRouter ,Navigate} from "react-router-dom";
import Layout from "../components/layouts/UserLayout";
import { Dashboard } from "../views/Dashboard";
import Categories  from "../views/Categories";
import Posts from "../views/Posts";
import PostsCreate from "../views/PostsCreate";
import ViewPost from "../views/ViewPost";
import EditPostForm from "../components/posts/EditPostForm ";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/posts",
        element: <Posts/>,
      },
      {
        path: "",
        element: <Dashboard/>,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/posts/create",
        element: <PostsCreate/>,
      },
      {
        path: "/posts/edit/:slug",
        element: <EditPostForm/>,
      },
      {
        path: "/posts/:slug",
        element: <ViewPost />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
export default router;
