const DiseaseInfo = require("../models/DiseaseInfo");
const { fetchDiseaseInfo } = require("../services/gemini.service");

const WARNING_RADIUS_METERS = 5000;

exports.viewDisease = async (req, res) => {
  try {
    const { crop, disease, location } = req.body;
    const userId = req.user?.id;

    if (!crop || !disease || !location?.lat || !location?.lng) {
      return res.status(400).json({
        message: "Crop, disease, and location are required"
      });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* 1️⃣ Fetch AI knowledge */
    const aiData = await fetchDiseaseInfo(crop, disease);

    /* 2️⃣ Save scan */
    const savedScan = await DiseaseInfo.create({
      user: userId,
      crop,
      disease,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat]
      },
      remedies: aiData.remedies || [],
      products: aiData.products || [],
      avoid: aiData.avoid || []
    });

    /* 3️⃣ Nearby disease detection */
    const nearbyCases = await DiseaseInfo.find({
      _id: { $ne: savedScan._id },
      crop: { $regex: new RegExp(`^${crop}$`, "i") },
      disease: { $regex: new RegExp(`^${disease}$`, "i") },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.lng, location.lat]
          },
          $maxDistance: WARNING_RADIUS_METERS
        }
      }
    }).limit(5);

    return res.status(200).json({
      data: savedScan,
      warning:
        nearbyCases.length > 0
          ? {
              message:
                "⚠️ Similar disease detected nearby. Possible outbreak risk.",
              count: nearbyCases.length,
              radiusMeters: WARNING_RADIUS_METERS
            }
          : null
    });

  } catch (err) {
    console.error("Disease Controller Error:", err);
    return res.status(500).json({
      message: "Internal server error while processing disease scan"
    });
  }
};
