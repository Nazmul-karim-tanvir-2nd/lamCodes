// src/pages/ITAdmin/UserAccountReview.jsx
import React, { useState, useMemo } from "react";
import FloatingSelect from "../../../components/custom/FloatingSelect";
import FloatingInput from "../../../components/custom/FloatingInput";
import { useNavigate } from "react-router-dom";

const accountRequests = [
    { id: 1, name: "John Doe", department: "IT", status: "Pending", date: "2025-08-01" },
    { id: 2, name: "Jane Smith", department: "Finance", status: "Approved", date: "2025-08-02" },
    { id: 3, name: "Ali Khan", department: "HR", status: "Pending", date: "2025-08-03" },
    { id: 4, name: "Maria Lopez", department: "IT", status: "Approved", date: "2025-08-04" },
    { id: 5, name: "David Chen", department: "Finance", status: "Pending", date: "2025-08-05" },
    { id: 6, name: "Sarah Lee", department: "IT", status: "Pending", date: "2025-08-06" },
    { id: 7, name: "Michael Scott", department: "HR", status: "Approved", date: "2025-08-07" },
    { id: 8, name: "Dwight Schrute", department: "Finance", status: "Pending", date: "2025-08-08" },
    { id: 9, name: "Pam Beesly", department: "IT", status: "Approved", date: "2025-08-09" },
    { id: 10, name: "Jim Halpert", department: "Finance", status: "Pending", date: "2025-08-10" },
    { id: 11, name: "Stanley Hudson", department: "HR", status: "Approved", date: "2025-08-11" },
];

const UserAccountReview = () => {
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();

    // Filtered data
    const filteredRequests = useMemo(() => {
        return accountRequests.filter((r) => {
            const matchesStatus = filterStatus ? r.status === filterStatus : true;
            const matchesDate = filterDate ? r.date === filterDate : true;
            return matchesStatus && matchesDate;
        });
    }, [filterStatus, filterDate]);

    // Pagination
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const statusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-semibold";
        if (status === "Pending") return `${base} bg-yellow-100 text-yellow-700`;
        if (status === "Approved") return `${base} bg-green-100 text-green-700`;
        return base;
    };

    return (
        <div className="min-w-full mx-auto">
            <h1 className="text-2xl font-bold text-blue-800 mb-8 underline underline-offset-4 decoration-gray-400 text-center">
                User Account Review
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="max-w-xs w-64">
                            <FloatingSelect
                                label="Filter by Status"
                                name="statusFilter"
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                                options={[
                                    { label: "Pending", value: "Pending" },
                                    { label: "Approved", value: "Approved" },
                                ]}
                            />
                        </div>
                        <div className="max-w-xs w-64">
                            <FloatingInput
                                label="Filter by Date"
                                name="dateFilter"
                                type="date"
                                value={filterDate}
                                onChange={(e) => {
                                    setFilterDate(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    {/* Rows per page */}
                    <div className="max-w-xs w-36">
                        <FloatingSelect
                            label="Rows per page"
                            name="rowsPerPage"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            options={[
                                { label: "10", value: 10 },
                                { label: "5", value: 5 },
                                { label: "15", value: 15 },
                                { label: "20", value: 20 },
                            ]}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-separate border-spacing-0">
                        <thead className="bg-blue-50 text-gray-700">
                            <tr className="text-center">
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">ID</th>
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">Name</th>
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">Department</th>
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">Date</th>
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">Status</th>
                                <th className="px-6 py-3 font-semibold text-left border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.map((req, index) => (
                                <tr
                                    key={req.id}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-gray-50 transition-colors`}
                                >
                                    <td className="px-6 py-4 border-b border-gray-100 text-left">{req.id}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 font-medium text-left">{req.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-left">{req.department}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-left text-gray-600">{req.date}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-left">
                                        <span className={statusBadge(req.status)}>{req.status}</span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-left">
                                        <button
                                            className="text-blue-600 font-medium hover:underline"
                                            onClick={() => navigate(`/user-account-review-details/${req.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-500">
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserAccountReview;