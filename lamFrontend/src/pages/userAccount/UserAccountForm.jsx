import { useState, useEffect } from 'react';
import useUserFormStore from '../../store/useUserFormStore';
import { Button } from '../../components/ui/Button.jsx';
import Swal from "sweetalert2";
import BasicInfoSection from './BasicInfoSection.jsx';
import DepartmentRoleSection from './DepartmentRoleSection.jsx';
import AttachmentsSection from './AttachmentsSection.jsx';
import MetadataSection from './MetadataSection.jsx';
import { checkCIF, fetchBranches, fetchDivisions, fetchDesignations, fetchDepartments } from '../../api/userFormApi';

const UserAccountForm = () => {
  const { formData, updateField } = useUserFormStore();

  const [branchOptions, setBranchOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === 'file') {
      const file = files[0];
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Only PDF, JPG, PNG, DOC, and DOCX are allowed.");
        return;
      }
      updateField(name, file);
    } else if (type === 'checkbox') {
      updateField(name, checked);
    } else {
      updateField(name, value);
    }
  };

  const handleCIFSearch = async () => {
    const sanitizedCIF = formData.cif?.trim();
    if (!sanitizedCIF) {
      Swal.fire({ title: "Enter a valid CIF", icon: "warning" });
      return;
    }

    const result = await checkCIF(sanitizedCIF);

    if (result) {
      updateField("name", result.name);
      updateField("mobile", result.mobile);
      updateField("biometricStatus", result.biometricStatus);
      Swal.fire("Success", `CIF found: ${result.name}`, "success");
    } else {
      Swal.fire("Not Found", "CIF not found in external API", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    Swal.fire({
      title: "Form Submitted Successfully!",
      icon: "success",
    });
  };

  // Set request date and approval status
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    updateField("requestDate", today);
    updateField("approvalStatus", "Pending");
  }, [updateField]);

  // Load all dropdowns
  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const [branches, divisions, designations, departments] = await Promise.all([
          fetchBranches(),
          fetchDivisions(),
          fetchDesignations(),
          fetchDepartments(),
        ]);

        // Set dropdown options
        setBranchOptions(branches);
        setDivisionOptions(divisions);
        setDesignationOptions(designations);
        setDepartmentOptions(departments);

        console.log("Dropdown data loaded:", { branches, divisions, designations, departments });
      } catch (err) {
        console.error("❌ Failed to fetch dropdown data", err);
      }
    };

    loadDropdownData();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 space-y-2">
      <h1 className="text-base sm:text-xl font-bold text-center text-blue-800 mb-4 underline underline-offset-8 decoration-gray-500/80">
        New User Account Opening Request
      </h1>

      <BasicInfoSection
        formData={formData}
        handleChange={handleChange}
        handleCIFSearch={handleCIFSearch}
      />
      <DepartmentRoleSection
        formData={formData}
        handleChange={handleChange}
        updateField={updateField}
        branchOptions={branchOptions}
        divisionOptions={divisionOptions}
        designationOptions={designationOptions}
        departmentOptions={departmentOptions}
      />
      <AttachmentsSection formData={formData} handleChange={handleChange} />
      <MetadataSection formData={formData} handleChange={handleChange} />

      <div className="text-center">
        <Button
          type="submit"
          size="lg"
          className="px-12 bg-red-600/80 hover:bg-red-700 text-white rounded-md transition"
        >
          Submit Request
        </Button>
      </div>
    </form>
  );
};

export default UserAccountForm;
