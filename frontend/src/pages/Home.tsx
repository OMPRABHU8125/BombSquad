import { Bell, Leaf } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import WeatherWidget from "@/components/home/WeatherWidget";
import QuickActions from "@/components/home/QuickActions";
import RecentScans from "@/components/home/RecentScans";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  
  const welcomeText = "Welcome back, Farmer Ravi. Check the weather conditions and recent scans. Use quick actions to scan your crops or access the disease library.";

  return (
    <MobileLayout>
      <div className="gradient-hero min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="gradient-primary w-12 h-12 rounded-xl flex items-center justify-center shadow-krishi-primary">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('welcomeBack')} 👋</p>
              <h1 className="text-xl font-bold text-foreground">Farmer Ravi</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TranslateButton />
            <ReadAloudButton text={welcomeText} size="md" />
            <button className="relative p-2 bg-card rounded-xl shadow-krishi-sm hover:shadow-krishi-md transition-all">
              <Bell className="w-6 h-6 text-foreground" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-destructive rounded-full border-2 border-card" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="px-5 space-y-6 pb-6">
          <WeatherWidget />
          
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">{t('quickActions')}</h2>
            <QuickActions />
          </section>

          <RecentScans />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Home;
