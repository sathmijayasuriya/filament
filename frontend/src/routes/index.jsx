// import { createHashRouter } from "react-router-dom";
import { createBrowserRouter ,Navigate} from "react-router-dom";
import Layout from "../components/layouts/UserLayout";
import { Dashboard } from "../views/Dashboard";
import { Categories } from "../views/Categories";
import Posts from "../views/Posts";

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
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
export default router;
