import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Key, Repeat, LogOut } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const requests = [
    {
        label: "New User Account Opening",
        path: "/new-user",
        count: 8,
        icon: <UserPlus size={40} className="text-blue-500" />,
        color: "bg-blue-100",
    },
    {
        label: "Access Request",
        path: "/access-request",
        count: 5,
        icon: <Key size={40} className="text-green-500" />,
        color: "bg-green-100",
    },
    {
        label: "Employee Transfer",
        path: "/employee-transfer",
        count: 3,
        icon: <Repeat size={40} className="text-yellow-500" />,
        color: "bg-yellow-100",
    },
    {
        label: "Employee Clearance",
        path: "/employee-clearance",
        count: 2,
        icon: <LogOut size={40} className="text-red-500" />,
        color: "bg-red-100",
    },
];

// Sample chart data
const barData = [
    { name: "Jan", requests: 10 },
    { name: "Feb", requests: 15 },
    { name: "Mar", requests: 8 },
    { name: "Apr", requests: 20 },
    { name: "May", requests: 12 },
];

const pieData = [
    { name: "New User", value: 8 },
    { name: "Access", value: 5 },
    { name: "Transfer", value: 3 },
    { name: "Clearance", value: 2 },
];

const COLORS = ["#3B82F6", "#10B981", "#FACC15", "#EF4444"];

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Heading */}
            <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
                Admin Dashboard
            </h1>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {requests.map((req, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition-all"
                        onClick={() => navigate(req.path)}
                    >
                        <div
                            className={`${req.color} rounded-full p-4 flex items-center justify-center mb-4`}
                        >
                            {req.icon}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700 text-center">
                            {req.label}
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm">{req.count} Pending</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Requests Over Time</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="requests" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-lg font-bold text-gray-700 mb-4">Request Type Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;