import Sidebar from "./Sidebar";
import Header from "./Header ";
export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
