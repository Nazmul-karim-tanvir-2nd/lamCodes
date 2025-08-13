// src/pages/ITAdmin/UserAccountReview.jsx
import React, { useState, useMemo } from "react";
import { UserPlus } from "lucide-react";
import FloatingSelect from "../../../components/custom/FloatingSelect";
import { useNavigate } from "react-router-dom";

// Sample data (replace with API later)
const accountRequests = [
    { id: 1, name: "John Doe", department: "IT", status: "Pending" },
    { id: 2, name: "Jane Smith", department: "Finance", status: "Approved" },
    { id: 3, name: "Ali Khan", department: "HR", status: "Pending" },
];

const UserAccountReview = () => {
    const [filterStatus, setFilterStatus] = useState("");
    const navigate = useNavigate();

    // Filtered requests based on dropdown
    const filteredRequests = useMemo(() => {
        if (!filterStatus) return accountRequests;
        return accountRequests.filter((r) => r.status === filterStatus);
    }, [filterStatus]);

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            {/* Header */}
            <h1 className="text-xl font-bold text-blue-800 mb-6 underline underline-offset-4 decoration-gray-400 text-center">
                User Account Review
            </h1>

            {/* Filter */}
            <div className="mb-6 max-w-xs">
                <FloatingSelect
                    label="Filter by Status"
                    name="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    options={[
                        { label: "Pending", value: "Pending" },
                        { label: "Approved", value: "Approved" },
                    ]}
                />
            </div>

            {/* Summary Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6 flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                    <UserPlus size={32} className="text-blue-500" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Total Pending Requests</h2>
                    <p className="text-gray-500 mt-1">
                        {accountRequests.filter((r) => r.status === "Pending").length}
                    </p>
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
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req) => (
                            <tr key={req.id} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-4 py-2 border-b">{req.id}</td>
                                <td className="px-4 py-2 border-b">{req.name}</td>
                                <td className="px-4 py-2 border-b">{req.department}</td>
                                <td
                                    className={`px-4 py-2 border-b font-medium ${req.status === "Pending"
                                        ? "text-yellow-700"
                                        : "text-green-700"
                                        }`}
                                >
                                    {req.status}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        className="text-blue-600 underline"
                                        onClick={() => navigate(`/user-account-review-details/${req.id}`)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredRequests.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserAccountReview;
