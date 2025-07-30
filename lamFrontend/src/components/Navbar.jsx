// src/components/Navbar.jsx
import { Menu } from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";

const Navbar = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm md:hidden">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 transition"
            >
                <Menu className="text-blue-700" />
            </button>
            <h1 className="text-lg font-semibold text-blue-700">Logical Access</h1>
        </header>
    );
};

export default Navbar;
