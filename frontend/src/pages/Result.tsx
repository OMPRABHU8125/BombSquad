// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Shield,
//   Share2,
//   BookmarkPlus,
//   TrendingUp,
//   Target,
//   Leaf,
//   LayoutDashboard,
//   History,
//   RefreshCw,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import TranslateButton from "@/components/common/TranslateButton";
// import ReadAloudButton from "@/components/common/ReadAloudButton";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { toast } from "sonner";

// /* ---------------- TYPES (STRICTLY PRESERVED) ---------------- */
// interface DetectionResult {
//   crop: string;
//   disease: {
//     label: string;
//     confidence: number;
//   } | null;
//   source: string;
// }

// /* ---------------- HELPERS (STRICTLY PRESERVED) ---------------- */
// const formatText = (text: string) =>
//   text
//     .split("_")
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(" ");

// const getSeverityFromConfidence = (c: number) => {
//   if (c >= 0.75) return { label: "High", level: 3 };
//   if (c >= 0.5) return { label: "Moderate", level: 2 };
//   return { label: "Low", level: 1 };
// };

// const getStageFromConfidence = (c: number) => {
//   if (c >= 0.75) return { label: "Mid-Late", level: 3 };
//   if (c >= 0.5) return { label: "Early-Mid", level: 2 };
//   return { label: "Early", level: 1 };
// };

// /* ---------------- MAIN COMPONENT ---------------- */
// const Result = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { t } = useLanguage();

//   const [result, setResult] = useState<DetectionResult | null>(null);
//   const [image, setImage] = useState<string | null>(null);

//   /* ✅ LOAD RESULT + IMAGE */
//   useEffect(() => {
//     const storedResult = sessionStorage.getItem("detectionResult");
//     const storedImage = sessionStorage.getItem("detectionImage");

//     if (!storedResult) {
//       navigate("/scan");
//       return;
//     }

//     try {
//       setResult(JSON.parse(storedResult));
//       if (storedImage) setImage(storedImage);
//     } catch {
//       navigate("/scan");
//     }
//   }, [navigate]);

//   /* ✅ FETCH & STORE LOCATION */
//   useEffect(() => {
//     if (!navigator.geolocation) return;

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const location = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         };
//         sessionStorage.setItem("scanLocation", JSON.stringify(location));
//       },
//       () => {
//         console.warn("Location permission denied");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

//   if (!result || !result.disease) return null;

//   const confidence = Math.round(result.disease.confidence * 100);
//   const severity = getSeverityFromConfidence(result.disease.confidence);
//   const stage = getStageFromConfidence(result.disease.confidence);

//   const diseaseData = {
//     name: formatText(result.disease.label),
//     crop: formatText(result.crop),
//     confidence,
//     severity: severity.label,
//     stage: stage.label,
//     spreadRisk:
//       severity.level === 3
//         ? "High"
//         : severity.level === 2
//         ? "Medium"
//         : "Low",
//   };

//   const fullDescription = `${diseaseData.name} detected on ${diseaseData.crop} with ${confidence}% confidence. Severity ${diseaseData.severity}.`;

//   return (
//     <div className="flex h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden">
//       {/* SIDEBAR */}
//       <aside className="w-20 lg:w-72 bg-white/80 backdrop-blur-xl border-r hidden md:flex flex-col py-8 px-6 gap-8">
//         <div className="flex items-center gap-3 px-2">
//           <div className="h-12 w-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white">
//             <Leaf size={28} />
//           </div>
//           <span className="hidden lg:block text-2xl font-bold">
//             Krishi Care
//           </span>
//         </div>

//         <nav className="flex flex-col gap-3">
//           <div className="flex items-center gap-4 px-4 py-3 bg-emerald-600 text-white rounded-xl">
//             <LayoutDashboard size={22} />
//             <span className="hidden lg:block">Analysis</span>
//           </div>

//           <div
//             onClick={() => navigate("/history")}
//             className="flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-emerald-50 rounded-xl cursor-pointer"
//           >
//             <History size={22} />
//             <span className="hidden lg:block">History</span>
//           </div>
//         </nav>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 flex flex-col">
//         <header className="bg-white px-8 py-6 flex justify-between items-center border-b">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)}>
//               <ArrowLeft />
//             </button>
//             <h1 className="text-2xl font-bold">Analysis Result</h1>
//           </div>

