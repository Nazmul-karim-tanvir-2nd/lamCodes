// src/pages/access-request/AccessTypesSection.jsx
import { Key } from "lucide-react";
import FloatingCheckbox from "../../components/custom/FloatingCheckbox";
import { SectionTitle } from "../../components/SectionTitle";
import FloatingInput from "../../components/custom/FloatingInput";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import useAccessRequestStore from "../../store/accessRequestStore";


const Required = ({ children }) => (
  <span>{children} <span className="text-red-600">*</span></span>
);

const AccessTypesSection = () => {
  const {
    selectedTypes,
    fields,
    toggleAccessType,
    setFieldValue
  } = useAccessRequestStore();

  return (
    <>
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
    </>
  );
};

export default AccessTypesSection;
