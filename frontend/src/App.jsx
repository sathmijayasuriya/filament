import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

// add usecallback
// bread crumbs in edit
// responsive
// table click
// filter
