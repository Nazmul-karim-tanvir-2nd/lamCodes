const dummyClearanceRequests = [
  {
    id: "CR-1001",
    submittedBy: "Shahriar Hossain",
    grantedBy: "Sadia Anjum",
    submittedAt: "2025-08-10T10:23:00Z",
    attachment: {
      name: "clearance_form_1001.pdf",
      url: "/attachments/clearance_form_1001.pdf"
    },
    departments: {
      Finance: {
        grantedBy: "Sadia Anjum",
        deviation: false,
        deviationJustification: "",
        items: {
          Advance: true,
          Receivable: false,
          "House Furnishing / Fixed Asset Balance": false,
          Others: true
        },
        attachment: {
          name: "finance_clearance.pdf",
          url: "/attachments/finance_clearance.pdf"
        }
      },
      HR: {
        grantedBy: "Nusrat Alam",
        deviation: true,
        deviationJustification: "Employee not eligible for transport loan",
        items: {
          "Employee Transport Loan": false,
          "Loan against PF": false,
          Others: false
        },
        attachment: null
      }
    }
  },
  {
    id: "CR-1002",
    submittedBy: "Farjana Rahman",
    grantedBy: "Tanvir Islam",
    submittedAt: "2025-08-12T15:45:00Z",
    attachment: null,
    departments: {
      Finance: {
        grantedBy: "Tanvir Islam",
        deviation: false,
        deviationJustification: "",
        items: {
          Advance: true,
          Receivable: true,
          "House Furnishing / Fixed Asset Balance": true,
          Others: false
        },
        attachment: null
      },
      HR: {
        grantedBy: "Sumaiya Rahman",
        deviation: false,
        deviationJustification: "",
        items: {
          "Employee Transport Loan": true,
          "Loan against PF": false,
          Others: true
        },
        attachment: {
          name: "hr_clearance.jpg",
          url: "/attachments/hr_clearance.jpg"
        }
      }
    }
  }
];

export default dummyClearanceRequests;
