import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BACKEND_URL;

export async function fetchNearbyMarkets(
  token: string,
  crop: string
) {
  const location = sessionStorage.getItem("scanLocation")
    ? JSON.parse(sessionStorage.getItem("scanLocation")!)
    : null;

  const res = await axios.post(
    `${API_BASE}/api/marketplaces/nearby`,
    { crop, location },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}
