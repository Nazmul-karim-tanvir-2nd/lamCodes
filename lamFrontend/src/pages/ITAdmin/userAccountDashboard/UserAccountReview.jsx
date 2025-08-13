// src/pages/ITAdmin/UserAccountReview.jsx
import React from "react";
import { UserPlus } from "lucide-react";

// Sample data (replace with real API/data later)
const accountRequests = [
    { id: 1, name: "John Doe", department: "IT", status: "Pending" },
    { id: 2, name: "Jane Smith", department: "Finance", status: "Approved" },
    { id: 3, name: "Ali Khan", department: "HR", status: "Pending" },
];

const UserAccountReview = () => {
    return (
        <div className="min-h-screen p-4 bg-gray-50">
            {/* Header */}
            <h1 className="text-xl font-bold text-blue-800 mb-6 underline underline-offset-4 decoration-gray-400 text-center">
                User Account Review
            </h1>

            {/* Summary Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6 flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                    <UserPlus size={32} className="text-blue-500" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Total Pending Requests</h2>
                    <p className="text-gray-500 mt-1">{accountRequests.filter(r => r.status === "Pending").length}</p>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border-b">ID</th>
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Department</th>
                            <th className="px-4 py-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountRequests.map((req) => (
                            <tr key={req.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{req.id}</td>
                                <td className="px-4 py-2 border-b">{req.name}</td>
                                <td className="px-4 py-2 border-b">{req.department}</td>
                                <td
                                    className={`px-4 py-2 border-b font-medium ${req.status === "Pending"
                                        ? "text-yellow-700"
                                        : req.status === "Approved"
                                            ? "text-green-700"
                                            : "text-red-700"
                                        }`}
                                >
                                    {req.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserAccountReview;