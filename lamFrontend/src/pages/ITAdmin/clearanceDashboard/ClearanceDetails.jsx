import { useMemo } from "react";
import { useParams, useNavigate ,Link} from "react-router-dom";


export default function ClearanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const request = useMemo(() => {
    const arr = JSON.parse(localStorage.getItem("clearanceRequests") || "[]");
    return arr.find((r) => r.id === id);
  }, [id]);

  if (!request) return <div className="p-4 text-red-600">Request not found</div>;

  return (
    <div className="p-4 space-y-6">
      
      <h1 className="text-xl font-bold text-center text-blue-800 mb-6 underline underline-offset-8 decoration-gray-500/80">
        Clearance Details
      </h1>
      <Link to="/clearance-review-dashboard" className="text-blue-600 hover:text-blue-800 underline mb-4 block">
        Back to Dashboard
      </Link>

      <div className="bg-white border  rounded-md border-red-200 rounded p-4 space-y-1">
        <div><b>ID:</b> {request.id}</div>
        <div><b>Clearance requested by:</b> {request.submittedBy}</div>
        <div><b>Clearance granted by:</b> {request.grantedBy || "—"}</div>
        <div>
          <b>Submitted:</b>{" "}
          {request.submittedAt ? new Date(request.submittedAt).toLocaleString() : "—"}
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(request.departments || {}).map(([dept, data]) => (
          <div key={dept} className="bg-white border  rounded-md border-red-200 rounded p-4">
            <div className="text-red-600 font-semibold mb-2">{dept}</div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="mb-1"><b>Granted By:</b> {data.grantedBy || "—"}</div>
                <div className="mb-1"><b>Deviation:</b> {data.deviation ? "Yes" : "No"}</div>
                {data.deviation && (
                  <div className="mb-1">
                    <b>Justification:</b> {data.deviationJustification || "—"}
                  </div>
                )}
                <div className="mb-1">
                  <b>Attachment:</b>{" "}
                  {data.attachment?.dataUrl ? (
                    <a
                      href={data.attachment.dataUrl}
                      download={data.attachment.name || "attachment"}
                      className="text-blue-600 underline"
                    >
                      {data.attachment.name}
                    </a>
                  ) : (
                    "—"
                  )}
                </div>
              </div>

              <div>
                <div className="font-medium mb-1">Items</div>
                <ul className="list-disc list-inside space-y-0.5">
                  {Object.entries(data.items || {}).map(([name, checked]) => (
                    <li key={name} className={checked ? "text-green-700" : "text-gray-500"}>
                      {name} {checked ? "✔" : "✘"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
