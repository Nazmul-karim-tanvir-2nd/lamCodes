// src/pages/accessRequest/AccessRequestMain.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "./../../components/ui/Button";
import useAccessRequestStore from "./../../store/accessRequestStore";
import EmployeeInfoSection from "./EmployeeInfoSection";
import AccessTypesSection from "./AccessTypesSection";
import NotesAttachmentsSection from "./NotesAttachmentsSection";
import { getAccessKey } from "../../lib/accessTypeMapper";
import dummyUsers2 from "../../data/dummyUser2";


const AccessRequestMain = () => {
  const {
    cif,
    selectedTypes,
    fields,
    attachment,
    reset,
    setCif
  } = useAccessRequestStore();

  const [cifInput, setCifInput] = useState("");
  const matchedUser = dummyUsers2.find(u => u.cif === cif);
const lineManagerStatus = matchedUser?.lineManagerStatus || "Pending";


const handleSubmit = (e) => {
  e.preventDefault();
  if (!cif) {
    Swal.fire("Missing CIF", "Please enter a valid CIF before submitting.", "error");
    return;
  }

  // Validate access fields
 const filledFields = {};
selectedTypes.forEach((type) => {
  const key = getAccessKey(type);
  if (key && fields[key]) {
    filledFields[key] = { ...fields[key] };
  }
});

  // Optional notes
  if (fields?.Notes?.details) {
    filledFields["Notes"] = { details: fields.Notes.details };
  }

  const formData = {
    cif,
    selectedTypes,
    fields: filledFields,
    attachment,
    submittedAt: new Date().toISOString(),
    lineManagerStatus,
    reviewStatus: "Pending",
    reviewer: null,
    reviewComment: ""
  };

  const existing = JSON.parse(localStorage.getItem("accessRequests")) || [];
  existing.push(formData);
  localStorage.setItem("accessRequests", JSON.stringify(existing));

  Swal.fire("Access Request Submitted", "", "success");
  reset();
  setCifInput("");
};


  return (
    <form onSubmit={handleSubmit} className="w-full p-2 sm:p-2 space-y-8">
      <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
        Access Request Form
      </h1>

      <EmployeeInfoSection cifInput={cifInput} setCifInput={setCifInput} />
      <AccessTypesSection />
      <NotesAttachmentsSection />

      <div className="text-center">
        <Button type="submit" size="lg" className="px-10 bg-red-600/90 hover:bg-red-700 text-white">
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default AccessRequestMain;

