import { create } from 'zustand';

const useAccessRequestStore = create((set) => ({
  cif: '',
  showForm: false,
  selectedTypes: [],
  fields: {},
  notes: '',
  attachment: null,

  setCif: (cif) => set({ cif }),
  setShowForm: (show) => set({ showForm: show }),
  setNotes: (note) => set({ notes: note }),
  setAttachment: (file) => set({ attachment: file }),

  toggleAccessType: (type) =>
    set((state) => {
      const exists = state.selectedTypes.includes(type);
      return {
        selectedTypes: exists
          ? state.selectedTypes.filter((t) => t !== type)
          : [...state.selectedTypes, type],
      };
    }),

  setFieldValue: (type, field, value) =>
    set((state) => ({
      fields: {
        ...state.fields,
        [type]: {
          ...state.fields[type],
          [field]: value,
        },
      },
    })),

  reset: () =>
    set({
      cif: '',
      showForm: false,
      selectedTypes: [],
      fields: {},
      notes: '',
      attachment: null,
    }),
}));

export default useAccessRequestStore;
