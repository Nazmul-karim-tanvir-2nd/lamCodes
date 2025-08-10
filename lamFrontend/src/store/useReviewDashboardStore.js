// src/store/useReviewDashboardStore.js
import { create } from "zustand";

const ensureIds = (arr = []) =>
  arr.map((r, i) => ({
    ...r,
    id: r.id ?? `${r.cif}-${r.submittedAt ?? ""}-${i}`,
  }));

const persist = (requests) =>
  localStorage.setItem("accessRequests", JSON.stringify(requests));

const useReviewDashboardStore = create((set, get) => ({
  requests: [],
  filters: { department: "", accessType: "" },

  loadRequests: () => {
    const stored = JSON.parse(localStorage.getItem("accessRequests")) || [];
    const normalized = ensureIds(stored);
    localStorage.setItem("accessRequests", JSON.stringify(normalized));
    set({ requests: normalized });
  },

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),

  updateReviewComment: (id, comment) =>
    set((s) => {
      const updated = s.requests.map((r) =>
        r.id === id ? { ...r, reviewComment: comment } : r
      );
      persist(updated);
      return { requests: updated };
    }),

  isFinalized: (requestId) => {
    const r = get().requests.find((x) => x.id === requestId);
    return r ? r.reviewStatus === "Approved" || r.reviewStatus === "Rejected" : false;
  },

  approveRequest: (id, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => {
        if (r.id !== id) return r;
        const perTypeStatus = Object.fromEntries(
          (r.selectedTypes || []).map((t) => [t, "Approved"])
        );
        return {
          ...r,
          reviewStatus: "Approved",
          reviewer: "IT Admin",
          reviewedAt: new Date().toISOString(),
          reviewComment,
          perTypeStatus,
        };
      });
      console.log('Updated requests array', { updated });
      persist(updated);
      return { requests: updated };
    }),

  rejectRequest: (id, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => {
        if (r.id !== id) return r;
        const perTypeStatus = Object.fromEntries(
          (r.selectedTypes || []).map((t) => [t, "Rejected"])
        );
        return {
          ...r,
          reviewStatus: "Rejected",
          reviewer: "IT Admin",
          reviewedAt: new Date().toISOString(),
          reviewComment,
          perTypeStatus,
        };
      });
      console.log('Updated requests array', { updated });
      persist(updated);
      return { requests: updated };
    }),
}));

export default useReviewDashboardStore;
