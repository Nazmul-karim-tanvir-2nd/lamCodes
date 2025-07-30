// src/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/custom/Sidebar";
import useSidebarStore from "../store/useSidebarStore";

const Layout = () => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "ml-80" : "ml-0"
        }`}
      >
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
