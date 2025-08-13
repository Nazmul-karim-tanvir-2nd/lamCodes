import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 8000,
});

export const getEmployeeByCif = async (cif) => {
  const res = await api.get(`/employees/${encodeURIComponent(cif)}`);
  return res.data; // { name, department, lineManager }
};
