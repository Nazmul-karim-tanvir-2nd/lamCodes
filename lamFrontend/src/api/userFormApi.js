//src/api/userFormApi.js
const BASE_EMPLOYEE_URL = "http://localhost:5162/api/employee";
const BASE_EXTERNAL_API_URL = "http://localhost:5162/api/ExternalApi";

export const checkCIF = async (cif) => {
  try {
    const response = await fetch(`${BASE_EXTERNAL_API_URL}/employee/${cif}`);
    if (!response.ok) throw new Error("CIF fetch failed");

    const data = await response.json();
    const employee = data.employees?.[0];
    if (!employee) return null;

    return {
      name: employee.name ?? "",
      mobile: employee.mobilePhone ?? "",
      biometricStatus: "Verified",
    };
  } catch (error) {
    console.error("❌ Error checking CIF:", error);
    return null;
  }
};

export const fetchBranches = async () => {
  const res = await fetch(`${BASE_EMPLOYEE_URL}/branches/all`);
  if (!res.ok) throw new Error("Failed to fetch branches");

  const data = await res.json();
  return data.map(branch => ({
    value: branch.branchName,
    label: branch.branchName,
  }));
};

export const fetchDivisions = async () => {
  const res = await fetch(`${BASE_EMPLOYEE_URL}/divisions`);
  if (!res.ok) throw new Error("Failed to fetch divisions");

  const data = await res.json();
  return data.map(division => ({
    value: division.divisionName,
    label: division.divisionName,
  }));
};

export const fetchDesignations = async () => {
   const res = await fetch(`http://localhost:5162/api/employee/designation`);
  if (!res.ok) throw new Error("Failed to fetch designations");

  const data = await res.json();
  return data.map(designation => ({
    value: designation.empDesignation,
    label: designation.empDesignation,
  }));
};
