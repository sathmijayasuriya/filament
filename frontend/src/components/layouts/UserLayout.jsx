import Sidebar from "./Sidebar";
import Header from "./Header ";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen w-full ">
      <Header className="w-full" />

      <div className="flex flex-1 bg-white">
        <Sidebar className="w-80" />
        <main className="flex-1 p-4">
        <Outlet />  
        </main>
      </div>
    </div>
  );
}
