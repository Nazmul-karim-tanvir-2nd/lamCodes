import { Menu } from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";

const Navbar = ({ onLoginClick }) => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <header className="sticky top-0 z-30 bg-red-600/80 shadow-md">
            <div className="flex items-center justify-between h-20 sm:h-20 px-2 sm:px-4">
                {/* Left: Menu button + title */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-red-500/80 transition"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px] sm:max-w-none">
                        Logical Access
                        <span className="hidden sm:inline"> Management</span>
                    </h1>
                </div>

                {/* Right: Login Button */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                        onClick={onLoginClick}
                        className="px-3 py-1 sm:px-4 sm:py-1.5 text-sm sm:text-base text-white bg-red-500 hover:bg-red-600 active:bg-red-700 border border-white rounded-lg font-semibold shadow-sm transition duration-200"
                    >
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
