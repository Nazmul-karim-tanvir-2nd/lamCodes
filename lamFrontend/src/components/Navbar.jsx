import { Menu } from "lucide-react";
import useSidebarStore from "../store/useSidebarStore";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const navigate = useNavigate();



  return (
    <header className="sticky top-0 z-30 bg-red-600/80 shadow-md">
      <div className="flex items-center justify-between h-20 sm:h-20 px-2 sm:px-4">
        {/* Left: Menu button + title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-red-400/80 transition"
            aria-label="Toggle sidebar"
          >
            <Menu className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-none">
            Logical Access Mangement
          </h1>
        </div>

    
      </div>
    </header>
  );
};

export default Navbar;
