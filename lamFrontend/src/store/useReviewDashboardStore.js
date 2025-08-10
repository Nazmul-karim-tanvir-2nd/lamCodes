// src/store/useReviewDashboardStore.js
import { create } from "zustand";

const ensureIds = (arr = []) =>
  arr.map((r, i) => ({
    ...r,
    id: r.id ?? `${r.cif}-${r.submittedAt ?? ""}-${i}`, // backfill for older saved items
  }));

const useReviewDashboardStore = create((set, get) => ({
  requests: [],
  filters: { department: "", accessType: "" },
  selectedAccess: {},

  loadRequests: () => {
    const stored = JSON.parse(localStorage.getItem("accessRequests")) || [];
    const normalized = ensureIds(stored);
    // write back once so future loads already have ids
    localStorage.setItem("accessRequests", JSON.stringify(normalized));
    set({ requests: normalized });
  },

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),

  updateReviewComment: (index, comment) =>
    set((s) => {
      const updated = [...s.requests];
      updated[index] = { ...updated[index], reviewComment: comment };
      localStorage.setItem("accessRequests", JSON.stringify(updated));
      return { requests: updated };
    }),

  // toggle which access types are checked for a given request id
  toggleAccessType: (requestId, type) => {
    const cur = get().selectedAccess[requestId] || [];
    const updated = cur.includes(type)
      ? cur.filter((t) => t !== type)
      : [...cur, type];
    set((s) => ({ selectedAccess: { ...s.selectedAccess, [requestId]: updated } }));
  },

  getSelectedAccess: (requestId) => (get().selectedAccess[requestId] || []),

  isFinalized: (requestId) => {
    const r = get().requests.find((x) => x.id === requestId);
    return r ? r.reviewStatus === "Approved" || r.reviewStatus === "Rejected" : false;
  },

  approveRequest: (requestId) => {
    const { requests, selectedAccess } = get();
    const updated = requests.map((r) => {
      if (r.id !== requestId) return r;
      const approvedTypes = selectedAccess[requestId] || [];
      const rejectedTypes = (r.selectedTypes || []).filter((t) => !approvedTypes.includes(t));
      return {
        ...r,
        reviewStatus: "Approved",
        reviewer: "IT Admin",
        reviewedAt: new Date().toISOString(),
        approvedTypes,
        rejectedTypes,
      };
    });
    localStorage.setItem("accessRequests", JSON.stringify(updated));
    set({ requests: updated });
  },

  rejectRequest: (requestId) => {
    const updated = get().requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            reviewStatus: "Rejected",
            reviewer: "IT Admin",
            reviewedAt: new Date().toISOString(),
            approvedTypes: [],
            rejectedTypes: r.selectedTypes || [],
          }
        : r
    );
    localStorage.setItem("accessRequests", JSON.stringify(updated));
    set({ requests: updated });
  },
}));

export default useReviewDashboardStore;
