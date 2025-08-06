// src/store/useReviewDashboardStore.js
import { create } from "zustand";

const useReviewDashboardStore = create((set) => ({
  requests: [],
  filters: {
    department: "",
    accessType: "",
  },

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

  approveRequest: (index) =>
    set((state) => {
      const updated = [...state.requests];
      updated[index].reviewStatus = "Approved";
      updated[index].reviewer = "IT Admin"; 
      updated[index].reviewedAt = new Date().toISOString();
      localStorage.setItem("accessRequests", JSON.stringify(updated));
      return { requests: updated };
    }),

  rejectRequest: (index) =>
    set((state) => {
      const updated = [...state.requests];
      updated[index].reviewStatus = "Rejected";
      updated[index].reviewer = "IT Admin";
      updated[index].reviewedAt = new Date().toISOString();
      localStorage.setItem("accessRequests", JSON.stringify(updated));
      return { requests: updated };
    }),
}));

export default useReviewDashboardStore;
