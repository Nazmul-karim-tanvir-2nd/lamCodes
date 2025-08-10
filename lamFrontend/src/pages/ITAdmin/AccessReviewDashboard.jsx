// src/pages/ITAdmin/AccessRequestDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";
import dummyUsers2 from "../../data/dummyUser2";
import ExpandedReviewDetail from "./ExpandedReviewDetail";
import { SectionTitle } from "../../components/SectionTitle";


const Badge = ({ children }) => (
  <span className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-gray-200 text-gray-800 mr-1 mb-1">
    {children}
  </span>
);

const statusClass = (status) => {
  if (status === "Successful" || status === "Approved") return "text-green-700 bg-green-50 border-green-200";
  if (status === "Rejected") return "text-red-700 bg-red-50 border-red-200";
  if (status === "Pending") return "text-gray-700 bg-gray-50 border-gray-200";
  return "text-yellow-700 bg-yellow-50 border-yellow-200";
};

export default function AccessReviewDashboard() {
  const { requests, loadRequests, setFilter, filters } = useReviewDashboardStore();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const filtered = useMemo(() => {
    return (requests || []).filter((r) => {
      const user = dummyUsers2.find((u) => u.cif === r.cif);
      const deptMatch = filters.department ? user?.department === filters.department : true;
      const typeMatch = filters.accessType ? (r.selectedTypes || []).includes(filters.accessType) : true;
      return deptMatch && typeMatch;
    });
  }, [requests, filters]);

  const toggleRow = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6 underline underline-offset-8 decoration-gray-500/80">
        Access Review Dashboard
      </h1>
      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          onChange={(e) => setFilter("department", e.target.value)}
          className="border rounded-md border border-red-200 p-2 "
          value={filters.department}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Operations">Operations</option>
          <option value="Administration">Administration</option>
        </select>

        <select
          onChange={(e) => setFilter("accessType", e.target.value)}
          className="border rounded-md border border-red-200 p-2"
          value={filters.accessType}
        >
          <option value="">All Access Types</option>
          <option value="Software Access">Software Access</option>
          <option value="Cloud Access">Cloud Access</option>
          <option value="Internet Access">Internet Access</option>
          <option value="Device Request">Device Request</option>
          <option value="Email Attachment Increase">Email Attachment Increase</option>
          <option value="Additional Access">Additional Access</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No access requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-md border-red-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="text-left">
                <th className="px-4 py-3 border-b border-red-200">CIF</th>
                <th className="px-4 py-3 border-b border-red-200">Name</th>
                <th className="px-4 py-3 border-b border-red-200">Department</th>
                <th className="px-4 py-3 border-b border-red-200">Access Types</th>
                <th className="px-4 py-3 border-b border-red-200">Submitted</th>
                <th className="px-4 py-3 border-b border-red-200">LM Status</th>
                <th className="px-4 py-3 border-b border-red-200">Review Status</th>
                <th className="px-4 py-3 border-b border-red-200">Attachment</th>
                <th className="px-4 py-3 border-b border-red-200">Actions</th></tr>

            </thead>
            <tbody>
              {filtered.map((req) => {
                const user = dummyUsers2.find((u) => u.cif === req.cif);
                const isFinalized = req.reviewStatus === "Approved" || req.reviewStatus === "Rejected";
                const isOpen = expandedId === req.id;

                return (
                  <React.Fragment key={req.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b border-red-200">{req.cif}</td>
                      <td className="px-4 py-3 border-b border-red-200">{user?.name || "N/A"}</td>
                      <td className="px-4 py-3 border-b border-red-200">{user?.department || "N/A"}</td>
                      <td className="px-4 py-3 border-b border-red-200">
                        <div className="flex flex-wrap">
                          {(req.selectedTypes || []).map((t) => (
                            <Badge key={`${req.id}-${t}`}>{t}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b border-red-200">{req.submittedAt ? new Date(req.submittedAt).toLocaleString() : "—"}</td>
                      <td className="px-4 py-3 border-b border-red-200">
                        <span className={`inline-block px-2 py-0.5 border rounded ${statusClass(req.lineManagerStatus)}`}>
                          {req.lineManagerStatus || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-red-200">
                        <span className={`inline-block px-2 py-0.5 border rounded ${statusClass(req.reviewStatus)}`}>
                          {req.reviewStatus || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-red-200">
                        {req.attachmentName ? (
                          <a href={req.attachment} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                            {req.attachmentName}
                          </a>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3 border-b border-red-200">
                        <button className="text-blue-600 hover:text-blue-800 underline" onClick={() => toggleRow(req.id)}>
                          {isOpen ? "Hide" : "Review"}
                        </button>
                      </td>
                    </tr>

                    {isOpen && (
                      <tr>
                        <td className="px-4 py-4 bg-gray-50 border-b border-red-200" colSpan={9}>
                          <ExpandedReviewDetail request={req} isFinalized={isFinalized} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
