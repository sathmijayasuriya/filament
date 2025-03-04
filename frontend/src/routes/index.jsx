import { createHashRouter } from "react-router-dom";
import Posts from "../views/Posts";
import Layout from "../components/layouts/UserLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Posts/>,
      },
    //   {
    //     path: "chatList",
    //     element: <ChatList/>,
    //   },
    //   {
    //     path: "chatWindow",
    //     element: <Chat />,
    //   },
    ],
  },
]);
export default router;
