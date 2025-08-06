import { useEffect } from "react";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";
import { SectionTitle } from "../../components/SectionTitle";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import { Button } from "../../components/ui/Button";
import { getAccessKey } from "../../lib/accessTypeMapper";

const AccessReviewDashboard = () => {
  const {
    requests,
    loadRequests,
    approveRequest,
    rejectRequest,
    setFilter,
    filters,
    updateReviewComment,
  } = useReviewDashboardStore();

  useEffect(() => {
    loadRequests();
  }, []);

  const filtered = requests.filter((r) => {
    const deptMatch = filters.department
      ? r.fields?.Department === filters.department
      : true;
    const typeMatch = filters.accessType
      ? r.selectedTypes.includes(filters.accessType)
      : true;
    return deptMatch && typeMatch;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6 underline underline-offset-8 decoration-red-500/80">
        Admin Access Review Dashboard
      </h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <select
          onChange={(e) => setFilter("department", e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
        </select>

        <select
          onChange={(e) => setFilter("accessType", e.target.value)}
          className="border p-2 rounded"
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

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No requests found.</p>
      )}

      {filtered.map((req, index) => (
        <div
          key={index}
          className="mb-6 border border-red-300 rounded-lg bg-white p-6 shadow space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>CIF:</strong> {req.cif}</p>
            <p><strong>Submitted At:</strong> {new Date(req.submittedAt).toLocaleString()}</p>
            <p>
              <strong>Line Manager Status:</strong>{" "}
              <span className={`font-semibold ${req.lineManagerStatus === "Successful" ? "text-green-600" : "text-yellow-600"}`}>
                {req.lineManagerStatus}
              </span>
            </p>
            <p>
              <strong>Review Status:</strong>{" "}
              <span className={`font-semibold ${req.reviewStatus === "Approved" ? "text-green-600" : req.reviewStatus === "Rejected" ? "text-red-600" : "text-gray-600"}`}>
                {req.reviewStatus}
              </span>
            </p>
          </div>

          <div>
            <SectionTitle>Requested Access</SectionTitle>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {req.selectedTypes.map((type) => {
                const key = getAccessKey(type);
                const data = req.fields?.[key];

                return (
                  <li key={type}>
                    <strong>{type}</strong>
                    <div className="ml-4 mt-1 space-y-1">
                      {key === "Software" && (
                        <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                      )}

                      {key === "Cloud" && (
                        <>
                          <p><strong>Cloud Service:</strong> {data?.service || "N/A"}</p>
                          <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                        </>
                      )}

                      {key === "Internet" && (
                        <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                      )}

                      {key === "Device" && (
                        <>
                          <p><strong>Device Type:</strong> {data?.type || "N/A"}</p>
                          <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                        </>
                      )}

                      {key === "Email" && (
                        <>
                          <p><strong>Current Limit:</strong> {data?.current || "N/A"} MB</p>
                          <p><strong>Required Limit:</strong> {data?.required || "N/A"} MB</p>
                          <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                        </>
                      )}

                      {key === "Additional" && (
                        <>
                          <p><strong>Access Needed:</strong> {data?.access || "N/A"}</p>
                          <p><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}

              {/* Notes Section */}
              {req.fields?.Notes?.details && (
                <li>
                  <strong>Remarks / Special Instructions:</strong>
                  <div className="ml-4 mt-1">{req.fields.Notes.details}</div>
                </li>
              )}

              {/* Attachment Link */}
              {req.attachment && req.attachmentName && (
                <li>
                  <strong>Attachment:</strong>{" "}
                  <a
                    href={req.attachment}
                    download={req.attachmentName}
                    className="text-blue-600 underline"
                  >
                    {req.attachmentName}
                  </a>
                </li>
              )}
            </ul>

          </div>

          {req.lineManagerStatus === "Successful" && (
            <>
              <FloatingTextarea
                label="Reviewer Comments"
                name="comment"
                value={req.reviewComment}
                onChange={(e) => updateReviewComment(index, e.target.value)}
              />

              <div className="flex gap-4">
                <Button className="bg-green-600 text-white" onClick={() => approveRequest(index)}>
                  Approve
                </Button>
                <Button className="bg-red-600 text-white" onClick={() => rejectRequest(index)}>
                  Reject
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccessReviewDashboard;
