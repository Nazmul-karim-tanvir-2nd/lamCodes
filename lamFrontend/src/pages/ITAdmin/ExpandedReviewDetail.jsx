import { useEffect, useMemo, useState } from "react";
import useReviewDashboardStore from "../../store/useReviewDashboardStore";

// Display names -> field keys saved in localStorage
const TYPE_KEY = {
  "Software Access": "Software",
  "Cloud Access": "Cloud",
  "Internet Access": "Internet",
  "Device Request": "Device",
  "Email Attachment Increase": "Email",
  "Additional Access": "Additional",
};

// Which fields to show for each access key
const FIELDS_MAP = {
  Software:   [
    ["Category", "category"],
    ["Software", "software"],
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
  Cloud:      [
    ["Service", "service"],
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
  Internet:   [
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
  Device:     [
    ["Device Type", "type"],
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
  Email:      [
    ["Current (MB)", "current"],
    ["Required (MB)", "required"],
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
  Additional: [
    ["Access Needed", "access"],
    ["Justification", "justification"],
    ["Notes", "notes"],
  ],
};

const allTypes = Object.keys(TYPE_KEY);

const Row = ({ label, value }) => (
  <div className="flex text-sm mb-1">
    <div className="w-44 text-gray-500">{label}</div>
    <div className="flex-1">{value ? value : <span className="text-gray-400">—</span>}</div>
  </div>
);

export default function ExpandedReviewDetail({ request, isFinalized }) {
  const approveRequest = useReviewDashboardStore((s) => s.approveRequest);
  const rejectRequest  = useReviewDashboardStore((s) => s.rejectRequest);

  const [checked, setChecked] = useState(() => new Set());
  const [comment, setComment] = useState(request.reviewComment || "");

  const visibleTypes = useMemo(
    () => (request.selectedTypes || []).filter((t) => allTypes.includes(t)),
    [request.selectedTypes]
  );

  // Reset when the row changes
  useEffect(() => {
    setChecked(new Set());
    setComment(request.reviewComment || "");
  }, [request.id, request.reviewComment]);

  const toggle = (type) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const LM_OK = request.lineManagerStatus === "Successful";
  const canAction = LM_OK && !isFinalized;

  return (
    <div className="rounded border border-gray-200 bg-white p-4 space-y-14">
      {/* ===== Details Section ===== */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Access details</h3>

        {(visibleTypes.length === 0) && (
          <div className="text-sm text-gray-500">No access types selected.</div>
        )}

        <div className="space-y-6">
          {visibleTypes.map((displayType) => {
            const key = TYPE_KEY[displayType];
            const data = (request.fields && request.fields[key]) || {};
            const fieldDefs = FIELDS_MAP[key] || [];

            return (
              <div key={`${request.id}-${key}`} className="rounded border border-gray-200 p-3">
                <div className="font-medium text-gray-900 mb-2">{displayType}</div>

                {fieldDefs.map(([label, prop]) => (
                  <Row key={prop} label={label} value={data[prop]} />
                ))}

                {/* per-type attachment if you store it inside request.fields[key].attachmentPreview */}
                {"attachmentPreview" in data && (
                  <Row
                    label="Attachment"
                    value={
                      data.attachmentPreview
                        ? (
                          <a
                            href={data.attachmentPreview}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View / Download
                          </a>
                        )
                        : "No file attached"
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* top-level attachment (from Notes/Attachments section) if you save it on request.attachmentUrl */}
        {"attachmentUrl" in request && (
          <div className="mt-4">
            <Row
              label="Overall Attachment"
              value={
                request.attachmentUrl
                  ? (
                    <a
                      href={request.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View / Download
                    </a>
                  )
                  : "—"
              }
            />
          </div>
        )}
      </div>

      {/* ===== Approve/Reject Section ===== */}
      <div>
        <div className="text-sm text-gray-600 mb-2">
          Select the access types you want to <b>approve</b>. Unchecked types will be rejected.
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          {visibleTypes.map((t) => (
            <label
              key={`${request.id}-${t}`}
              className={`inline-flex items-center gap-2 px-3 py-2 border rounded ${
                checked.has(t) ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={checked.has(t)}
                onChange={() => toggle(t)}
                disabled={!canAction}
              />
              <span className="text-sm">{t}</span>
            </label>
          ))}
        </div>

        <textarea
          className="w-full border rounded p-2 text-sm"
          placeholder="Reviewer comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!canAction}
        />

        <div className="mt-3 flex gap-2">
          {canAction ? (
            <>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={() => {
                  // persist comment
                  const stored = JSON.parse(localStorage.getItem("accessRequests") || "[]");
                  const updated = stored.map((r) =>
                    r.id === request.id ? { ...r, reviewComment: comment } : r
                  );
                  localStorage.setItem("accessRequests", JSON.stringify(updated));

                  // approve by id
                  approveRequest(request.id, Array.from(checked));
                }}
              >
                Approve
              </button>

              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => {
                  const stored = JSON.parse(localStorage.getItem("accessRequests") || "[]");
                  const updated = stored.map((r) =>
                    r.id === request.id ? { ...r, reviewComment: comment } : r
                  );
                  localStorage.setItem("accessRequests", JSON.stringify(updated));

                  rejectRequest(request.id, Array.from(checked));
                }}
              >
                Reject
              </button>
            </>
          ) : (
            <div className="text-sm text-gray-500">
              {isFinalized ? "This request is finalized." : "Waiting for Line Manager approval."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
