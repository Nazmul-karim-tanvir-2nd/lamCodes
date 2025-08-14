// src/pages/UserAccountReviewDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserAccountReviewDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // For now, using dummy data (replace with API call or store data)
    const requests = [
        { id: 1, name: "John Doe", department: "Finance", date: "2025-08-01", status: "Pending", email: "john@example.com", phone: "01711111111" },
        { id: 2, name: "Jane Smith", department: "IT", date: "2025-08-03", status: "Approved", email: "jane@example.com", phone: "01722222222" },
    ];

    const request = requests.find((req) => req.id.toString() === id);

    if (!request) {
        return (
            <div className="p-6">
                <h2 className="text-red-500 font-semibold">Request not found</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Account Request Details</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Request ID:</span>
                    <span>{request.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Name:</span>
                    <span>{request.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Department:</span>
                    <span>{request.department}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Date:</span>
                    <span>{request.date}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-white ${request.status === "Approved"
                            ? "bg-green-500"
                            : request.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}>
                        {request.status}
                    </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Email:</span>
                    <span>{request.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Phone:</span>
                    <span>{request.phone}</span>
                </div>
            </div>
        </div>
    );
};

export default UserAccountReviewDetails;