//           <div className="flex gap-4">
//             <TranslateButton />
//             <ReadAloudButton text={fullDescription} />
//             <Share2 />
//             <BookmarkPlus />
//           </div>
//         </header>

//         <div className="flex-1 p-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
//           <section className="xl:col-span-5">
//             <div className="bg-white rounded-3xl p-4">
//               {image ? (
//                 <img
//                   src={image}
//                   className="w-full h-[500px] object-cover rounded-2xl"
//                 />
//               ) : (
//                 <div className="h-[500px] flex items-center justify-center">
//                   <Leaf size={120} />
//                 </div>
//               )}
//             </div>
//           </section>

//           <section className="xl:col-span-7">
//             <div className="bg-white rounded-3xl p-12">
//               <h1 className="text-6xl font-bold">{diseaseData.name}</h1>
//               <p className="text-xl mt-4">{diseaseData.crop}</p>

//               <div className="grid sm:grid-cols-3 gap-5 mt-10">
//                 <StatCard icon={Shield} label="Severity" value={diseaseData.severity} />
//                 <StatCard icon={TrendingUp} label="Stage" value={diseaseData.stage} />
//                 <StatCard icon={Target} label="Spread Risk" value={diseaseData.spreadRisk} />
//               </div>

//               <div className="mt-10 flex gap-4">
//                 <Button
//                   onClick={() =>
//                     navigate("/remedies", {
//                       state: {
//                         crop: result.crop,
//                         disease: result.disease?.label,
//                       },
//                     })
//                   }
//                   className="flex-1 h-16 text-xl"
//                 >
//                   View Remedies
//                 </Button>

//                 <Button variant="outline" onClick={() => navigate("/scan")}>
//                   <RefreshCw className="mr-2" />
//                   Scan New
//                 </Button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, label, value }: any) => (
//   <div className="bg-emerald-50 rounded-2xl p-6 flex gap-5">
//     <Icon className="text-emerald-600" />
//     <div>
//       <span className="text-xs uppercase">{label}</span>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// export default Result;


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

/* ---------------- HELPERS (STRICTLY PRESERVED) ---------------- */
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

  const diseaseData = {
    name: formatText(result.disease.label),
    crop: formatText(result.crop),
    confidence,
    severity: severity.label,
    stage: stage.label,
    spreadRisk:
      severity.level === 3
        ? "High"
        : severity.level === 2
        ? "Medium"
        : "Low",
  };

  const fullDescription = `${diseaseData.name} detected on ${diseaseData.crop} with ${confidence}% confidence. Severity ${diseaseData.severity}.`;

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
            <span className="hidden lg:block">Analysis</span>
          </div>

          <div
            onClick={() => navigate("/history")}
            className="flex items-center gap-4 px-4 py-3 text-slate-600 hover:bg-emerald-50 rounded-xl cursor-pointer"
          >
            <History size={22} />
            <span className="hidden lg:block">History</span>
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
            <h1 className="text-2xl font-bold">Analysis Result</h1>
          </div>

          <div className="flex gap-4">
            <TranslateButton />
            <ReadAloudButton text={fullDescription} />
            <Share2 />
            <BookmarkPlus />
          </div>
        </header>

        <div className="flex-1 p-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
          <section className="xl:col-span-5">
            <div className="bg-white rounded-3xl p-4">
              {image ? (
                <img
                  src={image}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
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

              {/* ✅ CONFIDENCE BAR ADDED */}
              <ConfidenceBar value={diseaseData.confidence} />

              <div className="grid sm:grid-cols-3 gap-5 mt-10">
                <StatCard icon={Shield} label="Severity" value={diseaseData.severity} />
                <StatCard icon={TrendingUp} label="Stage" value={diseaseData.stage} />
                <StatCard icon={Target} label="Spread Risk" value={diseaseData.spreadRisk} />
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
                  className="flex-1 h-16 text-xl"
                >
                  View Remedies
                </Button>

                <Button variant="outline" onClick={() => navigate("/scan")}>
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

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-emerald-50 rounded-2xl p-6 flex gap-5">
    <Icon className="text-emerald-600" />
    <div>
      <span className="text-xs uppercase">{label}</span>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Result;