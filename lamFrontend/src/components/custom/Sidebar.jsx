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

// Navigation items declared outside the component for performance
const navItems = [
    { to: "/", label: "Account Creation", icon: <User size={18} aria-hidden="true" /> },
    { to: "/access-request", label: "Access Request", icon: <Key size={18} aria-hidden="true" /> },
    { to: "/employee-transfer", label: "Employee Transfer", icon: <RefreshCcw size={18} aria-hidden="true" /> },
    { to: "/employee-clearance", label: "Employee Clearance", icon: <CheckCircle size={18} aria-hidden="true" /> },
];

const Sidebar = () => {
    const { isOpen, closeSidebar } = useSidebarStore();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={closeSidebar}
                    role="button"
                    aria-label="Close sidebar overlay"
                    tabIndex={0}
                />
            )}

            {/* Sidebar */}
            <aside
  className={`fixed z-50 top-0 left-0 h-full w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
                {/* Logo + Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <img
                            src={idlclogo}
                            alt="IDLC Logo"
                            className="w-8 h-8 object-contain"
                        />
                        <h1 className="text-xl font-semibold text-blue-700 tracking-wide">
                            IDLC
                        </h1>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="md:hidden text-gray-500 hover:text-red-500"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${isActive
                                    ? "bg-blue-100 text-blue-800 font-semibold shadow-sm"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                                }`
                            }
                        >
                            <span className="text-blue-700">{icon}</span>
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
