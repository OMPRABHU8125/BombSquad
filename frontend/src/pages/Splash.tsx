import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center relative overflow-hidden max-w-md mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center animate-scale-in">
        <div className="w-28 h-28 bg-primary-foreground/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-krishi-lg animate-float">
          <Leaf className="w-16 h-16 text-primary-foreground" />
        </div>
        
        <h1 className="text-4xl font-bold text-primary-foreground tracking-tight">
          Krishi Care
        </h1>
        <p className="text-primary-foreground/80 text-lg mt-2 font-medium">
          Protect Your Crops
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex gap-2">
        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "600ms" }} />
      </div>

      {/* Version */}
      <p className="absolute bottom-8 text-primary-foreground/50 text-sm">
        Version 1.0.0
      </p>
    </div>
  );
};

export default Splash;
