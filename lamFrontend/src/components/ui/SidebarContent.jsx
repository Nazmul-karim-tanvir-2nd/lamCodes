import React from "react";

const SidebarContent = () => {
    return (
        <aside className="w-[var(--sidebar-width)] bg-gray-900 text-white min-h-screen p-5 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">My Sidebar</h1>
            <nav className="flex-1">
                <ul>
                    <li className="mb-3 cursor-pointer hover:bg-gray-700 p-2 rounded">Dashboard</li>
                    <li className="mb-3 cursor-pointer hover:bg-gray-700 p-2 rounded">Settings</li>
                    <li className="mb-3 cursor-pointer hover:bg-gray-700 p-2 rounded">Profile</li>
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarContent;
