import Sidebar from "./Sidebar";
import Header from "./Header ";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
<div className="flex h-screen w-full">
  <div className="w-full sm:w-80 h-screen fixed top-20  left-0 -white">
    <Sidebar />
  </div>

  <div className="flex flex-col flex-1 sm:ml-80">
    <div className="w-full h-16 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <Header />
    </div>
    <main className="flex-1 mt-16 p-4 bg-gray-100">
      <Outlet />
    </main>
  </div>
</div>
  );
}
