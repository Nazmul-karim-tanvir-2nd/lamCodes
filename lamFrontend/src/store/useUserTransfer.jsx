// src/store/useUserTransfer.jsx
import { create } from "zustand";

const defaultFormData = {
    // Employee Identification
    cif: "",
    name: "",
    currentDepartment: "",
    currentBranch: "",
    currentDesignation: "",
    currentLineManager: "",

    // New Assignment Details
    newDepartment: "",
    newBranch: "",
    newLineManager: "",
    effectiveDate: "",
    reason: "",
    newRemarks: "",

    // Access Change Instructions
    revokeSoftware: "",
    revokeDevice: "",
    autoAssignAccess: "",
    accessRemarks: "",

    // Approval & Submission Info
    requestedBy: "",
    requestDate: "",
    lineManagerApproval: "",
    hrApproval: "",
    itFinalAction: "",
};

const useUserTransfer = create((set) => ({
    formData: { ...defaultFormData },
    updateField: (name, value) =>
        set((state) => ({
            formData: { ...state.formData, [name]: value ?? "" },
        })),
    resetForm: () => set({ formData: { ...defaultFormData } }),
}));

export default useUserTransfer;