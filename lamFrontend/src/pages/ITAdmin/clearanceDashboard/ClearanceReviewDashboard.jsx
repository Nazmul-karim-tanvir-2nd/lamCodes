import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const firstAttachmentName = (req) => {
  for (const d of Object.values(req.departments || {})) {
    if (d?.attachment?.name) return d.attachment.name;
  }
  return "—";
};

export default function ClearanceReviewDashboard() {
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  const requests = useMemo(() => {
    const raw = JSON.parse(localStorage.getItem("clearanceRequests") || "[]");
    return Array.isArray(raw) ? raw : [];
  }, [dateFilter, page]); // forces table re-eval when you navigate back

  const filtered = useMemo(() => {
    if (!dateFilter) return requests;
    const isoPrefix = new Date(dateFilter).toISOString().slice(0, 10);
    return requests.filter((r) => (r.submittedAt || "").startsWith(isoPrefix));
  }, [requests, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const rows = filtered.slice(start, start + perPage);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold text-center text-blue-800 underline underline-offset-8">
        Clearance Review Dashboard
      </h1>

      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Filter by submitted date</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setPage(1);
            setDateFilter(e.target.value);
          }}
          className="border p-2 rounded"
        />
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Clearance granted by</th>
              <th className="px-4 py-2 border-b">Clearance requested by</th>
              <th className="px-4 py-2 border-b">Submitted date</th>
              <th className="px-4 py-2 border-b">Attachment</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{r.id}</td>
                <td className="px-4 py-2 border-b">{r.grantedBy || "—"}</td>
                <td className="px-4 py-2 border-b">{r.submittedBy}</td>
                <td className="px-4 py-2 border-b">
                  {r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "—"}
                </td>
                <td className="px-4 py-2 border-b">{firstAttachmentName(r)}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    type="button"
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => navigate(`/clearance-details/${r.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <div className="text-sm">
          Page {page} of {totalPages}
        </div>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
