import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";
import dummyUsers2 from "../../data/dummyUser2";
import FloatingCheckbox from "../../components/custom/FloatingCheckbox"; // Assume path is correct
import Swal from "sweetalert2";
import { IoMdCloseCircleOutline } from "react-icons/io";


// Function to check if the URL is an image
const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url) || /^data:image\/[a-z]+;base64,/.test(url);
};

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
  const { requests, loadRequests, setFilter, filters, approveMultiple, rejectMultiple } = useReviewDashboardStore();
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

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

  const eligibleRequests = filtered.filter((r) => r.lineManagerStatus === "Successful" && !r.isFinalized);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(eligibleRequests.map((r) => r.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.length === 0) return;
    const { value: comment } = await Swal.fire({
      input: "textarea",
      inputLabel: "Reviewer Comment (required)",
      inputPlaceholder: "Enter your comment...",
      inputAttributes: {
        "aria-label": "Reviewer comment",
      },
      showCancelButton: true,
      confirmButtonText: "Approve",
    });
    if (comment) {
      approveMultiple(selectedIds, comment);
      setSelectedIds([]);
      setSelectAll(false);
      loadRequests();
      Swal.fire("Approved", "Selected requests approved.", "success");
    }
  };

  const handleBulkReject = async () => {
    if (selectedIds.length === 0) return;
    const { value: comment } = await Swal.fire({
      input: "textarea",
      inputLabel: "Reviewer Comment (required)",
      inputPlaceholder: "Enter your comment...",
      inputAttributes: {
        "aria-label": "Reviewer comment",
      },
      showCancelButton: true,
      confirmButtonText: "Reject",
    });
    if (comment) {
      rejectMultiple(selectedIds, comment);
      setSelectedIds([]);
      setSelectAll(false);
      loadRequests();
      Swal.fire("Rejected", "Selected requests rejected.", "success");
    }
  };

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
  };

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

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex gap-4 mb-4">
          <button
            className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
            onClick={handleBulkApprove}
          >
            Approve Selected
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50"
            onClick={handleBulkReject}
          >
            Reject Selected
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No access requests found.</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-md border-red-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="text-left">
                <th className="px-4 py-3 border-b border-red-200 text-red-600 hover:underline cursor-pointer " checked={selectAll} onClick={toggleSelectAll}>
               Select All
                 
                </th>
                <th className="px-4 py-3 border-b border-red-200">CIF</th>
                <th className="px-4 py-3 border-b border-red-200">Name</th>
                <th className="px-4 py-3 border-b border-red-200">Department</th>
                <th className="px-4 py-3 border-b border-red-200">Access Types</th>
                <th className="px-4 py-3 border-b border-red-200">Submitted</th>
                <th className="px-4 py-3 border-b border-red-200">LM Status</th>
                <th className="px-4 py-3 border-b border-red-200">Review Status</th>
                <th className="px-4 py-3 border-b border-red-200">Attachment</th>
                <th className="px-4 py-3 border-b border-red-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => {
                const user = dummyUsers2.find((u) => u.cif === req.cif);
                const isFinalized = req.reviewStatus === "Approved" || req.reviewStatus === "Rejected";
                const isEligible = req.lineManagerStatus === "Successful" && !isFinalized;
                const isSelected = selectedIds.includes(req.id);

                return (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b border-red-200">
                      <FloatingCheckbox
                        checked={isSelected}
                        onChange={() => toggleSelect(req.id)}
                        disabled={!isEligible}
                      />
                    </td>
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
                        {req.attachmentUrl ? (
                          isImageUrl(req.attachmentUrl) ? (
                            <span
                              className="text-blue-600 underline cursor-pointer"
                              onClick={() => openModal(req.attachmentUrl)}
                            >
                              {req.attachmentName || "View Image"}
                            </span>
                          ) : (
                            <a
                              href={req.attachmentUrl}
                              download={req.attachmentName || "attachment"}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              {req.attachmentName || "View / Download"}
                            </a>
                          )
                        ) : (
                          "—"
                        )}
                      </td>
                    <td className="px-4 py-3 border-b border-red-200">
                      <Link to={`/access-review-details/${req.id}`} className="text-blue-600 hover:text-blue-800 underline">
                        Review
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for larger image */}
      {isModalOpen && selectedImageUrl && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-transparent p-4 rounded-lg w-1/2 h-1/2 overflow-auto"
            style={{ backgroundImage: `url(${selectedImageUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
            onClick={(e) => e.stopPropagation()} 
          >
            < IoMdCloseCircleOutline
                          className="absolute text-white text-2xl cursor-pointer hover:text-gray-300"
                          onClick={closeModal}
                        />
           
          </div>
        </div>
      )}
    </div>
  );
}