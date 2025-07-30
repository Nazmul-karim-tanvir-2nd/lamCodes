import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx'

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;