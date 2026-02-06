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
    <div className="min-h-screen gradient-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-primary-foreground/8 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center animate-scale-in">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-primary-foreground/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-krishi-lg animate-float">
          <Leaf className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground" />
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight">
          Krishi Care
        </h1>
        <p className="text-primary-foreground/80 text-xl md:text-2xl mt-3 font-medium">
          Protect Your Crops
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-24 md:bottom-28 flex gap-2">
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: "600ms" }} />
      </div>

      {/* Version */}
      <p className="absolute bottom-10 md:bottom-12 text-primary-foreground/50 text-sm md:text-base">
        Version 1.0.0
      </p>
    </div>
  );
};

export default Splash;