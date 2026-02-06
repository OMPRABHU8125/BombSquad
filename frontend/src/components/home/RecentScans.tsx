import { ChevronRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const recentScans = [
  {
    id: 1,
    crop: "Tomato",
    disease: "Early Blight",
    status: "warning",
    date: "2 hours ago",
    image: "🍅",
  },
  {
    id: 2,
    crop: "Rice",
    disease: "Healthy",
    status: "healthy",
    date: "Yesterday",
    image: "🌾",
  },
  {
    id: 3,
    crop: "Potato",
    disease: "Late Blight",
    status: "warning",
    date: "2 days ago",
    image: "🥔",
  },
];

const RecentScans = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Scans</h2>
        <Link 
          to="/history" 
          className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="space-y-3">
        {recentScans.map((scan, index) => (
          <Link
            key={scan.id}
            to={`/result/${scan.id}`}
            className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-krishi-sm hover:shadow-krishi-md transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
              {scan.image}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{scan.crop}</h3>
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
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{scan.date}</p>
              <ChevronRight className="w-5 h-5 text-muted-foreground mt-2 ml-auto" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;
