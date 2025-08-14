// src/pages/employeeClearance/EmployeeClearance.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import useClearanceTrackerStore from "../../store/useClearanceTrackerStore";
import FloatingInput from "../../components/custom/FloatingInput";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import FloatingCheckbox from "../../components/custom/FloatingCheckbox";
import { SectionTitle } from "../../components/SectionTitle";
import { Button } from "../../components/ui/Button";
import { FaMoneyCheckAlt, FaBuilding, FaUsersCog, FaIndustry, FaUserShield } from "react-icons/fa";

const ClearanceSection = ({ title, deptKey, icon }) => {
  const { departments, toggleItem, setGrantedBy, toggleDeviation, setJustification, setAttachment } =
    useClearanceTrackerStore();
  const data = departments[deptKey];

  return (
    <div className="space-y-2">
      <SectionTitle>
        <span className="text-red-600 mr-2 text-lg">{icon}</span>
        {title}
      </SectionTitle>

      <div className="bg-white rounded-md border border-red-200 px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-y-2 gap-x-4 md:gap-x-8 mb-8 shadow">
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput
            label="Clearance Granted By"
            name="grantedBy"
            value={data.grantedBy}
            onChange={(e) => setGrantedBy(deptKey, e.target.value)}
          />
          <FloatingCheckbox
            name="deviation"
            label="Deviation"
            checked={data.deviation}
            onChange={() => toggleDeviation(deptKey)}
          />
        </div>

        {data.deviation && (
          <div className="mt-4">
            <FloatingTextarea
              label="Justification for Deviation"
              name="justification"
              value={data.deviationJustification}
              onChange={(e) => setJustification(deptKey, e.target.value)}
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(data.items).map(([item, checked]) => (
            <FloatingCheckbox
              key={item}
              name={item}
              label={item}
              checked={checked}
              onChange={() => toggleItem(deptKey, item)}
            />
          ))}
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Upload Clearance Attachment</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setAttachment(deptKey, e.target.files[0])}
            className="p-2 border rounded-lg bg-white shadow-sm w-full sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

const EmployeeClearance = () => {
  const { departments, reset } = useClearanceTrackerStore();
  const [submitted, setSubmitted] = useState(false);

  const fileToDataUrl = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const pickOverallGrantedBy = (deptObj) => {
    for (const key of Object.keys(deptObj)) {
      const n = (deptObj[key]?.grantedBy || "").trim();
      if (n) return n;
    }
    return "";
  };

  const validateDepartments = (deptState) => {
    for (const [dept, data] of Object.entries(deptState)) {
      if (data.deviation) {
        if (!data.deviationJustification?.trim()) {
          return { ok: false, message: `Provide deviation justification for ${dept}.` };
        }
      } else {
        const hasChecked = Object.values(data.items || {}).some(Boolean);
        if (!hasChecked) {
          return { ok: false, message: `Select at least one item in ${dept} or mark Deviation with reason.` };
        }
      }
    }
    return { ok: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validateDepartments(departments);
    if (!v.ok) {
      Swal.fire("Validation error", v.message, "error");
      return;
    }

    const depts = {};
    for (const [dept, data] of Object.entries(departments)) {
      depts[dept] = {
        items: { ...data.items },
        grantedBy: data.grantedBy || "",
        deviation: !!data.deviation,
        deviationJustification: data.deviation ? data.deviationJustification || "" : "",
        attachment: data.attachment
          ? {
              name: data.attachment.name,
              dataUrl: await fileToDataUrl(data.attachment),
            }
          : null,
      };
    }

    const request = {
      id: `CR-${Date.now()}`,
      submittedBy: "Maisha",
      submittedAt: new Date().toISOString(),
      grantedBy: pickOverallGrantedBy(depts),
      departments: depts,
    };

    const existing = JSON.parse(localStorage.getItem("clearanceRequests") || "[]");
    existing.unshift(request);
    localStorage.setItem("clearanceRequests", JSON.stringify(existing));

    Swal.fire("Submitted", "Clearance data saved successfully.", "success");
    setSubmitted(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 sm:p-2 space-y-2">
      <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
        Clearance Tracker
      </h1>

      <ClearanceSection title="Finance Department" deptKey="Finance" icon={<FaMoneyCheckAlt />} />
      <ClearanceSection title="Administration Department" deptKey="Administration" icon={<FaBuilding />} />
      <ClearanceSection title="Consumer Division" deptKey="Consumer" icon={<FaUsersCog />} />
      <ClearanceSection title="Operations Department" deptKey="Operations" icon={<FaIndustry />} />
      <ClearanceSection title="Human Resources" deptKey="HR" icon={<FaUserShield />} />

      <div className="text-center">
        <Button type="submit" size="lg" className="px-10 bg-red-600/90 hover:bg-red-700 text-white">
          Submit Clearance
        </Button>
      </div>

      {submitted && <p className="text-green-600 text-center mt-4">Clearance data saved successfully.</p>}
    </form>
  );
};

export default EmployeeClearance;
