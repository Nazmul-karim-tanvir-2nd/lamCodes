// src/store/useUserFormStore.js
import { create } from 'zustand';

const useUserFormStore = create((set) => ({
    formData: {
        cif: '',
        name: '',
        mobile: '',
        gender: '',
        bloodGroup: '',
        emergencyContact: '',
        biometricStatus: '',
        joiningDate: '',
        department: '',
        division: '',
        branch: '',
        designation: '',
        employmentStatus: '',
        contractExpiry: '',
        lineManagerCIF: '',
        requestedSystems: [],
        accessType: '',
        justification: '',
        roleDesignation: '',
        remarks: '',
        documents: null,
        requestedBy: '',
        requestDate: '',
        approvalStatus: 'Pending',
    },
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
}));

export default useUserFormStore;
