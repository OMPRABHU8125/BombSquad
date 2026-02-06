import {
  ArrowLeft,
  Home,
  FlaskConical,
  AlertTriangle,
  ShoppingCart,
  CheckCircle2,
  MapPin
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDiseaseDetails } from "@/services/diseaseApi";
import { fetchNearbyMarkets } from "@/services/marketplaceApi";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { llmTranslateJSON } from "@/lib/utils/llmTranslate";


const Remedies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crop, disease } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const [activeTab, setActiveTab] = useState("home");
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketsLoading, setMarketsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const { language } = useLanguage();
  const [translatedData, setTranslatedData] = useState<any>(null);
  const [translating, setTranslating] = useState(false);


  /* ---------------- FETCH DISEASE DATA ---------------- */
  useEffect(() => {
    if (!data) return;

    setTranslating(true);
    llmTranslateJSON(data, language)
      .then(setTranslatedData)
      .finally(() => setTranslating(false));
  }, [language]);

  useEffect(() => {
    if (!token) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    if (!crop || !disease) {
      toast.error("Invalid navigation. Please scan again.");
      navigate("/scan");
      return;
    }

    setLoading(true);

    fetchDiseaseDetails(token, crop, disease)
      .then(async (res) => {
        const baseData = {
          ...res.data,
          remedies: res?.data?.remedies || [],
          products: res?.data?.products || [],
          avoid: res?.data?.avoid || [],
          warning: res.warning || null,
        };

        setData(baseData);

        setTranslating(true);
        const translated = await llmTranslateJSON(baseData, language);
        setTranslatedData(translated);
        setTranslating(false);
      })

      .catch((err) => {
        console.error("Treatment load failed:", err);
        toast.error("Failed to load treatment options");
      })
      .finally(() => setLoading(false));
  }, [crop, disease, navigate, token]);

  /* ---------------- FETCH MARKETPLACES ON TAB CLICK ---------------- */
  useEffect(() => {
    if (activeTab !== "market") return;
    if (markets.length > 0) return; // prevent refetch

    if (!token || !crop) return;

    setMarketsLoading(true);

    fetchNearbyMarkets(token, crop)
      .then((res) => {
        setMarkets(res.marketplaces || []);
      })
      .catch((err) => {
        console.error("Marketplace fetch failed:", err);
        toast.error("Failed to load marketplaces");
      })
      .finally(() => setMarketsLoading(false));
  }, [activeTab, crop, token, markets.length]);

  if (loading) {
    return <div className="p-10 text-center">Loading treatment options...</div>;
  }

  if (!data) return null;

  const openGoogleMapsDoctors = () => {
    window.open(
      "https://www.google.com/maps/search/plant+doctor+near+me",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <header className="sticky top-0 z-20 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)}>
                  <ArrowLeft />
                </button>
                <div>
                  <h1 className="font-bold">Treatment Options</h1>
                  <p className="text-sm">
                    {data.disease} • {data.crop}
                  </p>
                </div>
              </div>
              <TranslateButton />
            </div>

            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="home">
                <Home /> Remedies
              </TabsTrigger>
              <TabsTrigger value="products">
                <FlaskConical /> Products
              </TabsTrigger>
              <TabsTrigger value="avoid">
                <AlertTriangle /> Avoid
              </TabsTrigger>
              <TabsTrigger value="market">
                <ShoppingCart /> Marketplaces
              </TabsTrigger>
            </TabsList>
          </div>
        </header>

        {data.warning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 m-4 rounded">
            <strong>Nearby Disease Alert</strong>
            <p className="text-sm">
              {data.warning.message}
              <br />
              {data.warning.count} cases within{" "}
              {data.warning.radiusMeters / 1000} km
            </p>
          </div>
        )}

        <main className="max-w-7xl mx-auto p-4">
          {/* ---------------- REMEDIES ---------------- */}
          <TabsContent value="home">
            <ReadAloudButton
              text={
                translatedData.remedies.length
                  ? translatedData.remedies
                    .map((r: any) => `${r.title}. ${r.steps}`)
                    .join(". ")
                  : "No home remedies available."
              }
            />

            {translatedData.remedies.map((r: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-semibold">{r.title}</h3>
                <p>{r.steps}</p>
              </div>
            ))}
          </TabsContent>

          {/* ---------------- PRODUCTS ---------------- */}
          <TabsContent value="products">
            {data.products.map((p: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-bold">{p.name}</h3>
                <p>{p.brand}</p>
                <p>₹{p.price}</p>
                <Button onClick={() => window.open(p.buyLink, "_blank")}>
                  <ShoppingCart className="mr-2" /> Buy
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* ---------------- AVOID ---------------- */}
          <TabsContent value="avoid">
            {translatedData.avoid.map((a: any, i: number) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow mb-4 border-l-4 border-red-500"
              >
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.reason}</p>
              </div>
            ))}
          </TabsContent>

          {/* ---------------- MARKETPLACES ---------------- */}
          <TabsContent value="market">
            {marketsLoading && (
              <div className="text-center py-10">
                Loading nearby marketplaces...
              </div>
            )}

            {!marketsLoading && markets.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No marketplace data available
              </div>
            )}

            {markets.map((m: any, i: number) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow mb-4 border-l-4 border-emerald-500"
              >
                <h3 className="font-bold">{m.name}</h3>
                <p>{m.district}</p>
                <p className="text-green-700 font-semibold">
                  ₹{m.pricePerQuintal} / quintal
                </p>
                <p className="text-sm text-slate-500">
                  Demand: {m.demand}
                </p>
              </div>
            ))}
          </TabsContent>

          <div className="mt-10 bg-emerald-50 border rounded-xl p-6 text-center">
            <Button size="lg" onClick={openGoogleMapsDoctors}>
              <MapPin className="mr-2" />
              Find Plant Doctors Near Me
            </Button>
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" onClick={() => navigate("/expert")}>
              <CheckCircle2 className="mr-2" />
              Get Expert Consultation
            </Button>
          </div>
        </main>
      </Tabs>
    </div>
  );
};

export default Remedies;
