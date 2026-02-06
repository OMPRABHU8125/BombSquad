import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  AlertTriangle,
  Camera,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";

/* ---------------- TYPES ---------------- */
interface DetectionResult {
  crop: string;
  disease: {
    label: string;
    confidence: number;
  } | null;
  source: string;
}

/* ---------------- HELPERS ---------------- */
const formatText = (text: string) =>
  text
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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

/* ---------------- CONFIDENCE BAR COMPONENT ---------------- */
const ConfidenceBar = ({ value }: { value: number }) => {
  const getColor = () => {
    if (value >= 75) return "bg-red-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm mb-2">
        <span>Model Confidence</span>
        <span className="font-semibold">{value}%</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-4">
        <div
          className={`${getColor()} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-2 text-gray-500">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
};

/* ---------------- STAT CARD COMPONENT ---------------- */
const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-emerald-50 rounded-2xl p-6 flex gap-5">
    <Icon className="text-emerald-600" />
    <div>
      <span className="text-xs uppercase">{label}</span>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */
const Result = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [result, setResult] = useState<DetectionResult | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showLowConfidence, setShowLowConfidence] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const CONFIDENCE_THRESHOLD = 50;

  /* ✅ LOAD RESULT + IMAGE */
  useEffect(() => {
    const loadData = () => {
      const storedResult = sessionStorage.getItem("detectionResult");
      const storedImage = sessionStorage.getItem("detectionImage");

      console.log("========================================");
      console.log("📊 RESULT PAGE DEBUG INFO");
      console.log("========================================");
      console.log("Raw stored result:", storedResult);
      console.log("Has image:", !!storedImage);

      if (!storedResult) {
        console.log("⚠️ No result found - redirecting to scan");
        navigate("/scan");
        return;
      }

      try {
        const parsedResult = JSON.parse(storedResult);
        console.log("✅ Parsed result object:", parsedResult);
        console.log("Disease object:", parsedResult?.disease);
        console.log("Confidence value:", parsedResult?.disease?.confidence);
        
        // Check if disease object exists
        if (!parsedResult.disease) {
          console.error("❌ No disease object found in result!");
          console.log("Full result structure:", JSON.stringify(parsedResult, null, 2));
          setIsLoading(false);
          return;
        }

        const conf = parsedResult.disease.confidence 
          ? Math.round(parsedResult.disease.confidence * 100)
          : 0;
        
        console.log(`🎯 Calculated confidence: ${conf}%`);
        console.log(`📏 Threshold: ${CONFIDENCE_THRESHOLD}%`);
        
        setResult(parsedResult);
        if (storedImage) {
          setImage(storedImage);
          console.log("✅ Image loaded");
        }
        
        if (conf < CONFIDENCE_THRESHOLD) {
          console.log(`⚠️ LOW CONFIDENCE DETECTED (${conf}% < ${CONFIDENCE_THRESHOLD}%)`);
          setShowLowConfidence(true);
        } else {
          console.log(`✅ NORMAL CONFIDENCE (${conf}% >= ${CONFIDENCE_THRESHOLD}%)`);
          setShowLowConfidence(false);
        }

        setIsLoading(false);
        console.log("========================================");
        
      } catch (error) {
        console.error("❌ Parse error:", error);
        console.log("Raw data that failed to parse:", storedResult);
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  /* ✅ LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        sessionStorage.setItem("scanLocation", JSON.stringify({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
      },
      () => console.warn("Location denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading results...</p>
          <p className="text-gray-400 text-sm mt-2">Check browser console for details</p>
        </div>
      </div>
    );
  }

  // No result or no disease
  if (!result || !result.disease) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            Unable to load detection results. Please scan again.
          </p>
          <Button
            onClick={() => navigate("/scan")}
            className="w-full h-12 bg-green-500 hover:bg-green-600"
          >
            <Camera className="w-5 h-5 mr-2" />
            Go to Scan
          </Button>
          <p className="text-xs text-gray-400 mt-4">
            Check browser console (F12) for technical details
          </p>
        </div>
      </div>
    );
  }

  const confidence = Math.round(result.disease.confidence * 100);
  const severity = getSeverityFromConfidence(result.disease.confidence);
  const stage = getStageFromConfidence(result.disease.confidence);

  const diseaseData = {
    name: formatText(result.disease.label),
    crop: formatText(result.crop),
    confidence,
    severity: severity.label,
    stage: stage.label,
    spreadRisk: severity.level === 3 ? "High" : severity.level === 2 ? "Medium" : "Low",
  };

  const fullDescription = `${diseaseData.name} detected on ${diseaseData.crop} with ${confidence}% confidence. Severity ${diseaseData.severity}.`;

  const handleScanNew = () => {
    sessionStorage.removeItem('detectionResult');
    sessionStorage.removeItem('detectionImage');
    navigate("/scan");
  };

  /* =============== LOW CONFIDENCE WARNING PAGE =============== */
  if (showLowConfidence) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Low Confidence Detection
              </h1>
              <div className="flex items-center gap-3">
                <TranslateButton />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
                  <AlertTriangle className="w-14 h-14 text-orange-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Low Confidence Detection
                </h2>
                <p className="text-xl text-orange-100">
                  Model Confidence: {confidence}%
                </p>
              </div>

              <div className="p-8 md:p-12">
                {image && (
                  <div className="mb-8">
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                      <img src={image} alt="Scanned leaf" className="w-full h-full object-contain" />
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {confidence}% Confidence
                      </div>
                    </div>
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
                      Detected: <span className="font-semibold text-gray-900 dark:text-white">{diseaseData.name}</span>
                    </p>
                  </div>
                )}

                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-2">
                        Please Upload a Proper Image
                      </h3>
                      <p className="text-orange-800 dark:text-orange-200 text-base leading-relaxed">
                        The AI model has low confidence in this detection. For accurate results, please retake or upload a clearer image following the guidelines below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 mb-8 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Tips for Better Image Quality
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { num: "1", title: "Good Lighting:", desc: "Take photos in bright, natural light. Avoid shadows and dark areas." },
                      { num: "2", title: "Clear Focus:", desc: "Ensure the leaf is in sharp focus. Avoid blurry or out-of-focus images." },
                      { num: "3", title: "Fill the Frame:", desc: "Make sure the affected leaf fills most of the image frame." },
                      { num: "4", title: "Show Disease Symptoms:", desc: "Capture visible disease signs clearly (spots, discoloration, damage)." },
                      { num: "5", title: "Clean Background:", desc: "Use a plain background if possible to help the AI focus on the leaf." },
                      { num: "6", title: "Multiple Angles:", desc: "If first attempt is unclear, try taking photos from different angles." }
                    ].map((tip) => (
                      <li key={tip.num} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <span className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 dark:text-green-400 text-sm">{tip.num}</span>
                        </span>
                        <span><strong>{tip.title}</strong> {tip.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleScanNew}
                    className="flex-1 h-16 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Scan New Image
                  </Button>
                  
                  <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="h-16 text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Go Back
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                    <strong>Note:</strong> For best results, we recommend confidence levels above 50%. Lower confidence may indicate image quality issues or uncertain detection.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Example: Good vs Poor Images
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center border-2 border-green-400 dark:border-green-600">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-3">✅</div>
                      <p className="font-semibold text-gray-900 dark:text-white">Good Image</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    {["Clear and well-lit", "In focus, sharp details", "Disease symptoms visible", "Fills most of frame"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center border-2 border-red-400 dark:border-red-600">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-3">❌</div>
                      <p className="font-semibold text-gray-900 dark:text-white">Poor Image</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    {["Too dark or shadowy", "Blurry or out of focus", "Symptoms not clear", "Leaf too small in frame"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* =============== NORMAL RESULT PAGE =============== */
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden">
      <aside className="w-20 lg:w-72 bg-white/80 backdrop-blur-xl border-r hidden md:flex flex-col py-8 px-6 gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white">
            <Leaf size={28} />
          </div>
          <span className="hidden lg:block text-2xl font-bold">Krishi Care</span>
        </div>

        <nav className="flex flex-col gap-3">
          <div className="flex items-center gap-4 px-4 py-3 bg-emerald-600 text-white rounded-xl">
            <LayoutDashboard size={22} />
            <span className="hidden lg:block">Analysis</span>
          </div>

          <div onClick={() => navigate("/history")} className="flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-emerald-50 rounded-xl cursor-pointer">
            <History size={22} />
            <span className="hidden lg:block">History</span>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white px-8 py-6 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">Analysis Result</h1>
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
                <img src={image} className="w-full h-[500px] object-cover rounded-2xl" alt="Detected disease" />
              ) : (
                <div className="h-[500px] flex items-center justify-center">
                  <Leaf size={120} />
                </div>
              )}
            </div>
          </section>

          <section className="xl:col-span-7">
            <div className="bg-white rounded-3xl p-12">
              <h1 className="text-6xl font-bold">{diseaseData.name}</h1>
              <p className="text-xl mt-4">{diseaseData.crop}</p>

              <ConfidenceBar value={diseaseData.confidence} />

              <div className="grid sm:grid-cols-3 gap-5 mt-10">
                <StatCard icon={Shield} label="Severity" value={diseaseData.severity} />
                <StatCard icon={TrendingUp} label="Stage" value={diseaseData.stage} />
                <StatCard icon={Target} label="Spread Risk" value={diseaseData.spreadRisk} />
              </div>

              <div className="mt-10 flex gap-4">
                <Button
                  onClick={() => navigate("/remedies", { state: { crop: result.crop, disease: result.disease?.label } })}
                  className="flex-1 h-16 text-xl"
                >
                  View Remedies
                </Button>

                <Button variant="outline" onClick={handleScanNew}>
                  <RefreshCw className="mr-2" />
                  Scan New
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Result;