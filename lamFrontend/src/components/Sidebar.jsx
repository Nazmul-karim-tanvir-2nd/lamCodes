import { NavLink } from 'react-router-dom';
import { User, Key, RefreshCcw, CheckCircle } from 'lucide-react';
import idlclogo from '../assets/idlclogo.jpg'

const Sidebar = () => {
    const linkClass =
        'flex items-center gap-3 px-4 py-2 rounded text-gray-700 hover:bg-blue-100 hover:text-black transition-all border border-gray-100';

    const activeClass =
        'bg-blue-100 text-black shadow-sm font-bold border-0';


    return (
        <aside className="bg-white text-black w-96 hidden md:block shadow-lg px-2">
            <div className="flex items-center justify-center gap-2 text-center py-4 border-b border-gray-400">
                <img src={idlclogo} alt="IDLC Logo" className="w-8 h-auto" />
                <h2 className="text-xl font-semibold text-blue-800 font-sans">
                    Logical Access Management
                </h2>
            </div>

            <nav className="space-y-3 py-5">
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
