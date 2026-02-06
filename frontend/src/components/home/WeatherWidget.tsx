import { Cloud, Sun, Droplets, Wind } from "lucide-react";

const WeatherWidget = () => {
  return (
    <div className="gradient-primary rounded-2xl p-5 text-primary-foreground shadow-krishi-primary animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-90 font-medium">Today's Weather</p>
          <p className="text-4xl font-bold mt-1">28°C</p>
          <p className="text-sm opacity-90 mt-1">Partly Cloudy</p>
        </div>
        <div className="relative">
          <Sun className="w-16 h-16 animate-pulse-soft" />
          <Cloud className="w-10 h-10 absolute -bottom-1 -left-2 opacity-80" />
        </div>
      </div>
      
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-primary-foreground/20">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <span className="text-sm">65% Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span className="text-sm">12 km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
