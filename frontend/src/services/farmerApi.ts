/* ---------------- TYPES ---------------- */

export interface LocationData {
  village: string;
  district: string;
  state: string;
  country: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}

export type Season = "Kharif" | "Rabi" | "Zaid";

export interface FarmerResponse {
  location: LocationData;
  weather: WeatherData;
  season: Season;
  suggestedCrops: string[];
}

interface CropRule {
  season: Season;
  minTemp?: number;
  maxTemp?: number;
  minHumidity?: number;
  crops: string[];
}

const CROP_RULES: CropRule[] = [
  {
    season: "Kharif",
    minTemp: 25,
    minHumidity: 60,
    crops: ["Rice", "Cotton", "Sugarcane", "Soybean"]
  },
  {
    season: "Rabi",
    minTemp: 15,
    maxTemp: 30,
    crops: ["Wheat", "Mustard", "Gram", "Barley"]
  },
  {
    season: "Zaid",
    crops: ["Watermelon", "Cucumber", "Maize"]
  }
];


/* ---------------- MAIN FUNCTION ---------------- */

export async function getFarmerCropSuggestion(
  lat: number,
  lon: number
): Promise<FarmerResponse> {
  try {
    /* 1️⃣ Reverse Geocoding (NO KEY) */
    const locationRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const locationData = await locationRes.json();

    /* 2️⃣ Weather from Open-Meteo (NO KEY) */
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;

    /* 3️⃣ Season Logic (India) */
    const month = new Date().getMonth() + 1;
    let season: Season;

    if (month >= 6 && month <= 9) season = "Kharif";
    else if (month >= 10 || month <= 2) season = "Rabi";
    else season = "Zaid";

/* 4️⃣ Crop Recommendation (Improved Logic) */

const crops =
  CROP_RULES.find((rule) => {
    if (rule.season !== season) return false;
    if (rule.minTemp !== undefined && temp < rule.minTemp) return false;
    if (rule.maxTemp !== undefined && temp > rule.maxTemp) return false;
    if (rule.minHumidity !== undefined && humidity < rule.minHumidity)
      return false;
    return true;
  })?.crops || [];
  console.log("Crop Recommendation Debug:", {
    temp,
    humidity,
    season,
    recommendedCrops: crops
  });


    /* 5️⃣ Return Final Response */
    return {
      location: {
        village: locationData.address?.village || "",
        district:
          locationData.address?.county ||
          locationData.address?.district ||
          "",
        state: locationData.address?.state || "",
        country: locationData.address?.country || ""
      },
      weather: {
        temperature: temp,
        humidity,
        description: "Live weather data"
      },
      season,
      suggestedCrops: crops
    };
  } catch (error) {
    console.error("Farmer API Error:", error);
    throw new Error("Failed to fetch farmer crop suggestion");
  }
}
