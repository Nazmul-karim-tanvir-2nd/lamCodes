// src/layout/Layout.jsx
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Custom/Sidebar.jsx';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
