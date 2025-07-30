// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
    User,
    Key,
    RefreshCcw,
    CheckCircle,
    X,
} from "lucide-react";
import idlclogo from "../../assets/idlclogo.jpg";
import useSidebarStore from "../../store/useSidebarStore";

const navItems = [
    { to: "/", label: "Account Creation", icon: <User size={18} /> },
    { to: "/access-request", label: "Access Request", icon: <Key size={18} /> },
    { to: "/employee-transfer", label: "Employee Transfer", icon: <RefreshCcw size={18} /> },
    { to: "/employee-clearance", label: "Employee Clearance", icon: <CheckCircle size={18} /> },
];

const Sidebar = () => {
    const { isOpen, closeSidebar } = useSidebarStore();

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-50 md:static top-0 left-0 h-full w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Logo & Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src={idlclogo} alt="IDLC Logo" className="w-9 h-9 object-contain" />
                        <h1 className="text-xl font-semibold text-blue-700 tracking-wide">
                            Logical Access
                        </h1>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="md:hidden text-gray-500 hover:text-red-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${isActive
                                    ? "bg-blue-100 text-blue-800 font-semibold shadow-sm"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                                }`
                            }
                        >
                            <span className="text-blue-700">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;