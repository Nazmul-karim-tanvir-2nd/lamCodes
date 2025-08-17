import { create } from "zustand";

const useClearanceTrackerStore = create((set) => ({
  departments: {
   
    Finance: {
      items: {
        Advance: false,
        Receivable: false,
        "House Furnishing / Fixed Asset Balance": false,
        Others: false,
      },
      grantedBy: "",
      deviation: false,
      deviationJustification: "",
      attachment: null,
    },
    Administration: {
      items: {
        "Stationery Items": false,
        "Employee ID Card": false,
        "Corporate SIM Card": false,
        "Club Membership Card": false,
        Others: false,
      },
      grantedBy: "",
      deviation: false,
      deviationJustification: "",
      attachment: null,
    },
    Consumer: {
      items: {
        "Home Loan (Commercial)": false,
        "Car Loan (Commercial)": false,
        "Personal Loan (Commercial)": false,
        Others: false,
      },
      grantedBy: "",
      deviation: false,
      deviationJustification: "",
      attachment: null,
    },
    Operations: {
      items: {
        "Employee Home Loan Balance": false,
        "Employee Personal Loan Balance": false,
        Others: false,
      },
      grantedBy: "",
      deviation: false,
      deviationJustification: "",
      attachment: null,
    },
    HR: {
      items: {
        "Employee Transport Loan": false,
        "Loan against PF": false,
        Others: false,
      },
      grantedBy: "",
      deviation: false,
      deviationJustification: "",
      attachment: null,
    },
  },

  toggleItem: (dept, item) =>
    set((state) => ({
      departments: {
        ...state.departments,
        [dept]: {
          ...state.departments[dept],
          items: {
            ...state.departments[dept].items,
            [item]: !state.departments[dept].items[item],
          },
        },
      },
    })),

  setGrantedBy: (dept, value) =>
    set((state) => ({
      departments: {
        ...state.departments,
        [dept]: { ...state.departments[dept], grantedBy: value },
      },
    })),

  toggleDeviation: (dept) =>
    set((state) => ({
      departments: {
        ...state.departments,
        [dept]: {
          ...state.departments[dept],
          deviation: !state.departments[dept].deviation,
        },
      },
    })),

  setJustification: (dept, value) =>
    set((state) => ({
      departments: {
        ...state.departments,
        [dept]: {
          ...state.departments[dept],
          deviationJustification: value,
        },
      },
    })),

  setAttachment: (dept, file) =>
    set((state) => ({
      departments: {
        ...state.departments,
        [dept]: {
          ...state.departments[dept],
          attachment: file,
        },
      },
    })),

  reset: () =>
    set((state) => ({
      departments: Object.fromEntries(
        Object.entries(state.departments).map(([dept, data]) => [
          dept,
          {
            ...data,
            grantedBy: "",
            deviation: false,
            deviationJustification: "",
            attachment: null,
            items: Object.fromEntries(
              Object.keys(data.items).map((key) => [key, false])
            ),
          },
        ])
      ),
    })),
}));

export default useClearanceTrackerStore;
