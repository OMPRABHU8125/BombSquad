const DiseaseInfo = require("../models/DiseaseInfo");
const { fetchDiseaseInfo } = require("../services/gemini.service");

const WARNING_RADIUS_METERS = 5000;

exports.viewDisease = async (req, res) => {
  try {
    const { crop, disease, location } = req.body;
    const userId = req.user?.id;

    if (!crop || !disease) {
      return res.status(400).json({
        message: "Crop and disease are required",
      });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* 1️⃣ Fetch AI knowledge (ALWAYS) */
    const aiData = await fetchDiseaseInfo(crop, disease);

    let savedScan = null;
    let warning = null;

    /* 2️⃣ Save scan ONLY if location is available */
    if (location?.lat && location?.lng) {
      savedScan = await DiseaseInfo.create({
        user: userId,
        crop,
        disease,
        location: {
          type: "Point",
          coordinates: [location.lng, location.lat],
        },
        remedies: aiData.remedies || [],
        products: aiData.products || [],
        avoid: aiData.avoid || [],
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
              coordinates: [location.lng, location.lat],
            },
            $maxDistance: WARNING_RADIUS_METERS,
          },
        },
      }).limit(5);

      if (nearbyCases.length > 0) {
        warning = {
          message:
            "⚠️ Similar disease detected nearby. Possible outbreak risk.",
          count: nearbyCases.length,
          radiusMeters: WARNING_RADIUS_METERS,
        };
      }
    }

    /* 4️⃣ Response (location OR not) */
    return res.status(200).json({
      data: {
        crop,
        disease,
        remedies: aiData.remedies || [],
        products: aiData.products || [],
        avoid: aiData.avoid || [],
      },
      warning,
    });
  } catch (err) {
    console.error("Disease Controller Error:", err);
    return res.status(500).json({
      message: "Internal server error while processing disease scan",
    });
  }
};
