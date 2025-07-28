import { NavLink } from 'react-router-dom';
import { User, Key, RefreshCcw, CheckCircle } from 'lucide-react';

const Sidebar = () => {
    const linkClass =
        'flex items-center gap-3 px-4 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-all';

    const activeClass = 'bg-white text-indigo-700 shadow-sm';

    return (
        <aside className="bg-indigo-100 text-black w-72 min-h-screen p-5 hidden md:block shadow-sm">
            <h2 className="text-2xl font-semibold mb-8 text-indigo-800">📊 Dashboard</h2>
            <nav className="space-y-3">
                <NavLink to="/" end className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                    <User size={20} /> Account Creation
                </NavLink>
                <NavLink to="/access-request" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                    <Key size={20} /> Access Request
                </NavLink>
                <NavLink to="/employee-transfer" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                    <RefreshCcw size={20} /> Employee Transfer
                </NavLink>
                <NavLink to="/employee-clearance" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                    <CheckCircle size={20} /> Employee Clearance
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
