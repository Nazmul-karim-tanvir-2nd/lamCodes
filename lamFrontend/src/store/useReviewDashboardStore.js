import { create } from "zustand";

const useReviewDashboardStore = create((set, get) => ({
  requests: [],
  filters: {
    department: "",
    accessType: "",
  },
  selectedAccess: {},

  loadRequests: () => {
    const stored = JSON.parse(localStorage.getItem("accessRequests")) || [];
    set({ requests: stored });
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  updateReviewComment: (index, comment) =>
    set((state) => {
      const updated = [...state.requests];
      updated[index].reviewComment = comment;
      return { requests: updated };
    }),

  toggleAccessType: (cif, type) => {
    const current = get().selectedAccess[cif] || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    set((state) => ({
      selectedAccess: {
        ...state.selectedAccess,
        [cif]: updated,
      },
    }));
  },

  getSelectedAccess: (cif) => {
    const state = get();
    return state.selectedAccess[cif] || [];
  },

  approveRequest: (cif) => {
    const { requests, selectedAccess } = get();
    const updated = requests.map((r) => {
      if (r.cif === cif) {
        const approvedTypes = selectedAccess[cif] || [];
        const rejectedTypes = r.selectedTypes.filter(
          (t) => !approvedTypes.includes(t)
        );
        return {
          ...r,
          reviewStatus: "Approved",
          reviewer: "IT Admin",
          reviewedAt: new Date().toISOString(),
          approvedTypes,
          rejectedTypes,
        };
      }
      return r;
    });
    localStorage.setItem("accessRequests", JSON.stringify(updated));
    set({ requests: updated });
  },

  rejectRequest: (cif) => {
    const updated = get().requests.map((r) =>
      r.cif === cif
        ? {
            ...r,
            reviewStatus: "Rejected",
            reviewer: "IT Admin",
            reviewedAt: new Date().toISOString(),
          }
        : r
    );
    localStorage.setItem("accessRequests", JSON.stringify(updated));
    set({ requests: updated });
  },
}));

export default useReviewDashboardStore;
