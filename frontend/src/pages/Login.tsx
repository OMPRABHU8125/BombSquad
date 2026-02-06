import { Leaf, CheckCircle2, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TranslateButton from "@/components/common/TranslateButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGoogleLogin = () => {
    // In a real app, this would trigger Google OAuth
    // For now, navigate to home
    // navigate("/home");
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleQuickUse = () => {
    navigate("/scan");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Translation Button */}
      <div className="absolute top-6 right-6 z-20">
        <TranslateButton variant="full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            {/* Logo & Title */}
            <div className="flex flex-col items-center lg:items-start animate-fade-in">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/50 mb-6">
                <Leaf className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Krishi Care
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">
                Your AI-powered crop disease detector for healthier farms
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Instant AI Detection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Get disease identification in seconds using advanced machine learning
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Expert Remedies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Access proven treatments and preventive measures for crop diseases
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Offline Capable
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Works without internet connection for remote farming areas
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration for mobile */}
            <div className="lg:hidden flex justify-center py-8">
              <div className="relative">
                <div className="text-8xl animate-float">🌱</div>
                <div className="absolute -right-6 top-2 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>🔍</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="order-1 lg:order-2 animate-slide-up">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              {/* Illustration for desktop */}
              <div className="hidden lg:flex justify-center mb-8">
                <div className="relative">
                  <div className="text-8xl animate-float">🌱</div>
                  <div className="absolute -right-8 top-4 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🔍</div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to start detecting crop diseases
                </p>
              </div>

              {/* Login Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full h-14 text-base font-semibold bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-md hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-500 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t('continueWithGoogle')}
                </Button>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                </div>

                <Button
                  onClick={handleQuickUse}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/50 transition-all"
                >
                  {t('quickUse')}
                </Button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
                  {t('orContinueWithout')}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">50K+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                By continuing, you agree to our{" "}
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
                  Terms
                </a>{" "}
                &{" "}
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;