// src/pages/accessRequest/AccessRequestMain.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "./../../components/ui/Button";
import useAccessRequestStore from "./../../store/accessRequestStore";
import EmployeeInfoSection from "./EmployeeInfoSection";
import AccessTypesSection from "./AccessTypesSection";
import NotesAttachmentsSection from "./NotesAttachmentsSection";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cif) {
      Swal.fire("Missing CIF", "Please enter a valid CIF before submitting.", "error");
      return;
    }

    const formData = {
      cif,
      selectedTypes,
      fields,
      attachment,
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem("accessRequest", JSON.stringify(formData));
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
