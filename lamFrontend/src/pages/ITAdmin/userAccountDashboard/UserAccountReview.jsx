// src/pages/ITAdmin/UserAccountReview.jsx
import React, { useState, useMemo } from "react";
import FloatingSelect from "../../../components/custom/FloatingSelect";
import FloatingInput from "../../../components/custom/FloatingInput";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";

const initialRequests = [
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
    { id: 11, name: "Stanley Hudson", department: "HR", status: "Rejected", date: "2025-08-11" },
];

const UserAccountReview = () => {
    const [requests, setRequests] = useState(initialRequests);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    const filteredRequests = useMemo(() => {
        return requests.filter((r) => {
            const matchesStatus = filterStatus ? r.status === filterStatus : true;
            const matchesDate = filterDate ? r.date === filterDate : true;
            return matchesStatus && matchesDate;
        });
    }, [requests, filterStatus, filterDate]);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const statusBadge = (status) => {
        const base = "px-3 py-1 rounded-full text-xs font-semibold";
        if (status === "Pending") return `${base} bg-yellow-100 text-yellow-700`;
        if (status === "Approved") return `${base} bg-green-100 text-green-700`;
        if (status === "Rejected") return `${base} bg-red-100 text-red-700`;
        return base;
    };

    const isAllSelected =
        paginatedRequests.length > 0 &&
        paginatedRequests.every((req) => selectedIds.includes(req.id));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds((prev) =>
                prev.filter((id) => !paginatedRequests.some((req) => req.id === id))
            );
        } else {
            setSelectedIds((prev) => [
                ...new Set([...prev, ...paginatedRequests.map((req) => req.id)]),
            ]);
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    const handleApprove = () => {
        setRequests((prev) =>
            prev.map((req) =>
                selectedIds.includes(req.id) ? { ...req, status: "Approved" } : req
            )
        );
        setSelectedIds([]);
    };

    const handleRemove = () => {
        setRequests((prev) =>
            prev.map((req) =>
                selectedIds.includes(req.id) ? { ...req, status: "Rejected" } : req
            )
        );
        setSelectedIds([]);
    };

    return (
        <div className="min-w-full mx-auto">
            <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
                User Account Review Dashboard
            </h1>
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/" },
                    { label: "useraccount-review-dashboard" }
                ]}
            />

            <div className="bg-white shadow-lg rounded-xl p-4 border border-red-200">
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
                                    { label: "Rejected", value: "Rejected" },
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

                {/* Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="flex gap-3 mb-4">
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-700"
                        >
                            Approve Selected
                        </button>
                        <button
                            onClick={handleRemove}
                            className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700"
                        >
                            Reject Selected
                        </button>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-base border-separate border-spacing-0">
                        <thead className="bg-gray-400 text-white font-bold text-center">
                            <tr>
                                <th className="px-4 py-4 border-b border-gray-200">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4 border-b border-gray-200">ID</th>
                                <th className="px-6 py-4 border-b border-gray-200">Name</th>
                                <th className="px-6 py-4 border-b border-gray-200">Department</th>
                                <th className="px-6 py-4 border-b border-gray-200">Date</th>
                                <th className="px-6 py-4 border-b border-gray-200">Status</th>
                                <th className="px-6 py-4 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {paginatedRequests.map((req, index) => (
                                <tr
                                    key={req.id}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"
                                        } hover:bg-gray-50 transition-colors`}
                                >
                                    <td className="px-4 py-4 border-b border-gray-100">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(req.id)}
                                            onChange={() => toggleSelect(req.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">{req.id}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 font-medium text-left">{req.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">{req.department}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-600">{req.date}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <span className={statusBadge(req.status)}>{req.status}</span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <button
                                            className="text-blue-600 font-medium hover:underline"
                                            onClick={() =>
                                                navigate(`/user-account-review-details/${req.id}`)
                                            }
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedRequests.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-6 text-gray-500"
                                    >
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