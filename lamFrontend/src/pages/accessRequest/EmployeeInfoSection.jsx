// src/pages/accessRequest/EmployeeInfoSection.jsx
import { useState } from "react";
import { Search, User } from "lucide-react";
import Swal from "sweetalert2";
import dummyUsers2 from "../../data/dummyUser2";
import useAccessRequestStore from "../../store/accessRequestStore";
import { Button } from "../../components/ui/Button";
import FloatingInput from "../../components/custom/FloatingInput";
import { SectionTitle } from "../../components/SectionTitle";


const Required = ({ children }) => (
  <span>{children} <span className="text-red-600">*</span></span>
);

const EmployeeInfoSection = () => {
  const {
    cif,
    setCif,
    setShowForm,
    reset,
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

  return (
    <>
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
    </>
  );
};

export default EmployeeInfoSection;
