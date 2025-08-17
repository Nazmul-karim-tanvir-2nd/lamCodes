// src/api/userFormApi.js

const BASE_EMPLOYEE_URL = "/api/Employee";
const BASE_EXTERNAL_API_URL = "/api/ExternalApi";

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
  try {
    const res = await fetch(`${BASE_EMPLOYEE_URL}/branches/all`);
    if (!res.ok) throw new Error("Failed to fetch branches");

    const data = await res.json();
    console.log("Branches fetched:", data);
    return data.map((branch) => ({
      value: branch.branchName,
      label: branch.branchName,
    }));
  } catch (err) {
    console.error("❌ fetchBranches error:", err);
    return [];
  }
};

export const fetchDivisions = async () => {
  try {
    const res = await fetch(`${BASE_EMPLOYEE_URL}/divisions`);
    if (!res.ok) throw new Error("Failed to fetch divisions");

    const data = await res.json();
    console.log("Divisions fetched:", data);
    return data.map((division) => ({
      value: division.divisionName,
      label: division.divisionName,
    }));
  } catch (err) {
    console.error("❌ fetchDivisions error:", err);
    return [];
  }
};

export const fetchDesignations = async () => {
  try {
    const res = await fetch(`${BASE_EMPLOYEE_URL}/designation`);
    if (!res.ok) throw new Error("Failed to fetch designations");

    const data = await res.json();
    console.log("Designations fetched:", data);
    return data.map((designation) => ({
      value: designation.empDesignation,
      label: designation.empDesignation,
    }));
  } catch (err) {
    console.error("❌ fetchDesignations error:", err);
    return [];
  }
};

export const fetchDepartments = async () => {
  const res = await fetch('/api/Employee/department');
  const data = await res.json();
  return data.map(dep => ({
    value: dep.teamName || '', // <-- map teamName
    label: dep.teamName || '', // <-- map teamName
  }));
};