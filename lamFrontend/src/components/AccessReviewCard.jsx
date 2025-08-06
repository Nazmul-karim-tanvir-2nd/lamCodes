//src/components/AccessReviewCard
import React from "react";
import { getAccessKey } from "../../lib/accessTypeMapper";




const AccessReviewCard = ({ request }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4 mb-6">
      <div className="text-sm text-gray-600">
        <p><strong>CIF:</strong> {request.cif}</p>
        <p><strong>Submitted At:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
        <p><strong>Line Manager Approval:</strong> {request?.fields?.ManagerApproval || "Pending"}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Access Type Justifications</h3>
        {request.selectedTypes.map((label) => {
          const key = getAccessKey(label);
          const field = request.fields?.[key];

          return (
            <div key={label} className="mb-4">
              <p className="font-medium text-gray-700">{label}</p>
              {field?.justification && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Justification:</strong> {field.justification}
                </p>
              )}

              {key === "Cloud" && field?.service && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Cloud Service:</strong> {field.service}
                </p>
              )}

              {key === "Device" && field?.type && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Device Type:</strong> {field.type}
                </p>
              )}

              {key === "Email" && (
                <div className="text-sm text-gray-600 space-y-1 mt-1">
                  <p><strong>Current Limit:</strong> {field.current} MB</p>
                  <p><strong>Required Limit:</strong> {field.required} MB</p>
                </div>
              )}

              {key === "Additional" && field?.access && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Access Needed:</strong> {field.access}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm">
          Approve
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm">
          Reject
        </button>
      </div>
    </div>
  );
};

export default AccessReviewCard;
