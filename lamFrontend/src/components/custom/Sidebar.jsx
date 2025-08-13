// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
    User,
    Key,
    RefreshCcw,
    CheckCircle,
    X,
} from "lucide-react";
import { ShieldUser } from 'lucide-react';

import idlclogo from "../../assets/idlclogo.jpg";
import useSidebarStore from "../../store/useSidebarStore";
import { MdDashboard } from "react-icons/md";

const navItems = [
    { to: "/", label: "Admin Dashboard", icon: <MdDashboard size={22} aria-hidden="true" /> },
    { to: "/account-creation", label: "Account Creation", icon: <User size={22} aria-hidden="true" /> },
    { to: "/access-request", label: "Access Request", icon: <Key size={22} aria-hidden="true" /> },
    { to: "/employee-transfer", label: "Employee Transfer", icon: <RefreshCcw size={22} aria-hidden="true" /> },
    { to: "/employee-clearance", label: "Employee Clearance", icon: <CheckCircle size={22} aria-hidden="true" /> },
];

const Sidebar = () => {
    const { isOpen, closeSidebar } = useSidebarStore();

    return (
        <>
            {/* Mobile overlay */}
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
                className={`
                    fixed z-50 top-0 left-0 h-full bg-white shadow-md
                    transform transition-transform duration-200 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    ${isOpen ? "md:w-80" : "md:w-24"}
                    w-80
                `}
            >
                {/* Header */}
                <div className={`
                    flex items-center p-5 border-b border-gray-200
                    ${isOpen ? "justify-between md:justify-center" : "justify-center"}
                `}>
                    <div className="flex items-center gap-3">
                        <img
                            src={idlclogo}
                            alt="IDLC Logo"
                            className="w-10 h-10 object-contain"
                        />
                        {isOpen && (
                            <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                                IDLC
                            </h1>
                        )}
                    </div>

                    {/* Close button only visible on mobile */}
                    <button
                        onClick={closeSidebar}
                        className="md:hidden text-gray-500 hover:text-red-500 ml-auto"
                        aria-label="Close sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-5 space-y-3">
                    {navItems.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `group flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors
                                ${isActive
                                    ? "bg-blue-100 text-blue-800 font-semibold"
                                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`
                            }
                        >
                            <span className="text-blue-700">{icon}</span>
                            {isOpen && <span className="ml-4">{label}</span>}
                            {!isOpen && <span className="sr-only">{label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;