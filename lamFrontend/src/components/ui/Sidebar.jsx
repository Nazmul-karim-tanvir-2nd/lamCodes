// src/components/ui/Sidebar.jsx
import { Home, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/account", label: "Account", icon: <User size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },
];

export const Sidebar = () => {
    return (
        <aside className="w-60 min-h-screen bg-gray-50 border-r border-gray-200 shadow-sm">
            <div className="p-4 text-xl font-bold text-blue-700">YourApp</div>
            <nav className="flex flex-col px-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${isActive
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
