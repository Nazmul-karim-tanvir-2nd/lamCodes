// src/pages/HR/EmployeeTransferReview.jsx
import React, { useState, useMemo } from "react";
import FloatingSelect from "../../../components/custom/FloatingSelect";
import FloatingInput from "../../../components/custom/FloatingInput";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/common/Breadcrumb";

const initialTransfers = [
    { id: 1, employeeName: "John Doe", fromDept: "IT", toDept: "Finance", status: "Pending", date: "2025-08-01" },
    { id: 2, employeeName: "Jane Smith", fromDept: "Finance", toDept: "HR", status: "Approved", date: "2025-08-02" },
    { id: 3, employeeName: "Ali Khan", fromDept: "HR", toDept: "IT", status: "Pending", date: "2025-08-03" },
    { id: 4, employeeName: "Maria Lopez", fromDept: "IT", toDept: "Finance", status: "Approved", date: "2025-08-04" },
    { id: 5, employeeName: "David Chen", fromDept: "Finance", toDept: "IT", status: "Rejected", date: "2025-08-05" },
];

const EmployeeTransferReview = () => {
    const [transfers, setTransfers] = useState(initialTransfers);
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    const filteredTransfers = useMemo(() => {
        return transfers.filter((t) => {
            const matchesStatus = filterStatus ? t.status === filterStatus : true;
            const matchesDate = filterDate ? t.date === filterDate : true;
            return matchesStatus && matchesDate;
        });
    }, [transfers, filterStatus, filterDate]);

    const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
    const paginatedTransfers = filteredTransfers.slice(
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
        paginatedTransfers.length > 0 &&
        paginatedTransfers.every((t) => selectedIds.includes(t.id));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds((prev) =>
                prev.filter((id) => !paginatedTransfers.some((t) => t.id === id))
            );
        } else {
            setSelectedIds((prev) => [
                ...new Set([...prev, ...paginatedTransfers.map((t) => t.id)]),
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
        setTransfers((prev) =>
            prev.map((t) =>
                selectedIds.includes(t.id) ? { ...t, status: "Approved" } : t
            )
        );
        setSelectedIds([]);
    };

    const handleReject = () => {
        setTransfers((prev) =>
            prev.map((t) =>
                selectedIds.includes(t.id) ? { ...t, status: "Rejected" } : t
            )
        );
        setSelectedIds([]);
    };

    return (
        <div className="min-w-full mx-auto">
            <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
                Employee Transfer Review Dashboard
            </h1>
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/" },
                    { label: "employee-transfer-review-dashboard" }
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
                            onClick={handleReject}
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
                                <th className="px-6 py-4 border-b border-gray-200">Employee</th>
                                <th className="px-6 py-4 border-b border-gray-200">From Dept</th>
                                <th className="px-6 py-4 border-b border-gray-200">To Dept</th>
                                <th className="px-6 py-4 border-b border-gray-200">Date</th>
                                <th className="px-6 py-4 border-b border-gray-200">Status</th>
                                <th className="px-6 py-4 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {paginatedTransfers.map((t, index) => (
                                <tr
                                    key={t.id}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-gray-50 transition-colors`}
                                >
                                    <td className="px-4 py-4 border-b border-gray-100">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(t.id)}
                                            onChange={() => toggleSelect(t.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">{t.id}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 font-medium text-left">{t.employeeName}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">{t.fromDept}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">{t.toDept}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-600">{t.date}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <span className={statusBadge(t.status)}>{t.status}</span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <button
                                            className="text-blue-600 font-medium hover:underline"
                                            onClick={() =>
                                                navigate(`/employee-transfer-review-details/${t.id}`)
                                            }
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedTransfers.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500">
                                        No transfers found.
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

export default EmployeeTransferReview;