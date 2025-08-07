import React from "react";
import { getAccessKey } from "../lib/accessTypeMapper";
import { FaKey } from "react-icons/fa";
import FloatingTextarea from "../components/custom/FloatingTextarea";
import { Button } from "./ui/Button";
import dummyUsers2 from "../data/dummyUser2";
import FloatingCheckbox from "../components/custom/FloatingCheckbox";
import useReviewDashboardStore from "../store/useReviewDashboardStore";


const AccessReviewCard = ({
  request,
  selectedTypes,
  toggleAccessType,
  onCommentChange,
}) => {
  const user = dummyUsers2.find(u => u.cif === request.cif);

  const toggle = useReviewDashboardStore(state => state.toggleAccessType);
  const { approveRequest, rejectRequest } = useReviewDashboardStore();

  return (
    <div className="bg-white border border-red-300 rounded-lg shadow-md p-4 space-y-4 w-full">
      {/* Employee Info */}
      <div className=" rounded-md bg-gray-50 p-4 grid grid-cols-1 md:grid-cols-2">
        <div>
          <p><strong>CIF:</strong> {request.cif}</p>
          <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        </div>
        <div>
          <p><strong>Department:</strong> {user?.department || "N/A"}</p>
          <p><strong>Line Manager:</strong> {user?.lineManager || "N/A"}</p>
          <p><strong>Submitted:</strong> {new Date(request.submittedAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Access Section */}
      <div className=" rounded-md p-4">
        <h2 className="font-semibold flex items-center gap-2 text-gray-800 mb-2">
          <FaKey className="text-red-600" /> Requested Access
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {request.selectedTypes.map((type) => {
            const key = getAccessKey(type);
            const data = request.fields?.[key];
            const checked = selectedTypes.includes(type);

            return (
              <div key={type} className=" p-3 rounded-md shadow-sm bg-gray-50 relative">
                <div className="absolute top-2 right-2">
                  <FloatingCheckbox
                    name={type}
                    checked={checked}
                    onChange={() => toggleAccessType(type)}
                  />
                </div>
                <p className="font-medium text-gray-700">{type}</p>

                {key === "Software" && (
                  <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                )}
                {key === "Cloud" && (
                  <>
                    <p className="text-sm"><strong>Service:</strong> {data?.service || "N/A"}</p>
                    <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                  </>
                )}
                {key === "Internet" && (
                  <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                )}
                {key === "Device" && (
                  <>
                    <p className="text-sm"><strong>Device:</strong> {data?.type || "N/A"}</p>
                    <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                  </>
                )}
                {key === "Email" && (
                  <>
                    <p className="text-sm"><strong>Current:</strong> {data?.current || "N/A"} MB</p>
                    <p className="text-sm"><strong>Required:</strong> {data?.required || "N/A"} MB</p>
                    <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                  </>
                )}
                {key === "Additional" && (
                  <>
                    <p className="text-sm"><strong>Access Needed:</strong> {data?.access || "N/A"}</p>
                    <p className="text-sm"><strong>Justification:</strong> {data?.justification || "N/A"}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Notes + Attachment */}
        {(request.fields?.Notes?.details || request.attachment) && (
          <div className="mt-4 border-t pt-3 border-gray-300">
            {request.fields?.Notes?.details && (
              <p className="text-sm"><strong>Remarks:</strong> {request.fields.Notes.details}</p>
            )}
            {request.attachment && request.attachmentName && (
              <p className="text-sm mt-2">
                <strong>Attachment:</strong>{" "}
                <a
                  href={request.attachment}
                  download={request.attachmentName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {request.attachmentName}
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className=" rounded-md bg-gray-50 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div>
          <p>
            <strong>Line Manager Status:</strong>{" "}
            <span className={request.lineManagerStatus === "Successful" ? "text-green-600" : "text-yellow-600"}>
              {request.lineManagerStatus}
            </span>
          </p>
          <p>
            <strong>Review Status:</strong>{" "}
            <span className={
              request.reviewStatus === "Approved" ? "text-green-600" :
                request.reviewStatus === "Rejected" ? "text-red-600" : "text-gray-600"
            }>
              {request.reviewStatus}
            </span>
          </p>
        </div>

        {/* Reviewer Comment */}
        <div>
          <FloatingTextarea
            label="Reviewer Comment"
            name="comment"
            value={request.reviewComment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>

        {/* Buttons */}
        {/* Approval Alert */}
        {request.reviewStatus === "Approved" && (
          <div className="col-span-3 flex items-center gap-3 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg shadow-sm justify-center">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm md:text-base font-medium">
              Access request is <strong>approved</strong>. 
            </span>
          </div>
        )}

        {/* Rejection Alert */}
        {request.reviewStatus === "Rejected" && (
          <div className="col-span-3 flex items-center gap-3 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg shadow-sm justify-center">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm md:text-base font-medium">
              Access request is <strong>rejected</strong>. 
            </span>
          </div>
        )}

        {/* Buttons: Show only if line manager approved and not yet reviewed */}
        {request.lineManagerStatus === "Successful" && request.reviewStatus === "Pending" && (
          <div className="flex gap-4 justify-end items-end">
            <Button className="bg-green-600 text-white px-6 py-2" onClick={() => approveRequest(request.cif)}>
              Approve
            </Button>
            <Button className="bg-red-600 text-white px-6 py-2" onClick={() => rejectRequest(request.cif)}>
              Reject
            </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccessReviewCard;

