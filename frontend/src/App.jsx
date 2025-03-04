import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <RouterProvider router={router}>{/* <ScrollToTop /> */}</RouterProvider>
  );
}

export default App;
