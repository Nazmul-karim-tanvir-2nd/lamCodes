import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "./../../components/ui/Button";
import useAccessRequestStore from "./../../store/accessRequestStore";
import useReviewDashboardStore from "../../store/useReviewDashboardStore"; 
import EmployeeInfoSection from "./EmployeeInfoSection";
import AccessTypesSection from "./AccessTypesSection";
import NotesAttachmentsSection from "./NotesAttachmentsSection";
import { getAccessKey } from "../../lib/accessTypeMapper";
import dummyUsers2 from "../../data/dummyUser2";

// Helper: File -> data URL (base64)
//hello
const fileToDataUrl = (file) =>
  new Promise((resolve) => {
    if (!file) return resolve(null);
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.readAsDataURL(file);
  });

const AccessRequestMain = () => {
  const {
    cif,
    selectedTypes,
    fields,
    attachment, // File from NotesAttachmentsSection
    reset,
    submitRequest, // Use the submitRequest action from accessRequestStore
  } = useAccessRequestStore();

  const [cifInput, setCifInput] = useState("");
  const matchedUser = dummyUsers2.find((u) => u.cif === cif);
  const lineManagerStatus = matchedUser?.lineManagerStatus || "Pending";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cif) {
      Swal.fire("Missing CIF", "Please enter a valid CIF before submitting.", "error");
      return;
    }

    // Build selected fields only
    const filledFields = {};
    selectedTypes.forEach((type) => {
      const key = getAccessKey(type);
      if (key && fields[key]) filledFields[key] = { ...fields[key] };
    });

    // Handle optional notes and attachment
    if (fields?.Notes?.details || fields?.Notes?.attachment) {
      filledFields["Notes"] = {
        details: fields.Notes.details || "",
        attachment: fields.Notes.attachment || null,
      };
    }

    // Convert attachment to data URL with fallback
    const attachmentUrl = await fileToDataUrl(attachment) || fields?.Notes?.attachment || null;
    const attachmentName = attachment ? attachment.name : fields?.Notes?.attachment ? "uploaded-file" : null;

    // Prepare form data
    const formData = {
      id: crypto.randomUUID(),
      cif,
      selectedTypes,
      fields: filledFields,
      attachmentName,
      attachmentUrl,
      submittedAt: new Date().toISOString(),
      lineManagerStatus,
      reviewStatus: "Pending",
      reviewer: null,
      reviewComment: "",
    };

    submitRequest(formData);

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