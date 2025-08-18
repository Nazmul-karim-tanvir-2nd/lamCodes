const BASE_EMPLOYEE_URL = "http://localhost:5162/api/Employee";
//const BASE_EXTERNAL_API_URL = "http://localhost:5162/api/ExternalApi";

export const checkCIF = async (cifOrNid) => {
  try {
    const response = await fetch(`${BASE_EMPLOYEE_URL}/search/${cifOrNid}`);
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
  const res = await fetch(`${BASE_EMPLOYEE_URL}/designation`);
  if (!res.ok) throw new Error("Failed to fetch designations");

  const data = await res.json();
  return data.map(designation => ({
    value: designation.empDesignation,
    label: designation.empDesignation,
  }));
};

export const fetchDepartments = async () => {
  const res = await fetch(`${BASE_EMPLOYEE_URL}/department`);
  if (!res.ok) throw new Error("Failed to fetch departments");

  const data = await res.json();
  return data.map(department => ({
    value: department.teamName,
    label: department.teamName,
  }));
};

export const fetchLineManagerByCIF = async (cif) => {
  if (!cif) return null;

  try {
    const res = await fetch(`${BASE_EMPLOYEE_URL}/line-manager/${cif}`);

    if (res.status === 404) {
      // Line manager not found for this CIF
      return { error: "No line manager found for the given CIF." };
    }

    if (!res.ok) {
      // Other errors (500, 503, etc.)
      return { error: "Server error. Please try again later." };
    }

    const data = await res.json();
    return {
      name: data.memberName ?? "",
      mobile: data.mobileNo ?? "",
      designation: data.designation ?? "",
    };
  } catch (err) {
    // Network failure or fetch itself failed
    console.error("❌ Network/API error:", err);
    return { error: "Unable to connect to server. Check your network." };
  }
};
