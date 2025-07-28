import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-gray-50">
                <Navbar />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
