import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BACKEND_URL;

export async function fetchDiseaseDetails(token: string) {
  const res = await axios.post(
    `${API_BASE}/api/disease/view`,
    {
      crop: "Tomato",          // HARD-CODED as requested
      disease: "Early Blight", // HARD-CODED as requested
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
