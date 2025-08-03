// src/pages/AccessRequest.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import dummyUsers2 from "../../data/dummyUser2";
import useAccessRequestStore from '../../store/accessRequestStore'
import FloatingInput from "../../components/custom/FloatingInput";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import FloatingCheckbox from "../../components/custom/FloatingCheckbox";
import { Button } from "../../components/ui/Button";
import { SectionTitle } from "../../components/SectionTitle";
import { User, Key, FileText, Search } from "lucide-react";

const Required = ({ children }) => (
  <span>
    {children} <span className="text-red-600">*</span>
  </span>
);

const AccessRequest = () => {
  const {
    cif,
    showForm,
    selectedTypes,
    fields,
    setCif,
    setShowForm,
    toggleAccessType,
    setFieldValue,
    reset,
    setAttachment,
    attachment,
  } = useAccessRequestStore();

  const [cifInput, setCifInput] = useState("");

  const employee = dummyUsers2.find((u) => u.cif === cif);

  const handleSearch = () => {
    const match = dummyUsers2.find((u) => u.cif === cifInput);
    if (match) {
      setCif(cifInput);
      setShowForm(true);
    } else {
      Swal.fire("CIF Not Found", "Please enter a valid CIF", "error");
      setCif("");
      setShowForm(false);
      reset();
    }
  };

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
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("accessRequest", JSON.stringify(formData));
    Swal.fire("Access Request Submitted", "", "success");
    reset();
    setCifInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 sm:p-2 space-y-4">
      <h1 className="text-base sm:text-2xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-blue-500/80">
        Access Request Form
      </h1>

      <SectionTitle>
        <User className="w-5 h-5 text-red-600 mr-2" />
        Employee Information
      </SectionTitle>
      <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4 shadow">
        <div className="col-span-1 flex gap-4">
          <FloatingInput
            label={<Required>CIF</Required>}
            name="cif"
            value={cifInput}
            onChange={(e) => setCifInput(e.target.value)}
          />
          <Button type="button" onClick={handleSearch} className="self-end bg-red-600/80 hover:bg-red-700 text-white">
            <Search className="mr-1" />
          </Button>
        </div>
        <FloatingInput label="Name" name="name" value={employee?.name || ""} disabled />
        <FloatingInput label="Department" name="department" value={employee?.department || ""} disabled />
        <FloatingInput label="Line Manager" name="lineManager" value={employee?.lineManager || ""} disabled />
      </div>

      <SectionTitle>
        <Key className="w-5 h-5 text-red-600 mr-2" />
        Select Access Types
      </SectionTitle>
      <div className="bg-white border border-red-200 rounded-md p-6 shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["Software Access", "Cloud Access", "Internet Access", "Device Request", "Email Attachment Increase", "Additional Access"].map((type) => (
            <FloatingCheckbox
              key={type}
              label={type}
              name={type}
              checked={selectedTypes.includes(type)}
              onChange={() => toggleAccessType(type)}
            />
          ))}
        </div>
      </div>

      {selectedTypes.includes("Software Access") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Software Access</SectionTitle>
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="software_justification"
            value={fields?.Software?.justification || ""}
            onChange={(e) => setFieldValue("Software", "justification", e.target.value)}
          />
        </div>
      )}

      {selectedTypes.includes("Cloud Access") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Cloud Access</SectionTitle>
          <FloatingInput
            label={<Required>Cloud Service Name</Required>}
            name="cloud_service"
            value={fields?.Cloud?.service || ""}
            onChange={(e) => setFieldValue("Cloud", "service", e.target.value)}
          />
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="cloud_justification"
            value={fields?.Cloud?.justification || ""}
            onChange={(e) => setFieldValue("Cloud", "justification", e.target.value)}
          />
        </div>
      )}

      {selectedTypes.includes("Internet Access") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Internet Access</SectionTitle>
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="internet_justification"
            value={fields?.Internet?.justification || ""}
            onChange={(e) => setFieldValue("Internet", "justification", e.target.value)}
          />
        </div>
      )}

      {selectedTypes.includes("Device Request") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Device Request</SectionTitle>
          <select
            className="border-b w-full py-2 text-sm"
            onChange={(e) => setFieldValue("Device", "type", e.target.value)}
            value={fields?.Device?.type || ""}
            required
          >
            <option value="">Select Device</option>
            <option value="Laptop">Laptop</option>
            <option value="Earphone">Earphones</option>
            <option value="Tablet">Tablet</option>
            <option value="Desktop PC">Desktop PC</option>
          </select>
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="device_justification"
            value={fields?.Device?.justification || ""}
            onChange={(e) => setFieldValue("Device", "justification", e.target.value)}
          />
        </div>
      )}

      {selectedTypes.includes("Email Attachment Increase") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Email Attachment Limit</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              label={<Required>Current Limit (MB)</Required>}
              type="number"
              name="email_current"
              value={fields?.Email?.current || ""}
              onChange={(e) => setFieldValue("Email", "current", e.target.value)}
            />
            <FloatingInput
              label={<Required>Required Limit (MB)</Required>}
              type="number"
              name="email_required"
              value={fields?.Email?.required || ""}
              onChange={(e) => setFieldValue("Email", "required", e.target.value)}
            />
          </div>
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="email_justification"
            value={fields?.Email?.justification || ""}
            onChange={(e) => setFieldValue("Email", "justification", e.target.value)}
          />
        </div>
      )}

      {selectedTypes.includes("Additional Access") && (
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow space-y-4">
          <SectionTitle>Additional Access</SectionTitle>
          <FloatingInput
            label={<Required>Access Needed</Required>}
            name="additional_access"
            value={fields?.Additional?.access || ""}
            onChange={(e) => setFieldValue("Additional", "access", e.target.value)}
          />
          <FloatingTextarea
            label={<Required>Justification</Required>}
            name="additional_justification"
            value={fields?.Additional?.justification || ""}
            onChange={(e) => setFieldValue("Additional", "justification", e.target.value)}
          />
        </div>
      )}

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
          <label className="text-sm font-medium text-gray-700 mb-1">
            Upload Supporting Documents
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setAttachment(e.target.files[0])}
            className="p-2 border rounded-lg bg-white shadow-sm w-1/2"
          />
          <p className="text-sm text-gray-500 mt-1">
            Formats: PDF, DOC, JPG, PNG.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Button type="submit" size="lg" className="px-10 bg-red-600/90 hover:bg-red-700 text-white">
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default AccessRequest;
