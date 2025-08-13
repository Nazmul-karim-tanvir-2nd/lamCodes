// src/api/userFormApi.js

const BASE_EMPLOYEE_URL = "http://localhost:5162/api/employee";

export const checkCIF = async (cif) => {
  try {
    const response = await fetch(`http://localhost:5162/api/ExternalApi/employee/${cif}`);
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
  return res.json();
};

export const fetchDivisions = async () => {
  const res = await fetch(`${BASE_EMPLOYEE_URL}/divisions`);
  if (!res.ok) throw new Error("Failed to fetch divisions");
  return res.json();
};
