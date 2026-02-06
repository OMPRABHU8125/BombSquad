import * as tf from "@tensorflow/tfjs";

/* tflite is loaded globally via index.html */
declare const tflite: any;

let cropModel: any;
let diseaseModel: any;

let cropLabels: string[] = [];
let diseaseLabels: string[] = [];
let cropDiseaseMap: Record<string, string[]> = {};

// =========================================================
// INIT
// =========================================================
export async function initModels() {
  // Load label maps
  const cropRaw = await fetch("/models/crop_class_indices.json").then(r => r.json());
  const diseaseRaw = await fetch("/models/disease_class_indices.json").then(r => r.json());
  cropDiseaseMap = await fetch("/models/crop_disease_mapping.json").then(r => r.json());

  cropLabels = Object.keys(cropRaw).sort((a, b) => cropRaw[a] - cropRaw[b]);
  diseaseLabels = Object.keys(diseaseRaw).sort((a, b) => diseaseRaw[a] - diseaseRaw[b]);

  // Load TFLite models
  cropModel = await tflite.loadTFLiteModel("/models/crop_classifier.tflite");
  diseaseModel = await tflite.loadTFLiteModel("/models/disease_classifier.tflite");

  console.log("✅ Models loaded");
}

// =========================================================
// IMAGE PREPROCESSING
// =========================================================
function preprocess(img: HTMLImageElement) {
  return tf.tidy(() =>
    tf.expandDims(
      tf.div(
        tf.cast(
          tf.image.resizeBilinear(
            tf.browser.fromPixels(img),
            [224, 224]
          ),
          "float32"
        ),
        255
      ),
      0
    )
  );
}

// =========================================================
// CROP PREDICTION
// =========================================================
async function predictCrop(img: HTMLImageElement) {
  const input = preprocess(img);
  const output = cropModel.predict(input);
  const data = await output.data();

  input.dispose();
  output.dispose();

  const idx = data.indexOf(Math.max(...data));
  return { crop: cropLabels[idx], confidence: data[idx] };
}

// =========================================================
// DISEASE TOP-K
// =========================================================
async function predictDiseaseTopK(img: HTMLImageElement, k = 3) {
  const input = preprocess(img);
  const output = diseaseModel.predict(input);
  const data = await output.data();

  input.dispose();
  output.dispose();

  return diseaseLabels
    .map((label, i) => ({ label, confidence: data[i] }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, k);
}

// =========================================================
// FINAL DECISION
// =========================================================
function decideFinal(cropPred: any, diseaseTop: any[]) {
  const diseaseCrop = diseaseTop[0].label.split("_")[0];

  if (diseaseTop[0].confidence >= 0.75) {
    return {
      crop: diseaseCrop,
      disease: diseaseTop[0],
      source: "Disease pattern"
    };
  }

  if (cropPred.confidence >= 0.8) {
    const allowed = cropDiseaseMap[cropPred.crop] || [];
    const match = diseaseTop.find(d => allowed.includes(d.label));
    if (match) {
      return {
        crop: cropPred.crop,
        disease: match,
        source: "Leaf shape"
      };
    }
  }

  return {
    crop: cropPred.crop,
    disease: null,
    source: "Low confidence"
  };
}

// =========================================================
// PUBLIC API
// =========================================================
export async function detectDisease(img: HTMLImageElement) {
  const cropPred = await predictCrop(img);
  const diseaseTop = await predictDiseaseTopK(img, 3);
  return decideFinal(cropPred, diseaseTop);
}
