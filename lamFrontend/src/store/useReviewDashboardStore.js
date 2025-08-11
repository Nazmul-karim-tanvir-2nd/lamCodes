import { create } from "zustand";

const ensureIds = (arr = []) =>
  arr.map((r, i) => ({
    ...r,
    id: r.id ?? `${r.cif}-${r.submittedAt ?? ""}-${i}`,
  }));

const persist = (requests) => localStorage.setItem("accessRequests", JSON.stringify(requests));

const useReviewDashboardStore = create((set, get) => ({
  requests: [],
  filters: { department: "", accessType: "" },

  loadRequests: () => {
    const stored = JSON.parse(localStorage.getItem("accessRequests")) || [];
    const normalized = ensureIds(stored);
    set({ requests: normalized });
    persist(normalized);
  },

  setFilter: (key, value) => set((s) => ({ filters: { ...s.filters, [key]: value } })),

  updateReviewComment: (id, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => (r.id === id ? { ...r, reviewComment } : r));
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
        if (r.id !== id || r.lineManagerStatus !== "Successful") return r;
        const perTypeStatus = Object.fromEntries((r.selectedTypes || []).map((t) => [t, "Approved"]));
        return { ...r, reviewStatus: "Approved", reviewer: "IT Admin", reviewedAt: new Date().toISOString(), reviewComment, perTypeStatus };
      });
      persist(updated);
      return { requests: updated };
    }),

  rejectRequest: (id, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => {
        if (r.id !== id || r.lineManagerStatus !== "Successful") return r;
        const perTypeStatus = Object.fromEntries((r.selectedTypes || []).map((t) => [t, "Rejected"]));
        return { ...r, reviewStatus: "Rejected", reviewer: "IT Admin", reviewedAt: new Date().toISOString(), reviewComment, perTypeStatus };
      });
      persist(updated);
      return { requests: updated };
    }),

  addRequest: (newRequest) => {
    const updated = [...get().requests, newRequest];
    set({ requests: updated });
    persist(updated);
  },

  approveMultiple: (ids, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => {
        if (!ids.includes(r.id) || r.lineManagerStatus !== "Successful") return r;
        const perTypeStatus = Object.fromEntries((r.selectedTypes || []).map((t) => [t, "Approved"]));
        return { ...r, reviewStatus: "Approved", reviewer: "IT Admin", reviewedAt: new Date().toISOString(), reviewComment, perTypeStatus };
      });
      persist(updated);
      return { requests: updated };
    }),

  rejectMultiple: (ids, reviewComment) =>
    set((s) => {
      const updated = s.requests.map((r) => {
        if (!ids.includes(r.id) || r.lineManagerStatus !== "Successful") return r;
        const perTypeStatus = Object.fromEntries((r.selectedTypes || []).map((t) => [t, "Rejected"]));
        return { ...r, reviewStatus: "Rejected", reviewer: "IT Admin", reviewedAt: new Date().toISOString(), reviewComment, perTypeStatus };
      });
      persist(updated);
      return { requests: updated };
    }),
}));

export default useReviewDashboardStore;
