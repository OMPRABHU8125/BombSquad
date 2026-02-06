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
import { toast } from "sonner";

const Remedies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { crop, disease } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      .then((res) => {
        setData({
          ...res.data,
          remedies: res?.data?.remedies || [],
          products: res?.data?.products || [],
          avoid: res?.data?.avoid || [],
          warning: res.warning || null,
        });
      })
      .catch((err) => {
        console.error("Treatment load failed:", err);
        toast.error("Failed to load treatment options");
      })
      .finally(() => setLoading(false));
  }, [crop, disease, navigate]);

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
      <Tabs defaultValue="home">
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

            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="home">
                <Home /> Remedies
              </TabsTrigger>
              <TabsTrigger value="products">
                <FlaskConical /> Products
              </TabsTrigger>
              <TabsTrigger value="avoid">
                <AlertTriangle /> Avoid
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
          <TabsContent value="home">
            <ReadAloudButton
              text={
                data.remedies.length
                  ? data.remedies
                      .map((r: any) => `${r.title}. ${r.steps}`)
                      .join(". ")
                  : "No home remedies available."
              }
            />

            {data.remedies.map((r: any, i: number) => (
              <div key={i} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-semibold">{r.title}</h3>
                <p>{r.steps}</p>
              </div>
            ))}
          </TabsContent>

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

          <TabsContent value="avoid">
            {data.avoid.map((a: any, i: number) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow mb-4 border-l-4 border-red-500"
              >
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.reason}</p>
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
