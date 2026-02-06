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
const getSeverityFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "high", level: 3 };
  if (c >= 0.5) return { label: "medium", level: 2 };
  return { label: "low", level: 1 };
};

const getStageFromConfidence = (c: number) => {
  if (c >= 0.75) return { label: "mid_late", level: 3 };
  if (c >= 0.5) return { label: "early_mid", level: 2 };
  return { label: "early", level: 1 };
};

/* ---------------- CONFIDENCE BAR COMPONENT ---------------- */
const ConfidenceBar = ({ value }: { value: number }) => {
  const { t } = useLanguage();
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

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-emerald-50 rounded-2xl p-6 flex gap-5">
    <Icon className="text-emerald-600" />
    <div>
      <span className="text-xs uppercase">{label}</span>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Result = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [result, setResult] = useState<DetectionResult | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [showLowConfidence, setShowLowConfidence] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const CONFIDENCE_THRESHOLD = 50;

  useEffect(() => {
    const loadData = () => {
      const storedResult = sessionStorage.getItem("detectionResult");
      const storedImage = sessionStorage.getItem("detectionImage");

      if (!storedResult) {
        navigate("/scan");
        return;
      }

      try {
        const parsedResult = JSON.parse(storedResult);
        setResult(parsedResult);
        if (storedImage) setImage(storedImage);

        const conf = parsedResult?.disease?.confidence 
          ? Math.round(parsedResult.disease.confidence * 100)
          : 0;
        
        if (!parsedResult.disease || conf < CONFIDENCE_THRESHOLD) {
          setShowLowConfidence(true);
        } else {
          setShowLowConfidence(false);
        }
        setIsLoading(false);
      } catch (error) {
        setShowLowConfidence(true);
        setIsLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  if (isLoading) return null; // Or your loading spinner

  // --- TRANSLATION LOGIC ---
  const confidence = result?.disease?.confidence ? Math.round(result.disease.confidence * 100) : 0;
  const sevObj = getSeverityFromConfidence(result?.disease?.confidence || 0);
  const stageObj = getStageFromConfidence(result?.disease?.confidence || 0);

  const diseaseData = {
    // Dynamically building the translation key (e.g., disease_potato_early_blight)
    name: result?.disease?.label ? t(`disease_${result.disease.label.toLowerCase()}`) : t('unrecognizedObject'),
    crop: result?.crop ? t(`crop_${result.crop.toLowerCase()}`) : t('unknownCrop'),
    confidence,
    severity: t(`severity_${sevObj.label}`),
    stage: t(`stage_${stageObj.label}`),
    spreadRisk: sevObj.level === 3 ? t('confidenceHigh') : sevObj.level === 2 ? t('confidenceMedium') : t('confidenceLow'),
  };

  const handleScanNew = () => {
    sessionStorage.removeItem('detectionResult');
    sessionStorage.removeItem('detectionImage');
    navigate("/scan");
  };

  if (showLowConfidence) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">{t('lowConfidenceWarning')}</h1>
            <TranslateButton />
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 p-8 text-center text-white">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">{t('uploadProperImage')}</h2>
              <p className="opacity-90">{t('modelConfidence')}: {confidence}%</p>
            </div>

            <div className="p-8">
              <div className="bg-orange-50 p-4 rounded-xl mb-6 text-orange-800">
                {t('lowConfidenceMessage')}
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-bold flex items-center gap-2"><Info size={20}/> {t('tipsForBetterImage')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl">
                        <p className="font-bold text-green-700">{t('tipGoodLightingTitle')}</p>
                        <p className="text-sm">{t('tipGoodLightingDesc')}</p>
                    </div>
                    <div className="p-4 border rounded-xl">
                        <p className="font-bold text-green-700">{t('tipClearFocusTitle')}</p>
                        <p className="text-sm">{t('tipClearFocusDesc')}</p>
                    </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleScanNew} className="flex-1 bg-green-600 h-14 text-lg">
                  <Camera className="mr-2" /> {t('scanNewImage')}
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)} className="h-14">
                   {t('goBack')}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-72 bg-white border-r hidden lg:flex flex-col p-6 gap-6">
        <div className="flex items-center gap-3"><Leaf className="text-green-600" /> <span className="text-xl font-bold">Krishi Care</span></div>
        <nav className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-green-600 text-white rounded-xl"><LayoutDashboard size={20}/> {t('analysis')}</div>
            <div onClick={() => navigate('/history')} className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"><History size={20}/> {t('history')}</div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}><ArrowLeft /></button>
            <h1 className="text-xl font-bold">{t('analysisResult')}</h1>
          </div>
          <div className="flex gap-2"><TranslateButton /><Share2 size={20} className="cursor-pointer" /></div>
        </header>

        <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-2 gap-8 overflow-y-auto">
          <div className="bg-white rounded-3xl p-4 shadow-sm h-fit">
            <img src={image || ""} className="w-full rounded-2xl object-cover h-96" alt="Scan" />
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h2 className="text-4xl font-bold text-slate-800">{diseaseData.name}</h2>
            <p className="text-lg text-slate-500 mb-6">{diseaseData.crop}</p>
            
            <ConfidenceBar value={diseaseData.confidence} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <StatCard icon={Shield} label={t('severity')} value={diseaseData.severity} />
              <StatCard icon={TrendingUp} label={t('stage')} value={diseaseData.stage} />
              <StatCard icon={Target} label={t('spreadRisk')} value={diseaseData.spreadRisk} />
            </div>

            <div className="mt-8 flex gap-4">
              <Button onClick={() => navigate("/remedies", { state: { crop: result?.crop, disease: result?.disease?.label } })} className="flex-1 h-14 bg-green-600">
                {t('viewRemedies')}
              </Button>
              <Button variant="outline" onClick={handleScanNew} className="h-14">
                <RefreshCw className="mr-2" size={18}/> {t('scanNew')}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;