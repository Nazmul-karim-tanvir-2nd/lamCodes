import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/custom/Sidebar";
import useSidebarStore from "../store/useSidebarStore";
import { useState } from "react";
import LoginPopup from "../components/auth/LoginPopup";

const Layout = () => {
  const { isOpen } = useSidebarStore();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div
        className={`
          flex flex-col flex-1 transition-all duration-300 ease-in-out
          ${isOpen ? "ml-0 md:ml-80" : "ml-0 md:ml-24"}
        `}
      >
        {/* Pass the Login popup trigger handler to Navbar */}
        <Navbar onLoginClick={() => setShowLogin(true)} />

        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Show Login Popup Modal */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </div>
  );
};

export default Layout;