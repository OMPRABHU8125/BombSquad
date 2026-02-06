import { Search, Filter, AlertTriangle, CheckCircle2, ChevronRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/layout/MobileLayout";
import { Input } from "@/components/ui/input";
import TranslateButton from "@/components/common/TranslateButton";
import { useLanguage } from "@/contexts/LanguageContext";

const scanHistory = [
  {
    id: 1,
    crop: "Tomato",
    disease: "Early Blight",
    status: "warning",
    date: "Jan 28, 2026",
    time: "10:30 AM",
    image: "🍅",
    confidence: 94,
  },
  {
    id: 2,
    crop: "Rice",
    disease: "Healthy",
    status: "healthy",
    date: "Jan 27, 2026",
    time: "3:15 PM",
    image: "🌾",
    confidence: 98,
  },
  {
    id: 3,
    crop: "Potato",
    disease: "Late Blight",
    status: "warning",
    date: "Jan 26, 2026",
    time: "9:00 AM",
    image: "🥔",
    confidence: 89,
  },
  {
    id: 4,
    crop: "Wheat",
    disease: "Healthy",
    status: "healthy",
    date: "Jan 25, 2026",
    time: "11:45 AM",
    image: "🌾",
    confidence: 96,
  },
  {
    id: 5,
    crop: "Cotton",
    disease: "Leaf Curl",
    status: "warning",
    date: "Jan 24, 2026",
    time: "2:30 PM",
    image: "☁️",
    confidence: 91,
  },
];

const History = () => {
  const { t } = useLanguage();
  
  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="p-5 pt-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('recentScans')}</h1>
              <p className="text-sm text-muted-foreground mt-1">Your previous crop scans</p>
            </div>
            <TranslateButton />
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search crops or diseases..."
                className="pl-10 h-12 rounded-xl bg-secondary border-0"
              />
            </div>
            <button className="p-3 bg-secondary rounded-xl hover:bg-muted transition-colors">
              <Filter className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="p-5 grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-4 text-center shadow-krishi-sm">
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground mt-1">Total Scans</p>
          </div>
          <div className="bg-krishi-green-light rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">18</p>
            <p className="text-xs text-primary mt-1">Healthy</p>
          </div>
          <div className="bg-krishi-warning/10 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-krishi-warning">6</p>
            <p className="text-xs text-krishi-warning mt-1">Diseased</p>
          </div>
        </div>

        {/* History List */}
        <div className="px-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Recent Activity</span>
          </div>
          
          <div className="space-y-3">
            {scanHistory.map((scan, index) => (
              <Link
                key={scan.id}
                to={`/result/${scan.id}`}
                className="flex items-center gap-4 bg-card rounded-2xl p-4 shadow-krishi-sm hover:shadow-krishi-md transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                  {scan.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{scan.crop}</h3>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{scan.confidence}% match</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {scan.status === "healthy" ? (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-krishi-warning" />
                    )}
                    <span className={`text-sm ${scan.status === "healthy" ? "text-primary" : "text-krishi-warning"}`}>
                      {scan.disease}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{scan.date} • {scan.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default History;
