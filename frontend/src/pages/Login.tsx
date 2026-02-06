import { Leaf } from "lucide-react";
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
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Translation Button */}
      <div className="absolute top-5 right-5 z-10">
        <TranslateButton variant="full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12 animate-fade-in">
          <div className="gradient-primary w-24 h-24 rounded-3xl flex items-center justify-center shadow-krishi-primary mb-6">
            <Leaf className="w-14 h-14 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Krishi Care</h1>
          <p className="text-muted-foreground mt-2 text-center">
            Your AI-powered crop disease detector
          </p>
        </div>

        {/* Illustration */}
        <div className="w-64 h-48 mb-12 flex items-center justify-center">
          <div className="relative">
            <div className="text-9xl animate-float">🌱</div>
            <div className="absolute -right-8 top-4 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🔍</div>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="w-full space-y-4 animate-slide-up">
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-14 text-base font-semibold bg-card text-foreground border border-border rounded-2xl shadow-krishi-md hover:shadow-krishi-lg transition-all flex items-center justify-center gap-3"
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
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            onClick={handleQuickUse}
            className="w-full h-14 text-base font-semibold gradient-primary text-primary-foreground rounded-2xl shadow-krishi-primary hover:opacity-90 transition-all"
          >
            {t('quickUse')}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {t('orContinueWithout')}
          </p>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
