import {
  ArrowLeft,
  Home,
  FlaskConical,
  Stethoscope,
  AlertTriangle,
  Play,
  MapPin,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDiseaseDetails } from "@/services/diseaseApi";
import { toast } from "sonner";

const Remedies = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login required");
      navigate("/login");
      return;
    }

    fetchDiseaseDetails(token)
      .then(setData)
      .catch(() => toast.error("Failed to load remedies"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Loading treatment options…</p>
        </div>
      </MobileLayout>
    );
  }

  if (!data) return null;

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-secondary rounded-xl"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold">Treatment Options</h1>
                <p className="text-xs text-muted-foreground">
                  {data.disease} • {data.crop}
                </p>
              </div>
            </div>
            <TranslateButton />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="home">
          <TabsList className="grid grid-cols-4 bg-secondary/50">
            <TabsTrigger value="home"><Home size={16} />Home</TabsTrigger>
            <TabsTrigger value="products"><FlaskConical size={16} />Products</TabsTrigger>
            <TabsTrigger value="doctors"><Stethoscope size={16} />Doctors</TabsTrigger>
            <TabsTrigger value="avoid"><AlertTriangle size={16} />Avoid</TabsTrigger>
          </TabsList>

          {/* HOME REMEDIES */}
          <TabsContent value="home" className="p-5 space-y-4">
            <ReadAloudButton
              text={data.remedies.map((r: any) => `${r.title}. ${r.steps}`).join(". ")}
            />

            {data.remedies.map((r: any, i: number) => (
              <div key={i} className="bg-card p-4 rounded-2xl shadow">
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{r.steps}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {r.ingredients.map((ing: string, j: number) => (
                    <span key={j} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                      {ing}
                    </span>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => window.open(r.videoUrl, "_blank")}
                >
                  <Play size={14} /> Watch Video
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* PRODUCTS */}
          <TabsContent value="products" className="p-5 space-y-4">
            {data.products.map((p: any, i: number) => (
              <div key={i} className="bg-card p-4 rounded-2xl shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.brand}</p>
                  </div>
                  <span className="font-bold text-primary">₹{p.price}</span>
                </div>

                <p className="text-sm mt-2">{p.usage}</p>

                <Button
                  size="sm"
                  className="mt-3 gradient-primary text-primary-foreground"
                  onClick={() => window.open(p.buyLink, "_blank")}
                >
                  <ShoppingCart size={14} /> Shop Online
                </Button>
              </div>
            ))}
          </TabsContent>

          {/* DOCTORS (STATIC GOOGLE MAP SEARCH) */}
          <TabsContent value="doctors" className="p-5 space-y-4">
            <Button
              className="w-full gradient-primary text-primary-foreground"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/plant+doctor+near+me",
                  "_blank"
                )
              }
            >
              <MapPin size={16} /> Find Plant Doctors Near Me
            </Button>
          </TabsContent>

          {/* AVOID */}
          <TabsContent value="avoid" className="p-5 space-y-4">
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl">
              <AlertTriangle size={16} /> Do NOT use these
            </div>

            {data.avoid.map((a: any, i: number) => (
              <div
                key={i}
                className="bg-card p-4 rounded-2xl shadow border-l-4 border-destructive"
              >
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{a.reason}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="sticky bottom-20 p-5">
          <Button
            className="w-full h-14 gradient-primary text-primary-foreground rounded-2xl"
            onClick={() => navigate("/expert")}
          >
            Get Expert Consultation
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Remedies;
