import Sidebar from "./Sidebar";
import Header from "./Header ";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden"> {/* Ensure full width */}
    {/* Header */}
    <Header className="w-full" /> {/* Ensure header takes full width */}

    {/* Sidebar & Main Content */}
    <div className="flex flex-1">
      <Sidebar className="w-80" /> {/* Sidebar on the left */}
      <main className="flex-1 p-4">{children}</main> {/* Main content on the right */}
    </div>
  </div>
  );
}
