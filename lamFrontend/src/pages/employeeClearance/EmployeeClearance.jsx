// src/pages/EmployeeClearance.jsx
import { useState } from "react";
import useClearanceTrackerStore from "../../store/useClearanceTrackerStore";
import FloatingInput from "../../components/custom/FloatingInput";
import FloatingTextarea from "../../components/custom/FloatingTextarea";
import FloatingCheckbox from "../../components/custom/FloatingCheckbox";
import { SectionTitle } from "../../components/SectionTitle";
import { Button } from "../../components/ui/Button";
import { FileText } from "lucide-react";

const ClearanceSection = ({ title, deptKey }) => {
  const {
    departments,
    toggleItem,
    setGrantedBy,
    toggleDeviation,
    setJustification,
    setAttachment,
  } = useClearanceTrackerStore();

  const data = departments[deptKey];

  return (
    <div className="bg-white rounded-md border border-red-200 px-6 py-6 mb-14 shadow">
      <SectionTitle>
        <FileText className="w-5 h-5 text-red-600 mr-2" />
        {title}
      </SectionTitle>


      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Upload Clearance Attachment
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(e) => setAttachment(deptKey, e.target.files[0])}
          className="p-2 border rounded-lg bg-white shadow-sm w-full sm:w-1/2"
        />
      </div>
    </div>
  );
};

const EmployeeClearance = () => {
  const { departments, reset } = useClearanceTrackerStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("employeeClearanceData", JSON.stringify(departments));
    setSubmitted(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 sm:p-2 space-y-4">
      <h1 className="text-base sm:text-2xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-red-500/80">
        Clearance Tracker
      </h1>


      <ClearanceSection title="Finance Department" deptKey="Finance" />
      <ClearanceSection title="Administration Department" deptKey="Administration" />
      <ClearanceSection title="Consumer Division" deptKey="Consumer" />
      <ClearanceSection title="Operations Department" deptKey="Operations" />
      <ClearanceSection title="Human Resources" deptKey="HR" />

      <div className="text-center">
        <Button
          type="submit"
          size="lg"
          className="px-10 bg-red-600/90 hover:bg-red-700 text-white"
        >
          Submit Clearance
        </Button>
      </div>

      {submitted && (
        <p className="text-green-600 text-center mt-4">Clearance data saved successfully.</p>
      )}
    </form>
  );
};

export default EmployeeClearance;
