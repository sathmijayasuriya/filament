import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import AuthProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  console.log("first render");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

// add usecallback
// bread crumbs in edit
// responsive
// table click
// filter
