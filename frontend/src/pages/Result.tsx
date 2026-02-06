import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  Share2,
  BookmarkPlus,
  TrendingUp,
  Target,
  Leaf,
  LayoutDashboard,
  History,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

/* ---------------- TYPES (STRICTLY PRESERVED) ---------------- */
interface DetectionResult {
  crop: string;
  disease: {
    label: string;
    confidence: number;
  } | null;
  source: string;
}

/* ---------------- HELPERS ---------------- */
// Helper function to convert disease/crop names to translation keys
const getTranslationKey = (text: string, type: 'crop' | 'disease' | 'status') => {
  // Remove prefixes like "Apple_Apple___" or "Corn_Corn_(maize)___"
  let cleaned = text;
  
  // Handle crop extraction from full label
  if (type === 'crop') {
    cleaned = text.split('_')[0]; // Gets "Apple" from "Apple_Apple___..."
  } else if (type === 'disease') {
    // Extract disease name from full label like "Apple_Apple___Apple_scab"
    const parts = text.split('___');
    if (parts.length > 1) {
      cleaned = parts[1];
    }
  }
  
  // Normalize the text
  const normalized = cleaned
    .toLowerCase()
    .replace(/\(maize\)/g, '') // Remove (maize) from corn
    .replace(/\(black_measles\)/g, 'black_measles')
    .replace(/\(isariopsis_leaf_spot\)/g, '')
    .replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  
  if (normalized === 'healthy') {
    return 'status_healthy';
  }
  
  return type === 'crop' ? `crop_${normalized}` : `disease_${normalized}`;
};

const getSeverityFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "severity_high", level: 3 };
  if (c >= 0.5) return { label: "severity_medium", level: 2 };
  return { label: "severity_low", level: 1 };
};

const getStageFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "stage_mid_late", level: 3 };
  if (c >= 0.5) return { label: "stage_early_mid", level: 2 };
  return { label: "stage_early", level: 1 };
};

/* ---------------- CONFIDENCE BAR COMPONENT ---------------- */
const ConfidenceBar = ({ value, t }: { value: number; t: (key: string) => string }) => {
  const getColor = () => {
    if (value >= 75) return "bg-red-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm mb-2">
        <span>{t('modelConfidence')}</span>
        <span className="font-semibold">{value}%</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-4">
        <div
          className={`${getColor()} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>{t('confidenceLow')}</span>
        <span>{t('confidenceMedium')}</span>
        <span>{t('confidenceHigh')}</span>
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  const [result, setResult] = useState<DetectionResult | null>(null);
  const [image, setImage] = useState<string | null>(null);

  /* ✅ LOAD RESULT + IMAGE */
  useEffect(() => {
    const storedResult = sessionStorage.getItem("detectionResult");
    const storedImage = sessionStorage.getItem("detectionImage");

    if (!storedResult) {
      navigate("/scan");
      return;
    }

    try {
      setResult(JSON.parse(storedResult));
      if (storedImage) setImage(storedImage);
    } catch {
      navigate("/scan");
    }
  }, [navigate]);

  /* ✅ FETCH & STORE LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        sessionStorage.setItem("scanLocation", JSON.stringify(location));
      },
      () => {
        console.warn("Location permission denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  if (!result || !result.disease) return null;

  const confidence = Math.round(result.disease.confidence * 100);
  const severity = getSeverityFromConfidence(result.disease.confidence);
  const stage = getStageFromConfidence(result.disease.confidence);

  // Get translation keys
  const cropKey = getTranslationKey(result.crop, 'crop');
  const diseaseKey = getTranslationKey(result.disease.label, 'disease');

  const diseaseData = {
    name: t(diseaseKey),
    crop: t(cropKey),
    confidence,
    severity: severity.label,
    stage: stage.label,
    spreadRisk:
      severity.level === 3
        ? t('confidenceHigh')
        : severity.level === 2
        ? t('confidenceMedium')
        : t('confidenceLow'),
  };

  const fullDescription = `${diseaseData.name} ${t('diseaseDetected')} ${diseaseData.crop} ${t('confidence')} ${confidence}% ${t('severity')} ${t(diseaseData.severity)}`;

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-72 bg-white/80 backdrop-blur-xl border-r hidden md:flex flex-col py-8 px-6 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white">
            <Leaf size={28} />
          </div>
          <span className="hidden lg:block text-2xl font-bold">
            Krishi Care
          </span>
        </div>

        <nav className="flex flex-col gap-3">
          <div className="flex items-center gap-4 px-4 py-3 bg-emerald-600 text-white rounded-xl">
            <LayoutDashboard size={22} />
            <span className="hidden lg:block">{t('analysis')}</span>
          </div>

          <div
            onClick={() => navigate("/history")}
            className="flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-emerald-50 rounded-xl cursor-pointer"
          >
            <History size={22} />
            <span className="hidden lg:block">{t('history')}</span>
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white px-8 py-6 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">{t('analysisResult')}</h1>
          </div>

          <div className="flex gap-4">
            <TranslateButton />
            <ReadAloudButton text={fullDescription} />
            <Share2 />
            <BookmarkPlus />
          </div>
        </header>

        <div className="flex-1 p-10 grid grid-cols-1 xl:grid-cols-12 gap-8 overflow-y-auto">
          <section className="xl:col-span-5">
            <div className="bg-white rounded-3xl p-4">
              {image ? (
                <img
                  src={image}
                  alt={diseaseData.name}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              ) : (
                <div className="h-[500px] flex items-center justify-center">
                  <Leaf size={120} className="text-gray-300" />
                </div>
              )}
            </div>
          </section>

          <section className="xl:col-span-7">
            <div className="bg-white rounded-3xl p-12">
              <h1 className="text-6xl font-bold">{diseaseData.name}</h1>
              <p className="text-xl mt-4">{diseaseData.crop}</p>

              {/* ✅ CONFIDENCE BAR WITH TRANSLATIONS */}
              <ConfidenceBar value={diseaseData.confidence} t={t} />

              <div className="grid sm:grid-cols-3 gap-5 mt-10">
                <StatCard 
                  icon={Shield} 
                  label={t('severity')} 
                  value={t(diseaseData.severity)} 
                />
                <StatCard 
                  icon={TrendingUp} 
                  label={t('stage')} 
                  value={t(diseaseData.stage)} 
                />
                <StatCard 
                  icon={Target} 
                  label={t('spreadRisk')} 
                  value={diseaseData.spreadRisk} 
                />
              </div>

              <div className="mt-10 flex gap-4">
                <Button
                  onClick={() =>
                    navigate("/remedies", {
                      state: {
                        crop: result.crop,
                        disease: result.disease?.label,
                      },
                    })
                  }
                  className="flex-1 h-16 text-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {t('viewRemedies')}
                </Button>

                <Button 
                  variant="outline" 
                  onClick={() => navigate("/scan")}
                  className="h-16 px-6"
                >
                  <RefreshCw className="mr-2" size={20} />
                  {t('scanNew')}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-emerald-50 rounded-2xl p-6 flex gap-5">
    <Icon className="text-emerald-600" size={24} />
    <div>
      <span className="text-xs uppercase text-gray-600">{label}</span>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Result;