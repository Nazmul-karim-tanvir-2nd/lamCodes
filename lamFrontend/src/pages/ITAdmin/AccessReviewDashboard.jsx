import { useEffect, useState } from "react";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";
import AccessReviewCard from "../../components/AccessReviewCard";
import { SectionTitle } from "../../components/SectionTitle";
import dummyUsers2 from "../../data/dummyUser2";

const AccessReviewDashboard = () => {
  const {
    requests,
    loadRequests,
    setFilter,
    filters,
    updateReviewComment,
  } = useReviewDashboardStore();

  const [selectedAccessTypes, setSelectedAccessTypes] = useState({});

  useEffect(() => {
    loadRequests();
  }, []);

  const toggleAccessType = (cif, accessType) => {
    setSelectedAccessTypes((prev) => {
      const current = prev[cif] || [];
      return {
        ...prev,
        [cif]: current.includes(accessType)
          ? current.filter((t) => t !== accessType)
          : [...current, accessType],
      };
    });
  };

  const handleApprove = (request, index) => {
    const approvedTypes = selectedAccessTypes[request.cif] || [];
    const rejectedTypes = request.selectedTypes.filter(t => !approvedTypes.includes(t));

    const reviewed = {
      ...request,
      approvedAccess: approvedTypes,
      rejectedAccess: rejectedTypes,
      reviewStatus: "Approved",
    };

    const existing = JSON.parse(localStorage.getItem("reviewedAccess")) || [];
    existing.push(reviewed);
    localStorage.setItem("reviewedAccess", JSON.stringify(existing));
  };

  const handleReject = (request, index) => {
    const reviewed = {
      ...request,
      approvedAccess: [],
      rejectedAccess: request.selectedTypes,
      reviewStatus: "Rejected",
    };

    const existing = JSON.parse(localStorage.getItem("reviewedAccess")) || [];
    existing.push(reviewed);
    localStorage.setItem("reviewedAccess", JSON.stringify(existing));
  };

  const filtered = requests.filter((r) => {
  const user = dummyUsers2.find(u => u.cif === r.cif);
  const deptMatch = filters.department ? user?.department === filters.department : true;
  const typeMatch = filters.accessType ? r.selectedTypes.includes(filters.accessType) : true;
  return deptMatch && typeMatch;
});

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6 underline underline-offset-8 decoration-gray-500/80">
        Access Review Dashboard
      </h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select onChange={(e) => setFilter("department", e.target.value)} className="border p-2 rounded">
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Operations">Operations</option>
          <option value="Administration">Administration</option>
        </select>

        <select onChange={(e) => setFilter("accessType", e.target.value)} className="border p-2 rounded">
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
        <p className="text-center text-gray-500">No access requests found.</p>
      )}

      <div className="space-y-6">
        {filtered.map((req, index) => (
          <AccessReviewCard
            key={index}
            request={req}
            selectedTypes={selectedAccessTypes[req.cif] || []}
            toggleAccessType={(type) => toggleAccessType(req.cif, type)}
            onApprove={() => handleApprove(req, index)}
            onReject={() => handleReject(req, index)}
            onCommentChange={(val) => updateReviewComment(index, val)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessReviewDashboard;
