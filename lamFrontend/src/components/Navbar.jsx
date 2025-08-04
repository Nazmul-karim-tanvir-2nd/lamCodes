import { Menu } from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";

const Navbar = ({ onLoginClick }) => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <header className="sticky top-0 z-30 bg-red-600/80 shadow-md">
            <div className="flex items-center justify-between h-20 px-2 sm:px-4 lg:px-4">
                {/* Left: Menu button + title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-red-400 transition"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="text-white w-6 h-6" />
                    </button>

                    <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-white">
                        Logical Access Management
                    </h1>
                </div>

                {/* Right Side: Add Login Button */}
                <div className="flex items-center space-x-4">

                    {/* Login Button */}
                    <button
                        onClick={onLoginClick}
                        className="text-white bg-red-400 hover:bg-red-500 px-4 py-1 rounded-md font-semibold text-lg transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;