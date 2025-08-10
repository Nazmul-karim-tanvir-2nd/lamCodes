import { create } from 'zustand';
import useReviewDashboardStore from '../store/useReviewDashboardStore'; // Adjust path as needed

const empty = {
  software: { name: '', justification: '', attachment: null, notes: '' },
  cloud: { service: '', justification: '', attachment: null, notes: '' },
  internet: { justification: '', attachment: null, notes: '' },
  device: { type: '', justification: '', attachment: null, notes: '' },
  email: { current: '', required: '', justification: '', attachment: null, notes: '' },
  additional: { access: '', justification: '', attachment: null, notes: '' },
};

export default create((set, get) => ({
  cif: '',
  showForm: false,
  selectedTypes: [],
  fields: structuredClone(empty),

  setCif: (v) => set({ cif: v }),
  setShowForm: (v) => set({ showForm: v }),
  toggleAccessType: (typeKey) => set((s) => {
    const has = s.selectedTypes.includes(typeKey);
    return { selectedTypes: has ? s.selectedTypes.filter(t => t !== typeKey) : [...s.selectedTypes, typeKey] };
  }),
  setFieldValue: (typeKey, field, value) =>
    set((s) => ({ fields: { ...s.fields, [typeKey]: { ...s.fields[typeKey], [field]: value } } })),

  setAttachment: (file) => {
    if (!file) {
      return set((s) => ({ fields: { ...s.fields, Notes: { ...s.fields.Notes, attachment: null } } }));
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result; // Base64 data URL
      set((s) => ({
        fields: { ...s.fields, Notes: { ...s.fields.Notes, attachment: dataUrl } },
      }));
    };
    reader.readAsDataURL(file); // Convert file to data URL
  },

  submitRequest: (formData) => {
    const reviewStore = useReviewDashboardStore.getState();
    reviewStore.addRequest(formData); // Use the new addRequest method
  },

  reset: () => set({ cif: '', showForm: false, selectedTypes: [], fields: structuredClone(empty) }),
}));