import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex w-full bg-gray-100">      
      <div className="w-full h-16 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <Header />
      </div>

      <div className="flex w-full mt-20 gap-30 bg-gray-100">
        <div style={{position:"fixed"}}>
        <div  className="w-full sm:w-64 h-screen top-30 left-0 bg-gray-100 z-10">
        <Sidebar />
      </div>
        </div>

      <main className="flex-1 min-w-[382px] ml-0 sm:ml-64 p-4 bg-gray-100 ">
      <Outlet />
      </main>
      </div>
    </div>
  );
}