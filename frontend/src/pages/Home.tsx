import { Bell, Leaf, LogOut } from "lucide-react";
import WeatherWidget from "@/components/home/WeatherWidget";
import QuickActions from "@/components/home/QuickActions";
import RecentScans from "@/components/home/RecentScans";
import TranslateButton from "@/components/common/TranslateButton";
import ReadAloudButton from "@/components/common/ReadAloudButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Extract first name from full name
  const firstName = user?.name?.split(' ')[0] || 'Farmer';
  
  const welcomeText = `${t('welcomeBack')}, ${firstName}. Check the weather conditions and recent scans. Use quick actions to scan your crops or access the disease library.`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              {user?.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-14 h-14 rounded-xl object-cover shadow-lg border-2 border-green-500"
                />
              ) : (
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('welcomeBack')} 👋
                </p>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name || 'Farmer'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TranslateButton />
              <ReadAloudButton text={welcomeText} size="md" />
              <button className="relative p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm">
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
              </button>
              
              {user && (
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors shadow-sm group"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Weather Widget */}
            <WeatherWidget />
            
            {/* Quick Actions Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('quickActions')}
                </h2>
              </div>
              <QuickActions />
            </section>

            {/* Recent Scans Section */}
            <RecentScans />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tips Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💡</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Quick Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Take photos in good lighting for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Scan crops regularly to catch diseases early</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Check weather conditions before applying treatments</span>
                </li>
              </ul>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Scans This Month</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Healthy Crops</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🌾</span>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Need Help?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Our experts are here to assist you
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm font-semibold transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;