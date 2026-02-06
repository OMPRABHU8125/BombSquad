/**
 * Dummy Marketplace Controller
 * Location-based mandi prices (offline-safe)
 */

const dummyMarketData = [
  {
    crop: "Tomato",
    city: "Vashi",
    district: "Navi Mumbai",
    latitude: 19.0721,
    longitude: 72.9987,
    distance_km: 5,
    price_per_quintal: 1450
  },
  {
    crop: "Tomato",
    city: "Airoli",
    district: "Thane",
    latitude: 19.1590,
    longitude: 72.9986,
    distance_km: 10,
    price_per_quintal: 1460
  },
  {
    crop: "Tomato",
    city: "Panvel",
    district: "Raigad",
    latitude: 18.9886,
    longitude: 73.1175,
    distance_km: 20,
    price_per_quintal: 1470
  },
  {
    crop: "Tomato",
    city: "Belapur",
    district: "Navi Mumbai",
    latitude: 19.0205,
    longitude: 73.0350,
    distance_km: 8,
    price_per_quintal: 1500
  },

  {
    crop: "Potato",
    city: "Vashi",
    district: "Navi Mumbai",
    latitude: 19.0730,
    longitude: 72.9950,
    distance_km: 5,
    price_per_quintal: 1200
  },
  {
    crop: "Potato",
    city: "Airoli",
    district: "Thane",
    latitude: 19.1582,
    longitude: 72.9970,
    distance_km: 10,
    price_per_quintal: 1210
  },
  {
    crop: "Potato",
    city: "Belapur",
    district: "Navi Mumbai",
    latitude: 19.0180,
    longitude: 73.0370,
    distance_km: 8,
    price_per_quintal: 1250
  },

  {
    crop: "Corn",
    city: "Vashi",
    district: "Navi Mumbai",
    latitude: 19.0740,
    longitude: 72.9965,
    distance_km: 5,
    price_per_quintal: 1700
  },
  {
    crop: "Corn",
    city: "Kharghar",
    district: "Navi Mumbai",
    latitude: 19.0403,
    longitude: 73.0736,
    distance_km: 12,
    price_per_quintal: 1730
  },

  {
    crop: "Apple",
    city: "Vashi",
    district: "Navi Mumbai",
    latitude: 19.0715,
    longitude: 72.9972,
    distance_km: 5,
    price_per_quintal: 4200
  },
  {
    crop: "Apple",
    city: "Kalyan",
    district: "Thane",
    latitude: 19.2415,
    longitude: 73.1320,
    distance_km: 18,
    price_per_quintal: 4230
  },

  {
    crop: "Grape",
    city: "Vashi",
    district: "Navi Mumbai",
    latitude: 19.0738,
    longitude: 72.9960,
    distance_km: 5,
    price_per_quintal: 3100
  },
  {
    crop: "Grape",
    city: "Kharghar",
    district: "Navi Mumbai",
    latitude: 19.0430,
    longitude: 73.0750,
    distance_km: 12,
    price_per_quintal: 3130
  }
];

exports.getNearbyMarketplaces = async (req, res) => {
  try {
    const { crop, location } = req.body;

    if (!crop) {
      return res.status(400).json({ message: "Crop is required" });
    }

    /**
     * STEP 1: Filter by crop
     */
    let filtered = dummyMarketData.filter(
      (m) => m.crop.toLowerCase() === crop.toLowerCase()
    );

    /**
     * STEP 2: Limit distance (5–20 km range)
     */
    filtered = filtered.filter(
      (m) => m.distance_km <= 20
    );

    /**
     * STEP 3: Sort
     * - nearest first
     * - if same distance, higher price first
     */
    filtered.sort((a, b) => {
      if (a.distance_km !== b.distance_km) {
        return a.distance_km - b.distance_km;
      }
      return b.price_per_quintal - a.price_per_quintal;
    });

    /**
     * STEP 4: Shape response for frontend
     */
    const marketplaces = filtered.map((m) => ({
      name: `APMC ${m.city}`,
      district: m.district,
      distanceKm: m.distance_km,
      pricePerQuintal: m.price_per_quintal,
      demand:
        m.price_per_quintal > 3000
          ? "High"
          : m.price_per_quintal > 2000
          ? "Medium"
          : "Low"
    }));

    res.status(200).json({
      crop,
      marketplaces,
      note:
        "Prices are indicative mandi prices based on nearby markets (demo data)."
    });
  } catch (err) {
    console.error("Marketplace API Error:", err);
    res.status(500).json({ message: "Failed to fetch marketplaces" });
  }
};
