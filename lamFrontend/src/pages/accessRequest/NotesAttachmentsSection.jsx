import { useState } from "react";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import { SectionTitle } from "../../components/SectionTitle";
import { FileText } from "lucide-react";
import useAccessRequestStore from "../../store/accessRequestStore";

const NotesAttachmentsSection = () => {
  const { fields, setFieldValue, setAttachment } = useAccessRequestStore();
  const [selectedFileName, setSelectedFileName] = useState("");

  return (
    <>
      <SectionTitle>
        <FileText className="w-5 h-5 text-red-600 mr-2" />
        Additional Notes / Attachments
      </SectionTitle>

      <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 gap-x-4 md:gap-x-8 mb-14 shadow">
        <FloatingTextarea
          label="Remarks / Special Instructions"
          name="remarks"
          value={fields?.Notes?.details || ""}
          onChange={(e) => setFieldValue("Notes", "details", e.target.value)}
        />

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">Upload Supporting Documents</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setAttachment(file);
              setSelectedFileName(file ? file.name : "");
            }}
            className="p-2 border rounded-lg bg-white shadow-sm w-1/2"
          />
          <p className="text-sm text-gray-500 mt-1">
            {selectedFileName ? <>Selected: <b>{selectedFileName}</b></> : "Formats: PDF, DOC, JPG, PNG."}
          </p>
        </div>
      </div>
    </>
  );
};

export default NotesAttachmentsSection;