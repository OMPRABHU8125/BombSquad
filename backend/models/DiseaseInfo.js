const mongoose = require("mongoose");

/* ---------- Sub Schemas ---------- */

const RemedySchema = new mongoose.Schema(
  {
    title: String,
    steps: String,
    ingredients: [String],
    videoUrl: String
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    usage: String,
    buyLink: String
  },
  { _id: false }
);

const AvoidSchema = new mongoose.Schema(
  {
    title: String,
    reason: String
  },
  { _id: false }
);

/* ---------- Main Schema ---------- */

const DiseaseInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    crop: {
      type: String,
      required: true,
      index: true
    },

    disease: {
      type: String,
      required: true,
      index: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },

    remedies: [RemedySchema],
    products: [ProductSchema],
    avoid: [AvoidSchema]
  },
  { timestamps: true }
);

/* ---------- Geo Index ---------- */
DiseaseInfoSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("DiseaseInfo", DiseaseInfoSchema);
