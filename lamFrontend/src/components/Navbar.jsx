// src/components/Navbar.jsx
import { Menu } from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";

const Navbar = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <header className="sticky top-0 z-30 bg-blue-600/80 shadow">

            <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                {/* Left: Menu button (mobile only) + title */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-blue-400 transition"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="text-white w-6 h-6" />
                    </button>

                    {/* App Title */}
                    <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-white">
                        Logical Access Management
                    </h1>
                </div>

                {/* Right Side: Placeholder for future items like profile, settings */}
                <div className="flex items-center space-x-4">
                    {/* Example: Notification dot */}
                    <div className="relative">
                        <span className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0 animate-ping opacity-75"></span>
                        <span className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0"></span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
