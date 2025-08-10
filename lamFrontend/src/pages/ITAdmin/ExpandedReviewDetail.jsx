import { useEffect, useMemo, useState } from "react";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";

const TYPE_KEY = {
  "Software Access": "Software",
  "Cloud Access": "Cloud",
  "Internet Access": "Internet",
  "Device Request": "Device",
  "Email Attachment Increase": "Email",
  "Increase Email Attachment Size": "Email",
  "Additional Access": "Additional",
};

const FIELDS_MAP = {
  Software: [
    ["Category", "category"],
    ["Software", "software"],
    ["Justification", "justification"],
  ],
  Cloud: [
    ["Service", "service"],
    ["Justification", "justification"],
  ],
  Internet: [["Justification", "justification"]],
  Device: [
    ["Device Type", "type"],
    ["Justification", "justification"],
  ],
  Email: [
    ["Current (MB)", "current"],
    ["Required (MB)", "required"],
    ["Justification", "justification"],
  ],
  Additional: [
    ["Access Needed", "access"],
    ["Justification", "justification"],
  ],
};

const allTypes = Object.keys(TYPE_KEY);

const Row = ({ label, value }) => (
  <div className="flex text-sm mb-1">
    <div className="w-44 text-gray-500">{label}</div>
    <div className="flex-1">{value ? value : <span className="text-gray-400">—</span>}</div>
  </div>
);

const isImageUrl = (url) => {
  return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url) || /^data:image\/[a-z]+;base64,/.test(url);
};

export default function ExpandedReviewDetail({ request, isFinalized }) {
  const approveRequest = useReviewDashboardStore((s) => s.approveRequest);
  const rejectRequest = useReviewDashboardStore((s) => s.rejectRequest);

  const [comment, setComment] = useState(request.reviewComment || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const visibleTypes = useMemo(
    () => (request.selectedTypes || []).filter((type) => allTypes.includes(type)),
    [request.selectedTypes]
  );

  useEffect(() => {
    setComment(request.reviewComment || "");
  }, [request.id, request.reviewComment]);

  const isLineManagerApproved = request.lineManagerStatus === "Successful";
  const canApprove = isLineManagerApproved && !isFinalized;
  const canReject = isLineManagerApproved && !isFinalized;
  const isCommentEmpty = !comment?.trim();
  const isApproveDisabled = !canApprove || isCommentEmpty;
  const isRejectDisabled = !canReject || isCommentEmpty;

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
  };

  return (
    <div className="rounded border border-gray-200 bg-white p-4 space-y-14">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Access details</h3>
        <div className="space-y-6">
          {visibleTypes.map((displayType) => {
            const key = TYPE_KEY[displayType];
            const data = (request.fields && request.fields[key]) || {};
            const fieldDefinitions = FIELDS_MAP[key] || [];

            return (
              <div key={`${request.id}-${key}`} className="rounded border border-gray-200 p-3">
                <div className="font-medium text-gray-900 mb-2">{displayType}</div>
                {fieldDefinitions.map(([label, prop]) => (
                  <Row key={prop} label={label} value={data[prop]} />
                ))}
              </div>
            );
          })}

          {"Notes" in (request.fields || {}) && (
            <div className="rounded border border-gray-200 p-3">
              <div className="font-medium text-gray-900 mb-2">Additional Notes</div>
              <Row label="Remarks" value={request.fields.Notes?.details} />
            </div>
          )}

          <div className="rounded border border-gray-200 p-3">
            <div className="font-medium text-gray-900 mb-2">Overall Attachment</div>
            <Row
              label="File"
              value={
                request.attachmentUrl ? (
                  isImageUrl(request.attachmentUrl) ? (
                    <div className="relative">
                      <img
                        src={request.attachmentUrl}
                        alt={request.attachmentName || "Attachment"}
                        className="max-w-full h-auto rounded cursor-pointer"
                        style={{ maxHeight: "200px" }}
                        onClick={() => openModal(request.attachmentUrl)}
                      />
                    </div>
                  ) : (
                    <a
                      href={request.attachmentUrl}
                      download={request.attachmentName || "attachment"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      {request.attachmentName || "View / Download"}
                    </a>
                  )
                ) : (
                  "—"
                )
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">This decision will apply to all requested access types.</div>
        <textarea
          className="w-full border rounded p-2 text-sm"
          placeholder="Reviewer comment (required)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!isLineManagerApproved || isFinalized}
        />
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <button
            className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isApproveDisabled}
            onClick={() => approveRequest(request.id, comment)}
          >
            Approve
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isRejectDisabled}
            onClick={() => rejectRequest(request.id, comment)}
          >
            Reject
          </button>
        </div>
        {!isLineManagerApproved && !isFinalized && (
          <div className="text-sm text-gray-500 mt-2">Waiting for Line Manager approval.</div>
        )}
        {isFinalized && (
          <div className="text-sm text-gray-500 mt-2">
            {request.reviewStatus === "Approved" ? (
              <span className="text-green-700 font-medium">Request Approved</span>
            ) : (
              <span className="text-red-700 font-medium">Request Rejected</span>
            )}
          </div>
        )}
      </div>

      {/* Modal for larger image */}
      {isModalOpen && selectedImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ×
            </button>
            <img
              src={selectedImageUrl}
              alt={request.attachmentName || "Enlarged Attachment"}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}