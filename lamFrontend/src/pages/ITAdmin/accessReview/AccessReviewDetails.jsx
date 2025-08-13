import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

const isImageUrl = (url) =>
  /\.(jpg|jpeg|png|gif|bmp)$/i.test(url) || /^data:image\/[a-z]+;base64,/.test(url);

export default function AccessReviewDetails() {
  const { id } = useParams();
  const { requests, loadRequests, approveRequest, rejectRequest } = useReviewDashboardStore();
  const request = requests.find((r) => r.id === id);

  const [comment, setComment] = useState(request?.reviewComment || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    if (!request) loadRequests();
  }, [request, loadRequests]);

  const visibleTypes = useMemo(
    () => (request?.selectedTypes || []).filter((type) => allTypes.includes(type)),
    [request?.selectedTypes]
  );

  useEffect(() => {
    setComment(request?.reviewComment || "");
  }, [request?.id, request?.reviewComment]);

  const isLineManagerApproved = request?.lineManagerStatus === "Successful";
  const isFinalized = request?.reviewStatus === "Approved" || request?.reviewStatus === "Rejected";
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

  const handleSafeDownload = (url, name) => {
    if (!url) return;
    if (url.startsWith("data:")) {
      const [meta, b64] = url.split(",");
      const mime = meta.slice(meta.indexOf(":") + 1, meta.indexOf(";"));
      const bin = atob(b64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: mime });
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = name || "attachment";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objUrl);
    } else {
      const a = document.createElement("a");
      a.href = url;
      a.download = name || "attachment";
      a.target = "_blank";
      a.rel = "noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  if (!request) return <p className="text-center text-gray-500">Request not found.</p>;

  return (
    <div className="p-4 mx-auto">
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6 underline underline-offset-8 decoration-gray-500/80">
        Access Review Details
      </h1>
      <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 underline mb-4 block">
        Back to Dashboard
      </Link>

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
                      <span className="text-blue-600 underline cursor-pointer" onClick={() => openModal(request.attachmentUrl)}>
                        {request.attachmentName || "View Image"}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-blue-600 underline"
                        onClick={() => handleSafeDownload(request.attachmentUrl, request.attachmentName)}
                      >
                        {request.attachmentName || "View / Download"}
                      </button>
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

        {isModalOpen && selectedImageUrl && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
            <div
              className="relative bg-transparent p-4 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 h-1/2"
              style={{ backgroundImage: `url(${selectedImageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-2 right-2 text-white text-2xl cursor-pointer" onClick={closeModal}>×</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
