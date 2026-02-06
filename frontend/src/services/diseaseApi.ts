import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BACKEND_URL;

export async function fetchDiseaseDetails(
  token: string,
  crop: string,
  disease: string
) {
  const storedLocation = sessionStorage.getItem("scanLocation");

  let location = null;

  if (storedLocation) {
    try {
      location = JSON.parse(storedLocation);
    } catch (err) {
      console.warn("Invalid scanLocation format");
    }
  }

  const res = await axios.post(
    `${API_BASE}/api/disease/view`,
    {
      crop,
      disease,
      location, // 👈 send only if exists
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
