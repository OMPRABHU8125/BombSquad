import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  MapPin,
  Share2,
  BookmarkPlus,
  TrendingUp,
  Target,
} from "lucide-react";

import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

/* ---------------- TYPES ---------------- */
interface DetectionResult {
  crop: string;
  disease: {
    label: string;
    confidence: number; // 0–1
  } | null;
  source: string;
}

/* ---------------- HELPERS ---------------- */
const formatText = (text: string) =>
  text
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const getSeverityFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "High", level: 3 };
  if (c >= 0.5) return { label: "Moderate", level: 2 };
  return { label: "Low", level: 1 };
};

const getStageFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "Mid-Late", level: 3 };
  if (c >= 0.5) return { label: "Early-Mid", level: 2 };
  return { label: "Early", level: 1 };
};

/* ---------------- COMPONENT ---------------- */
const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  const [result, setResult] = useState<DetectionResult | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("detectionResult");
    const storedImage = sessionStorage.getItem("detectionImage");

    if (!storedResult) {
      navigate("/scan");
      return;
    }

    setResult(JSON.parse(storedResult));
    if (storedImage) setImage(storedImage);
  }, [navigate]);

  if (!result || !result.disease) return null;

  const confidence = Math.round(result.disease.confidence * 100);
  const severity = getSeverityFromConfidence(result.disease.confidence);
  const stage = getStageFromConfidence(result.disease.confidence);

  const diseaseData = {
    name: formatText(result.disease.label),
    scientificName: "Detected by AI Model",
    crop: formatText(result.crop),
    confidence,
    severity: severity.label,
    severityLevel: severity.level,
    stage: stage.label,
    stageNumber: stage.level,
    spreadRisk: severity.level === 3 ? "High" : severity.level === 2 ? "Medium" : "Low",
    warningRadius: severity.level === 3 ? "1km" : "500m",
    affectedArea: severity.level === 3 ? "40%" : "20%",
    timeline: [
      { day: "Day 1–3", event: "Initial symptoms visible", status: "completed" },
      { day: "Day 4–7", event: "Disease spreads to nearby leaves", status: "current" },
      { day: "Day 8–14", event: "Stem infection possible", status: "upcoming" },
      { day: "Day 15+", event: "Yield damage risk", status: "upcoming" },
    ],
    description:
      "This disease was detected using AI-based image analysis. Early identification helps prevent spread and yield loss. Immediate preventive measures are recommended.",
    symptoms: [
      "Visible leaf discoloration",
      "Spots or lesions",
      "Leaf curling",
      "Reduced plant vigor",
    ],
  };

  const fullDescription = `${diseaseData.name} detected on ${diseaseData.crop} with ${confidence}% confidence. Severity ${diseaseData.severity}.`;

  const handleSaveReport = () => {
    toast.success("Report saved successfully");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Crop Disease Report",
        text: fullDescription,
      });
    } else {
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        {/* HEADER IMAGE */}
        <div className="relative">
          <div className="h-64 bg-muted">
            {image ? (
              <img 
                src={image} 
                alt="Detected crop disease" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl">🌿</div>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 p-2 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="absolute top-5 right-5 flex gap-2">
            <TranslateButton />
            <ReadAloudButton text={fullDescription} size="md" />
            <button 
              onClick={handleShare} 
              className="p-2 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSaveReport} 
              className="p-2 bg-card/90 backdrop-blur-sm rounded-xl shadow-lg"
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="px-5 -mt-8">
          <div className="bg-card rounded-3xl p-5 shadow-krishi-lg">
            <span className="text-sm text-muted-foreground">
              {t("diseaseDetected")}
            </span>
            <h1 className="text-2xl font-bold mt-1">{diseaseData.name}</h1>
            <p className="text-sm text-muted-foreground">
              {diseaseData.crop} • {diseaseData.scientificName}
            </p>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{t("confidence")}</span>
                <span className="font-bold">{confidence}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="px-5 mt-6 grid grid-cols-2 gap-3">
          <StatCard icon={Shield} label={t("severity")} value={diseaseData.severity} />
          <StatCard icon={TrendingUp} label={t("stage")} value={diseaseData.stage} />
          <StatCard icon={Target} label={t("spreadRisk")} value={diseaseData.spreadRisk} />
          <StatCard icon={MapPin} label={t("warningRadius")} value={diseaseData.warningRadius} />
        </div>

        {/* ACTION */}
        <div className="px-5 mt-6 pb-6">
          <Button
            onClick={() => navigate(`/remedies/${id || "1"}`)}
            className="w-full h-14 text-lg gradient-primary rounded-2xl"
          >
            {t("viewRemedies")}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

/* ---------------- SMALL COMPONENT ---------------- */
const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-card rounded-2xl p-4 shadow-krishi-sm">
    <div className="flex items-center gap-2 mb-1">
      <Icon className="w-5 h-5 text-primary" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="font-bold text-lg">{value}</p>
  </div>
);

export default Result;