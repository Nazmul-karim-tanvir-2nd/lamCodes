const BASE_URL = "http://localhost:5162/api/ExternalApi";

export const checkCIF = async (cif) => {
  try {
    console.log("🔍 Fetching for CIF:", cif);

    const response = await fetch(`${BASE_URL}/employee/${cif}`);
    console.log("🌐 Response status:", response.status);

    if (!response.ok) throw new Error("CIF fetch failed");

    const data = await response.json();
    console.log("📦 Raw API data:", data);

    const employee = data.employees?.[0];
    console.log("👤 Extracted Employee:", employee);

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
